import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Instagram, Facebook, Mail } from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-serif">LD</div>
                  <div className="text-xs tracking-wider">LUXE</div>
                </div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-sm tracking-wide hover:text-gray-600 transition">PREPACKAGED TREATS/PICKUP & ...</a>
              <a href="#services" className="text-sm tracking-wide hover:text-gray-600 transition">TREAT SERVICES AND PARTY ...</a>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block px-6 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition">
                Book Now
              </button>
              <button className="p-2 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-600">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-sm tracking-wide">PREPACKAGED TREATS/PICKUP</a>
              <a href="#services" className="block text-sm tracking-wide">TREAT SERVICES AND PARTY</a>
              <button className="w-full px-6 py-2 border border-black text-sm tracking-wide">
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 relative h-screen">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url("https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600")',
          backgroundBlendMode: 'overlay'
        }}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-5xl md:text-7xl font-serif mb-6">Modern Cart Catering</h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Elevate your next event with our line of mobile carts ready to deliver a customized luxurious experience
              </p>
              <button className="px-8 py-3 bg-pink-100 text-black text-sm tracking-wide hover:bg-pink-200 transition">
                Event Services/Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Services</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We offer a wide range of treats and drinks for your event needs. Our professional attendants will get to know you and your style, and make sure your guests leave talking about how unique and amazing your party was! We offer:
              </p>
              <ul className="space-y-2 text-gray-700 mb-8">
                <li>• Live Spun Cotton Candy</li>
                <li>• Mini Pancakes</li>
                <li>• Popcorn</li>
                <li>• Fruit Cups</li>
                <li>• Paletas (popsicles)</li>
                <li>• Lemon Shakeups</li>
                <li>• Caffeine Drinks</li>
                <li>• Foam Parties</li>
                <li>• White Bounce House Rentals</li>
                <li>• Flower/Shimmer Walls</li>
                <li>• Ice Cream</li>
              </ul>
              <button className="px-8 py-3 bg-pink-100 text-black text-sm tracking-wide hover:bg-pink-200 transition">
                Event Services/Book Now
              </button>
            </div>
            <div className="h-96 bg-cover bg-center rounded-lg" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800")'
            }}></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-blue-50 to-pink-50 opacity-60"></div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="h-64 bg-cover bg-center rounded-lg" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1587334207988-c6295e6d3a96?w=800")'
          }}></div>
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Creating unique experiences since 2023</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We've been joyfully serving the community with our mobile carts and party rentals. All praise be to God.
            </p>
            <button className="px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-gray-800 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-serif italic mb-4">
            "The attention to detail is exactly what we needed to represent our business"
          </p>
          <p className="text-gray-600">La Picciolita Mexicanas, Indiana</p>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">Featured Items</h2>
          <p className="text-center text-gray-600 mb-12">Shop our curated selection of treats and beverages</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-64 bg-cover bg-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600")'
              }}></div>
              <div className="p-4">
                <h3 className="font-serif text-lg">Little Licks Ice Cream</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-64 bg-cover bg-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600")'
              }}></div>
              <div className="p-4">
                <h3 className="font-serif text-lg">Gourmet Pancakes</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-64 bg-cover bg-center" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600")'
              }}></div>
              <div className="p-4">
                <h3 className="font-serif text-lg">Specialty Beverages</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Let's give your guests something to talk about!</h2>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-lg mb-4">Location</h3>
              <p className="text-gray-400 mb-2">Indiana</p>
              <p className="text-gray-400 mb-2">765.476.1558</p>
              <p className="text-gray-400 mb-4">info@luxedelicacies.com</p>
              <p className="text-gray-400 text-sm">Willing to travel out of state</p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Delivery and Pick up Hours</h3>
              <p className="text-gray-400 mb-2">Monday–Friday: 6-10pm</p>
              <p className="text-gray-400">Saturday & Sunday: 6-6pm</p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Follow</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="block text-gray-400 hover:text-white">TikTok</a>
                <a href="#" className="block text-gray-400 hover:text-white">Facebook</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-12">
            <div className="max-w-xl">
              <h3 className="text-2xl font-serif mb-6">Stay in the Loop</h3>
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 px-4 py-3 bg-transparent border border-gray-700 focus:border-white outline-none"
                />
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                This form is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <div className="text-center text-black text-xs">
                  <div className="font-serif">LD</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <span className="text-gray-400">© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}