import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../../CSS/Administrador/PedidoDetalles.css';

const PedidoDetalles = () => {
  const { pedidoId } = useParams();
  const [pedido, setPedido] = useState(null);
  const [estadoPedido, setEstadoPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      if (pedidoId) {
        try {
          const response = await axios.get(`http://localhost:8080/admin/pedidos/${pedidoId}`);
          setPedido(response.data);
          setEstadoPedido(response.data.Estado_solicitud_bool || '0'); // Establecer '0' si estado_solicitud es nulo
        } catch (error) {
          console.error('Error al obtener el pedido:', error);
        }
      }
    };
    fetchPedido();
  }, [pedidoId]);

  const handleCambiarEstadoPedido = async () => {
    const nuevoEstado = estadoPedido === '0' ? '1' : '0';
    const confirmacion = window.confirm(`¿Estás seguro de cambiar el estado del pedido a ${nuevoEstado === '0' ? 'pendiente' : 'atendido'}?`);
    if (confirmacion) {
      try {
        const response = await axios.put(`http://localhost:8080/admin/pedidos/${pedido.numeroPedido}`, { Estado_solicitud_bool: nuevoEstado });
        console.log(response.data);
        setPedido({ ...pedido, Estado_solicitud_bool: nuevoEstado });
        setEstadoPedido(nuevoEstado);
      } catch (error) {
        console.error('Error al actualizar el estado:', error);
      }
    }
  };

  if (!pedido) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="detalles-container">
      <h2 className="titulo">Detalles del Pedido</h2>
      <div className="detalle-fila">
        <div className="detalle-celda">Número de Pedido:</div>
        <div className="detalle-valor">{pedido.numeroPedido}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Fecha de Pedido:</div>
        <div className="detalle-valor">{pedido.fechaPedido}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Cliente:</div>
        <div className="detalle-valor">{pedido.nombreCliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Correo del Cliente:</div>
        <div className="detalle-valor">{pedido.correoCliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Teléfono del Cliente:</div>
        <div className="detalle-valor">{pedido.telefonoCliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Dirección de Envío:</div>
        <div className="detalle-valor">{pedido.direccionEnvio}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Departamento:</div>
        <div className="detalle-valor">{pedido.departamento}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Ciudad:</div>
        <div className="detalle-valor">{pedido.ciudad}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Método de Pago:</div>
        <div className="detalle-valor">{pedido.metodoPagoCliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Número de Productos:</div>
        <div className="detalle-valor">{pedido.numeroProductos}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Precio Total:</div>
        <div className="detalle-valor">{pedido.precioTotal}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Estado del Pedido:</div>
        <div className={`detalle-valor ${estadoPedido === '0' ? 'estado-pendiente' : 'estado-atendido'}`}>
          {estadoPedido === '0' ? 'Pendiente' : 'Atendido'}
          <button onClick={handleCambiarEstadoPedido}>
            {estadoPedido === '0' ? 'Marcar como atendido' : 'Marcar como pendiente'}
          </button>
        </div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Productos:</div>
        {pedido.productos && (
          <div className="detalle-valor">
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Talla</th>
                  <th>Color</th>
                  <th>Género</th>
                  <th>Tipo de Zapato</th>
                </tr>
              </thead>
              <tbody>
                {pedido.productos.map((producto) => (
                  <tr key={producto.idProducto}>
                    <td>{producto.idProducto}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.talla}</td>
                    <td>{producto.color}</td>
                    <td>{producto.genero}</td>
                    <td>{producto.tipoZapato}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Link to="/pedidos" className="btn-volver">
        Volver a la lista de pedidos
      </Link>
    </div>
  );
};

export default PedidoDetalles;