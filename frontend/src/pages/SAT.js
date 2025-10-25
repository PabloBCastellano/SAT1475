// src/pages/SAT.js
import React, { useState } from 'react';
import axios from 'axios';

const SAT = () => {
  const [ticket, setTicket] = useState({
    cliente: '',
    telefono: '',
    correo: '',
    descripcion: '',
    estado: 'Pendiente',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajusta la URL con la de tu backend en Render
      await axios.post('https://sat1475.onrender.com/api/tickets', ticket);
      alert('Ticket enviado correctamente');
      setTicket({
        cliente: '',
        telefono: '',
        correo: '',
        descripcion: '',
        estado: 'Pendiente',
      });
    } catch (err) {
      console.error('Error al enviar ticket:', err);
      alert('Error al enviar el ticket');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Solicitar Asistencia Técnica (SAT)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del cliente:</label>
          <input
            type="text"
            name="cliente"
            value={ticket.cliente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="number"
            name="telefono"
            value={ticket.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={ticket.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción de la incidencia:</label>
          <textarea
            name="descripcion"
            value={ticket.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar Ticket</button>
      </form>
    </div>
  );
};

export default SAT;
