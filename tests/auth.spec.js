const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login a user and send magic link', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Magic link sent to email');
  });
});
