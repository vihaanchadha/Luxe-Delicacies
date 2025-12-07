// src/shopPage.jsx
import React, { useMemo, useState } from 'react';
import { products, displayPrice } from './data/products';

const PANCAKES_ID = '10-mini-pancakes';

// --- Reusable modal shell ---
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}

export default function ShopPage() {
  const PRICE_MIN = 0;
  const PRICE_MAX = 50;

  // filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [inStock, setInStock] = useState(true);

  // ui
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('popularity');

  // active product modal
  const [activeProduct, setActiveProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  // pancakes-specific extras
  const [topping, setTopping] = useState('Strawberry');
  const [syrup, setSyrup] = useState('Maple');

  // ---------- helpers ----------
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const pct = (v) => ((v - PRICE_MIN) * 100) / (PRICE_MAX - PRICE_MIN);

  const onMinChange = (v) => {
    const val = clamp(Number(v), PRICE_MIN, maxPrice - 1);
    setMinPrice(val);
  };
  const onMaxChange = (v) => {
    const val = clamp(Number(v), minPrice + 1, PRICE_MAX);
    setMaxPrice(val);
  };

  const openProduct = (product) => {
    setActiveProduct(product);
    setQty(1);
    setSelectedVariantId(product.variants?.[0]?.id ?? null);
    setTopping('Strawberry');
    setSyrup('Maple');
  };

  const closeProduct = () => {
    setActiveProduct(null);
  };

  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase();
    return products
      .filter((p) => {
        const floor = minPrice ?? PRICE_MIN;
        const ceil = maxPrice ?? PRICE_MAX;

        // base price used only for filtering/sorting
        const basePrice =
          typeof p.price === 'number'
            ? p.price
            : typeof p.priceMin === 'number'
            ? p.priceMin
            : p.variants && p.variants.length
            ? Math.min(
                ...p.variants
                  .map((v) => v.price)
                  .filter((x) => typeof x === 'number')
              )
            : 0;

        const nameMatch = q ? norm(p.name).includes(norm(q)) : true;
        const within = basePrice >= floor && basePrice <= ceil;
        return nameMatch && within;
      })
      .sort((a, b) => {
        const getBase = (p) =>
          p.price ??
          p.priceMin ??
          (p.variants?.[0]?.price ?? 0);

        if (sort === 'price-asc') return getBase(a) - getBase(b);
        if (sort === 'price-desc') return getBase(b) - getBase(a);
        if (sort === 'alpha-asc') return a.name.localeCompare(b.name);
        if (sort === 'alpha-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [minPrice, maxPrice, q, sort]);

  // active variant + prices for modal
  const activeVariant =
    activeProduct?.variants?.find((v) => v.id === selectedVariantId) ??
    activeProduct?.variants?.[0] ??
    null;

  const modalBasePrice =
    (activeVariant && typeof activeVariant.price === 'number'
      ? activeVariant.price
      : typeof activeProduct?.price === 'number'
      ? activeProduct.price
      : typeof activeProduct?.priceMin === 'number'
      ? activeProduct.priceMin
      : 0) || 0;

  const modalTotalPrice = modalBasePrice * qty;

  return (
    <div className="min-h-screen bg-[#f7f3f1] pt-20">
      {/* slider thumb styling + pointer-events so both thumbs work */}
      <style>{`
        input[type="range"]{
          -webkit-appearance:none;
          appearance:none;
          width:100%;
          background:transparent;
          pointer-events:none; /* allow only thumbs to capture events */
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height:6px;
          background:transparent;
          border-radius:9999px;
        }
        input[type="range"]::-moz-range-track {
          height:6px;
          background:transparent;
          border:none;
          border-radius:9999px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance:none;
          appearance:none;
          width:18px;
          height:18px;
          border-radius:9999px;
          background:#2563eb;
          border:2px solid #fff;
          box-shadow:0 1px 2px rgba(0,0,0,.15);
          margin-top:-6px;
          cursor:pointer;
          pointer-events:auto; /* thumb is draggable */
        }
        input[type="range"]::-moz-range-thumb {
          width:18px;
          height:18px;
          border-radius:9999px;
          background:#2563eb;
          border:2px solid #fff;
          box-shadow:0 1px 2px rgba(0,0,0,.15);
          cursor:pointer;
          pointer-events:auto;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar – sticky so filters stay visible */}
        <aside className="w-full md:w-72 shrink-0 md:sticky md:top-24 self-start">
          <h3 className="text-lg font-semibold tracking-wide mb-4">
            Browse by category
          </h3>

          {/* Price */}
          <div className="bg-white rounded-xl p-4 border mb-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xl">Price range ($)</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="text-base text-gray-600">Min price</label>
                <input
                  type="number"
                  value={minPrice}
                  min={PRICE_MIN}
                  max={maxPrice - 1}
                  onChange={(e) => onMinChange(e.target.value)}
                  className="mt-1 w-full px-3 py-3 border rounded-lg outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="text-base text-gray-600">Max price</label>
                <input
                  type="number"
                  value={maxPrice}
                  min={minPrice + 1}
                  max={PRICE_MAX}
                  onChange={(e) => onMaxChange(e.target.value)}
                  className="mt-1 w-full px-3 py-3 border rounded-lg outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Dual range slider */}
            <div className="mt-5 relative h-10">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full"
                style={{
                  left: `${pct(minPrice)}%`,
                  right: `${100 - pct(maxPrice)}%`,
                }}
              />
              {/* min thumb */}
              <input
                aria-label="Minimum price"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={minPrice}
                onChange={(e) => onMinChange(e.target.value)}
                className="absolute inset-0 h-10 w-full"
                style={{ zIndex: 30 }}
              />
              {/* max thumb */}
              <input
                aria-label="Maximum price"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={maxPrice}
                onChange={(e) => onMaxChange(e.target.value)}
                className="absolute inset-0 h-10 w-full"
                style={{ zIndex: 25 }}
              />
            </div>

            <div className="mt-3 text-sm text-gray-700">
              {`$${minPrice} - $${maxPrice}`}
            </div>
          </div>

          {/* How to get it */}
          <div className="bg-white rounded-xl p-4 border mb-4">
            <div className="font-semibold text-sm mb-2">How to get it</div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={delivery}
                onChange={() => setDelivery(!delivery)}
              />
              Local delivery
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={pickup}
                onChange={() => setPickup(!pickup)}
              />
              Pickup
            </label>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl p-4 border">
            <div className="font-semibold text-sm mb-2">Availability</div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
              />
              In stock
            </label>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-sm text-gray-600">
              {filtered.length} results
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 border rounded-md outline-none focus:ring-1 focus:ring-black"
              >
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price (Low–High)</option>
                <option value="price-desc">Price (High–Low)</option>
                <option value="alpha-asc">Alphabetical (A–Z)</option>
                <option value="alpha-desc">Alphabetical (Z–A)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const card = (
                <div className="bg-white rounded-2xl overflow-hidden border hover:shadow-md transition">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{p.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {displayPrice(p)}
                    </p>
                  </div>
                </div>
              );

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openProduct(p)}
                  className="text-left"
                >
                  {card}
                </button>
              );
            })}
          </div>
        </main>
      </div>

      {/* Product modal (pancakes special, others generic) */}
      <Modal open={!!activeProduct} onClose={closeProduct}>
        {activeProduct && activeProduct.id === PANCAKES_ID ? (
          // Pancakes modal
          <div className="grid md:grid-cols-2">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="w-full h-72 md:h-full object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold">
                  {activeProduct.name}
                </h2>
                <button
                  onClick={closeProduct}
                  className="text-gray-500 hover:text-black text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-600 mt-2">
                Freshly made bite-sized pancakes. Choose your topping and syrup!
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Topping
                  </label>
                  <select
                    value={topping}
                    onChange={(e) => setTopping(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Strawberry</option>
                    <option>Banana</option>
                    <option>Chocolate Chips</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Syrup
                  </label>
                  <select
                    value={syrup}
                    onChange={(e) => setSyrup(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option>Maple</option>
                    <option>Caramel</option>
                    <option>Chocolate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <div className="inline-flex items-center border rounded-lg">
                    <button
                      type="button"
                      className="px-3 py-2 disabled:opacity-40"
                      disabled={qty === 1}
                      onClick={() =>
                        setQty((qVal) => Math.max(1, qVal - 1))
                      }
                    >
                      −
                    </button>
                    <span className="px-4">{qty}</span>
                    <button
                      type="button"
                      className="px-3 py-2"
                      onClick={() => setQty((qVal) => qVal + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-lg font-semibold">
                      ${modalTotalPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      ${modalBasePrice.toFixed(2)} each
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        `Added ${qty} x ${activeProduct.name} (${topping}, ${syrup}) to cart.`
                      );
                      closeProduct();
                    }}
                    className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Generic modal for everything else
          activeProduct && (
            <div className="grid md:grid-cols-2">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-72 md:h-full object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold">
                    {activeProduct.name}
                  </h2>
                </div>

                {activeProduct.description && (
                  <p className="text-gray-600 mt-2">
                    {activeProduct.description}
                  </p>
                )}

                <div className="mt-6 space-y-4">
                  {activeProduct.variants &&
                    activeProduct.variants.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {activeProduct.variantLabel ||
                            'Size / Option'}
                        </label>
                        <select
                          value={selectedVariantId || ''}
                          onChange={(e) =>
                            setSelectedVariantId(e.target.value)
                          }
                          className="w-full border rounded-lg px-3 py-2"
                        >
                          {activeProduct.variants.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name}
                              {typeof v.price === 'number'
                                ? ` - $${v.price.toFixed(2)}`
                                : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Quantity
                    </label>
                    <div className="inline-flex items-center border rounded-lg">
                      <button
                        type="button"
                        className="px-3 py-2 disabled:opacity-40"
                        disabled={qty === 1}
                        onClick={() =>
                          setQty((qVal) => Math.max(1, qVal - 1))
                        }
                      >
                        −
                      </button>
                      <span className="px-4">{qty}</span>
                      <button
                        type="button"
                        className="px-3 py-2"
                        onClick={() => setQty((qVal) => qVal + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="text-lg font-semibold">
                        ${modalTotalPrice.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${modalBasePrice.toFixed(2)} each
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const variantText = activeVariant
                          ? ` (${activeVariant.name})`
                          : '';
                        alert(
                          `Added ${qty} x ${activeProduct.name}${variantText} to cart.`
                        );
                        closeProduct();
                      }}
                      className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
}
