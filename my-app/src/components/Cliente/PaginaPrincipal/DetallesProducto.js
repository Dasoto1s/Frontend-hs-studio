import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './../../../CSS/Cliente/DetallesProducto.css';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import CarritoCompras from '../CarritoCompras/CarritoCompras';
import BuscarProducto from './BuscarProductoNavegacion';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const DetallesProducto = ({ agregarAlCarrito, toggleCarritoModal, showCarritoModal, onProductoSeleccionado }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/pagina-principal/producto/${id}`);
        setProducto(response.data);
        console.log('Datos del producto:', response.data);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        setError('No se pudo cargar los detalles del producto. Por favor, intenta nuevamente.');
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const agregarAlCarritoLocal = async (idProducto) => {
    try {
      let sessionId = Cookies.get('sessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        Cookies.set('sessionId', sessionId);
      }
  
      const response = await axios.post(
        'http://localhost:8080/carrito-compras/agregar-producto',
        idProducto,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Session-Id': sessionId,
          },
        }
      );
  
      agregarAlCarrito(response.data);
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

  const handleProductoSeleccionado = (producto) => {
    onProductoSeleccionado(producto);
  };

  if (cargando) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="modulo1">
      {showCarritoModal && <CarritoCompras isModal={true} toggleCarritoModal={toggleCarritoModal} />}
      <div className="modulo-detalles">
  
        {producto && (
          <>
            <div className="modulo-detalles__imagen">
              {producto.imagen && (
                <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={producto.nombre} />
              )}
            </div>
            <div className="modulo-detalles__body">
              <h2 className="modulo-detalles__title">{producto.nombre}</h2>
              <p className="modulo-detalles__text">{producto.descripcion}</p>
              <p className="modulo-detalles__precio">Precio: ${formatCurrency(producto.precio)}</p>
              <p className="modulo-detalles__text">Talla: {producto.talla}</p>
              <p className="modulo-detalles__text">Color: {producto.color}</p>
              <p className="modulo-detalles__text">Género: {producto.genero}</p>
              <p className="modulo-detalles__text">Tipo de Zapato: {producto.tipoZapato}</p>
              <button
                className="modulo-detalles__boton"
                onClick={() => agregarAlCarritoLocal(producto.idProducto)}
              >
                Agregar al Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetallesProducto;