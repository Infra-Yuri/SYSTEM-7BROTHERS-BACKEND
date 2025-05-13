import { Router } from 'express';
import pool from '../db.js';
const router = Router();

// GET all
router.get('/', async (req,res) => {
  const { rows } = await pool.query('SELECT * FROM salespeople');
  res.json(rows);
});

// POST new
router.post('/', async (req,res) => {
  const { name, email, commission_rate } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO salespeople(name,email,commission_rate)
     VALUES($1,$2,$3) RETURNING *`,
     [name,email,commission_rate]
  );
  res.status(201).json(rows[0]);
});

// TODO: PUT e DELETE similares
export default router;
