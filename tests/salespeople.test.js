import request from 'supertest';
import app from '../src/index.js';
import knex from '../src/db/knex.js';

beforeAll(() => knex.migrate.latest());
afterAll(() => knex.destroy());

describe('GET /salespeople', () => {
  it('returns sellers list', async () => {
    const res = await request(app).get('/salespeople');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
