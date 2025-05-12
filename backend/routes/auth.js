import express from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(401).json({ error: 'Senha incorreta' });

  const token = jwt.sign({ id: user.id, nome: user.nome, cargo: user.cargo }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
