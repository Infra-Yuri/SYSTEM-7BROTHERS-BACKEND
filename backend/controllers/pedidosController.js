import pool from '../db.js';

export async function getAllPedidos(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPedidoById(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM orders WHERE order_number=$1', [id]);
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createPedido(req, res) {
  try {
    const { client_code, order_date, total } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO orders(client_code,order_date,total) VALUES($1,$2,$3) RETURNING *',
      [client_code, order_date, total]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePedido(req, res) {
  try {
    const { id } = req.params;
    const { client_code, order_date, total } = req.body;
    const { rows } = await pool.query(
      'UPDATE orders SET client_code=$1,order_date=$2,total=$3 WHERE order_number=$4 RETURNING *',
      [client_code, order_date, total, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deletePedido(req, res) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM orders WHERE order_number=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}