import { Router } from 'express';
import pool from '../db.js';
const router = Router();

// 1) Vendas x Comissão
router.get('/sales-by-salesperson', async (req,res) => {
  const { from, to } = req.query;
  const q = `
    SELECT s.id, s.name,
           SUM(o.total) AS total_sales,
           SUM(o.total)*s.commission_rate/100 AS total_commission
    FROM orders o
    JOIN salespeople s ON o.salesperson_id = s.id
    WHERE o.order_date BETWEEN $1 AND $2
    GROUP BY s.id, s.name, s.commission_rate`;
  const { rows } = await pool.query(q, [from,to]);
  res.json(rows);
});

// 2) Compras x Dívidas por Cliente
router.get('/customers-by-salesperson', async (req,res) => {
  const { rows } = await pool.query(`
    SELECT c.id, c.name,
           COUNT(o.order_number) AS orders_count,
           SUM(o.total) AS total_purchased,
           SUM(inv.amount) FILTER (WHERE inv.status='open') AS total_due
    FROM customers c
    LEFT JOIN orders o ON o.client_code = c.code
    LEFT JOIN invoices inv ON inv.order_number = o.order_number
    GROUP BY c.id, c.name
  `);
  res.json(rows);
});

// 3) Boletos status
router.get('/invoices-status', async (req,res) => {
  const { from, to } = req.query;
  const { rows } = await pool.query(`
    SELECT status,
           COUNT(*) AS count,
           SUM(amount) AS total_amount
    FROM invoices
    WHERE due_date BETWEEN $1 AND $2
    GROUP BY status
  `, [from,to]);
  res.json(rows);
});

export default router;
