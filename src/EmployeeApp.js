// src/EmployeeApp.js
import React, { useState } from 'react';
import {
  Calendar,
  Package,
  Menu,
  X,
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  DollarSign,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// ----------------- Seed data -----------------


/*export const initialReservations = [
  {
    id: 'RES001',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '(765) 123-4567',
    service: 'Live Spun Cotton Candy Cart',
    option: '2 Hours',
    date: '2025-11-15',
    time: '2:00 PM',
    location: 'Lafayette Community Center, 123 Main St, Lafayette, IN',
    price: 275,
    status: 'approved',
    notes: 'Birthday party for 8-year-old. Pink and blue theme requested.',
    createdAt: '2025-10-28'
  },
  {
    id: 'RES002',
    customerName: 'Michael Chen',
    customerEmail: 'mchen@email.com',
    customerPhone: '(765) 234-5678',
    service: 'White Bounce House Rental',
    option: 'Mama Size',
    date: '2025-11-20',
    time: '11:00 AM',
    location: '456 Oak Street, West Lafayette, IN',
    price: 200,
    status: 'approved',
    notes: 'Waiver signed. Setup in backyard.',
    createdAt: '2025-10-25'
  },
  {
    id: 'RES003',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.r@email.com',
    customerPhone: '(765) 345-6789',
    service: 'Shimmer Wall Rental',
    option: 'Standard',
    date: '2025-11-08',
    time: '6:00 PM',
    location: 'The Grand Hall, 789 Event Way, Indianapolis, IN',
    price: 130,
    status: 'approved',
    notes: 'Wedding reception. Gold shimmer requested.',
    createdAt: '2025-10-30'
  },
  {
    id: 'RES004',
    customerName: 'Jennifer Adams',
    customerEmail: 'jadams@email.com',
    customerPhone: '(765) 555-1234',
    service: 'Cotton Candy Cart',
    option: '3 Hours',
    date: '2025-11-18',
    time: '3:00 PM',
    location: '789 Maple Drive, Lafayette, IN',
    price: 375,
    status: 'pending_approval',
    notes: 'Corporate event. Need variety of flavors.',
    createdAt: '2025-10-31'
  },
  {
    id: 'RES005',
    customerName: 'Robert Martinez',
    customerEmail: 'rmartinez@email.com',
    customerPhone: '(765) 555-5678',
    service: 'Flower Wall Rental',
    option: 'Standard',
    date: '2025-11-22',
    time: '1:00 PM',
    location: 'Sunset Gardens, 456 Rose Ave, Indianapolis, IN',
    price: 130,
    status: 'pending_approval',
    notes: 'Baby shower. Pink and white flowers preferred.',
    createdAt: '2025-10-31'
  },
  {
    id: 'RES006',
    customerName: 'Lisa Thompson',
    customerEmail: 'lthompson@email.com',
    customerPhone: '(765) 555-9012',
    service: 'Mini Pancakes Service',
    option: 'Standard Service',
    date: '2025-11-25',
    time: '10:00 AM',
    location: 'Community Hall, 321 Oak St, West Lafayette, IN',
    price: 300,
    status: 'pending_approval',
    notes: 'Thanksgiving brunch event. Approximately 40 guests.',
    createdAt: '2025-10-31'
  }
];

export const initialOrders = [
  {
    id: 'ORD001',
    customerName: 'Jessica Martinez',
    customerEmail: 'jess.m@email.com',
    items: [
      { name: 'Little Licks Ice Cream - Vanilla', quantity: 10, price: 5 },
      { name: 'Little Licks Ice Cream - Chocolate', quantity: 10, price: 5 }
    ],
    total: 100,
    orderDate: '2025-10-29',
    pickupDate: '2025-11-05',
    status: 'pending',
    notes: 'Please include spoons and napkins'
  },
  {
    id: 'ORD002',
    customerName: 'Robert Taylor',
    customerEmail: 'rtaylor@email.com',
    items: [{ name: 'Gourmet Pancake Mix', quantity: 5, price: 15 }],
    total: 75,
    orderDate: '2025-10-27',
    pickupDate: '2025-11-02',
    status: 'ready',
    notes: ''
  }
];
*/
// ----------------- Navigation -----------------
function Navigation({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => onNavigate('dashboard')} className="flex items-center">
            <div className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-serif">LD</div>
                <div className="text-xs tracking-wider">EMPLOYEE</div>
              </div>
            </div>
          </button>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('new-requests')}
              className="text-sm tracking-wide hover:text-gray-600 transition flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              NEW REQUESTS
            </button>
            <button
              onClick={() => onNavigate('reservations')}
              className="text-sm tracking-wide hover:text-gray-600 transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              RESERVATIONS
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className="text-sm tracking-wide hover:text-gray-600 transition flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              ORDERS
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:text-gray-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('new-requests');
                setMobileMenuOpen(false);
              }}
              className="block text-sm tracking-wide w-full text-left"
            >
              NEW REQUESTS
            </button>
            <button
              onClick={() => {
                onNavigate('reservations');
                setMobileMenuOpen(false);
              }}
              className="block text-sm tracking-wide w-full text-left"
            >
              RESERVATIONS
            </button>
            <button
              onClick={() => {
                onNavigate('orders');
                setMobileMenuOpen(false);
              }}
              className="block text-sm tracking-wide w-full text-left"
            >
              ORDERS
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ----------------- Dashboard -----------------
function DashboardPage({ onNavigate, reservations, orders }) {
  const today = new Date().toISOString().split('T')[0];
  const upcomingReservations = reservations.filter(
    (r) => r.date >= today && r.status === 'approved'
  );
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const pendingRequests = reservations.filter((r) => r.status === 'pending_approval');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif mb-8">Employee Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* New Requests */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">New Requests</h2>
              <button
                onClick={() => onNavigate('new-requests')}
                className="text-sm text-gray-600 hover:text-black"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {pendingRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  onClick={() => onNavigate('request-detail', req.id)}
                  className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg hover:border-yellow-400 cursor-pointer transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{req.customerName}</h3>
                    <span className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full font-semibold">
                      NEW
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{req.service}</p>
                  <p className="text-sm text-gray-500">
                    {req.date} at {req.time}
                  </p>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <p className="text-gray-500 text-center py-4">No pending requests</p>
              )}
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Pending Orders</h2>
              <button
                onClick={() => onNavigate('orders')}
                className="text-sm text-gray-600 hover:text-black"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => onNavigate('order-detail', order.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-black cursor-pointer transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{order.customerName}</h3>
                    <span className="text-sm font-semibold">${order.total}</span>
                  </div>
                  <p className="text-sm text-gray-600">Order Date: {order.orderDate}</p>
                  <p className="text-sm text-gray-600">Pickup: {order.pickupDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Upcoming Reservations</h2>
              <button
                onClick={() => onNavigate('reservations')}
                className="text-sm text-gray-600 hover:text-black"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {upcomingReservations.slice(0, 3).map((res) => (
                <div
                  key={res.id}
                  onClick={() => onNavigate('reservation-detail', res.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-black cursor-pointer transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{res.customerName}</h3>
                    <span className="text-sm text-gray-600">{res.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{res.service}</p>
                  <p className="text-sm text-gray-500">{res.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- Reservations list / calendar -----------------
function ReservationsPage({ onNavigate, reservations }) {
  const [view, setView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);

  const approvedReservations = reservations.filter((r) => r.status === 'approved');

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const getReservationsForDate = (date) =>
    approvedReservations.filter((r) => r.date === date);

  const formatDateForCalendar = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif">Approved Reservations</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setView('calendar')}
              className={`px-6 py-2 rounded-lg transition ${
                view === 'calendar'
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-6 py-2 rounded-lg transition ${
                view === 'list'
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {view === 'calendar' ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(firstDayOfMonth)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const dateStr = formatDateForCalendar(day);
                const dayReservations = getReservationsForDate(dateStr);
                const isToday = dateStr === today.toISOString().split('T')[0];

                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-2 cursor-pointer transition ${
                      isToday ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'
                    } ${dayReservations.length > 0 ? 'bg-pink-50' : ''}`}
                    onClick={() =>
                      setSelectedDate(dayReservations.length > 0 ? dateStr : null)
                    }
                  >
                    <div className="font-semibold text-sm mb-1">{day}</div>
                    {dayReservations.length > 0 && (
                      <div className="text-xs text-gray-600">
                        {dayReservations.length} booking
                        {dayReservations.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">
                  Reservations for {selectedDate}
                </h3>
                <div className="space-y-4">
                  {getReservationsForDate(selectedDate).map((res) => (
                    <div
                      key={res.id}
                      onClick={() => onNavigate('reservation-detail', res.id)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-black cursor-pointer transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {res.customerName}
                          </h4>
                          <p className="text-gray-600">{res.service}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          APPROVED
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {res.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {res.location.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {approvedReservations.map((res) => (
              <div
                key={res.id}
                onClick={() => onNavigate('reservation-detail', res.id)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {res.customerName}
                    </h3>
                    <p className="text-gray-600">
                      {res.service} - {res.option}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    APPROVED
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {res.date} at {res.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {res.location.split(',')[0]}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    ${res.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- New Requests -----------------
function NewRequestsPage({ onNavigate, reservations }) {
  const pendingRequests = reservations.filter(
    (r) => r.status === 'pending_approval'
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif mb-2">New Reservation Requests</h1>
            <p className="text-gray-600">
              Review and approve new booking requests from customers
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-yellow-600">
              {pendingRequests.length}
            </p>
            <p className="text-sm text-gray-600">Pending Approval</p>
          </div>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-semibold mb-2">All caught up!</h2>
            <p className="text-gray-600">
              No pending reservation requests at this time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => onNavigate('request-detail', request.id)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition border-l-4 border-yellow-400"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {request.customerName}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        AWAITING APPROVAL
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {request.service} - {request.option}
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested on {request.createdAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold mb-1">${request.price}</p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {request.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {request.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {request.location.split(',')[0]}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {request.customerPhone}
                  </div>
                </div>

                {request.notes && (
                  <div className="border-t pt-4">
                    <p className="font-semibold text-sm mb-1">Customer Notes:</p>
                    <p className="text-sm text-gray-700">{request.notes}</p>
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('request-detail', request.id);
                    }}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                  >
                    Review & Approve
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `mailto:${request.customerEmail}`;
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition text-sm"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- Request Detail -----------------
function RequestDetailPage({
  requestId,
  onNavigate,
  reservations,
  orders,
  onApproveRequest
}) {
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(false);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'customer',
      text: 'Hi! I submitted a reservation request. Looking forward to hearing from you!',
      time: '10:30 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const request = reservations.find((r) => r.id === requestId);

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Request not found</h1>
          <button
            onClick={() => onNavigate('new-requests')}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    onApproveRequest(request.id);
    alert(
      `Reservation ${request.id} has been approved and moved to Pending Orders! Customer will be notified.`
    );
    onNavigate('orders');
  };

  const handleDecline = () => {
    alert(
      `Reservation ${request.id} has been declined. Customer will be notified that their request could not be accommodated.`
    );
    onNavigate('new-requests');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: 'employee',
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('new-requests')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to New Requests</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-yellow-400">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">New Reservation Request</h1>
                  <p className="text-lg text-gray-600 mb-3">Request #{request.id}</p>
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    AWAITING APPROVAL
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Requested on</p>
                  <p className="font-semibold">{request.createdAt}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <p className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  This reservation requires your approval before it moves to Pending Orders
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Information
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Name</p>
                        <p className="font-semibold">{request.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-semibold">{request.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <p className="font-semibold">{request.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Event Details
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Date</p>
                        <p className="font-semibold">{request.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Time</p>
                        <p className="font-semibold">{request.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="font-semibold flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span>{request.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Service Information</h2>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Service</p>
                        <p className="font-semibold">{request.service}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Option Selected</p>
                        <p className="font-semibold">{request.option}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Price</p>
                        <p className="flex items-center gap-2 text-2xl font-bold text-green-600">
                          <DollarSign className="w-6 h-6" />
                          ${request.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {request.notes && (
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Customer Notes</h2>
                      <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm italic">&quot;{request.notes}&quot;</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6 flex gap-4">
                <button
                  onClick={() => setShowApprovalConfirm(true)}
                  className="flex-1 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve & Move to Orders
                </button>
                <button
                  onClick={() => setShowDeclineConfirm(true)}
                  className="px-8 py-4 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition text-lg"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>

          {/* Chat side panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Chat with Customer</h3>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  {showChat ? 'Minimize' : 'Expand'}
                </button>
              </div>

              {showChat ? (
                <div>
                  <div className="border rounded-lg mb-4 h-96 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`mb-4 ${
                          msg.sender === 'employee' ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div
                          className={`inline-block max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === 'employee'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === 'employee'
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Open Chat
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Approve / decline dialogs */}
        {showApprovalConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Approve Reservation?</h3>
              <p className="text-gray-600 mb-6">
                This will approve the reservation and move it to Pending Orders. The
                customer will be notified via SMS/email.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleApprove}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Yes, Approve
                </button>
                <button
                  onClick={() => setShowApprovalConfirm(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeclineConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Decline Reservation?</h3>
              <p className="text-gray-600 mb-6">
                This will decline the reservation request. The customer will be notified
                that their request could not be accommodated.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Yes, Decline
                </button>
                <button
                  onClick={() => setShowDeclineConfirm(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- Reservation Detail -----------------
function ReservationDetailPage({ reservationId, onNavigate, reservations }) {
  const reservation = reservations.find((r) => r.id === reservationId);

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Reservation not found</h1>
          <button
            onClick={() => onNavigate('reservations')}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Back to Reservations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('reservations')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to Reservations</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Reservation #{reservation.id}
              </h1>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  reservation.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {reservation.status === 'approved' ? 'APPROVED' : 'PENDING APPROVAL'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Created on</p>
              <p className="font-semibold">{reservation.createdAt}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Name:</span>{' '}
                    {reservation.customerName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${reservation.customerEmail}`}
                      className="hover:text-black"
                    >
                      {reservation.customerEmail}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${reservation.customerPhone}`}
                      className="hover:text-black"
                    >
                      {reservation.customerPhone}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Event Details
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Date:</span> {reservation.date}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span> {reservation.time}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{reservation.location}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Service Information</h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Service:</span>{' '}
                    {reservation.service}
                  </p>
                  <p>
                    <span className="font-semibold">Option:</span>{' '}
                    {reservation.option}
                  </p>
                  <p className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xl font-bold">${reservation.price}</span>
                  </p>
                </div>
              </div>

              {reservation.notes && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Special Notes</h2>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {reservation.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6 flex gap-4">
            <button className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
              Mark as Completed
            </button>
            <button className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
              Contact Customer
            </button>
            <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- Orders list -----------------
function OrdersPage({ onNavigate, orders }) {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif">Orders</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === 'pending'
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('ready')}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === 'ready'
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300'
              }`}
            >
              Ready
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => onNavigate('order-detail', order.id)}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold mb-1">${order.total}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'ready'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Order Date</p>
                  <p>{order.orderDate}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Pickup Date</p>
                  <p>{order.pickupDate}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'ready'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status === 'pending'
                      ? 'EDITING'
                      : order.status === 'confirmed'
                      ? 'PREPARING'
                      : 'READY'}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-sm mb-2">Order Items:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity}x {item.name} - ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------- Order Detail -----------------
function OrderDetailPage({
  orderId,
  onNavigate,
  orders,
  onUpdateOrderStatus,
  onConfirmOrder
}) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'customer',
      text: 'Hi! Just checking on my order status.',
      time: '10:30 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <button
            onClick={() => onNavigate('orders')}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const handleConfirmOrder = () => {
    onConfirmOrder(orderId);
    alert('Order confirmed! Moved to Upcoming Reservations and now in preparation phase.');
  };

  const handleMarkReady = () => {
    onUpdateOrderStatus(orderId, 'ready');
    alert('Order marked as ready for pickup!');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: 'employee',
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => onNavigate('orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to Orders</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Order #{order.id}
                  </h1>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === 'ready'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status === 'pending'
                      ? 'EDITING ORDER'
                      : order.status === 'confirmed'
                      ? 'IN PREPARATION'
                      : 'READY FOR PICKUP'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-3xl font-bold">${order.total}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Information
                    </h2>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <span className="font-semibold">Name:</span>{' '}
                        {order.customerName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {order.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Order Timeline
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold">Order Placed</p>
                          <p className="text-sm text-gray-600">
                            {order.orderDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        {order.status === 'pending' ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold">Editing Order</p>
                          <p className="text-sm text-gray-600">
                            {order.status === 'pending'
                              ? 'Awaiting confirmation'
                              : 'Order confirmed'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        {order.status === 'ready' || order.status === 'confirmed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold">In Preparation</p>
                          <p className="text-sm text-gray-600">
                            {order.status === 'ready'
                              ? 'Completed'
                              : order.status === 'confirmed'
                              ? 'In progress'
                              : 'Not started'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        {order.status === 'ready' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold">
                            {order.status === 'ready'
                              ? 'Ready for Pickup'
                              : 'Awaiting Completion'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Pickup scheduled: {order.pickupDate}
                            {order.eventTime && ` at ${order.eventTime}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order items */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order Items
                    </h2>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-start bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                      <div className="border-t pt-3 flex justify-between items-center">
                        <p className="text-lg font-semibold">Total</p>
                        <p className="text-2xl font-bold">${order.total}</p>
                      </div>
                    </div>
                  </div>

                  {order.eventLocation && (
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Event Location</h2>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{order.eventLocation}</span>
                      </p>
                    </div>
                  )}

                  {order.notes && (
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Special Notes</h2>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {order.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-6 flex gap-4">
                {order.status === 'pending' && (
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Confirm Order
                  </button>
                )}
                {order.status === 'confirmed' && (
                  <button
                    onClick={handleMarkReady}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Mark as Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
                    Mark as Picked Up
                  </button>
                )}
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Contact Customer
                </button>
                <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>

          {/* Chat side panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Chat with Customer</h3>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="text-sm text-gray-600 hover:text-black"
                >
                  {showChat ? 'Minimize' : 'Expand'}
                </button>
              </div>

              {showChat ? (
                <div>
                  <div className="border rounded-lg mb-4 h-96 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`mb-4 ${
                          msg.sender === 'employee' ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div
                          className={`inline-block max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === 'employee'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === 'employee'
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowChat(true)}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Open Chat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- MAIN EMPLOYEE APP WRAPPER -----------------






export default function EmployeeApp({
  reservations = [],
  setReservations = () => {},
  orders = [],
  setOrders = () => {}
}) {
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const [selectedId, setSelectedId] = React.useState(null);

  const handleNavigate = (page, id = null) => {
    setCurrentPage(page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const handleApproveRequest = (requestId) => {
    const request = reservations.find(r => r.id === requestId);
    if (!request) return;

    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      customerName: request.customerName,
      customerEmail: request.customerEmail,
      items: [
        { name: `${request.service} - ${request.option}`, quantity: 1, price: request.price }
      ],
      total: request.price,
      orderDate: new Date().toISOString().split('T')[0],
      pickupDate: request.date,
      status: 'pending',
      notes: request.notes,
      eventTime: request.time,
      eventLocation: request.location,
      originalRequestId: request.id,
      service: request.service,
      option: request.option
    };

    setOrders([...orders, newOrder]);
    setReservations(reservations.filter(r => r.id !== requestId));
  };

  const handleConfirmOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const newReservation = {
      id: order.originalRequestId || `RES${String(reservations.length + 1).padStart(3, '0')}`,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone || '(765) 476-1558',
      service: order.service || order.items[0].name.split(' - ')[0],
      option: order.option || order.items[0].name.split(' - ')[1] || 'Standard',
      date: order.pickupDate,
      time: order.eventTime,
      location: order.eventLocation,
      price: order.total,
      status: 'approved',
      notes: order.notes,
      createdAt: order.orderDate
    };

    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'confirmed' } : o));
    setReservations([...reservations, newReservation]);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div>
      <Navigation onNavigate={handleNavigate} />
      {currentPage === 'dashboard' && (
        <DashboardPage
          onNavigate={handleNavigate}
          reservations={reservations}
          orders={orders}
        />
      )}
      {currentPage === 'new-requests' && (
        <NewRequestsPage
          onNavigate={handleNavigate}
          reservations={reservations}
        />
      )}
      {currentPage === 'request-detail' && (
        <RequestDetailPage
          requestId={selectedId}
          onNavigate={handleNavigate}
          reservations={reservations}
          orders={orders}
          onApproveRequest={handleApproveRequest}
        />
      )}
      {currentPage === 'reservations' && (
        <ReservationsPage
          onNavigate={handleNavigate}
          reservations={reservations}
        />
      )}
      {currentPage === 'reservation-detail' && (
        <ReservationDetailPage
          reservationId={selectedId}
          onNavigate={handleNavigate}
          reservations={reservations}
        />
      )}
      {currentPage === 'orders' && (
        <OrdersPage
          onNavigate={handleNavigate}
          orders={orders}
        />
      )}
      {currentPage === 'order-detail' && (
        <OrderDetailPage
          orderId={selectedId}
          onNavigate={handleNavigate}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onConfirmOrder={handleConfirmOrder}
        />
      )}
    </div>
  );
}
