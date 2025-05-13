import request from 'supertest';
import app from '../src/index.js';
import knex from '../src/db/knex.js';

beforeAll(() => knex.migrate.latest());
afterAll(() => knex.destroy());

describe('GET /pedidos', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/pedidos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /pedidos', () => {
  it('should create a pedido', async () => {
    const payload = { order_number: 9999, client_code: 'X', order_date: new Date(), total: 123 };
    const res = await request(app).post('/pedidos').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.order_number).toBe(9999);
  });
});
