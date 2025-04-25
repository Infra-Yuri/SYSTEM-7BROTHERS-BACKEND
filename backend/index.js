const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/pedidos", async (req, res) => {
  const result = await pool.query("SELECT * FROM pedidos ORDER BY data DESC");
  res.json(result.rows);
});

app.post("/upload-boletos", upload.single("file"), async (req, res) => {
  const path = req.file.path;
  const workbook = xlsx.readFile(path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  for (const row of data) {
    const pedido = row["PEDIDO"];
    const valor = row["VALOR"];

    await pool.query(
      "UPDATE pedidos SET valor_pago = $1, saldo = 0, status = 'PAGO' WHERE numero = $2",
      [valor, pedido]
    );
  }

  fs.unlinkSync(path);
  res.json({ ok: true });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
