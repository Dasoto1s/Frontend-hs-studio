import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const SeccionProductos = ({ sectionId }) => {
  const [productos, setProductos] = useState([]);
  const [promociones, setPromociones] = useState([]);
  const [productosNinos, setProductosNinos] = useState([]);

  const limitarDescripcion = (descripcion, maxCaracteres) => {
    if (descripcion.length > maxCaracteres) {
      return `${descripcion.substring(0, maxCaracteres)}...`;
    }
    return descripcion;
  };

  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      try {
        const response = await axios.get('http://localhost:8080/destacados');
        const productosDestacados = response.data.map(destacado => destacado.producto);
        setProductos(productosDestacados);
      } catch (error) {
        console.error('Error al obtener los productos destacados:', error);
      }
    };

    const obtenerProductosEnPromocion = async () => {
      try {
        const response = await axios.get('http://localhost:8080/promociones');
        setPromociones(response.data);
      } catch (error) {
        console.error('Error al obtener los productos en promoción:', error);
      }
    };

    const obtenerProductosNinos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pagina-principal/productos/niño');
        setProductosNinos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos de niños:', error);
      }
    };

    if (sectionId === 'marcoProductos') {
      obtenerProductosDestacados();
    } else if (sectionId === 'contenedorOfertasEspeciales') {
      obtenerProductosEnPromocion();
    } else if (sectionId === 'contenedorProductosNinos') {
      obtenerProductosNinos();
    }
  }, [sectionId]);

  return (
    <div className="modulo1__productos-contenedor">
      {sectionId === 'marcoProductos' &&
        productos.slice(0, 8).map((producto, index) => (
          <div className="modulo1__card" key={index}>
            <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={producto.nombre} />
            <div className="modulo1__card-body">
              <h5 className="modulo1__card-title">{producto.nombre}</h5>
              <p className="modulo1__card-text">{limitarDescripcion(producto.descripcion, 100)}</p>
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

{sectionId === 'contenedorOfertasEspeciales' &&
        promociones.map((promocion, index) => (
          <div className="modulo1__card" key={index}>
            <img src={`data:image/jpeg;base64,${promocion.producto.imagen}`} alt={promocion.producto.nombre} />
            <div className="modulo1__card-body">
              <h5 className="modulo1__card-title">{promocion.producto.nombre}</h5>
              <p className="modulo1__card-text">{limitarDescripcion(promocion.producto.descripcion, 100)}</p>
              <div className="modulo1__boton-container">
                <p className="modulo1__precio-original" style={{ textDecoration: 'line-through', color: '#888' }}>
                  {formatCurrency(promocion.producto.precio)}
                </p>
                <p className="modulo1__precio-descuento" style={{ fontWeight: 'bold', color: '#000000' }}>
                  {formatCurrency(promocion.producto.precio - (promocion.producto.precio * promocion.descuento / 100))}
                </p>
                <p className="modulo1__descuento" style={{ backgroundColor: '#000000', color: 'white', padding: '2px 5px', borderRadius: '3px' }}>
                  -{promocion.descuento}%
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

      {sectionId === 'contenedorProductosNinos' &&
        productosNinos.map((producto, index) => (
          <div className="modulo1__card" key={index}>
            {producto.imagen && (
              <img src={`data:image/jpeg;base64,${producto.imagen}`} alt={producto.nombre} />
            )}
            <div className="modulo1__card-body">
              <h5 className="modulo1__card-title">{producto.nombre}</h5>
              <p className="modulo1__card-text">{limitarDescripcion(producto.descripcion, 100)}</p>
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
  );
};

export default SeccionProductos;