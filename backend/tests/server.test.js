const request = require('supertest');
const app = require('../server');

describe('Enrichment Project Backend', () => {

  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Enrichment Project Backend');
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'TestUser' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('TestUser');
  });

  it('should list all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a specific user by id', async () => {
    const createRes = await request(app)
      .post('/api/users')
      .send({ name: 'FindMe' });
    const userId = createRes.body.id;

    const getRes = await request(app).get(`/api/users/${userId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.name).toBe('FindMe');
  });

  it('should return 404 for non-existent user', async () => {
    const res = await request(app).get('/api/users/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  it('should update a user', async () => {
    const createRes = await request(app)
      .post('/api/users')
      .send({ name: 'OldName' });
    const userId = createRes.body.id;

    const updateRes = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'NewName' });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.name).toBe('NewName');

    const getRes = await request(app).get(`/api/users/${userId}`);
    expect(getRes.body.name).toBe('NewName');
  });

  it('should return 404 when updating non-existent user', async () => {
    const res = await request(app)
      .put('/api/users/99999')
      .send({ name: 'Nobody' });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  it('should delete a user', async () => {
    const createRes = await request(app)
      .post('/api/users')
      .send({ name: 'DeleteMe' });
    const userId = createRes.body.id;

    const delRes = await request(app).delete(`/api/users/${userId}`);
    expect(delRes.statusCode).toBe(200);
    expect(delRes.body.message).toContain(`User ${userId} deleted`);
  });

  it('should return 404 when deleting non-existent user', async () => {
    const res = await request(app).delete('/api/users/99999');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

});
