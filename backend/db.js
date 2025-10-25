// backend/db.js
const { Pool } = require('pg');

// Usar DATABASE_URL si estás en Render, sino variables locales
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://posgressat1475_user:YvfS5jOoUtbFQeANkUH0iy8zK9Nk95QI@dpg-d3uihrfdiees73eafg40-a.frankfurt-postgres.render.com/posgressat1475',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Requerido en Render
});

module.exports = pool;
