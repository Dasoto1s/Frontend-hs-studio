import React from 'react';
import './../../../CSS/Cliente/SobreNosotros.css';
import quienesSomosImagen from '../../../ImagenesFrontend/quiens somos.jpg';
import mejorPrecioImagen from '../../../ImagenesFrontend/mejor-precio.png';
import envioGratisImagen from '../../../ImagenesFrontend/entrega-gratis.png';
import altaCalidadImagen from '../../../ImagenesFrontend/alta-calidad.png';
import Encabezado from './Encabezado';
import BarraNavegacion from './BarraNavegacion';

const SobreNosotros = ({ toggleCarritoModal }) => {
  return (
    <div className="modulo1">
      <Encabezado />
      <BarraNavegacion toggleCarritoModal={toggleCarritoModal} />
      <div className="contenedor-principal">
        <section id="quienes-somos">
          <div className="contenedor">
            <div className="descripcion">
              <h3>Quiénes Somos</h3>
              <p className='Modulo1-texto'>
                Somos una empresa dedicada a la fabricación y venta de calzado. Contamos con más de 10 años de experiencia en el sector.
              </p>
              <h3>Nuestra historia</h3>
              <p className='Modulo1-texto'>
                La empresa fue fundada en 2013 por la familia Gómez en la ciudad de Bogotá. Comenzaron con un pequeño taller y hoy en día han crecido hasta tener su propia fábrica y tiendas alrededor del país.
              </p>
              <h3>Misión</h3>
              <p className='Modulo1-texto'>
                Ofrecer calzado de la más alta calidad siguiendo las últimas tendencias de la moda. Buscamos satisfacer las necesidades de nuestros clientes a través de nuestras líneas de zapatos diseñados para toda ocasión.
              </p>
              <h3>Visión</h3>
              <p className='Modulo1-texto'>
                Ser una empresa líder en el sector de calzado en Colombia, reconocida por su innovación, la calidad de los materiales y la atención personalizada al clientes. Buscamos expandir nuestra presencia digital en el país y la región.
              </p>
            </div>
            <div className="imagen">
              <img src={quienesSomosImagen} alt="" />
            </div>
          </div>
        </section>

        <section>
  <h1 className="tituloSobreNosotros">¿Por qué Comprar con Nosotros?</h1>
  <div className="mejorPrecio">
    <div className="pre">
      <img className="imagenMejorPre" src={mejorPrecioImagen} alt="Mejor Precio" />
      <h4>EL MEJOR PRECIO</h4>
      <p className='Modulo1-texto'>Ofrecemos los precios más competitivos del mercado para que obtengas el mejor valor por tu dinero.</p>
    </div>
    <div className="envio">
      <img className="imagenMejorPre" src={envioGratisImagen} alt="Envío Gratis" />
      <h4>ENVÍO GRATIS</h4>
      <p className='Modulo1-texto'>Disfruta de envíos gratuitos en todos nuestros productos sin importar el valor de tu compra.</p>
    </div>
    <div className="calidad">
      <img className="imagenMejorPre" src={altaCalidadImagen} alt="Alta Calidad" />
      <h4>LA MEJOR CALIDAD</h4>
      <p className='Modulo1-texto'>Nos comprometemos a ofrecer calzado de la más alta calidad, garantizando durabilidad y confort.</p>
    </div>
  </div>
</section>

      </div>
    </div>
  );
};

export default SobreNosotros;