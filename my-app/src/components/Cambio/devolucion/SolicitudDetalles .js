import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../../CSS/SolicitudDetalles.css';

const SolicitudDetalles = () => {
  const { solicitudId } = useParams();
  const [solicitud, setSolicitud] = useState(null);
  const [estadoSolicitud, setEstadoSolicitud] = useState(null);

  useEffect(() => {
    const fetchSolicitud = async () => {
      if (solicitudId && !solicitud) {
        try {
          const response = await axios.get(`http://localhost:8080/solicitud/${solicitudId}`);
          setSolicitud(response.data);
          setEstadoSolicitud(response.data.Estado_solicitud);
        } catch (error) {
          console.error('Error al obtener la solicitud:', error);
        }
      }
    };
    fetchSolicitud();
  }, [solicitudId, solicitud]);

  const handleCambiarEstado = () => {
    const nuevoEstado = estadoSolicitud === '0' ? '1' : '0';
    const confirmacion = window.confirm(`¿Estás seguro de cambiar el estado de la solicitud a ${nuevoEstado === '0' ? 'pendiente' : 'atendido'}?`);
    if (confirmacion) {
      axios
        .put(`http://localhost:8080/solicitud/${solicitud.N_solicitud}`, { Estado_solicitud: nuevoEstado })
        .then((response) => {
          console.log(response.data);
          setEstadoSolicitud(nuevoEstado);
        })
        .catch((error) => {
          console.error('Error al actualizar el estado:', error);
        });
    }
  };

  if (!solicitud) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalles-container">
      <h2>Detalles de la solicitud</h2>
      <div className="detalle-fila">
        <div className="detalle-celda">Número de solicitud:</div>
        <div className="detalle-valor">{solicitud.N_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Estado de la solicitud:</div>
        <div className={`detalle-valor ${estadoSolicitud === '0' ? 'estado-pendiente' : 'estado-atendido'}`}>
          {estadoSolicitud === '0' ? 'Pendiente' : 'Atendido'}
          <button onClick={handleCambiarEstado}>
            {estadoSolicitud === '0' ? 'Marcar como atendido' : 'Marcar como pendiente'}
          </button>
        </div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Motivo de la solicitud:</div>
        <div className="detalle-valor">{solicitud.Motivo_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Producto relacionado:</div>
        <div className="detalle-valor">{solicitud.Producto_relacionado}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Mensaje del cliente:</div>
        <div className="detalle-valor">{solicitud.Mensaje_recivido_cliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Fecha de solicitud:</div>
        <div className="detalle-valor">{solicitud.Fecha_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Correo del cliente:</div>
        <div className="detalle-valor">{solicitud.Correo_Cliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Tipo de solicitud:</div>
        <div className="detalle-valor">{solicitud.Tipo_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Nombre del cliente:</div>
        <div className="detalle-valor">{solicitud.nombreCliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Número de contacto del cliente:</div>
        <div className="detalle-valor">{solicitud.numeroContactoCliente}</div>
      </div>
      <Link to="/" className="btn-volver">
        Volver a la lista de solicitudes
      </Link>
    </div>
  );
};

export default SolicitudDetalles;