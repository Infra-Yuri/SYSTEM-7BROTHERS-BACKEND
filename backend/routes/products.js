import { Router } from 'express';
import pool from '../db.js';
const router = Router();

router.get('/', async (req, res) => {
  const term = `%${req.query.search || ''}%`;
  const { rows } = await pool.query(
    `SELECT id,code,name,price,stock
     FROM products
     WHERE code ILIKE $1 OR name ILIKE $1
     LIMIT 20`, [term]
  );
  res.json(rows);
});

export default router;
