// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const initDb = require('./init-db');

const app = express();
const PORT = process.env.PORT || 5000;

// Inicializar base de datos al arrancar y esperar a que termine
const startServer = async () => {
  await initDb(); // Espera a que la base de datos esté lista

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://sat1475-frontend.vercel.app'
    ]
  }));

  app.use(express.json());

  // Ruta de prueba
  app.get('/api/hello', (req, res) => {
    res.json({ message: '¡API de SAT1475 funcionando con PostgreSQL!', timestamp: new Date() });
  });

  // Ruta para obtener productos desde la base de datos
  app.get('/api/productos', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM productos');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al cargar productos' });
    }
  });

  // Ruta para crear un ticket SAT
  app.post('/api/tickets', async (req, res) => {
    const { cliente, telefono, correo, descripcion } = req.body;

    try {
      const result = await db.query(
        'INSERT INTO tickets_sat (cliente, telefono, correo, descripcion) VALUES ($1, $2, $3, $4) RETURNING id',
        [cliente, telefono, correo, descripcion]
      );
      res.status(201).json({ id: result.rows[0].id, message: 'Ticket creado' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear ticket' });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  app.listen(PORT, () => {
    console.log(`✅ Servidor API escuchando en http://localhost:${PORT}`);
  });
};

startServer();
