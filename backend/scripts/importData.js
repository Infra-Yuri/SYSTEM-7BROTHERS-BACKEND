import { DBFFile } from 'dbffile';
import pool from '../db.js';

async function importCustomers() {
  const dbf = await DBFFile.open('backend/dbf/clientes.dbf');
  const records = await dbf.readRecords();
  for (const r of records) {
    const code = r.CODCLIENTE.trim();
    const name = r.NOME.trim();
    const address = r.ENDERECO.trim();
    await pool.query(
      `INSERT INTO customers(code,name,address) VALUES($1,$2,$3)
       ON CONFLICT(code) DO UPDATE SET name=EXCLUDED.name,address=EXCLUDED.address`,
      [code, name, address]
    );
  }
  console.log('Clientes importados');
}

async function importOrders() {
  const dbf = await DBFFile.open('backend/dbf/pedidos.dbf');
  const records = await dbf.readRecords();
  for (const r of records) {
    await pool.query(
      `INSERT INTO orders(order_number,client_code,order_date,total)
       VALUES($1,$2,$3,$4)
       ON CONFLICT(order_number) DO UPDATE SET client_code=EXCLUDED.client_code,order_date=EXCLUDED.order_date,total=EXCLUDED.total`,
      [r.NROPEDIDO, r.CODCLIENTE, r.DATAPED, r.VALORTOTAL]
    );
  }
  console.log('Pedidos importados');
}

(async () => {
  try {
    await importCustomers();
    await importOrders();
  } finally {
    await pool.end();
    console.log('Conexão encerrada');
  }
})();