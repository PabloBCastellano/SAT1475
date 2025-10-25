// src/pages/Montador.js
import React, { useState } from 'react';

const Montador = () => {
  const [configuracion, setConfiguracion] = useState({
    cpu: '',
    gpu: '',
    ram: '',
    ssd: '',
    motherboard: '',
    power: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfiguracion({ ...configuracion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Configuración guardada (simulación)');
    console.log('Configuración:', configuracion);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Configurador de PC</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CPU:</label>
          <select name="cpu" value={configuracion.cpu} onChange={handleChange}>
            <option value="">Selecciona una CPU</option>
            <option value="Intel i5">Intel i5</option>
            <option value="AMD Ryzen 5">AMD Ryzen 5</option>
          </select>
        </div>
        <div>
          <label>GPU:</label>
          <select name="gpu" value={configuracion.gpu} onChange={handleChange}>
            <option value="">Selecciona una GPU</option>
            <option value="RTX 3060">RTX 3060</option>
            <option value="RX 6700 XT">RX 6700 XT</option>
          </select>
        </div>
        <div>
          <label>RAM:</label>
          <select name="ram" value={configuracion.ram} onChange={handleChange}>
            <option value="">Selecciona RAM</option>
            <option value="16 GB">16 GB</option>
            <option value="32 GB">32 GB</option>
          </select>
        </div>
        <button type="submit">Guardar Configuración</button>
      </form>
    </div>
  );
};

export default Montador;
