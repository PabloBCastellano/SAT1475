// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Permitir frontend local y Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sat1475-frontend.vercel.app'
  ]
}));

app.use(express.json());

// Ruta de prueba: GET /api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: '¡API de SAT1475 funcionando!', timestamp: new Date() });
});

// Ruta de prueba: POST /api/test
app.post('/api/test', (req, res) => {
  res.json({ received: req.body, echo: 'OK' });
});

// middleware final SIN ruta
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor API escuchando en http://localhost:${PORT}`);
  console.log(`📡 Prueba: http://localhost:${PORT}/api/hello`);
});
