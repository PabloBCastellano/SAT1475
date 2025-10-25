// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const initDb = require('./init-db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware inicial
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sat1475.vercel.app' // <-- Asegúrate de quitar espacios al final si los hay
  ]
}));

app.use(express.json());

// Ruta de prueba (esta NO accede a la base de datos)
app.get('/api/hello', (req, res) => {
  res.json({ message: '¡API de SAT1475 funcionando con PostgreSQL!', timestamp: new Date() });
});

// Ruta que accede a la base de datos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al cargar productos:', err);
    res.status(500).json({ error: 'Error al cargar productos' });
  }
});
// Ruta para obtener todos los tickets (solo para admin)
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tickets_sat ORDER BY fecha_creacion DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cargar tickets' });
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
    console.error('Error al crear ticket:', err);
    res.status(500).json({ error: 'Error al crear ticket' });
  }
});
// Ruta para actualizar el estado de un ticket
app.put('/api/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const result = await db.query(
      'UPDATE tickets_sat SET estado = $1 WHERE id = $2 RETURNING id',
      [estado, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json({ message: 'Estado actualizado', id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar ticket' });
  }
});
// Middleware de 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Función principal para iniciar el servidor
const startServer = async () => {
  console.log('Inicializando base de datos...');
  try {
    await initDb(); // Espera a que la base de datos esté lista
    console.log('✅ Base de datos inicializada correctamente.');
  } catch (err) {
    console.error('❌ Error FATAL al inicializar la base de datos:', err);
    process.exit(1); // Detiene el servidor si falla la inicialización
  }

  // Iniciar servidor una vez que la base de datos esté lista
  app.listen(PORT, () => {
    console.log(`✅ Servidor API escuchando en http://localhost:${PORT}`);
  });
};

// Iniciar el servidor
startServer();
