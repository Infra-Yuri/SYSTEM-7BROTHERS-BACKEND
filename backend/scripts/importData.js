import path from 'path';
import { readdirSync } from 'fs';
import { DBFFile } from 'dbffile';
import pool from '../db.js';

async function importCustomers(){ /* já existente */ }
async function importOrders(){ /* já existente */ }

async function importProducts(){
  const dbfDir = path.resolve(__dirname, '../dbf');
  const dbf = await DBFFile.open(path.join(dbfDir, 'PRODUTOS.DBF'));
  const records = await dbf.readRecords();
  for(const r of records){
    await pool.query(
      `INSERT INTO products(code,name,price,stock)
       VALUES($1,$2,$3,$4)
       ON CONFLICT(code) DO UPDATE
         SET name=EXCLUDED.name, price=EXCLUDED.price, stock=EXCLUDED.stock`,
      [r.CODE.trim(), r.NAME.trim(), Number(r.PREVENDA), Number(r.STOCK)]
    );
  }
  console.log('Produtos importados');
}

async function importInvoices(){
  // se tiver DBF de boletos, similar aos outros
}

(async ()=>{
  try {
    await importCustomers();
    await importProducts();
    await importOrders();
    await importInvoices();
    console.log('Importação concluída');
  } finally {
    await pool.end();
  }
})();