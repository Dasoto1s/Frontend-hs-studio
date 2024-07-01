import React, { useState } from 'react';
import './../../../CSS/Cliente/CambioDevolucion.css';
import Encabezado from './Encabezado';
import BarraNavegacion from './BarraNavegacion';

const CambioDevolucion = ({ toggleCarritoModal }) => {
  const [motivoSolicitud, setMotivoSolicitud] = useState('');
  const [productoRelacionado, setProductoRelacionado] = useState('');
  const [mensajeRecibidoCliente, setMensajeRecibidoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [numeroContactoCliente, setNumeroContactoCliente] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const toggleAcordeon = (titulo) => {
    const acordeon = titulo.closest('.modulo2__acordeon');
    const contenido = acordeon.querySelector('.modulo2__contenido');
    titulo.classList.toggle('modulo2__activo');
    const icono = titulo.querySelector('.modulo2__icono');
    icono.textContent = icono.textContent === '-' ? '+' : '-';
    if (contenido.style.display === 'block') {
      contenido.style.display = 'none';
    } else {
      contenido.style.display = 'block';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!motivoSolicitud.trim()) {
      errors.motivoSolicitud = 'El motivo de la solicitud es obligatorio';
    } else if (motivoSolicitud.length > 70) {
      errors.motivoSolicitud = 'El motivo de la solicitud no debe exceder los 70 caracteres';
    }

    if (!productoRelacionado.trim()) {
      errors.productoRelacionado = 'El producto relacionado es obligatorio';
    } else if (productoRelacionado.length > 50) {
      errors.productoRelacionado = 'El producto relacionado no debe exceder los 50 caracteres';
    }

    if (!mensajeRecibidoCliente.trim()) {
      errors.mensajeRecibidoCliente = 'El mensaje recibido del cliente es obligatorio';
    } else if (mensajeRecibidoCliente.length > 70) {
      errors.mensajeRecibidoCliente = 'El mensaje recibido del cliente no debe exceder los 70 caracteres';
    }

    if (!tipoSolicitud.trim()) {
      errors.tipoSolicitud = 'El tipo de solicitud es obligatorio';
    } else if (tipoSolicitud.length > 30) {
      errors.tipoSolicitud = 'El tipo de solicitud no debe exceder los 30 caracteres';
    }

    if (!nombreCliente.trim()) {
      errors.nombreCliente = 'El nombre del cliente es obligatorio';
    } else if (nombreCliente.length > 40) {
      errors.nombreCliente = 'El nombre del cliente no debe exceder los 40 caracteres';
    }

    if (!numeroContactoCliente.trim()) {
      errors.numeroContactoCliente = 'El número de contacto del cliente es obligatorio';
    } else if (numeroContactoCliente.length > 30) {
      errors.numeroContactoCliente = 'El número de contacto del cliente no debe exceder los 30 caracteres';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/solicitud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Motivo_solicitud: motivoSolicitud,
          Producto_relacionado: productoRelacionado,
          Mensaje_recivido_cliente: mensajeRecibidoCliente,
          Correo_Cliente: correoCliente,
          Tipo_solicitud: tipoSolicitud,
          nombreCliente: nombreCliente,
          numeroContactoCliente: numeroContactoCliente,
          Estado_solicitud: '0',
        }),
      });

      if (response.ok) {
        console.log('Solicitud creada con éxito');
        alert('La solicitud ha sido enviada con éxito.');
        setMotivoSolicitud('');
        setProductoRelacionado('');
        setMensajeRecibidoCliente('');
        setCorreoCliente('');
        setTipoSolicitud('');
        setNombreCliente('');
        setNumeroContactoCliente('');
        setFormErrors({});
        toggleAcordeon(document.querySelector('.modulo2__titulo'));
      } else {
        const errorData = await response.json();
        console.error('Error al crear la solicitud:', errorData);
        alert('Se produjo un error al enviar la solicitud. Por favor, inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error en la comunicación con el servidor:', error);
      alert('Se produjo un error en la comunicación con el servidor. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="modulo1">
      <Encabezado />
      <BarraNavegacion toggleCarritoModal={toggleCarritoModal} />
      <section className="modulo2__section">
        <h2 className="modulo2__titulo">Cambios y devoluciones</h2>
        <p className="modulo2__parrafo">
          Queremos que estés completamente satisfecho con tu compra. Si necesitas cambiar o devolver un producto, ten
          en cuenta las siguientes políticas:
        </p>
        <ul className="modulo2__lista">
          <li className='Modulo1-texto'>El producto debe estar en las mismas condiciones en que lo recibiste</li>
          <li className='Modulo1-texto'>Debes tener el recibo de compra</li>
          <li className='Modulo1-texto'>Los productos deben cambiarse o devolverse dentro de los 30 días de la fecha de compra</li>
        </ul>
        <h3 className="modulo2__titulo">Instrucciones para cambios y devoluciones:</h3>
        <ol className="modulo2__lista-ordenada">
          <li>
            <div className="modulo2__acordeon">
              <div className="modulo2__titulo formu" onClick={(e) => toggleAcordeon(e.currentTarget)}>
                Completa el siguiente formulario de cambio o devolución.
                <span className="modulo2__icono">+</span>
              </div>
              <div className="modulo2__contenido" style={{ display: 'none' }}>
                <form id="cambioDevolución" className="modulo2__formulario" onSubmit={handleSubmit}>
                  <h3 className="modulo2__titulo">Solicitud de cambio o devolución</h3>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Motivo de la solicitud</label>
                    <textarea
                      name="motivoSolicitud"
                      className="modulo2__textarea"
                      value={motivoSolicitud}
                      onChange={(e) => setMotivoSolicitud(e.target.value)}
                      maxLength={70}
                    ></textarea>
                    {formErrors.motivoSolicitud && <span className="modulo2__error">{formErrors.motivoSolicitud}</span>}
                  </div>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Producto relacionado</label>
                    <input
                      type="text"
                      name="productoRelacionado"
                      className="modulo2__input"
                      value={productoRelacionado}
                      onChange={(e) => setProductoRelacionado(e.target.value)}
                      maxLength={50}
                    />
                    {formErrors.productoRelacionado && <span className="modulo2__error">{formErrors.productoRelacionado}</span>}
                  </div>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Mensaje recibido del cliente</label>
                    <textarea
                      name="mensajeRecibidoCliente"
                      className="modulo2__textarea"
                      value={mensajeRecibidoCliente}
                      onChange={(e) => setMensajeRecibidoCliente(e.target.value)}
                      maxLength={70}
                    ></textarea>
                    {formErrors.mensajeRecibidoCliente && <span className="modulo2__error">{formErrors.mensajeRecibidoCliente}</span>}
                  </div>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Tipo de solicitud</label>
                    <select
                      name="tipoSolicitud"
                      className="modulo2__select"
                      value={tipoSolicitud}
                      onChange={(e) => setTipoSolicitud(e.target.value)}
                    >
                      <option value="">Selecciona el tipo de solicitud</option>
                      <option value="cambio">Cambio</option>
                      <option value="devolución">Devolución</option>
                    </select>
                    {formErrors.tipoSolicitud && <span className="modulo2__error">{formErrors.tipoSolicitud}</span>}
                  </div>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Nombre del cliente</label>
                    <input
                      type="text"
                      name="nombreCliente"
                      className="modulo2__input"
                      value={nombreCliente}
                      onChange={(e) => setNombreCliente(e.target.value)}
                      maxLength={40}
                    />
                    {formErrors.nombreCliente && <span className="modulo2__error">{formErrors.nombreCliente}</span>}
                  </div>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Número de contacto del cliente</label>
                    <input
                      type="text"
                      name="numeroContactoCliente"
                      className="modulo2__input"
                      value={numeroContactoCliente}
                      onChange={(e) => setNumeroContactoCliente(e.target.value)}
                      maxLength={30}
                    />
                    {formErrors.numeroContactoCliente && <span className="modulo2__error">{formErrors.numeroContactoCliente}</span>}
                  </div>
                  <div className="modulo2__campo">
                    <label className="modulo2__etiqueta">Correo electrónico del cliente</label>
                    <input
                      type="email"
                      name="correoCliente"
                      className="modulo2__input"
                      value={correoCliente}
                      onChange={(e) => setCorreoCliente(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="modulo2__boton">
                    Enviar solicitud
                  </button>
                </form>
              </div>
            </div>
          </li>
          <li className='Modulo1-texto'>Empaca bien el producto con su empaque original si es posible</li>
          <li className='Modulo1-texto'>Envíanos el producto junto con una copia de la factura</li>
          <li className='Modulo1-texto'>Nosotros procesaremos la solicitud en un plazo de X días hábiles</li>
          <li className='Modulo1-texto'>
            Para devoluciones, el reembolso se realizará en el mismo método de pago que utilizaste. Para cambios, enviaremos el producto de reemplazo sin costo adicional.
          </li>
        </ol>
        <p className="modulo2__parrafo">Si tienes alguna otra duda sobre cambios o devoluciones, contáctanos.</p>
      </section>
    </div>
  );
};

export default CambioDevolucion;