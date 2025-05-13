import { Router } from 'express';
import knex from '../db/knex.js';
const router = Router();

// GET /reports/sales-by-salesperson?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/sales-by-salesperson', async (req, res, next) => {
  const { from, to } = req.query;
  try {
    const rows = await knex('orders as o')
      .select(
        's.id',
        's.name',
        knex.raw('SUM(o.total) AS total_sales'),
        knex.raw('(SUM(o.total) * s.commission_rate/100) as total_commission')
      )
      .join('salespeople as s', 'o.salesperson_id', 's.id')
      .whereBetween('o.order_date', [from, to])
      .groupBy('s.id', 's.name', 's.commission_rate');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /reports/customer-debt
router.get('/customer-debt', async (req, res, next) => {
  try {
    const rows = await knex('customers as c')
      .select(
        'c.id',
        'c.name',
        knex.raw('COUNT(o.id) AS orders_count'),
        knex.raw('SUM(o.total) AS total_purchased'),
        knex.raw("SUM(i.amount) FILTER (WHERE i.status='open') AS total_due")
      )
      .leftJoin('orders as o', 'o.client_code', 'c.code')
      .leftJoin('invoices as i', 'i.order_number', 'o.order_number')
      .groupBy('c.id', 'c.name');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
