// src/RootApp.js
import React, { useState } from 'react';
import App from './App';
import EmployeeApp from './EmployeeApp';

export default function RootApp() {
  const [view, setView] = useState('customer'); // 'customer' | 'employee'
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerUser, setCustomerUser] = useState(null);

  // 🔥 Shared chat thread
  const [chatMessages, setChatMessages] = useState([]);

  // 🛒 Shared cart
  const [cart, setCart] = useState([]);

  // 🔴 New message notification for employee
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  /*───────────────────────────────────────────────────────────────────────────────
    ORDER CREATION (Customer Checkout)
  ───────────────────────────────────────────────────────────────────────────────*/
  const handleOrderPlaced = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return;

    const nextId = `ORD${String(orders.length + 1).padStart(3, '0')}`;

    const total = cartItems.reduce(
      (sum, item) => sum + (item.pricePerUnit || 0) * item.quantity,
      0
    );

    const newOrder = {
      id: nextId,
      customerName: customerUser?.name || 'Online Customer',
      customerEmail: customerUser?.email || 'online@example.com',
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit ?? 0,
        variantName: item.variantName || null,
        notes: item.notes || '',
        image: item.image || null
      })),
      total,
      orderDate: new Date().toISOString().split('T')[0],
      pickupDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: ''
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  /*───────────────────────────────────────────────────────────────────────────────
    CUSTOMER LOGIN
  ───────────────────────────────────────────────────────────────────────────────*/
  const handleCustomerLogin = (user) => {
    setCustomerUser(user);
  };

  /*───────────────────────────────────────────────────────────────────────────────
    CENTRAL CHAT HANDLER
  ───────────────────────────────────────────────────────────────────────────────*/
  const handleSendChatMessage = (sender, text) => {
    if (!text || !text.trim()) return;

    const msg = {
      id: Date.now() + Math.random(),
      sender,       // "customer" or "employee"
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setChatMessages((prev) => [...prev, msg]);

    // ⭐ If customer sends message → notify employee
    if (sender === "customer") {
      setHasUnreadMessages(true);
    }
  };

  // Employee opens ANY order → clear badge
  const clearNotifications = () => {
    setHasUnreadMessages(false);
  };

  /*───────────────────────────────────────────────────────────────────────────────
    EMPLOYEE ADJUSTS TOTAL → SEND ITEMS BACK TO CART
  ───────────────────────────────────────────────────────────────────────────────*/
  const handleSendOrderToCart = (orderId, overrideTotal) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || !order.items || order.items.length === 0) return;

    const numericOverride =
      typeof overrideTotal === 'string' ? Number(overrideTotal) : overrideTotal;

    const effectiveTotalRaw =
      typeof numericOverride === 'number' && !Number.isNaN(numericOverride)
        ? numericOverride
        : Number(order.total) || 0;

    const effectiveTotal = Math.max(effectiveTotalRaw, 0);

    const totalQty =
      order.items.reduce(
        (sum, i) => sum + (i.quantity && i.quantity > 0 ? i.quantity : 1),
        0
      ) || 1;

    const perUnit = effectiveTotal / totalQty;

    const newCartItems = order.items.map((item, idx) => {
      const hasValidPrice =
        typeof item.pricePerUnit === 'number' && item.pricePerUnit > 0;

      return {
        id: `${order.id}-${idx}-${Date.now()}`,
        productId: item.productId || item.name,
        variantId: item.variantName || undefined,
        name: item.name,
        image:
          item.image ||
          'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400',
        pricePerUnit: hasValidPrice ? item.pricePerUnit : perUnit,
        quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
        notes: item.notes || ''
      };
    });

    setCart(newCartItems);
  };

  /*───────────────────────────────────────────────────────────────────────────────
    RENDER
  ───────────────────────────────────────────────────────────────────────────────*/
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top Toggle Bar */}
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
            cart={cart}
            setCart={setCart}
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
            chatMessages={chatMessages}
            
            /* 🔥 NOTIFICATION SYSTEM */
            hasUnreadMessages={hasUnreadMessages}
            onClearNotifications={clearNotifications}

            /* CHAT + PRICE UPDATES */
            onSendChatMessage={(text) =>
              handleSendChatMessage('employee', text)
            }
            onSendOrderToCart={handleSendOrderToCart}
          />
        )}
      </div>
    </div>
  );
}
