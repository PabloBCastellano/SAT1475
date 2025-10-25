// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white' }}>
      <h1>Tienda Microinformática SAT1475</h1>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/catalogo">Catálogo</Link> |{' '}
        <Link to="/montador">Configurador</Link> | <Link to="/sat">SAT</Link> |{' '}
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
