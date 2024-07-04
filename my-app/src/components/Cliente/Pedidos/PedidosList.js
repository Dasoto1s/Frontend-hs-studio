import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from '../SideMenu';
import '../../CSS/SolicitudList.css';
import { Link } from 'react-router-dom';

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/pedidos');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };
    fetchPedidos();
  }, []);

  const getEstadoPedido = (estadoSolicitud) => {
    return estadoSolicitud ? 'Atendido' : 'Pendiente';
  };

  const actualizarEstadoPedido = async (pedidoId, nuevoEstado) => {
    try {
      const response = await axios.put(`http://localhost:8080/admin/pedidos/${pedidoId}`, { estado_solicitud_bool: nuevoEstado });
      console.log(response.data);
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.numeroPedido === pedidoId ? { ...pedido, Estado_solicitud: nuevoEstado } : pedido
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

return (
  <div className="container">
    <SideMenu />
    <div className="content">
      <h1>Gestión de Pedidos</h1>
      <div className='buscadorInventario'>
      <form  className='search-form'>
        <input
          type="text"
          placeholder="N° Pedido"
   
          
        />
        <button type="submit" className='search-button'>Buscar</button>
      </form>
    </div>
      <table>
        <thead>
          <tr>
            <th>Número de Pedido</th>
            <th>Fecha de Pedido</th>
            <th>Cliente</th>
            <th>Dirección de Envío</th>
            <th>Método de Pago</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.numeroPedido}>
              <td>{pedido.numeroPedido}</td>
              <td>{pedido.fechaPedido}</td>
              <td>{pedido.nombreCliente}</td>
              <td>{pedido.direccionEnvio}</td>
              <td>{pedido.metodoPagoCliente}</td>
              <td>{pedido.precioTotal}</td>
              <td className={`estado-pedido ${pedido.Estado_solicitud_bool ? 'atendido' : 'pendiente'}`}>
                {getEstadoPedido(pedido.Estado_solicitud_bool)}
              </td>
              <td>
              <Link
              to={{
                pathname: `/pedido/${pedido.numeroPedido}`,
                state: { pedido, actualizarEstadoPedido },
              }}
              className="btn-detalles"
            >
              Gestionar
            </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default PedidosList;