import React, { useState } from 'react';
import axios from 'axios';
import './BuscarProductoInventario '; // Importa el archivo CSS

const BuscarProductoInventario = ({ onBusquedaRealizada }) => {
  const [busqueda, setBusqueda] = useState('');

  const handleBusqueda = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/productos/buscar?palabrasClave=${busqueda}`);
      onBusquedaRealizada(response.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  return (
    <div className='buscadorInventario'>
      <form onSubmit={handleBusqueda} className='search-form'>
        <input
          type="text"
          placeholder="Buscar producto por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          
        />
        <button type="submit" className='search-button'>Buscar</button>
      </form>
    </div>
  );
};

export default BuscarProductoInventario;