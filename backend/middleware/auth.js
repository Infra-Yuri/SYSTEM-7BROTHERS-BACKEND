const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

function isAdmin(req, res, next) {
  if (req.user?.cargo === 'admin') return next();
  return res.status(403).json({ error: "Acesso restrito ao administrador" });
}

module.exports = { auth, isAdmin };