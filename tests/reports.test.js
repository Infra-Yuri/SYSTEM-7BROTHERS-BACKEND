import request from 'supertest';
import app from '../src/index.js';
import knex from '../src/db/knex.js';

beforeAll(() => knex.migrate.latest());
afterAll(() => knex.destroy());

describe('GET /reports/sales-by-salesperson', () => {
  it('returns report array', async () => {
    const res = await request(app)
      .get('/reports/sales-by-salesperson')
      .query({ from: '2025-01-01', to: '2025-12-31' });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
