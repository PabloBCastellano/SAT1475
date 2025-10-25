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
    // Añadiremos la URL de Vercel después del despliegue
  ]
}));

app.use(express.json());

// Ruta de prueba
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend conectado ✅' });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
