// Encabezado.js
import React from 'react';
import { Link } from 'react-router-dom';

const Encabezado = () => {
  return (
    <header>
      <Link to="/">
        <h1 className="modulo1__encabezado modulo1">HS STUDIO</h1>
      </Link>
      
    </header>
  );
};

export default Encabezado;