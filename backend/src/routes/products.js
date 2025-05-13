import { Router } from 'express';
import knex from '../db/knex.js';

const router = Router();

// GET /products
router.get('/', async (req, res, next) => {
  try {
    const rows = await knex('products').select('*');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const prod = await knex('products').where('id', req.params.id).first();
    if (!prod) return res.status(404).end();
    res.json(prod);
  } catch (err) {
    next(err);
  }
});

export default router;
