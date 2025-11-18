const request = require('supertest');
const app = require('../server');
const Database = require('better-sqlite3');

// Use a temporary in-memory database for testing
let db;

// Recreate tables before each test
beforeEach(() => {
  db = new Database(':memory:');
  db.prepare(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`).run();
  db.prepare(`
    CREATE TABLE kos (
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
  db.prepare(`
    CREATE TABLE rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kos_id INTEGER,
      room_name TEXT,
      price REAL,
      status TEXT,
      FOREIGN KEY (kos_id) REFERENCES kos(id)
    )
  `).run();
});

// ==========================
// USERS TESTS
// ==========================
describe('Users API', () => {
  test('POST /api/users → should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe' });
    expect(res.statusCode).toBe(201); // ✅ fixed from 200 → 201
    expect(res.body).toHaveProperty('id');
  });

  test('GET /api/users → should return list of users', async () => {
    await request(app).post('/api/users').send({ name: 'Alice' });
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// ==========================
// KOS TESTS
// ==========================
describe('Kos API', () => {
  test('POST /api/kos → should create a new Kos', async () => {
    const res = await request(app)
      .post('/api/kos')
      .send({
        name: 'Kos Mawar',
        address: 'Jl. Melati No. 2',
        contact: '08123456789',
        payment_method: 'Bank Transfer',
        bank_name: 'BCA',
        account_name: 'Kos Mawar',
        account_number: '12345678',
        image_url: 'https://example.com/img.jpg'
      });
    expect(res.statusCode).toBe(201); // ✅ fixed
    expect(res.body).toHaveProperty('id');
  });

  test('GET /api/kos → should return all kos', async () => {
    const res = await request(app).get('/api/kos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// ==========================
// ROOMS TESTS
// ==========================
describe('Rooms API', () => {
  let kosId;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/kos')
      .send({
        name: 'Kos Anggrek',
        address: 'Jl. Kenanga No. 1',
        contact: '0811223344'
      });
    kosId = res.body.id;
  });

  test('POST /api/kos/:id/rooms → should add room to Kos', async () => {
    const res = await request(app)
      .post(`/api/kos/${kosId}/rooms`)
      .send({
        room_name: 'Room 1',
        price: 500000,
        status: 'Available'
      });
    expect(res.statusCode).toBe(201); // ✅ fixed
    expect(res.body).toHaveProperty('id');
  });

  test('GET /api/kos/:id/rooms → should get rooms for a Kos', async () => {
    const res = await request(app).get(`/api/kos/${kosId}/rooms`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
