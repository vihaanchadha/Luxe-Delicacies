import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Instagram, Facebook, Mail, ArrowLeft, Phone, Clock } from 'lucide-react';

const services = [
  {
    id: 'white-bounce-house',
    name: 'White Bounce House Rental',
    description: 'Waivers must be signed',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    options: [
      { name: 'Regular', price: 0, duration: '30 min', details: '' },
      { name: 'Mama Size', price: 'varies', duration: '4 hr', details: 'jumbo size, dimensions are 15x15' },
      { name: 'Mini Size with ball pit', price: 'varies', duration: '4 hr', details: '200 mini balls included -balls MUST be picked up or fee will apply' },
      { name: 'Micro Size', price: 'varies', duration: '4 hr', details: 'Perfect for babies and toddlers' }
    ]
  },
  {
    id: 'shimmer-wall',
    name: 'Shimmer Wall Rental',
    description: 'Includes complimentary set up and tear down',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c763?w=400',
    price: 130,
    duration: '4 hrs',
    options: [
      { name: 'Standard', price: 130, duration: '4 hrs', details: 'Includes complimentary set up and tear down' }
    ]
  },
  {
    id: 'popcorn-cart',
    name: 'Popcorn Self Serve Cart',
    description: 'Includes: custom menu...',
    image: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?w=400',
    price: 0,
    options: [
      { name: 'Self Serve', price: 0, duration: 'Event duration', details: 'Includes custom menu and unlimited servings' }
    ]
  },
  {
    id: 'cotton-candy',
    name: 'Live Spun Cotton Candy Cart',
    description: 'unlimited servings (average 45 cones per hour) 1-2 attendants...',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    price: 150,
    duration: '1 hr+',
    options: [
      { name: '1 Hour', price: 150, duration: '1 hr', details: 'Unlimited servings, 1-2 attendants' },
      { name: '2 Hours', price: 275, duration: '2 hrs', details: 'Unlimited servings, 1-2 attendants' },
      { name: '3 Hours', price: 375, duration: '3 hrs', details: 'Unlimited servings, 1-2 attendants' }
    ]
  },
  {
    id: 'flower-wall',
    name: 'Flower Wall Rental',
    description: 'Includes complimentary set up and tear down',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    options: [
      { name: 'Standard', price: 130, duration: '4 hrs', details: 'Includes complimentary set up and tear down' }
    ]
  },
  {
    id: 'mini-pancakes',
    name: '5 ct Mini Pancakes Service',
    description: '1-2 attendants custom menu...',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400',
    options: [
      { name: 'Standard Service', price: 'varies', duration: 'Event duration', details: '1-2 attendants, custom menu available' }
    ]
  }
];

function InfoDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="p-6">
          <button 
            onClick={onClose}
            className="mb-8 p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <X className="w-6 h-6" />
          </button>

          <h1 className="text-3xl font-bold mb-8">Luxe Delicacies</h1>

          <div className="space-y-6">
            <div className="pb-6 border-b">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="text-gray-600">We'll come to you!</p>
            </div>

            <div className="pb-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Phone</h2>
                <p className="text-gray-600">(765) 476-1558</p>
              </div>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Phone className="w-6 h-6" />
              </button>
            </div>

            <div className="pb-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Hours</h2>
                <p className="text-gray-600">Open until 10:00 PM</p>
              </div>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Clock className="w-6 h-6" />
              </button>
            </div>

            <div className="pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Follow</h2>
              <div className="flex gap-4">
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Instagram className="w-6 h-6" />
                </button>
                <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                  <Facebook className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="pb-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Text us</h2>
                <p className="text-gray-600">We'll reply as soon as we can</p>
              </div>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Mail className="w-6 h-6" />
              </button>
            </div>
          </div>

          <button className="w-full mt-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed w-full bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <div className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-serif">LD</div>
                  <div className="text-xs tracking-wider">LUXE</div>
                </div>
              </div>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-sm tracking-wide hover:text-gray-600 transition">PREPACKAGED TREATS/PICKUP & ...</a>
              <Link to="/services" className="text-sm tracking-wide hover:text-gray-600 transition">TREAT SERVICES AND PARTY ...</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/services')}
                className="hidden md:block px-6 py-2 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition"
              >
                Book Now
              </button>
              <button className="p-2 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:text-gray-600">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setInfoDrawerOpen(true)}
                className="p-2 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-sm tracking-wide">PREPACKAGED TREATS/PICKUP</a>
              <Link to="/services" className="block text-sm tracking-wide">TREAT SERVICES AND PARTY</Link>
              <button 
                onClick={() => navigate('/services')}
                className="w-full px-6 py-2 border border-black text-sm tracking-wide"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <InfoDrawer isOpen={infoDrawerOpen} onClose={() => setInfoDrawerOpen(false)} />
    </>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
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
              <button 
                onClick={() => navigate('/services')}
                className="px-8 py-3 bg-pink-100 text-black text-sm tracking-wide hover:bg-pink-200 transition"
              >
                Event Services/Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

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
              <button 
                onClick={() => navigate('/services')}
                className="px-8 py-3 bg-pink-100 text-black text-sm tracking-wide hover:bg-pink-200 transition"
              >
                Event Services/Book Now
              </button>
            </div>
            <div className="h-96 bg-cover bg-center rounded-lg" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800")'
            }}></div>
          </div>
        </div>
      </section>

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

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-serif italic mb-4">
            "The attention to detail is exactly what we needed to represent our business"
          </p>
          <p className="text-gray-600">La Picciolita Mexicanas, Indiana</p>
        </div>
      </section>

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

      <section className="py-20 px-4 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Let's give your guests something to talk about!</h2>
      </section>

      <Footer />
    </div>
  );
}

function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif">A new you awaits...</h1>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition">
              Book
            </button>
            <button className="px-6 py-3 border border-black hover:bg-gray-100 transition">
              My bookings
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 border-b">
            <button className="px-4 py-2 border-b-2 border-black font-semibold">Services</button>
            <button className="px-4 py-2 text-gray-600">Staff</button>
          </div>
        </div>

        <div className="grid gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => navigate(`/service/${service.id}`)}
              className="bg-white rounded-lg p-6 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex gap-4 text-sm text-gray-700">
                  <span>Book now</span>
                  {service.price && <span>• ${service.price}.00</span>}
                  {service.duration && <span>• {service.duration}</span>}
                </div>
              </div>
              <img 
                src={service.image} 
                alt={service.name}
                className="w-24 h-24 object-cover rounded-lg ml-6"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return <div className="pt-20 text-center">Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">All services</span>
        </button>

        <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
        <div className="flex gap-2 text-gray-600 mb-4">
          <span>Price varies</span>
          <span>•</span>
          <span>30 min+</span>
        </div>
        <p className="text-gray-700 mb-8">{service.description}</p>

        <h2 className="text-2xl font-bold mb-6">Options</h2>
        
        <div className="space-y-4 mb-8">
          {service.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => setSelectedOption(index)}
              className="bg-white rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-2 hover:border-black transition"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{option.details}</p>
                <div className="flex gap-2 text-gray-700">
                  <span>${typeof option.price === 'number' ? option.price + '.00' : option.price}</span>
                  <span>•</span>
                  <span>{option.duration}</span>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${selectedOption === index ? 'border-black bg-black' : 'border-gray-300'}`}></div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition">
          Add
        </button>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    alert('Thanks for subscribing!');
    setEmail('');
  };

  return (
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
              <p className="text-gray-400 hover:text-white cursor-pointer">Instagram</p>
              <p className="text-gray-400 hover:text-white cursor-pointer">TikTok</p>
              <p className="text-gray-400 hover:text-white cursor-pointer">Facebook</p>
            </div>
          </div>
        </div>

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
  );
}

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
      </Routes>
    </Router>
  );
}