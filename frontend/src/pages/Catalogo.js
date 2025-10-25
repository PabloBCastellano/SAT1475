
// src/pages/Catalogo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de productos
    const fetchProductos = async () => {
      try {
        // Ajusta la URL con la de tu backend en Render
        const res = await axios.get('https://sat1475.onrender.com/api/productos');
        setProductos(res.data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        // Datos de ejemplo si no hay backend
        setProductos([
          { id: 1, nombre: 'CPU Intel i5', precio: 150 },
          { id: 2, nombre: 'GPU RTX 3060', precio: 300 },
          { id: 3, nombre: 'RAM 16GB', precio: 60 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Catálogo de Productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div>
          {productos.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
              <h3>{p.nombre}</h3>
              <p>Precio: ${p.precio}</p>
              <button>Agregar al carrito</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;
