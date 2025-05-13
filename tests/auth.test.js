import request from 'supertest';
import app from '../src/index.js';

describe('Auth', () => {
  it('login retorna token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'inframanager.yuri@gmail.com', senha: '3326' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
