import { Router } from 'express';
import db from '../db/knex.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const router = Router();
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required()
});

router.post('/login', async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const user = await db('usuarios').where('email', value.email).first();
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = await bcrypt.compare(value.senha, user.senha);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
