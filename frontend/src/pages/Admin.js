// src/pages/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState({ productos: true, tickets: true });

  // Cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('https://sat1475.onrender.com/api/productos');
        setProductos(res.data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading({ ...loading, productos: false });
      }
    };

    fetchProductos();
  }, []);

  // Cargar tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Ajusta esta ruta cuando crees la API de tickets
        const res = await axios.get('https://sat1475.onrender.com/api/tickets');
        setTickets(res.data);
      } catch (err) {
        console.error('Error al cargar tickets:', err);
        // Datos de ejemplo si no hay API aún
        setTickets([
          { id: 1, cliente: 'Juan Pérez', estado: 'Pendiente', descripcion: 'No arranca el PC' },
          { id: 2, cliente: 'Ana López', estado: 'En Progreso', descripcion: 'Pantalla negra' },
        ]);
      } finally {
        setLoading({ ...loading, tickets: false });
      }
    };

    fetchTickets();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administración</h2>

      <section>
        <h3>Productos</h3>
        {loading.productos ? (
          <p>Cargando productos...</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button>Editar</button> <button>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3>Tickets SAT</h3>
        {loading.tickets ? (
          <p>Cargando tickets...</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.cliente}</td>
                  <td>{t.descripcion}</td>
                  <td>{t.estado}</td>
                  <td>
                    <button>Cambiar Estado</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Admin;
