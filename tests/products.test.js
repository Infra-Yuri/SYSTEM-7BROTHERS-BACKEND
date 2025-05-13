import request from 'supertest';
import app from '../src/index.js';
import knex from '../src/db/knex.js';

beforeAll(() => knex.migrate.latest());
afterAll(() => knex.destroy());

describe('GET /products', () => {
  it('returns JSON array', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
