// server.js  (project root, same folder as package.json)
const express = require('express');
const cors = require('cors');

const app = express();

// allow JSON bodies
app.use(express.json());

// allow requests from the React app
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// in-memory orders store
let orders = [];

// helper to generate simple unique IDs
function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2)
  );
}

// GET /api/orders  -> used by EmployeePage
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// POST /api/orders  -> used by handleCheckout in App.js
app.post('/api/orders', (req, res) => {
  const { items, customerNote } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).send('Items array required');
  }

  const newOrder = {
    id: generateId(),
    items,
    customerNote: customerNote || '',
    status: 'NEW',
    createdAt: new Date().toISOString(),
  };

  // newest first
  orders.unshift(newOrder);

  console.log('✅ New order received:', JSON.stringify(newOrder, null, 2));

  res.status(201).json(newOrder);
});

// PATCH /api/orders/:id/status  -> used by EmployeePage when changing status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return res.status(404).send('Order not found');
  }

  if (!status) {
    return res.status(400).send('Status is required');
  }

  order.status = status;

  console.log(`🔄 Order ${id} status changed to ${status}`);

  res.json(order);
});

// start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Order server listening on http://localhost:${PORT}`);
});
