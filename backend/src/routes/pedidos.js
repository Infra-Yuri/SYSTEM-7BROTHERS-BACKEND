import { Router } from 'express';
import knex from '../db/knex.js';

const router = Router();

// GET /pedidos
router.get('/', async (req, res, next) => {
  try {
    const pedidos = await knex('orders').select('*');
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
});

// POST /pedidos
router.post('/', async (req, res, next) => {
  try {
    const [novo] = await knex('orders')
      .insert(req.body)
      .returning('*');
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
});

export default router;
