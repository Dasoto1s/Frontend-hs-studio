import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import imagenCarrito from '../../../ImagenesFrontend/carro-de-la-compra.png';
import BuscarProductoNavegacion from './BuscarProductoNavegacion';

const BarraNavegacion = ({ toggleCarritoModal, carritoNumeroProductos }) => {
  const navigate = useNavigate();

  const handleProductoSeleccionado = (producto) => {
    navigate(`/producto/${producto.idProducto}`);
  };

  return (
    <nav className="modulo1__navegacion">
      <NavLink className="modulo1__btn" to="/">INICIO</NavLink>
      <NavLink className="modulo1__btn" to="/productos-hombre">HOMBRE</NavLink>
      <NavLink className="modulo1__btn" to="/productos-mujer">MUJER</NavLink>
      <NavLink className="modulo1__btn" to="/productos-promocion">PROMOCIONES</NavLink>
      <div className="modulo1__buscador">
        <BuscarProductoNavegacion onProductoSeleccionado={handleProductoSeleccionado} />
      </div>
      <button id="modulo1__carritoNavegacion" onClick={toggleCarritoModal}>
        <span
          className="modulo1__carrito-imagen"
          style={{ backgroundImage: `url(${imagenCarrito})` }}
        ></span>
        <span id="modulo1__carritoContador">({carritoNumeroProductos})</span>
      </button>
    </nav>
  );
};

export default BarraNavegacion;