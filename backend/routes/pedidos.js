import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
} from '../controllers/pedidosController.js';

const router = Router();
router.use(verifyToken);
router.get('/', getAllPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);
export default router;