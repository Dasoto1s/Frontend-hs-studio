import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../SideMenu';
import BuscarProductoDestacado from './BuscarProductoDestacado';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Destacados = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    obtenerDestacados();
  }, []);

  const obtenerDestacados = async () => {
    try {
      const response = await axios.get('http://localhost:8080/destacados');
      setDestacados(response.data);
    } catch (error) {
      console.error('Error al obtener los productos destacados:', error);
    }
  };

  const handleEliminarDestacado = async (destacadoId) => {
    try {
      await axios.delete(`http://localhost:8080/destacados/${destacadoId}`);
      obtenerDestacados();
    } catch (error) {
      console.error('Error al eliminar el producto destacado:', error);
    }
  };

  const handleDestacadoAgregado = async () => {
    try {
      await obtenerDestacados();
    } catch (error) {
      console.error('Error al obtener los productos destacados actualizados:', error);
    }
  };

  return (
    <div className="container">
      <SideMenu />
      <div className="content">
        <h2>Destacados</h2>
        <BuscarProductoDestacado onDestacadoAgregado={handleDestacadoAgregado} destacados={destacados} />
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {destacados.map((destacado) => (
              <tr key={destacado.id}>
                <td>
                  {destacado.producto && destacado.producto.imagen && (
                    <img
                      src={`data:image/jpeg;base64,${destacado.producto.imagen}`}
                      alt={destacado.producto.nombre}
                    />
                  )}
                </td>

              

                <td>{destacado.producto ? destacado.producto.nombre : '' }</td>
                <td>{destacado.producto ? destacado.producto.descripcion : ''}</td>
                <td>{destacado.producto ? `$${formatCurrency(destacado.producto.precio)}` : ''}</td>
                <td>{destacado.producto ? destacado.producto.talla : ''}</td>
                <td>{destacado.producto ? destacado.producto.color : ''}</td>
                <td>{destacado.producto ? destacado.producto.genero : ''}</td>
                <td>{destacado.producto ? destacado.producto.tipoZapato : ''}</td>
                <td>
                  <button onClick={() => handleEliminarDestacado(destacado.id)} className="eliminar">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Destacados;