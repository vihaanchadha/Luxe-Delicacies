// src/App.js
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation
} from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Instagram,
  Facebook,
  Mail,
  ArrowLeft,
  Phone,
  Clock
} from 'lucide-react';
import ShopPage from './shopPage'; // shopPage.jsx

// ----------------- Shared services data -----------------
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

// ----------------- Floating customer chat widget -----------------
function CustomerChatWidget({ isLoggedIn, messages = [], onSend }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [hasNewMessage, setHasNewMessage] = React.useState(false);

  React.useEffect(() => {
  if (messages.length === 0) return;

  const last = messages[messages.length - 1];

  // Employee messages should trigger notification
  const isEmployeeMessage =
    last.sender &&
    ["employee", "staff", "admin"].includes(last.sender.toLowerCase());

  if (!isOpen && isEmployeeMessage) {
    setHasNewMessage(true);
  }
}, [messages, isOpen]);


  const openChat = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    if (onSend) onSend(text.trim());
    setText('');
  };

  if (!isLoggedIn) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 bg-white shadow-xl rounded-lg border border-gray-200 flex flex-col">
          {/* header */}
          <div className="px-4 py-2 border-b flex justify-between items-center">
            <span className="text-sm font-semibold">Chat with Luxe Staff</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* messages */}
          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center mt-4 text-xs">
                Start a conversation with the staff.
              </p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-lg text-xs ${
                  msg.sender === 'customer'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div>{msg.text}</div>
                  <div className="mt-1 text-[10px] opacity-70">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* input */}
          <div className="border-t px-3 py-2 flex gap-2">
            <input
              className="flex-1 text-xs px-2 py-2 border rounded-lg"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="px-3 py-2 bg-black text-white rounded-lg text-xs">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button onClick={openChat} className="relative px-4 py-3 bg-black text-white rounded-full shadow-lg text-xs">
          Chat with staff

          {hasNewMessage && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </button>
      )}
    </div>
  );
}



// ----------------- Info drawer -----------------
function InfoDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignInClick = () => {
    onClose();
    navigate('/login');
  };

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
                <a href="tel:7654761558" className="text-gray-600 hover:text-black">
                  (765) 476-1558
                </a>
              </div>
              <a
                href="tel:7654761558"
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Phone className="w-6 h-6" />
              </a>
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
                <a
                  href="https://www.instagram.com/LuxeDelicacies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/LuxeDelicacies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="pb-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Text us</h2>
                <p className="text-gray-600">We'll reply as soon as we can</p>
              </div>
              <a
                href="sms:7654761558"
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <button
            onClick={handleSignInClick}
            className="w-full mt-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}




// ----------------- Navigation (shows cart count) -----------------
function Navigation({ cartCount = 0, isLoggedIn = false}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isEmployeeView = location.pathname.startsWith('/employee');

  return (
    <>
      <nav className="fixed top-10 w-full bg-white shadow-sm z-40">
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
              <Link
                to="/shop"
                className="text-sm tracking-wide hover:text-gray-600 transition"
              >
                PREPACKAGED TREATS/PICKUP & ...
              </Link>
              <Link
                to="/services"
                className="text-sm tracking-wide hover:text-gray-600 transition"
              >
                TREAT SERVICES AND PARTY ...
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* 🔑 Only show "Info & Sign in" button when NOT logged in */}
              {!isLoggedIn && (
                <button
                  onClick={() => setInfoDrawerOpen(true)}
                  className="hidden md:inline-block text-xs tracking-wide px-4 py-2 border border-black hover:bg-black hover:text-white transition"
                >
                  Info &amp; Sign in
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:text-gray-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>


          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/shop"
                className="block text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                PREPACKAGED TREATS/PICKUP
              </Link>
              <Link
                to="/services"
                className="block text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                TREAT SERVICES AND PARTY
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/services');
                }}
                className="w-full px-6 py-2 border border-black text-sm tracking-wide"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <InfoDrawer
        isOpen={infoDrawerOpen}
        onClose={() => setInfoDrawerOpen(false)}
      />
    </>
  );
}

// ----------------- Login, Home, Services, ServiceDetail -----------------
function LoginPage({ onLogin, currentUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Build a simple user object
    const user = {
      name: isSignUp
        ? name || email.split('@')[0] || 'Customer'
        : email.split('@')[0] || 'Customer',
      email
    };

    // ✅ Tell RootApp that the customer is now logged in
    if (onLogin) {
      onLogin(user);
    }

    alert(isSignUp ? 'Account created!' : 'Logged in!');

    // ✅ Go back to homepage where Navigation + chat live
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center mx-auto mb-4">
            <div className="text-center">
              <div className="text-3xl font-serif">LD</div>
              <div className="text-xs tracking-wider">LUXE</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-gray-600">Welcome to Luxe Delicacies</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-black font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-black font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}



function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url("https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600")',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-5xl md:text-7xl font-serif mb-6">
                Modern Cart Catering
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Elevate your next event with our line of mobile carts ready to
                deliver a customized luxurious experience
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
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                Our Services
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We offer a wide range of treats and drinks for your event
                needs. Our professional attendants will get to know you and your
                style, and make sure your guests leave talking about how unique
                and amazing your party was! We offer:
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
            <div
              className="h-96 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800")'
              }}
            ></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-blue-50 to-pink-50 opacity-60"></div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div
            className="h-64 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1587334207988-c6295e6d3a96?w=800")'
            }}
          ></div>
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Creating unique experiences since 2023
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We've been joyfully serving the community with our mobile carts
              and party rentals. All praise be to God.
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
            "The attention to detail is exactly what we needed to represent our
            business"
          </p>
          <p className="text-gray-600">La Picciolita Mexicanas, Indiana</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
            Featured Items
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Shop our curated selection of treats and beverages
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600")'
                }}
              ></div>
              <div className="p-4">
                <h3 className="font-serif text-lg">Little Licks Ice Cream</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600")'
                }}
              ></div>
              <div className="p-4">
                <h3 className="font-serif text-lg">Gourmet Pancakes</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600")'
                }}
              ></div>
              <div className="p-4">
                <h3 className="font-serif text-lg">Specialty Beverages</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">
          Let's give your guests something to talk about!
        </h2>
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
            <button className="px-4 py-2 border-b-2 border-black font-semibold">
              Services
            </button>
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
                <h3 className="text-2xl font-semibold mb-2">
                  {service.name}
                </h3>
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

function ServiceDetailPage({ onAddToCart }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return <div className="pt-20 text-center">Service not found</div>;
  }

  const handleAddClick = () => {
    if (selectedOptionIndex === null) {
      alert('Please select an option first.');
      return;
    }

    const option = service.options[selectedOptionIndex];

    const itemForCart = {
      productId: service.id,
      name: service.name,
      image: service.image,
      quantity: 1,
      variantName: option.name,
      
      pricePerUnit:
        typeof option.price === 'number' ? option.price : 0,
      notes:
        'Event service booking — staff will contact you via chat to confirm exact details and final price.',
      kind: 'service'
    };

    if (onAddToCart) {
      onAddToCart(itemForCart);
    }

    navigate('/cart');
  };

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
              onClick={() => setSelectedOptionIndex(index)}
              className="bg-white rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-2 hover:border-black transition"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{option.details}</p>
                <div className="flex gap-2 text-gray-700">
                  <span>
                    {typeof option.price === 'number'
                      ? `$${option.price.toFixed(2)}`
                      : 'Price varies'}
                  </span>
                  <span>•</span>
                  <span>{option.duration}</span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedOptionIndex === index
                    ? 'border-black bg-black'
                    : 'border-gray-300'
                }`}
              ></div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddClick}
          className="w-full py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Add to cart
        </button>
      </div>
      <Footer />
    </div>
  );
}




// ----------------- Cart page -----------------
function CartPage({ cart, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.pricePerUnit ? item.pricePerUnit * item.quantity : 0),
    0
  );

  const hasServiceItems = cart.some(
    (item) => !item.pricePerUnit || item.pricePerUnit === 0
  );

  const handleCheckoutClick = async () => {
    if (!onCheckout) return;
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    await onCheckout(cart);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Continue shopping</span>
        </button>

        <h1 className="text-3xl font-serif mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-600 mb-4">
              Your cart is currently empty.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Browse prepackaged treats
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
            {/* Cart items */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.name}
                          </h3>
                          {item.variantName && (
                            <p className="text-sm text-gray-600">
                              Option: {item.variantName}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.notes}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-gray-500 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border rounded-lg">
                          <button
                            type="button"
                            className="px-3 py-2 disabled:opacity-40"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              onUpdateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            −
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            type="button"
                            className="px-3 py-2"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500">
                            {item.pricePerUnit && item.pricePerUnit > 0
                              ? `$${item.pricePerUnit.toFixed(2)} each`
                              : 'Price will be finalized with staff'}
                          </div>
                          <div className="text-base font-semibold">
                            {item.pricePerUnit && item.pricePerUnit > 0 ? (
                              `$${(item.pricePerUnit * item.quantity).toFixed(2)}`
                            ) : (
                              'TBD'
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center text-sm">
                <button
                  onClick={onClearCart}
                  className="text-gray-500 hover:text-black"
                >
                  Clear cart
                </button>
                <span className="text-gray-500">
                  {cart.length} item{cart.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Estimated tax & fees</span>
                <span>Calculated later</span>
              </div>
              <div className="flex justify-between text-base font-semibold mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {hasServiceItems && (
                <p className="mb-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Some items are event services with custom pricing. Staff will
                  contact you in the chat box to confirm the details and final
                  price after you place your order.
                </p>
              )}

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Checkout
              </button>
              <p className="text-xs text-gray-500 mt-3">
                This is a demo cart for the Scope Consulting project. No real
                payment is processed.
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ----------------- Employee page (legacy, not used in RootApp) -----------------
function EmployeePage() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('http://localhost:3001/api/orders');
      if (!res.ok) {
        throw new Error('Failed to load orders');
      }
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrders();
    const id = setInterval(fetchOrders, 10000);
    return () => clearInterval(id);
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/orders/${orderId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        }
      );
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );
    } catch (err) {
      alert(err.message || 'Could not update order status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif">Employee Orders View</h1>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 border border-black rounded-lg text-sm hover:bg-black hover:text-white"
          >
            Refresh
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          This page is for Luxe Delicacies staff to see incoming online orders.
          It pulls data from <code>http://localhost:3001/api/orders</code>.
        </p>

        {loading && <p className="text-gray-600 mb-4">Loading orders…</p>}
        {error && (
          <p className="text-red-500 mb-4 text-sm">
            {error}
          </p>
        )}

        {orders.length === 0 && !loading ? (
          <div className="bg-white rounded-xl p-8 shadow-sm text-center">
            <p className="text-gray-600">
              No orders yet. When a customer checks out from the shop, their
              order will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </h2>
                    <p className="text-xs text-gray-500">
                      Placed:{' '}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    {order.customerNote && (
                      <p className="text-xs text-gray-600 mt-1">
                        Note: {order.customerNote}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-gray-100">
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="NEW">NEW</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm border-b pb-2 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.variantName && (
                          <p className="text-xs text-gray-600">
                            Option: {item.variantName}
                          </p>
                        )}
                        {item.notes && (
                          <p className="text-xs text-gray-500">
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm">
                        <div>
                          Qty: <span>{item.quantity}</span>
                        </div>
                        <div>
                          ${item.pricePerUnit.toFixed(2)} each
                        </div>
                        <div className="font-semibold">
                          $
                          {(
                            item.pricePerUnit * item.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-right text-sm text-gray-600">
                  Total:{' '}
                  <span className="font-semibold">
                    $
                    {order.items
                      .reduce(
                        (sum, i) =>
                          sum + i.pricePerUnit * i.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ----------------- Footer -----------------

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
            <p className="text-gray-400 text-sm">
              Willing to travel out of state
            </p>
          </div>
          <div>
            <h3 className="text-lg mb-4">Delivery and Pick up Hours</h3>
            <p className="text-gray-400 mb-2">Monday–Friday: 6am - 10pm </p>
            <p className="text-gray-400">Saturday & Sunday: 6am - 6pm </p>
          </div>
          <div>
            <h3 className="text-lg mb-4">Follow</h3>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/LuxeDelicacies"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/LuxeDelicacies"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white"
              >
                Facebook
              </a>
              <p className="text-gray-400 hover:text-white cursor-pointer">
                TikTok
              </p>
            </div>
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
            <a
              href="https://www.facebook.com/LuxeDelicacies"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/LuxeDelicacies"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </a>
            <span className="text-gray-400">© 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}















// ----------------- App (cart state + checkout + login + chat) -----------------

// ----------------- App (cart state + checkout to server) -----------------
export default function App({
  cart,
  setCart,
  onOrderPlaced,
  customerUser,
  onCustomerLogin,
  chatMessages = [],
  onSendChatMessage
}) {
  const handleAddToCart = (item) => {
    const id = `${item.productId}-${item.variantId || 'base'}-${Date.now()}-${
      Math.random().toString(36).slice(2)
    }`;

    setCart((prev) => [
      ...prev,
      {
        id,
        ...item
      }
    ]);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    setCart((prev) =>
      prev.map((it) =>
        it.id === itemId ? { ...it, quantity: newQty } : it
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => prev.filter((it) => it.id !== itemId));
  };

  const handleClearCart = () => setCart([]);

  const handleCheckout = async (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (onOrderPlaced) {
      onOrderPlaced(cartItems);
    }

    setCart([]);
    alert('Order placed! It now appears on the employee dashboard.');
  };

  const handleLogin = (user) => {
    if (onCustomerLogin) {
      onCustomerLogin(user);
    }
  };

  const isLoggedIn = !!customerUser;

  return (
    <Router>
      {/* 🔑 pass isLoggedIn into Navigation so it can hide "Info & Sign in" */}
      <Navigation cartCount={cart.length} isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/shop"
          element={<ShopPage onAddToCart={handleAddToCart} />}
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route
          path="/service/:serviceId"
          element={<ServiceDetailPage onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
              currentUser={customerUser}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
            />
          }
        />
      </Routes>

      {/* 💬 floating chat widget (only if logged in) */}
      <CustomerChatWidget
        isLoggedIn={isLoggedIn}
        messages={chatMessages}
        onSend={onSendChatMessage}
      />
    </Router>
  );
}




