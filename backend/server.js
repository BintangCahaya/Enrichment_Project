const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize SQLite database
const db = new Database('data.db');
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`).run();

// --- Routes ---

// Health check
app.get('/', (req, res) => {
  res.json({ message: '✅ Enrichment Project Backend is running!' });
});

// Debug: list all DB entries (optional)
app.get('/api/debug/db', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

// Get all users
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
  const info = stmt.run(name);
  res.status(201).json({ id: info.lastInsertRowid, name });
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'Name is required' });

  const stmt = db.prepare('UPDATE users SET name = ? WHERE id = ?');
  const result = stmt.run(name, id);

  if (result.changes === 0) return res.status(404).json({ error: 'User not found' });

  res.json({ id: Number(id), name });
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const result = stmt.run(id);

  if (result.changes === 0) return res.status(404).json({ error: 'User not found' });

  res.json({ message: `User ${id} deleted successfully.` });
});

// --- Start server ---
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
}

module.exports = app;
