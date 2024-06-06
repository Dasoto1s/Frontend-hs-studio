import React from 'react';
import '../CSS/SolicitudList.css';
import { Link } from 'react-router-dom';
import perfilImagen from '../Imagenes/foto perfil.webp';

const SideMenu = () => {
  const handleLogout = () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmacion) {
      // Eliminar el token del almacenamiento local
      localStorage.removeItem('token');
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/admin/login';
    }
  };

  return (
    <div className="menu">
      <div className="perfil">
        <img src={perfilImagen} alt="Perfil del administrador" />
        <p>Nombre del Administrador</p>
      </div>
      <ul className="opciones">
        <li><Link to="/gestionarInventario">Gestionar Inventario</Link></li>
        <li><Link to="/gestionarCambiosDevoluciones">Devoluciones / Cambios</Link></li>
        <li><Link to="/gestionarbannerDestacados">Promociones</Link></li>
        <li><Link to="/destacados">Destacados</Link></li>
        <li><Link to="/banner">Banner</Link></li>
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><a href="index.html" id="verTienda" target="_blank" rel="noopener noreferrer">Ver Tienda</a></li>
        <li><Link to="#" onClick={handleLogout}>Cerrar Sesión</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;