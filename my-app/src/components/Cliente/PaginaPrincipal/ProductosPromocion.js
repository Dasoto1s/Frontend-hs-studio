import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CarritoCompras from '../CarritoCompras/CarritoCompras';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const OfertasEspeciales = ({ toggleCarritoModal, showCarritoModal }) => {
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    const obtenerPromociones = async () => {
      try {
        const response = await axios.get('http://localhost:8080/promociones');
        setPromociones(response.data);
      } catch (error) {
        console.error('Error al obtener las promociones:', error);
      }
    };

    obtenerPromociones();
  }, []);

  const calcularPrecioConDescuento = (precio, descuento) => {
    return precio - (precio * (descuento / 100));
  };

  return (
    <div className="modulo1">
      {showCarritoModal && <CarritoCompras isModal={true} toggleCarritoModal={toggleCarritoModal} />}
      <div className="modulo1__sombra">
        <h2 className="modulo1__titulo">Ofertas Especiales</h2>
        <div className="modulo1__productos-contenedor">
          {promociones.map((promocion, index) => (
            <div key={index} className="modulo1__card">
              {promocion.producto.imagen && (
                <img src={`data:image/jpeg;base64,${promocion.producto.imagen}`} alt={promocion.producto.nombre} />
              )}
              <div className="modulo1__card-body">
                <h5 className="modulo1__card-title">{promocion.producto.nombre}</h5>
                <p className="modulo1__card-text">{promocion.producto.descripcion}</p>
                <div className="modulo1__boton-container">
                  <p className="modulo1__precio-original" style={{ textDecoration: 'line-through', color: '#888' }}>
                    {formatCurrency(promocion.producto.precio)}
                  </p>
                  <p className="modulo1__precio-descuento" style={{ fontWeight: 'bold', color: '#000000', fontSize: '1.2em' }}>
                    {formatCurrency(calcularPrecioConDescuento(promocion.producto.precio, promocion.descuento))}
                  </p>
                  <p className="modulo1__descuento" style={{ backgroundColor: '#000000', color: 'white', padding: '2px 5px', borderRadius: '3px' }}>
                    - {promocion.descuento}%
                  </p>
                  <Link
                    to={`/producto/${promocion.producto.idProducto}`}
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

export default OfertasEspeciales;