// backend/init-db.js
const db = require('./db');

const initDb = async () => {
  try {
    console.log('Inicializando base de datos...');

    // Crear tabla productos
    await db.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2),
        stock INT DEFAULT 0
      );
    `);

    // Crear tabla tickets_sat
    await db.query(`
      CREATE TABLE IF NOT EXISTS tickets_sat (
        id SERIAL PRIMARY KEY,
        cliente VARCHAR(255),
        telefono VARCHAR(20),
        correo VARCHAR(255),
        descripcion TEXT,
        estado VARCHAR(20) DEFAULT 'Pendiente',
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insertar datos de ejemplo solo si no hay productos
    const { rows } = await db.query('SELECT COUNT(*) AS count FROM productos');
    if (rows[0].count === 0) {
      await db.query(`
        INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
        ('CPU Intel i5', 'Procesador Intel i5 12400F', 150.00, 10),
        ('GPU RTX 3060', 'Tarjeta gráfica RTX 3060 12GB', 300.00, 5),
        ('RAM 16GB', 'Memoria RAM 16GB DDR4 3200MHz', 60.00, 20);
      `);
    }

    console.log('✅ Base de datos inicializada correctamente.');
  } catch (err) {
    console.error('❌ Error al inicializar la base de datos:', err);
  }
};

module.exports = initDb;
