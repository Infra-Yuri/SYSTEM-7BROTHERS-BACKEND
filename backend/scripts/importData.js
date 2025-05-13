import path from 'path';
import { DBFFile } from 'dbffile';
import db from '../src/db/knex.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function importTable(name, table, mapping) {
  const dbf  = await DBFFile.open(path.join(__dirname, '../dbf', `${name}.DBF`));
  const rows = await dbf.readRecords();
  for (const r of rows) {
    const data = mapping(r);
    await db(table).insert(data).onConflict().merge();
  }
  console.log(`${name} importados`);
}

(async () => {
  try {
    await importTable('CLIENTES', 'customers', r => ({
      code:    r.CODE.trim(),
      name:    r.NAME.trim(),
      address: r.ADDRESS?.trim(),
      salesperson_id: null
    }));
    await importTable('PRODUTOS', 'products', r => ({
      code:  r.CODE.trim(), name: r.NAME.trim(),
      price: Number(r.PRICE), stock: Number(r.STOCK)
    }));
    await importTable('PEDIDOS', 'orders', r => ({
      order_number: r.NUMBER,
      client_code:  r.CLIENT.trim(),
      order_date:   r.DATE,
      total:        Number(r.TOTAL)
    }));
    // invoices, usuarios etc se necessários
  } catch (err) {
    console.error(err);
  } finally {
    db.destroy();
  }
})();
