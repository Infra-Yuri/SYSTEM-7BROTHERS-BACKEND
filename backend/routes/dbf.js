import { Router } from 'express';
import { DBFFile } from 'dbffile';
import path from 'path';

const router = Router();
const dbfDir = path.resolve('backend/dbf');

// GET /dbf/:name  (ex: /dbf/clientes)
router.get('/:name', async (req, res) => {
  const file = req.params.name.toUpperCase() + '.DBF';
  try {
    const dbf = await DBFFile.open(path.join(dbfDir, file));
    const records = await dbf.readRecords();
    res.json(records);
  } catch (err) {
    res.status(404).json({ error: 'Arquivo não encontrado' });
  }
});

export default router;
