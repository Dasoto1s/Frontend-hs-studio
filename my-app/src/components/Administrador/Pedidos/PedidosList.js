import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from '../SideMenu';
import '../../../CSS/Administrador/SolicitudList.css';
import { Link } from 'react-router-dom';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const handleCambiarEstado = async (pedidoId, estadoActual) => {
    const nuevoEstado = estadoActual === '0' ? '1' : '0';
    const confirmacion = window.confirm(`¿Estás seguro de cambiar el estado del pedido a ${nuevoEstado === '0' ? 'pendiente' : 'atendido'}?`);
    if (confirmacion) {
      try {
        await axios.put(`http://localhost:8080/admin/pedidos/${pedidoId}`, nuevoEstado);
        fetchPedidos(); // Actualizar la lista de pedidos
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
      }
    }
  };

  return (
    <div className="container" id="container-pedidos">
      <SideMenu />
      <div className="content" id="content-pedidos">
        <h1>Gestión de Pedidos</h1>
        <table>
          <thead>
            <tr>
              <th>Número de Pedido</th>
              <th>Estado del Pedido</th>
              <th>Fecha de Pedido</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.numeroPedido}>
                <td>{pedido.numeroPedido}</td>
                <td className={pedido.Estado_solicitud === '0' ? 'estado-pendiente' : 'estado-atendido'}>
                  {pedido.Estado_solicitud === '0' ? 'Pendiente' : 'Atendido'}
                  <button onClick={() => handleCambiarEstado(pedido.numeroPedido, pedido.Estado_solicitud)}>
                    {pedido.Estado_solicitud === '0' ? 'Marcar como atendido' : 'Marcar como pendiente'}
                  </button>
                </td>
                <td>{pedido.fechaPedido}</td>
                <td>{pedido.nombreCliente}</td>
                <td>${formatCurrency(pedido.precioTotal)}</td>
                <td>
                  <Link to={`/pedido/${pedido.numeroPedido}`} className="btn-detalles">
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