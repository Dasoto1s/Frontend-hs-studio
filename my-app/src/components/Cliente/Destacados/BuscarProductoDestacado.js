import React, { useState } from 'react';
import axios from 'axios';
import './BuscarProductoDestacado'; // Importa el archivo CSS

const BuscarProductoDestacado = ({ onDestacadoAgregado, destacados }) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBusqueda = async (e) => {
    e.preventDefault();
    try {
      const isNumeric = !isNaN(busqueda) && isFinite(busqueda);
      const response = await axios.get(`http://localhost:8080/productos/buscar?${isNumeric ? `idProducto=${busqueda}` : `palabrasClave=${busqueda}`}`);
      setResultados(response.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleAgregarDestacado = async (producto) => {
    const confirmacion = window.confirm(`¿Estás seguro de que quieres agregar "${producto.nombre}" a Destacados?`);
    if (confirmacion) {
      try {
        await axios.post(`http://localhost:8080/destacados/${producto.idProducto}`);
        onDestacadoAgregado(); // Actualizar la lista de productos destacados
      } catch (error) {
        console.error('Error al agregar el producto a Destacados:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleBusqueda} className="search-form">
        <input
          type="text"
          placeholder="Buscar producto por nombre o ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      {resultados.length > 0 ? (
        <div className="results-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Talla</th>
                <th>Color</th>
                <th>Género</th>
                <th>Tipo de Zapato</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((producto) => (
                <tr key={producto.idProducto}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.talla}</td>
                  <td>{producto.color}</td>
                  <td>{producto.genero}</td>
                  <td>{producto.tipoZapato}</td>
                  <td>
                    <button onClick={() => handleAgregarDestacado(producto)}>Agregar Destacados</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontraron productos</p>
      )}
    </div>
  );
};

export default BuscarProductoDestacado;