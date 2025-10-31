// src/ShopPage.jsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { products, displayPrice } from './data/products';

const PANCAKES_ID = '10-mini-pancakes'; // <-- change to match your products.js id

// --- Small reusable modal ---
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
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
  // Slider bounds
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

  // pancakes modal
  const [pancakesOpen, setPancakesOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [topping, setTopping] = useState('Strawberry');
  const [syrup, setSyrup] = useState('Maple');

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

  // filter + sort
  const filtered = useMemo(() => {
    const norm = (s) => s.toLowerCase();
    return products
      .filter((p) => {
        const floor = minPrice ?? PRICE_MIN;
        const ceil = maxPrice ?? PRICE_MAX;
        const priceForFilter =
          p.price != null ? p.price : p.priceMin != null ? p.priceMin : 0;
        const nameMatch = q ? norm(p.name).includes(norm(q)) : true;
        const within = priceForFilter >= floor && priceForFilter <= ceil;
        return nameMatch && within;
      })
      .sort((a, b) => {
        if (sort === 'price-asc') {
          const pa = a.price ?? a.priceMin ?? 0;
          const pb = b.price ?? b.priceMin ?? 0;
          return pa - pb;
        }
        if (sort === 'price-desc') {
          const pa = a.price ?? a.priceMin ?? 0;
          const pb = b.price ?? b.priceMin ?? 0;
          return pb - pa;
        }
        if (sort === 'alpha-asc') return a.name.localeCompare(b.name);
        if (sort === 'alpha-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [minPrice, maxPrice, q, sort]);

  return (
    <div className="min-h-screen bg-[#f7f3f1] pt-20">
      {/* slider styling so thumbs sit on the rail */}
      <style>{`
        input[type="range"]{ -webkit-appearance:none; appearance:none; width:100%; background:transparent; }
        input[type="range"]::-webkit-slider-runnable-track { height:6px; background:transparent; border-radius:9999px; }
        input[type="range"]::-moz-range-track { height:6px; background:transparent; border:none; border-radius:9999px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px;height:18px;border-radius:9999px;background:#2563eb;border:2px solid #fff;box-shadow:0 1px 2px rgba(0,0,0,.15); margin-top:-6px; cursor:pointer; }
        input[type="range"]::-moz-range-thumb { width:18px;height:18px;border-radius:9999px;background:#2563eb;border:2px solid #fff;box-shadow:0 1px 2px rgba(0,0,0,.15); cursor:pointer; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-72 shrink-0">
          <h3 className="text-lg font-semibold tracking-wide mb-4">Browse by category</h3>

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
                style={{ left: `${pct(minPrice)}%`, right: `${100 - pct(maxPrice)}%` }}
              />
              <input
                aria-label="Minimum price"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={minPrice}
                onChange={(e) => onMinChange(e.target.value)}
                className="absolute inset-0 h-10 w-full"
                style={{ zIndex: 20 }}
              />
              <input
                aria-label="Maximum price"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={maxPrice}
                onChange={(e) => onMaxChange(e.target.value)}
                className="absolute inset-0 h-10 w-full"
                style={{ zIndex: 20 }}
              />
            </div>

            <div className="mt-3 text-sm text-gray-700">{`$${minPrice} - $${maxPrice}`}</div>
          </div>

          {/* How to get it */}
          <div className="bg-white rounded-xl p-4 border mb-4">
            <div className="font-semibold text-sm mb-2">How to get it</div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={delivery} onChange={() => setDelivery(!delivery)} />
              Local delivery
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={pickup} onChange={() => setPickup(!pickup)} />
              Pickup
            </label>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl p-4 border">
            <div className="font-semibold text-sm mb-2">Availability</div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={inStock} onChange={() => setInStock(!inStock)} />
              In stock
            </label>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-sm text-gray-600">{filtered.length} results</div>
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
                  <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{p.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{displayPrice(p)}</p>
                  </div>
                </div>
              );

              // SPECIAL CASE: 10 ct Mini Pancakes -> open modal instead of route
              if (p.id === PANCAKES_ID) {
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPancakesOpen(true)}
                    className="text-left"
                  >
                    {card}
                  </button>
                );
              }

              // Default: go to dynamic product page
              return (
                <Link to={`/product/${p.id}`} key={p.id}>
                  {card}
                </Link>
              );
            })}
          </div>
        </main>
      </div>

      {/* Pancakes Modal (prototype) */}
      <Modal open={pancakesOpen} onClose={() => setPancakesOpen(false)}>
        <div className="grid md:grid-cols-2">
          <img
            src="https://cdn.loveandlemons.com/wp-content/uploads/2025/01/pancake-recipe.jpg"
            alt="10 ct Mini Pancakes"
            className="w-full h-72 md:h-full object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold">10 ct Mini Pancakes</h2>
              <button
                onClick={() => setPancakesOpen(false)}
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
                <label className="block text-sm font-medium mb-1">Topping</label>
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
                <label className="block text-sm font-medium mb-1">Syrup</label>
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
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <div className="inline-flex items-center border rounded-lg">
                  <button
                    type="button"
                    className="px-3 py-2 disabled:opacity-40"
                    disabled={qty === 1}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="px-4">{qty}</span>
                  <button
                    type="button"
                    className="px-3 py-2"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-lg font-semibold">$8.00</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `Added ${qty} x 10 ct Mini Pancakes (${topping}, ${syrup}) to cart.`
                    );
                    setPancakesOpen(false);
                  }}
                  className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
