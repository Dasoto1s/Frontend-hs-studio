import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarritoCompras from '../CarritoCompras/CarritoCompras';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const ProductosNinos = ({ toggleCarritoModal, showCarritoModal }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductosNinos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pagina-principal/productos/niño');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos de niños:', error);
      }
    };

    obtenerProductosNinos();
  }, []);

  return (
    <div className="modulo1">
      {showCarritoModal && <CarritoCompras isModal={true} toggleCarritoModal={toggleCarritoModal} />}
      <div className="modulo1__sombra">
        <h2 className="modulo1__titulo">Niños</h2>
        <div className="modulo1__productos-contenedor">
          {productos.map((producto, index) => (
            <div key={index} className="modulo1__card">
              {producto.imagen && (
                <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={producto.nombre} />
              )}
              <div className="modulo1__card-body">
                <h5 className="modulo1__card-title">{producto.nombre}</h5>
                <p className="modulo1__card-text">{producto.descripcion}</p>
                <div className="modulo1__boton-container">
                  <p className="modulo1__precio">${formatCurrency(producto.precio)}</p>
                  <Link
                    to={`/producto/${producto.idProducto}`}
                    className="modulo1__boton"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductosNinos;