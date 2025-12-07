// RootApp.jsx
import React, { useState } from 'react';
import CustomerApp from './App';
import EmployeeApp, { initialReservations, initialOrders } from './Employee';

export default function RootApp() {
  const [role, setRole] = useState('customer'); // 'customer' | 'employee'

  const [reservations, setReservations] = useState(initialReservations);
  const [orders, setOrders] = useState(initialOrders);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const addReservation = (reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-black text-white py-2 px-4 flex justify-between items-center">
        <span className="text-sm">
          Viewing as:{' '}
          <strong>{role === 'customer' ? 'Customer (Luxe site)' : 'Employee Dashboard'}</strong>
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setRole('customer')}
            className={`px-3 py-1 text-xs md:text-sm rounded ${
              role === 'customer' ? 'bg-white text-black' : 'bg-gray-800'
            }`}
          >
            Customer View
          </button>
          <button
            onClick={() => setRole('employee')}
            className={`px-3 py-1 text-xs md:text-sm rounded ${
              role === 'employee' ? 'bg-white text-black' : 'bg-gray-800'
            }`}
          >
            Employee View
          </button>
        </div>
      </div>

      {role === 'customer' ? (
        <CustomerApp addOrder={addOrder} addReservation={addReservation} />
      ) : (
        <EmployeeApp
          reservations={reservations}
          setReservations={setReservations}
          orders={orders}
          setOrders={setOrders}
        />
      )}
    </div>
  );
}
