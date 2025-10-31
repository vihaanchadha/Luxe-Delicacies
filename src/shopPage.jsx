import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { products, displayPrice } from './data/products';

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

  // helpers
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
        return 0; // popularity
      });
  }, [minPrice, maxPrice, q, sort]);

  return (
    <div className="min-h-screen bg-[#f7f3f1] pt-20">
      {/* Scoped slider CSS so thumbs align exactly with the rail */}
      <style>{`
        /* Make the track the same height as our blue rail and center the thumb on it */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;                 /* matches rail height */
          background: transparent;     /* rail is drawn separately */
          border-radius: 9999px;
        }
        input[type="range"]::-moz-range-track {
          height: 6px;
          background: transparent;
          border: none;
          border-radius: 9999px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;         /* blue-600 */
          border: 2px solid #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
          margin-top: -6px;            /* centers thumb on the 6px track (18/2 - 6/2) */
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #2563eb;
          border: 2px solid #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
          cursor: pointer;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-72 shrink-0">
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

            {/* Dual range slider with centered rail */}
            <div className="mt-5 relative h-10">
              {/* grey rail */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full" />

              {/* selected segment */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-blue-600 rounded-full"
                style={{ left: `${pct(minPrice)}%`, right: `${100 - pct(maxPrice)}%` }}
              />

              {/* Left thumb */}
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

              {/* Right thumb */}
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
            {filtered.map((p) => (
              <Link
                to={`/product/${p.id}`}
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden border hover:shadow-md transition"
              >
                <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{p.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{displayPrice(p)}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
