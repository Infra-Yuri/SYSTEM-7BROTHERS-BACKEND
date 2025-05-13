import express from 'express';
import pedidosRoutes from './routes/pedidos.js';
import productsRoutes from './routes/products.js';
import salesRoutes from './routes/salespeople.js';
import reportsRoutes from './routes/reports.js';

const app = express();
app.use(express.json());

app.use('/pedidos', pedidosRoutes);
app.use('/products', productsRoutes);
app.use('/salespeople', salesRoutes);
app.use('/reports', reportsRoutes);

// error handler, etc.
export default app;
