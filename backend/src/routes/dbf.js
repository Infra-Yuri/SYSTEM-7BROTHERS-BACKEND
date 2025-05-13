import { Router } from 'express';
import { DBFFile } from 'dbffile';
import path from 'path';

const router = Router();
const dbfDir = path.resolve('dbf'); // pasta raiz /dbf

router.get('/:name', async (req, res) => {
  try {
    const file = req.params.name.toUpperCase() + '.DBF';
    const dbf = await DBFFile.open(path.join(dbfDir, file));
    const records = await dbf.readRecords();
    res.json(records);
  } catch {
    res.status(404).json({ error: 'Arquivo DBF não encontrado' });
  }
});

export default router;
