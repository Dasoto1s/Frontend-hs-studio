import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Carrusel from './Carrusel';
import SeccionProductos from './SeccionProductos';
import PieDePagina from './PieDePagina';
import CarritoCompras from '../CarritoCompras/CarritoCompras';
import './../../../CSS/Cliente/PaginaPrincipal.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import imagen1 from '../../../ImagenesFrontend/8af3ae729eaa485f60b9db85f2d51455.png';
import imagen2 from '../../../ImagenesFrontend/hombre.jpg';
import imagen3 from '../../../ImagenesFrontend/mujer.jpg';

const PaginaPrincipal = ({ toggleCarritoModal, showCarritoModal }) => {
  const location = useLocation();
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [idPedidoExitoso, setIdPedidoExitoso] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment_status');
    const paymentId = urlParams.get('paymentId');

    if (paymentStatus === 'approved' && paymentId) {
      setPagoExitoso(true);
      setIdPedidoExitoso(paymentId);
      window.history.replaceState(null, '', window.location.pathname); // Limpiar los parámetros de la URL
    }
  }, []);

  useEffect(() => {
    if (pagoExitoso) {
      const timer = setTimeout(() => {
        setPagoExitoso(false);
      }, 5000); // El mensaje desaparecerá después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [pagoExitoso]);

  return (
    <div className="modulo1">
      
      {pagoExitoso && (
        <div className="alert alert-success" role="alert">
          ¡Pago exitoso para el pedido #{idPedidoExitoso}! Nos comunicaremos contigo pronto con los detalles del envío.
        </div>
      )}
      {showCarritoModal && <CarritoCompras isModal={true} toggleCarritoModal={toggleCarritoModal} />}
      
      <main className="modulo1__main">
        <Carrusel />
        <div className="modulo1__sombra">
          <h1 className="modulo1__titulo PaginaInicio">Productos Destacados</h1>
          <div className="modulo1__productos" id="marcoProductos">
            <SeccionProductos sectionId="marcoProductos" />
          </div>
          <div className="modulo1__ofertas" id="ofertas">
            <h1 className="modulo1__titulo">Ofertas Especiales</h1>
            <div className="modulo1__productos" id="contenedorOfertasEspeciales">
              <SeccionProductos sectionId="contenedorOfertasEspeciales" />
            </div>
            <section className="modulo1__img">
              <div className="modulo1__img-container">
                <Link className="modulo1__img1" to="/Promocion" style={{ backgroundImage: `url(${imagen1})` }}>
                  <span className="modulo1__img-texto"></span>
                </Link>
                <Link className="modulo1__img2" to="/hombre" style={{ backgroundImage: `url(${imagen2})` }}>
                  <span className="modulo1__img-texto"></span>
                </Link>
                <Link className="modulo1__img3" to="/mujer" style={{ backgroundImage: `url(${imagen3})` }}>
                  <span className="modulo1__img-texto"></span>
                </Link>
              </div>
            </section>
          </div>

          <h1 className="modulo1__titulo">
          <Link to="/productos-ninos" className="modulo1__tituloNiños">Niños</Link>
          </h1>
          <div className="modulo1__productos" id="contenedorProductosNinos">
            <SeccionProductos sectionId="contenedorProductosNinos" />
          </div>
        </div>
      </main>
      <div className="modulo1__parrafoFooter">
        <p className="modulo1__texto">SIGUENOS EN INSTAGRAM</p>
        <p className="modulo1__texto">@HSTUDIOS76</p>
      </div>
      <PieDePagina />
      <p className="modulo1__copyright">Copyright 2024 HS STUDIO. Todos Los Derechos Reservados</p>
    </div>
  );
};

export default PaginaPrincipal;