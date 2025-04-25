const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("./db");
const { auth, isAdmin } = require("./middleware/auth");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api", authRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const upload = multer({ dest: "uploads/" });

app.get("/pedidos", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM pedidos ORDER BY data DESC");
  res.json(result.rows);
});

app.post("/upload-boletos", auth, upload.single("file"), async (req, res) => {
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
