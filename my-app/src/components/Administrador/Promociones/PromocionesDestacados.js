import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../CSS/Administrador/PromocionesDestacados.css';
import SideMenu from '../SideMenu';
import BuscarProducto from './BuscarProducto';
import AgregarPromocionForm from './AgregarPromocionForm';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const PromocionesDestacados = () => {
  const [promociones, setPromociones] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    obtenerPromociones();
  }, []);

  const obtenerPromociones = async () => {
    try {
      const response = await axios.get('http://localhost:8080/promociones');
      setPromociones(response.data);
    } catch (error) {
      console.error('Error al obtener las promociones:', error);
    }
  };

  const handleEliminarPromocion = (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este producto de promociones?');
    if (confirmacion) {
      axios.delete(`http://localhost:8080/promociones/${id}`)
        .then(response => {
          setPromociones(promociones.filter(promocion => promocion.id !== id));
        })
        .catch(error => {
          console.error('Error al eliminar el producto de promociones:', error);
        });
    }
  };

  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalIsOpen(true);
  };

  const handleCerrarModal = () => {
    setModalIsOpen(false);
    setProductoSeleccionado(null);
  };

  const handlePromocionAgregada = (nuevaPromocion) => {
    setPromociones([...promociones, nuevaPromocion]);
  };

  const calcularPrecioConDescuento = (precio, descuento) => {
    const precioOriginal = parseFloat(precio);
    const descuentoDecimal = descuento / 100;
    const precioConDescuento = precioOriginal - (precioOriginal * descuentoDecimal);
    return Math.floor(precioConDescuento);
  };

  return (
    <div className="container">
      <SideMenu />
      <div className="content">
        <h2>Promociones</h2>
        <BuscarProducto onSeleccionarProducto={handleSeleccionarProducto} promociones={promociones} />
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Talla</th>
              <th>Color</th>
              <th>Género</th>
              <th>Tipo de Zapato</th>
              <th>Descuento</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {promociones.map(promocion => (
              <tr key={promocion.id}>
                <td>
                  {promocion.producto && promocion.producto.imagen && (
                    <img
                      src={`data:image/jpeg;base64,${promocion.producto.imagen}`}
                      alt={promocion.producto.nombre}
                    />
                  )}
                </td>
                <td>{promocion.producto ? promocion.producto.nombre : ''}</td>
                <td>{promocion.producto ? promocion.producto.descripcion : ''}</td>
                <td>{promocion.producto ? `$${formatCurrency(promocion.producto.precio)}` : ''}</td>
                <td>{promocion.producto ? promocion.producto.talla : ''}</td>
                <td>{promocion.producto ? promocion.producto.color : ''}</td>
                <td>{promocion.producto ? promocion.producto.genero : ''}</td>
                <td>{promocion.producto ? promocion.producto.tipoZapato : ''}</td>
                <td>{promocion.descuento}%</td>
                <td>{promocion.producto ? `$${formatCurrency(calcularPrecioConDescuento(promocion.producto.precio, promocion.descuento))}` : ''}</td>
                <td>
                  <button onClick={() => handleEliminarPromocion(promocion.id)} className="eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {productoSeleccionado && (
        <AgregarPromocionForm
          producto={productoSeleccionado}
          onPromocionAgregada={handlePromocionAgregada}
          onCerrar={handleCerrarModal}
          promociones={promociones}
        />
      )}
    </div>
  );
};

export default PromocionesDestacados;