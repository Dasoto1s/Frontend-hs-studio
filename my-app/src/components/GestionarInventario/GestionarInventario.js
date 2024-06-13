import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../SideMenu';
import '../GestionarInventario/GestionarInventario';
import AgregarProducto from '../GestionarInventario/AgregarProducto';
import { useNavigate, useLocation } from 'react-router-dom';
import BuscarProducto from './BuscarProductoInventario ';

const GestionarInventario = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleEditarProducto = (producto) => {
    navigate(`/editar-producto/${producto.idProducto}`, { state: producto });
  };

  const handleEliminarProducto = async (idProducto) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:8080/productos/${idProducto}`);
        obtenerProductos(); // Actualizar la lista de productos después de eliminar
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const handleBusquedaRealizada = (resultados) => {
    setProductos(resultados);
  };

  return (
    <div className="container">
      <SideMenu />
      <div className="content">
        <h2>Gestionar Inventario</h2>
        <BuscarProducto onBusquedaRealizada={handleBusquedaRealizada} />
        <div className="table-container">
          <table className="productos-tabla" id="tabla-inventario">
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
                <th>Cantidad</th>
                <th>Stock</th>
                
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.idProducto}>
                  <td>
                    {producto.imagen && (
                      <img
                        src={`data:image/jpeg;base64,${producto.imagen}`}
                        alt={producto.nombre}
                      />
                    )}
                  </td>
                  <td className="nombre-celda"title={producto.nombre}>{producto.nombre}</td>
                  <td className="descripcion-celda" title={producto.descripcion}>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.talla}</td>
                  <td>{producto.color}</td>
                  <td>{producto.genero}</td>
                  <td>{producto.tipoZapato}</td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.stock}</td>
                 
                  <td>
                    <button onClick={() => handleEditarProducto(producto)}>
                      Editar
                    </button>
                    <br></br>
                    <button onClick={() => handleEliminarProducto(producto.idProducto)} className="eliminar">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Agregar productos</h2>
        <button
  onClick={() => setMostrarFormularioAgregar(true)}
  style={{
    marginTop: '3rem',
    padding: '1rem',
    width: '80%',
    borderRadius: '2rem',
    backgroundColor: '#8FBDBB',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '1.4rem',
    backgroundColor: '',
    
  }}
>
  Agregar Producto
</button>
        {mostrarFormularioAgregar && (
          <AgregarProducto onProductoAgregado={() => {
            setMostrarFormularioAgregar(false);
            obtenerProductos();
          }} />
        )}
      </div>
    </div>
  );
};

export default GestionarInventario;