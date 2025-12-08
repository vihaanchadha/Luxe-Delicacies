// src/RootApp.js
import React, { useState } from 'react';
import App from './App';
import EmployeeApp from './EmployeeApp';

export default function RootApp() {
  const [view, setView] = useState('customer'); // 'customer' | 'employee'
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);

  // 💡 new: logged-in customer info
  const [customerUser, setCustomerUser] = useState(null);

  // 💬 new: shared chat thread between customer + employee
  const [chatMessages, setChatMessages] = useState([]);

  // called by customer App when they checkout
  const handleOrderPlaced = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return;

    const nextId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
    const total = cartItems.reduce(
      (sum, item) => sum + item.pricePerUnit * item.quantity,
      0
    );

    const newOrder = {
      id: nextId,
      customerName: customerUser?.name || 'Online Customer',
      customerEmail: customerUser?.email || 'online@example.com',
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.pricePerUnit
      })),
      total,
      orderDate: new Date().toISOString().split('T')[0],
      pickupDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: ''
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  // ✅ called when the customer logs in on the customer side
  const handleCustomerLogin = (user) => {
    setCustomerUser(user);
  };

  // ✅ central chat handler, shared by both views
  const handleSendChatMessage = (sender, text) => {
    if (!text || !text.trim()) return;

    const msg = {
      id: Date.now() + Math.random(),
      sender, // 'customer' or 'employee'
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setChatMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top toggle bar */}
      <div className="w-full bg-black text-white flex justify-center gap-8 py-3 fixed top-0 left-0 z-50">
        <button
          onClick={() => setView('customer')}
          className={`text-sm tracking-wide ${
            view === 'customer' ? 'font-semibold underline' : 'opacity-70'
          }`}
        >
          Customer View
        </button>
        <button
          onClick={() => setView('employee')}
          className={`text-sm tracking-wide ${
            view === 'employee' ? 'font-semibold underline' : 'opacity-70'
          }`}
        >
          Employee View
        </button>
      </div>

      <div className="pt-12">
        {view === 'customer' ? (
          <App
            onOrderPlaced={handleOrderPlaced}
            customerUser={customerUser}
            onCustomerLogin={handleCustomerLogin}
            chatMessages={chatMessages}
            onSendChatMessage={(text) =>
              handleSendChatMessage('customer', text)
            }
          />
        ) : (
          <EmployeeApp
            reservations={reservations}
            setReservations={setReservations}
            orders={orders}
            setOrders={setOrders}
            // these two are ready for when we want employee chat UI
            chatMessages={chatMessages}
            onSendChatMessage={(text) =>
              handleSendChatMessage('employee', text)
            }
          />
        )}
      </div>
    </div>
  );
}
