import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../../../CSS/Cliente/CarritoModal.css';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const CarritoCompras = ({ isModal, toggleCarritoModal, onProductoEliminado }) => {
  const [carrito, setCarrito] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerCarrito();
  }, []);

  const obtenerCarrito = async () => {
    try {
      const sessionId = Cookies.get('sessionId');
      const response = await axios.get('http://localhost:8080/carrito-compras/productos', {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      setCarrito(response.data);
      setCargando(false);
    } catch (error) {
      console.error('Error al obtener el carrito de compras:', error);
      setError('No se pudo cargar el carrito de compras. Por favor, intenta nuevamente.');
      setCargando(false);
    }
  };
  
  const eliminarProducto = async (idProducto) => {
    try {
      const sessionId = Cookies.get('sessionId');
      await axios.delete(`http://localhost:8080/carrito-compras/eliminar-producto/${idProducto}`, {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      await obtenerCarrito();
      if (onProductoEliminado) {
        onProductoEliminado();
      }
      // Si el carrito está vacío después de eliminar el producto, cerramos el modal
      if (isModal && carrito.productos.length === 1) {
        toggleCarritoModal();
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleFinalizarCompra = () => {
    if (isModal) {
      toggleCarritoModal();
    }
    navigate('/informacion-cliente');
  };

  if (cargando) {
    return <div className="carrito-modal__cargando">Cargando...</div>;
  }

  if (error) {
    return <div className="carrito-modal__error">{error}</div>;
  }

  const productosAgrupados = carrito.productos.reduce((acc, producto) => {
    if (acc[producto.idProducto]) {
      acc[producto.idProducto].cantidad++;
    } else {
      acc[producto.idProducto] = { ...producto, cantidad: 1 };
    }
    return acc;
  }, {});

  const productosOrdenados = Object.values(productosAgrupados);

  const contenidoCarrito = (
    <div className={isModal ? "carrito-modal__body" : "carrito-compras"}>
      <div className={isModal ? "carrito-modal__productos" : "carrito-compras__productos"}>
        {productosOrdenados.length > 0 ? (
          productosOrdenados.map((producto, index) => (
            <div key={index} className="carrito-modal__producto">
              <img
                src={`data:image/jpeg;base64,${producto.imagen}`}
                alt={producto.nombre}
              />
              <div className="carrito-modal__detalles">
                <h3>{producto.nombre}</h3>
                <p>Precio: {formatCurrency(producto.precio)}</p>
                <p>Cantidad: {producto.cantidad}</p>
                {!isModal && (
                  <>
                    <p>Talla: {producto.talla}</p>
                    <p>Color: {producto.color}</p>
                    <p>Género: {producto.genero}</p>
                    <p>Tipo de Zapato: {producto.tipoZapato}</p>
                  </>
                )}
              </div>
              <div className="carrito-modal__eliminar">
                <button 
                  className="carrito-modal__eliminar-btn" 
                  onClick={() => eliminarProducto(producto.idProducto)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="carrito-modal__vacio">Tu carrito de compras está vacío.</p>
        )}
      </div>
      <div className={isModal ? "carrito-modal__total" : "carrito-compras__total"}>
        <p>Total: {formatCurrency(carrito ? carrito.precioTotal : 0)}</p>
        {carrito && carrito.productos.length > 0 && (
          <button
            className={isModal ? "carrito-modal__finalizar-btn" : "carrito-compras__finalizar-btn"}
            onClick={handleFinalizarCompra}
          >
            Finalizar Compra
          </button>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="carrito-modal">
        <div className="carrito-modal__content">
          <div className="carrito-modal__header">
            <h2>Carrito de Compras</h2>
            <button className="carrito-modal__close" onClick={toggleCarritoModal}>
              &times;
            </button>
          </div>
          {contenidoCarrito}
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-compras">
      <h2>Carrito de Compras</h2>
      {contenidoCarrito}
    </div>
  );
};

export default CarritoCompras;