const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');

// Clean up the test database before each test run
beforeEach(() => {
  const dbPath = path.join(__dirname, '../test.db');
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
});

// ==========================
// USERS TESTS
// ==========================
describe('Users API', () => {
  let userId;

  test('POST /api/users → create new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe' });
    expect(res.statusCode).toBe(201); // ✅ Corrected to 201 (Created)
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  test('GET /api/users → get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/users/:id → get user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
  });

  // ✅ Updated DELETE test for dynamic message
  test('DELETE /api/users/:id → delete user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(new RegExp(`User ${userId} deleted`));
  });
});

// ==========================
// KOS TESTS
// ==========================
describe('Kos API', () => {
  let kosId;

  test('POST /api/kos → create new Kos', async () => {
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
    expect(res.statusCode).toBe(201); // ✅ Corrected to 201
    kosId = res.body.id;
  });

  test('GET /api/kos → list all Kos', async () => {
    const res = await request(app).get('/api/kos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/kos/:id → get Kos by ID', async () => {
    const res = await request(app).get(`/api/kos/${kosId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
  });

  test('PUT /api/kos/:id → update Kos', async () => {
    const res = await request(app)
      .put(`/api/kos/${kosId}`)
      .send({ name: 'Kos Mawar Baru' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Kos updated successfully');
  });

  test('DELETE /api/kos/:id → delete Kos', async () => {
    const res = await request(app).delete(`/api/kos/${kosId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});

// ==========================
// ROOMS TESTS
// ==========================
describe('Rooms API', () => {
  let kosId, roomId;

  beforeAll(async () => {
    // Create a Kos for room tests
    const res = await request(app)
      .post('/api/kos')
      .send({
        name: 'Kos Anggrek',
        address: 'Jl. Kenanga No. 1',
        contact: '0811223344'
      });
    kosId = res.body.id;
  });

  test('POST /api/kos/:id/rooms → add new room', async () => {
    const res = await request(app)
      .post(`/api/kos/${kosId}/rooms`)
      .send({
        room_name: 'Room A',
        price: 700000,
        status: 'Available'
      });
    expect(res.statusCode).toBe(201); // ✅ Corrected to 201
    roomId = res.body.id;
  });

  test('GET /api/kos/:id/rooms → list all rooms in Kos', async () => {
    const res = await request(app).get(`/api/kos/${kosId}/rooms`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/rooms/:id → update room', async () => {
    const res = await request(app)
      .put(`/api/rooms/${roomId}`)
      .send({ price: 800000, status: 'Occupied' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Room updated successfully');
  });

  test('DELETE /api/rooms/:id → delete room', async () => {
    const res = await request(app).delete(`/api/rooms/${roomId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Room deleted successfully');
  });
});
