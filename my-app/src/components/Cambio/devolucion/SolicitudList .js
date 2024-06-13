import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from '../../SideMenu';
import '../../../CSS/SolicitudList.css';
import { Link } from 'react-router-dom';

const SolicitudList = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/solicitud');
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };
    fetchSolicitudes();
  }, []);

  return (
    <div className="container" id="container-solicitudes">
    <SideMenu />
    <div className="content" id="content-solicitudes">
        <h1>Gestión de Cambios y Devoluciones</h1>
        <h2>Lista de solicitudes</h2>
       
        <table>
          <thead>
            <tr>
              <th>Número de solicitud</th>
              <th>Estado de la solicitud</th>
              <th>Motivo de la solicitud</th>
              <th>Producto relacionado</th>
              <th>Mensaje del cliente</th>
              <th>Fecha de solicitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.N_solicitud}>
                <td>{solicitud.N_solicitud}</td>
                <td className={solicitud.Estado_solicitud === '0' ? 'estado-pendiente' : 'estado-atendido'}>
                  {solicitud.Estado_solicitud === '0' ? 'Pendiente' : 'Atendido'}
                </td>
                <td>{solicitud.Motivo_solicitud}</td>
                <td>{solicitud.Producto_relacionado}</td>
                <td>{solicitud.Mensaje_recivido_cliente}</td>
                <td>{solicitud.Fecha_solicitud}</td>
                <td>
                  <Link to={`/solicitud/${solicitud.N_solicitud}`} className="btn-detalles">
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

export default SolicitudList;