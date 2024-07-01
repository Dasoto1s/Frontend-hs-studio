import React from 'react';
import { Link } from 'react-router-dom';
import logoHS from '../../../ImagenesFrontend/logo hs.jpg';
import metodosPago from '../../../ImagenesFrontend/Metodos-de-Pago-CeHIs-Bancolombia.png';
import nequi from '../../../ImagenesFrontend/NEQUI.jpg';
import efecty from '../../../ImagenesFrontend/EFECTY.png';
import redes from '../../../ImagenesFrontend/redes.jpg';

const PieDePagina = () => {
  return (
    <footer className="modulo1__cajaFooter">
      <img className="modulo1__logo" src={logoHS} alt="" />
      <section className="modulo1__footer">
        <h4>SOBRE HS STUDIO</h4>
        <ul>
      
          <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
        </ul>
      </section>
      <section className="modulo1__footer">
        <h4>MAS INFORMACION</h4>
        <ul>
        <li><Link to="/cambio-devolucion">Cambios y Devoluciones</Link></li>
        </ul>
      </section>
      <section className="modulo1__footer modulo1__pagoImagen">
        <h4>METODOS DE PAGO</h4>
        <div className="modulo1__metodosPago">
          <img src={metodosPago} alt="Métodos de pago" />
          <img src={nequi} alt="Nequi" />
          <img src={efecty} alt="Efecty" />
        </div>
      </section>
      <section className="modulo1__footer modulo1__pagoImagen">
        <h4>SIGUENOS</h4>
        <p>@hstudio76</p>
        <img className="modulo1__redes" src={redes} alt="" />
      </section>
    </footer>
  );
};

export default PieDePagina;