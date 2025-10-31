import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, basePrice } from './data/products';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = useMemo(() => products.find((p) => p.id === productId), [productId]);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState([]);

  if (!product) {
    return (
      <div className="pt-24 text-center">
        <p className="text-gray-700">Product not found.</p>
        <Link to="/shop" className="text-black underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const startPrice = basePrice(product);
  const addOnTotal = selected.reduce((sum, idx) => sum + (product.options?.[idx]?.priceDelta || 0), 0);
  const total = (startPrice + addOnTotal) * qty;

  return (
    <div className="min-h-screen bg-[#f7f3f1] pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
        <div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Shop All</span>
          </Link>
          <img src={product.image} alt={product.name} className="w-full rounded-xl object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-serif">{product.name}</h1>
          <p className="mt-2 text-gray-600">
            {product.priceMin && product.priceMax
              ? `$${product.priceMin.toFixed(2)} – $${product.priceMax.toFixed(2)}`
              : `$${startPrice.toFixed(2)}`}
          </p>

          {/* Quantity */}
          <div className="mt-6">
            <span className="text-sm font-semibold">Quantity</span>
            <div className="mt-2 inline-flex items-center border rounded-lg">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <div className="px-4 py-2">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Options */}
          {product.options && product.options.length > 0 && (
            <div className="mt-8 space-y-3">
              <div className="text-sm font-semibold">Upgrades / Options</div>
              {product.options.map((opt, i) => {
                const checked = selected.includes(i);
                return (
                  <label
                    key={i}
                    className="flex items-center justify-between bg-white rounded-lg border p-4 cursor-pointer hover:border-black"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))
                        }
                      />
                      <span className="text-gray-800">{opt.label}</span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {opt.priceDelta > 0 ? `+$${opt.priceDelta.toFixed(2)}` : 'Included'}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {/* Add button */}
          <button className="mt-8 w-full py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800">
            Add – ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
