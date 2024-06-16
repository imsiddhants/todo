const request = require('supertest');
const app = require('../app');
const { generateToken } = require('../services/tokenService');

describe('Todo API', () => {
  let token;

  beforeAll(() => {
    token = generateToken({ userId: 1 });
  });

  it('should create a todo', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Todo',
        description: 'Test description',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all todos', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put('/todos/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Todo',
        description: 'Updated description',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Updated Test Todo');
  });

  it('should delete a todo', async () => {
    const res = await request(app)
      .delete('/todos/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Todo deleted');
  });
});
