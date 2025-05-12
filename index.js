import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './backend/routes/auth.js';
import pedidosRoutes from './backend/routes/pedidos.js';

dotenv.config();
const app = express();
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pedidos', pedidosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));