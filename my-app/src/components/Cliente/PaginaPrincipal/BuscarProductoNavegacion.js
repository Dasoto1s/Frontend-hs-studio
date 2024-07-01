import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const BuscarProductoNavegacion = ({ onProductoSeleccionado }) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBusqueda = async (e) => {
    e.preventDefault();
    try {
      const isNumeric = !isNaN(busqueda) && isFinite(busqueda);
      const response = await axios.get(`http://localhost:8080/productos/buscar?${isNumeric ? `idProducto=${busqueda}` : `palabrasClave=${encodeURIComponent(busqueda)}`}`);
      setResultados(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleProductoSeleccionado = (producto) => {
    onProductoSeleccionado(producto);
    setModalIsOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="buscador-producto-navegacion">
      <form onSubmit={handleBusqueda} className="buscador-producto-navegacion__form">
        <input
          type="text"
          placeholder="Buscar producto por nombre o ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador-producto-navegacion__input"
        />
        <button type="submit" className="buscador-producto-navegacion__button">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="buscador-producto-navegacion__modal"
        overlayClassName="buscador-producto-navegacion__modal-overlay"
      >
        <div className="buscador-producto-navegacion__modal-content">
          <h2>Resultados de la búsqueda</h2>
          {resultados.length > 0 ? (
            <ul className="buscador-producto-navegacion__resultado-list">
              {resultados.map((producto) => (
                <li key={producto.idProducto} onClick={() => handleProductoSeleccionado(producto)} className="buscador-producto-navegacion__resultado-item">
                  <img
                    src={`data:image/jpeg;base64,${producto.imagen}`}
                    alt={producto.nombre}
                    className="buscador-producto-navegacion__resultado-image"
                  />
                  <h3 className="buscador-producto-navegacion__resultado-title">{producto.nombre}</h3>
                  <p className="buscador-producto-navegacion__resultado-description">{producto.descripcion}</p>
                  <p className="buscador-producto-navegacion__resultado-price">Precio: {formatCurrency(producto.precio)}</p>
                  {/* Agrega más detalles del producto aquí */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="buscador-producto-navegacion__no-results">No se encontraron resultados.</p>
          )}
          <button onClick={closeModal} className="buscador-producto-navegacion__modal-close">
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BuscarProductoNavegacion;