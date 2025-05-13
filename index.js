import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import pedidosRoutes from './routes/pedidos.js';
import authRoutes from './routes/auth.js';
import reportsRoutes from './routes/reports.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/products', productsRoutes);
app.use('/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;
// Bind em 0.0.0.0 para aceitar conexões do host
app.listen(PORT, '0.0.0.0', () =>
  console.log(`API rodando em http://0.0.0.0:${PORT}`)
);