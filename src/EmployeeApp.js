// src/EmployeeApp.js
import React, { useState } from 'react';
import {
  AlertCircle,
  Package,
  MessageCircle,
  Calendar as CalendarIcon,
  Clock,
  MapPin
} from 'lucide-react';

// Detect "service-like" orders
function isServiceOrder(order) {
  if (!order || !order.items) return false;
  return (
    order.items.some((i) => i.kind === 'service' || i.isService) ||
    !order.items.some((i) => typeof i.pricePerUnit === 'number' && i.pricePerUnit > 0)
  );
}

/* ───────────────────────────── Employee Navigation ───────────────────────────── */
function EmployeeNavigation({ viewMode, onChangeView }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 sticky top-12 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button className="flex items-center">
          <div className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-serif">LD</div>
              <div className="text-[10px] tracking-[0.2em]">EMPLOYEE</div>
            </div>
          </div>
        </button>

        <div className="flex items-center gap-4 text-xs tracking-wide text-gray-600">
          <div className="hidden md:flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>NEW REQUESTS</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>PENDING / ACTIVE ORDERS</span>
          </div>

          {/* CHAT NAV ITEM */}
          <div className="hidden md:flex items-center gap-2 relative">
            <MessageCircle className="w-4 h-4" />
            <span>CUSTOMER CHAT</span>
          </div>

          {/* Toggle views */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onChangeView('orders')}
              className={`px-3 py-1 rounded-full border text-[11px] ${
                viewMode === 'orders'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Orders View
            </button>
            <button
              onClick={() => onChangeView('calendar')}
              className={`px-3 py-1 rounded-full border text-[11px] flex items-center gap-1 ${
                viewMode === 'calendar'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <CalendarIcon className="w-3 h-3" />
              Calendar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────────────────── LEFT COLUMN: Orders ───────────────────────────── */

function OrdersColumn({
  orders,
  selectedOrderId,
  onSelectOrder,
  hasUnreadMessages,
  onClearNotifications
}) {
  const newRequests = orders.filter(
    (o) =>
      !o.status ||
      o.status === 'pending' ||
      o.status === 'PENDING' ||
      o.status === 'NEW'
  );

  const activeOrders = orders.filter(
    (o) => o.status === 'IN_PROGRESS' || o.status === 'in_progress'
  );

  const completedOrders = orders.filter(
    (o) => o.status === 'COMPLETED' || o.status === 'completed'
  );

  const cancelledOrders = orders.filter(
    (o) => o.status === 'CANCELLED' || o.status === 'cancelled'
  );

  const renderOrderItem = (order) => (
    <button
      key={order.id}
      onClick={() => {
        onSelectOrder(order);
        onClearNotifications(); // 🔥 clear badge when employee opens ANY order
      }}
      className={`relative w-full text-left px-3 py-2 rounded-md border mb-2 hover:bg-gray-50 ${
        selectedOrderId === order.id ? 'border-black bg-gray-50' : 'border-gray-200'
      }`}
    >
      {/* 🔴 Notification dot */}
      {hasUnreadMessages && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      )}

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold">
            {order.customerName || 'Online Customer'}
          </p>
          <p className="text-xs text-gray-500">
            #{order.id} • {order.items?.length || 0} item
            {order.items && order.items.length !== 1 ? 's' : ''}
          </p>
          {order.orderDate && (
            <p className="text-[10px] text-gray-400">Placed: {order.orderDate}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-gray-500">
            {order.status || 'pending'}
          </p>
          <p className="text-sm font-semibold">
            ${Number(order.total || 0).toFixed(2)}
          </p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[11px] font-semibold text-gray-500 mb-2 tracking-[0.18em]">
          NEW REQUESTS
        </h2>
        {newRequests.length === 0 ? (
          <p className="text-xs text-gray-400 italic">
            No new requests yet. New online orders will appear here.
          </p>
        ) : (
          newRequests.map(renderOrderItem)
        )}
      </div>

      <div>
        <h2 className="text-[11px] font-semibold text-gray-500 mb-2 tracking-[0.18em]">
          IN PROGRESS
        </h2>
        {activeOrders.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No active orders.</p>
        ) : (
          activeOrders.map(renderOrderItem)
        )}
      </div>

      <div>
        <h2 className="text-[11px] font-semibold text-gray-500 mb-2 tracking-[0.18em]">
          COMPLETED
        </h2>
        {completedOrders.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No completed orders yet.</p>
        ) : (
          completedOrders.map(renderOrderItem)
        )}
      </div>

      <div>
        <h2 className="text-[11px] font-semibold text-gray-500 mb-2 tracking-[0.18em]">
          CANCELLED
        </h2>
        {cancelledOrders.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No cancelled orders.</p>
        ) : (
          cancelledOrders.map(renderOrderItem)
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────── MIDDLE PANEL ───────────────────────────── */

function OrderDetailPanel({ order, onUpdateStatus, onAdjustPrice, onSendToCart }) {
  const [localTotal, setLocalTotal] = React.useState(order?.total ?? 0);

  React.useEffect(() => {
    if (order) {
      setLocalTotal(Number(order.total || 0).toFixed(2));
    }
  }, [order]);

  if (!order) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-400">
        Select an order on the left to view details.
      </div>
    );
  }

  const handlePriceSave = () => {
    const numeric = Number(localTotal);
    if (Number.isNaN(numeric)) return;

    onAdjustPrice(order.id, numeric);

    if (onSendToCart) {
      onSendToCart(order.id, numeric);
    }
  };

  const serviceOrder = isServiceOrder(order);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-semibold mb-1">Order #{order.id}</h1>
          <p className="text-xs text-gray-500">
            {order.customerName || 'Online Customer'} •{' '}
            {order.customerEmail || 'no email'}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <select
            value={order.status || 'pending'}
            onChange={(e) => onUpdateStatus(order.id, e.target.value)}
            className="border border-gray-300 text-xs rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <div className="text-right text-xs text-gray-500">
            {order.orderDate && <div>Order date: {order.orderDate}</div>}
            {order.pickupDate && <div>Pickup: {order.pickupDate}</div>}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h2 className="text-xs font-semibold mb-2 tracking-wide text-gray-600">
          ITEMS
        </h2>
        <div className="space-y-2">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between text-sm border-b pb-2 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                {item.variantName && (
                  <p className="text-xs text-gray-500">
                    Option: {item.variantName}
                  </p>
                )}
                {item.notes && (
                  <p className="text-xs text-gray-400">{item.notes}</p>
                )}
              </div>
              <div className="text-right text-xs text-gray-600">
                <div>Qty: {item.quantity}</div>
                {typeof item.pricePerUnit === 'number' && (
                  <>
                    <div>${item.pricePerUnit.toFixed(2)} each</div>
                    <div className="font-semibold">
                      ${(item.pricePerUnit * item.quantity).toFixed(2)}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service info */}
      <div className="bg-white border rounded-lg p-4 mb-4 text-sm">
        <h2 className="text-xs font-semibold mb-2 tracking-wide text-gray-600">
          EVENT / SERVICE DETAILS
        </h2>
        {serviceOrder ? (
          <p className="text-gray-700 mb-2">
            Service booking event. Confirm details via chat.
          </p>
        ) : (
          <p className="text-gray-700 mb-2">
            Prepackaged order — confirm pickup via chat.
          </p>
        )}

        {order.notes && (
          <p className="text-xs text-gray-500">
            Customer note: {order.notes}
          </p>
        )}
      </div>

      {/* Price Adjust */}
      <div className="bg-white border rounded-lg p-4 mb-4">
        <h2 className="text-xs font-semibold mb-2 tracking-wide text-gray-600">
          PRICE & TOTAL
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded px-2 py-1">
            <span className="text-sm text-gray-500 mr-1">$</span>
            <input
              type="number"
              step="0.01"
              value={localTotal}
              onChange={(e) => setLocalTotal(e.target.value)}
              className="w-24 text-sm outline-none"
            />
          </div>
          <button
            onClick={handlePriceSave}
            className="text-xs px-3 py-1 rounded bg-black text-white hover:bg-gray-800"
          >
            Save total
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Current stored total:{' '}
          <span className="font-semibold">${Number(order.total || 0).toFixed(2)}</span>
        </p>
      </div>

      <div className="flex-1" />
    </div>
  );
}

/* ───────────────────────────── RIGHT PANEL: Chat ───────────────────────────── */

function EmployeeChatPanel({ chatMessages, onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200">
      <div className="px-4 py-3 border-b bg-white flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        <span className="text-xs font-semibold tracking-wide">
          CUSTOMER CHAT
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {chatMessages.length === 0 ? (
          <p className="text-xs text-gray-400 italic">
            No messages yet.
          </p>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'employee' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs ${
                  msg.sender === 'employee'
                    ? 'bg-black text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <p className="mt-1 text-[10px] opacity-70 text-right">
                  {msg.sender === 'employee' ? 'You' : 'Customer'} • {msg.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 border-t bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 text-xs border border-gray-300 rounded-full px-3 py-2 outline-none focus:ring-1 focus:ring-black"
        />
        <button
          type="submit"
          className="text-xs px-3 py-2 rounded-full bg-black text-white hover:bg-gray-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}

/* ───────────────────────────── CALENDAR VIEW ───────────────────────────── */

function CalendarPanel({ reservations, orders, onSelectOrderFromCalendar }) {
  const events = [];

  reservations.forEach((r) => {
    if (!r.date) return;
    events.push({
      id: `RES-${r.id}`,
      type: 'reservation',
      date: r.date,
      time: r.time || '',
      title: r.service || 'Reservation',
      subtitle: r.customerName || '',
      location: r.location || '',
      notes: r.notes || '',
      orderId: null
    });
  });

  orders.forEach((o) => {
    const date = o.pickupDate || o.orderDate;
    if (!date) return;
    const serviceLike = isServiceOrder(o);
    events.push({
      id: `ORD-${o.id}`,
      type: serviceLike ? 'service-order' : 'order',
      date,
      time: o.eventTime || '',
      title: serviceLike ? 'Service Order' : 'Prepackaged Order',
      subtitle: o.customerName || 'Online Customer',
      location: o.eventLocation || '',
      notes: o.notes || '',
      orderId: o.id
    });
  });

  events.sort((a, b) => {
    const dA = new Date(a.date);
    const dB = new Date(b.date);
    return dA - dB;
  });

  const grouped = {};
  for (const ev of events) {
    if (!grouped[ev.date]) grouped[ev.date] = [];
    grouped[ev.date].push(ev);
  }

  const dateKeys = Object.keys(grouped).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="w-4 h-4 text-gray-600" />
        <h2 className="text-xs font-semibold tracking-[0.14em] text-gray-600">
          CALENDAR VIEW — UPCOMING EVENTS
        </h2>
      </div>

      <div className="space-y-4">
        {dateKeys.map((date) => (
          <div key={date} className="border border-gray-100 rounded-xl bg-white">
            <div className="px-4 py-2 border-b bg-gray-50 flex items-center gap-2">
              <CalendarIcon className="w-3 h-3 text-gray-500" />
              <p className="text-xs font-semibold text-gray-700">{date}</p>
            </div>

            <div className="p-3 space-y-2">
              {grouped[date].map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => {
                    if (ev.orderId && onSelectOrderFromCalendar)
                      onSelectOrderFromCalendar(ev.orderId);
                  }}
                  className={`w-full text-left rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{ev.title}</span>
                    <span className="px-2 py-[2px] rounded-full text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600">
                      {ev.type.toUpperCase()}
                    </span>
                  </div>
                  {ev.subtitle && (
                    <p className="text-[11px] text-gray-600">{ev.subtitle}</p>
                  )}
                  {ev.time && (
                    <p className="flex items-center gap-1 text-[11px] text-gray-500">
                      <Clock className="w-3 h-3" />
                      {ev.time}
                    </p>
                  )}
                  {ev.location && (
                    <p className="flex items-center gap-1 text-[11px] text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {ev.location}
                    </p>
                  )}
                  {ev.notes && (
                    <p className="text-[11px] text-gray-400">Notes: {ev.notes}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── MAIN EMPLOYEE APP ───────────────────────────── */

export default function EmployeeApp({
  reservations = [],
  setReservations = () => {},
  orders = [],
  setOrders = () => {},
  chatMessages = [],
  hasUnreadMessages = false,     // ⭐ added
  onClearNotifications = () => {}, // ⭐ added
  onSendChatMessage = () => {},
  onSendOrderToCart = () => {}
}) {
  const [viewMode, setViewMode] = useState('orders');
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || null);

  const selectedOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0] || null;

  const handleSelectOrder = (order) => {
    setSelectedOrderId(order.id);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAdjustPrice = (orderId, newTotal) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, total: newTotal } : o))
    );
  };

  const handleSelectOrderFromCalendar = (orderId) => {
    setSelectedOrderId(orderId);
    setViewMode('orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeNavigation viewMode={viewMode} onChangeView={setViewMode} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === 'orders' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr,1fr] gap-6 min-h-[70vh]">
            {/* LEFT: Orders */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <OrdersColumn
                orders={orders}
                selectedOrderId={selectedOrderId}
                onSelectOrder={handleSelectOrder}
                hasUnreadMessages={hasUnreadMessages}    // ⭐ added
                onClearNotifications={onClearNotifications} // ⭐ added
              />
            </div>

            {/* MIDDLE: Order Detail */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <OrderDetailPanel
                order={selectedOrder}
                onUpdateStatus={handleUpdateOrderStatus}
                onAdjustPrice={handleAdjustPrice}
                onSendToCart={onSendOrderToCart}
              />
            </div>

            {/* RIGHT: Chat */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <EmployeeChatPanel
                chatMessages={chatMessages}
                onSend={(text) => onSendChatMessage(text)}
              />
            </div>
          </div>
        ) : (
          /* CALENDAR VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6 min-h-[70vh]">
            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <CalendarPanel
                reservations={reservations}
                orders={orders}
                onSelectOrderFromCalendar={handleSelectOrderFromCalendar}
              />
            </div>

            {/* Chat stays visible */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <EmployeeChatPanel
                chatMessages={chatMessages}
                onSend={(text) => onSendChatMessage(text)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
