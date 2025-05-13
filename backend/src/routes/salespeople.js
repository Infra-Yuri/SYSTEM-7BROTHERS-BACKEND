import { Router } from 'express';
import knex from '../db/knex.js';

const router = Router();

// GET /salespeople
router.get('/', async (req, res, next) => {
  try {
    const sellers = await knex('salespeople').select('*');
    res.json(sellers);
  } catch (err) {
    next(err);
  }
});

// POST /salespeople
router.post('/', async (req, res, next) => {
  try {
    const [newOne] = await knex('salespeople')
      .insert(req.body)
      .returning('*');
    res.status(201).json(newOne);
  } catch (err) {
    next(err);
  }
});

export default router;
