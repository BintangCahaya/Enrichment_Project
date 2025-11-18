// === IMPORTS ===
const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// === MIDDLEWARE ===
app.use(express.json());

// === DATABASE SETUP ===
// Use an in-memory DB during testing to avoid file locking (EBUSY errors on Windows)
const dbName = process.env.NODE_ENV === 'test' ? ':memory:' : 'data.db';

if (process.env.NODE_ENV !== 'test' && fs.existsSync(dbName)) {
  try {
    fs.unlinkSync(dbName);
  } catch (err) {
    console.warn('⚠️ Could not delete DB:', err.message);
  }
}

const db = new Database(dbName);

// ===== ENABLE FOREIGN KEYS =====
db.pragma('foreign_keys = ON');

// --- USERS TABLE ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`).run();

// --- KOS TABLE ---
db.prepare(`
  CREATE TABLE IF NOT EXISTS kos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    contact TEXT,
    payment_method TEXT,
    bank_name TEXT,
    account_name TEXT,
    account_number TEXT,
    image_url TEXT
  )
`).run();

// --- ROOMS TABLE ---
db.prepare(`
   CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kos_id INTEGER,
    room_name TEXT,
    area TEXT,
    price REAL,
    price_yearly REAL,
    status TEXT,
    description TEXT,
    image_url TEXT,
    FOREIGN KEY (kos_id) REFERENCES kos(id)
  )
`).run();

// ===== TENANTS & TRANSACTIONS TABLES =====
db.prepare(`
  CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    gender TEXT,
    phone TEXT,
    email TEXT,
    room_id INTEGER, -- FK to rooms.id (nullable)
    contract_start TEXT, -- ISO date string
    contract_end TEXT,   -- ISO date string
    status TEXT DEFAULT 'Inactive', -- 'Active' or 'Inactive'
    created_at TEXT DEFAULT (datetime('now'))
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    date TEXT DEFAULT (datetime('now')),
    note TEXT,
    receipt_url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
  )
`).run();


// === ROUTES ===

// ---- ROOT ----
app.get('/', (req, res) => {
  res.json({ message: '✅ Enrichment Project Backend is running!' });
});

// ==========================
// USERS API
// ==========================

// Get all users
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

// Get a user by ID
app.get('/api/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const result = db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
  res.status(201).json({ id: result.lastInsertRowid, name });
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const result = db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'User not found' });

  const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  res.json(updatedUser);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'User not found' });
  res.json({ message: `User ${req.params.id} deleted successfully` });
});

// ==========================
// KOS API
// ==========================

// Create a new Kos
app.post('/api/kos', (req, res) => {
  const {
    name, address, contact,
    payment_method, bank_name,
    account_name, account_number, image_url
  } = req.body;

  if (!name || !address || !contact)
    return res.status(400).json({ error: 'Name, address, and contact are required' });

  const result = db.prepare(`
    INSERT INTO kos (name, address, contact, payment_method, bank_name, account_name, account_number, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, address, contact, payment_method, bank_name, account_name, account_number, image_url);

  res.status(201).json({ id: result.lastInsertRowid, message: 'Kos created successfully' });
});

// Get all Kos
app.get('/api/kos', (req, res) => {
  const allKos = db.prepare('SELECT * FROM kos').all();
  res.json(allKos);
});

// Get one Kos by ID
app.get('/api/kos/:id', (req, res) => {
  const kos = db.prepare('SELECT * FROM kos WHERE id = ?').get(req.params.id);
  if (!kos) return res.status(404).json({ error: 'Kos not found' });
  res.json(kos);
});

// Update Kos details
app.put('/api/kos/:id', (req, res) => {
  const { name, address, contact, payment_method, bank_name, account_name, account_number, image_url } = req.body;
  const result = db.prepare(`
    UPDATE kos SET
      name = COALESCE(?, name),
      address = COALESCE(?, address),
      contact = COALESCE(?, contact),
      payment_method = COALESCE(?, payment_method),
      bank_name = COALESCE(?, bank_name),
      account_name = COALESCE(?, account_name),
      account_number = COALESCE(?, account_number),
      image_url = COALESCE(?, image_url)
    WHERE id = ?
  `).run(name, address, contact, payment_method, bank_name, account_name, account_number, image_url, req.params.id);

  if (result.changes === 0) return res.status(404).json({ error: 'Kos not found' });
  res.json({ message: 'Kos updated successfully' });
});

// Delete a Kos and its rooms
app.delete('/api/kos/:id', (req, res) => {
  db.prepare('DELETE FROM rooms WHERE kos_id = ?').run(req.params.id);
  const result = db.prepare('DELETE FROM kos WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Kos not found' });
  res.json({ message: 'Kos and its rooms deleted successfully' });
});

// ==========================
// ROOMS API
// ==========================

// Add room to a Kos
app.post('/api/kos/:id/rooms', (req, res) => {
  const { room_name, area, price, price_yearly, status, description, image_url } = req.body;
  if (!room_name) return res.status(400).json({ error: 'Room name is required' });

  const kosExists = db.prepare('SELECT id FROM kos WHERE id = ?').get(req.params.id);
  if (!kosExists) return res.status(404).json({ error: 'Kos not found' });

  const result = db.prepare(`
    INSERT INTO rooms (kos_id, room_name, area, price, price_yearly, status, description, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(req.params.id, room_name, area, price || 0, price_yearly || 0, status || 'Available', description, image_url);

  res.status(201).json({ id: result.lastInsertRowid, message: `Room added to Kos ${req.params.id}` });
});

// Get all rooms for a Kos
app.get('/api/kos/:id/rooms', (req, res) => {
  const rooms = db.prepare('SELECT * FROM rooms WHERE kos_id = ?').all(req.params.id);
  res.json(rooms);
});

// Edit room
app.put('/api/rooms/:id', (req, res) => {
  const { room_name, price, status } = req.body;
  const result = db.prepare(`
    UPDATE rooms SET
      room_name = COALESCE(?, room_name),
      price = COALESCE(?, price),
      status = COALESCE(?, status)
    WHERE id = ?
  `).run(room_name, price, status, req.params.id);

  if (result.changes === 0) return res.status(404).json({ error: 'Room not found' });
  res.json({ message: 'Room updated successfully' });
});

// Delete room
app.delete('/api/rooms/:id', (req, res) => {
  const result = db.prepare('DELETE FROM rooms WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Room not found' });
  res.json({ message: 'Room deleted successfully' });
});

// ===== TENANTS API =====

// Create tenant (optionally assign room_id)
app.post('/api/tenants', (req, res) => {
  const { name, gender, phone, email, room_id, contract_start, contract_end, status } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  // If room_id provided, make sure room exists and is available
  if (room_id) {
    const room = db.prepare('SELECT * FROM rooms WHERE id = ?').get(room_id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (room.status && room.status.toLowerCase() === 'occupied') {
      return res.status(400).json({ error: 'Room is already occupied' });
    }
  }

  const result = db.prepare(`
    INSERT INTO tenants (name, gender, phone, email, room_id, contract_start, contract_end, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, gender, phone, email, room_id || null, contract_start || null, contract_end || null, status || (room_id ? 'Active' : 'Inactive'));

  const tenantId = result.lastInsertRowid;

  // If room assigned, mark it Occupied
  if (room_id) {
    db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Occupied', room_id);
  }

  res.status(201).json({ id: tenantId, message: 'Tenant created successfully' });
});

// Get all tenants (optionally filter by status)
app.get('/api/tenants', (req, res) => {
  const { status } = req.query;
  let rows;
  if (status) {
    rows = db.prepare('SELECT * FROM tenants WHERE status = ? ORDER BY id DESC').all(status);
  } else {
    rows = db.prepare('SELECT * FROM tenants ORDER BY id DESC').all();
  }
  res.json(rows);
});

// Get tenant detail including room info and recent transactions
app.get('/api/tenants/:id', (req, res) => {
  const id = req.params.id;
  const tenant = db.prepare(`
    SELECT t.*, r.room_name, r.kos_id, r.price, r.status as room_status
    FROM tenants t
    LEFT JOIN rooms r ON t.room_id = r.id
    WHERE t.id = ?
  `).get(id);

  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const transactions = db.prepare('SELECT * FROM transactions WHERE tenant_id = ? ORDER BY date DESC').all(id);
  res.json({ tenant, transactions });
});

// Update tenant
app.put('/api/tenants/:id', (req, res) => {
  const id = req.params.id;
  const { name, gender, phone, email, room_id, contract_start, contract_end, status } = req.body;

  // If room_id is changed to a new room, ensure availability and update room statuses
  const current = db.prepare('SELECT * FROM tenants WHERE id = ?').get(id);
  if (!current) return res.status(404).json({ error: 'Tenant not found' });

  if (room_id && room_id !== current.room_id) {
    const newRoom = db.prepare('SELECT * FROM rooms WHERE id = ?').get(room_id);
    if (!newRoom) return res.status(404).json({ error: 'New room not found' });
    if (newRoom.status && newRoom.status.toLowerCase() === 'occupied') {
      return res.status(400).json({ error: 'New room is already occupied' });
    }
    // free old room if existed
    if (current.room_id) {
      db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Available', current.room_id);
    }
    // occupy new room
    db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Occupied', room_id);
  }

  const result = db.prepare(`
    UPDATE tenants SET
      name = COALESCE(?, name),
      gender = COALESCE(?, gender),
      phone = COALESCE(?, phone),
      email = COALESCE(?, email),
      room_id = COALESCE(?, room_id),
      contract_start = COALESCE(?, contract_start),
      contract_end = COALESCE(?, contract_end),
      status = COALESCE(?, status)
    WHERE id = ?
  `).run(name, gender, phone, email, room_id, contract_start, contract_end, status, id);

  if (result.changes === 0) return res.status(400).json({ error: 'No changes made' });
  res.json({ message: 'Tenant updated successfully' });
});

// Delete tenant (also frees room)
app.delete('/api/tenants/:id', (req, res) => {
  const id = req.params.id;
  const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(id);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // free assigned room if any
  if (tenant.room_id) {
    db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Available', tenant.room_id);
  }

  const result = db.prepare('DELETE FROM tenants WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(400).json({ error: 'Delete failed' });
  res.json({ message: `Tenant ${id} deleted successfully` });
});

// Assign/unassign room to tenant explicitly
app.post('/api/tenants/:id/assign-room', (req, res) => {
  const id = req.params.id;
  const { room_id } = req.body;
  const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(id);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  // if room_id is null or omitted -> unassign
  if (!room_id) {
    if (tenant.room_id) {
      db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Available', tenant.room_id);
      db.prepare('UPDATE tenants SET room_id = NULL, status = ? WHERE id = ?').run('Inactive', id);
      return res.json({ message: 'Tenant unassigned from room' });
    } else {
      return res.status(400).json({ error: 'Tenant has no assigned room' });
    }
  }

  const room = db.prepare('SELECT * FROM rooms WHERE id = ?').get(room_id);
  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (room.status && room.status.toLowerCase() === 'occupied') {
    return res.status(400).json({ error: 'Room is already occupied' });
  }

  // free previous room (if any)
  if (tenant.room_id) {
    db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Available', tenant.room_id);
  }

  db.prepare('UPDATE rooms SET status = ? WHERE id = ?').run('Occupied', room_id);
  db.prepare('UPDATE tenants SET room_id = ?, status = ? WHERE id = ?').run(room_id, 'Active', id);

  res.json({ message: `Tenant ${id} assigned to room ${room_id}` });
});

// ===== TRANSACTIONS (payments) =====

// Add a transaction for a tenant (payment)
app.post('/api/tenants/:id/transactions', (req, res) => {
  const tenantId = req.params.id;
  const { amount, date, note, receipt_url } = req.body;
  if (!amount || Number.isNaN(Number(amount))) return res.status(400).json({ error: 'Amount is required and must be numeric' });

  const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(tenantId);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const result = db.prepare(`
    INSERT INTO transactions (tenant_id, amount, date, note, receipt_url)
    VALUES (?, ?, ?, ?, ?)
  `).run(tenantId, amount, date || new Date().toISOString(), note || null, receipt_url || null);

  res.status(201).json({ id: result.lastInsertRowid, message: 'Transaction recorded' });
});

// Get tenant transactions
app.get('/api/tenants/:id/transactions', (req, res) => {
  const tenantId = req.params.id;
  const tenant = db.prepare('SELECT id FROM tenants WHERE id = ?').get(tenantId);
  if (!tenant) return res.status(404).json({ error: 'Tenant not found' });

  const tx = db.prepare('SELECT * FROM transactions WHERE tenant_id = ? ORDER BY date DESC').all(tenantId);
  res.json(tx);
});

// Helper: get available rooms (for "Assign to room" list)
app.get('/api/rooms/available', (req, res) => {
  const rooms = db.prepare("SELECT * FROM rooms WHERE status = 'Available'").all();
  res.json(rooms);
});

// ==========================
// DEBUG ROUTE
// ==========================
app.get('/api/debug/db', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  const kos = db.prepare('SELECT * FROM kos').all();
  const rooms = db.prepare('SELECT * FROM rooms').all();
  res.json({ users, kos, rooms });
});

// === CLEANUP AFTER TESTS ===
if (process.env.NODE_ENV === 'test') {
  afterAll(() => {
    try {
      db.close();
    } catch (err) {
      console.warn('⚠️ DB close skipped:', err.message);
    }
  });
}

// === START SERVER ===
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

module.exports = app; // For testing
