import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../../CSS/Cliente/InformacionCliente.css';

const InformacionCliente = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentForm, setCurrentForm] = useState('informacion');
  const [pedidoId, setPedidoId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    obtenerCarrito();
  }, []);


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };


  const obtenerCarrito = async () => {
    try {
      const sessionId = Cookies.get('sessionId');
      const response = await axios.get('http://localhost:8080/carrito-compras/productos', {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      setCarrito(response.data.productos);
      setTotal(response.data.precioTotal); // Usar el total proporcionado por el servidor
    } catch (error) {
      console.error('Error al obtener el carrito de compras:', error);
    }
  };

  const calcularTotal = (productos) => {
    const totalCalculado = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    setTotal(totalCalculado);
  };

  const eliminarProducto = async (idProducto) => {
    try {
      const sessionId = Cookies.get('sessionId');
      await axios.delete(`http://localhost:8080/carrito-compras/eliminar-producto/${idProducto}`, {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      obtenerCarrito();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleContinueForm = async (e) => {
    e.preventDefault();
    const errors = {};

    if (nombre.length > 50) {
      errors.nombre = 'El nombre no debe exceder los 50 caracteres';
    }
    if (email.length > 30) {
      errors.email = 'El correo electrónico no debe exceder los 30 caracteres';
    }
    if (telefono.length > 38) {
      errors.telefono = 'El teléfono no debe exceder los 38 caracteres';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const sessionId = Cookies.get('sessionId');
      const response = await axios.post('http://localhost:8080/cliente', {
        nombre,
        correo: email,
        telefono: parseInt(telefono),
      }, {
        headers: {
          'X-Session-Id': sessionId,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setCurrentForm('envio');
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  };

  const handleSubmitEnvio = async (e) => {
    e.preventDefault();
    const errors = {};

    if (direccionEnvio.length > 80) {
      errors.direccionEnvio = 'La dirección de envío no debe exceder los 80 caracteres';
    }
    if (departamento.length > 40) {
      errors.departamento = 'El departamento no debe exceder los 40 caracteres';
    }
    if (ciudad.length > 40) {
      errors.ciudad = 'La ciudad no debe exceder los 40 caracteres';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const sessionId = Cookies.get('sessionId');
      const response = await axios.post('http://localhost:8080/pedidos/crear-pedido', {
        direccionEnvio,
        departamento,
        ciudad,
      }, {
        headers: {
          'X-Session-Id': sessionId,
        },
      });

      if (response.status === 200) {
        setPedidoId(response.data);
        setCurrentForm('pago');
      }
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/pedidos/seleccionar-metodo-pago', {
        idPedido: pedidoId,
        metodoPago,
      });

      if (response.status === 200 && response.data) {
        window.location.href = response.data;
      } else {
        console.error('No se recibió una URL válida de PayPal');
      }
    } catch (error) {
      console.error('Error al seleccionar el método de pago:', error);
    }
  };

  const productosAgrupados = carrito.reduce((acc, producto) => {
    if (acc[producto.idProducto]) {
      acc[producto.idProducto].cantidad++;
    } else {
      acc[producto.idProducto] = { ...producto, cantidad: 1 };
    }
    return acc;
  }, {});

  const productosOrdenados = Object.values(productosAgrupados);

  return (
    <div className="informacion-cliente__container">
      <div className="informacion-cliente__formulario">
        <h2>Finalizar Compra</h2>
        {/* Sección Información del Cliente */}
        <div
          id="informacion"
          className={`formulario-compra ${currentForm === 'informacion' ? 'active' : ''}`}
        >
          <h3>Información del Cliente</h3>
          <form id="informacion-cliente__form" className="informacion-cliente__form" onSubmit={handleContinueForm}>
            <div className="informacion-cliente__form-group">
              <label htmlFor="informacion-cliente__nombre">Nombre:</label>
              <input
                type="text"
                id="informacion-cliente__nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                maxLength={50}
                required
              />
              {formErrors.nombre && <span className="error-message">{formErrors.nombre}</span>}
            </div>
            <div className="informacion-cliente__form-group">
              <label htmlFor="informacion-cliente__email">Correo electrónico:</label>
              <input
                type="email"
                id="informacion-cliente__email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={30}
                required
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            <div className="informacion-cliente__form-group">
              <label htmlFor="informacion-cliente__telefono">Teléfono:</label>
              <input
                type="tel"
                id="informacion-cliente__telefono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                maxLength={38}
                required
              />
              {formErrors.telefono && <span className="error-message">{formErrors.telefono}</span>}
            </div>
            <button type="submit" className="informacion-cliente__submit-btn">
              Continuar
            </button>
          </form>
        </div>

        {/* Sección Dirección de Envío */}
        <div
          id="envio"
          className={`formularioEnvio ${currentForm === 'envio' ? 'active' : ''}`}
        >
          <h3>Dirección de Envío</h3>
          <form id="informacion-cliente__form" className="informacion-cliente__form" onSubmit={handleSubmitEnvio}>
            <div className="informacion-cliente__form-group">
              <label htmlFor="direccionEnvio">Dirección:</label>
              <input
                type="text"
                id="direccionEnvio"
                name="direccionEnvio"
                value={direccionEnvio}
                onChange={(e) => setDireccionEnvio(e.target.value)}
                maxLength={80}
                required
              />
              {formErrors.direccionEnvio && <span className="error-message">{formErrors.direccionEnvio}</span>}
            </div>
            <div className="informacion-cliente__form-group">
  <label htmlFor="departamento">Departamento:</label>
  <input
    type="text"
    id="departamento"
    name="departamento"
    value={departamento}
    onChange={(e) => {
      if (e.target.value.length <= 39) {
        setDepartamento(e.target.value);
      }
    }}
    placeholder="Escribe el departamento"
    required
  />
  {formErrors.departamento && <span className="error-message">{formErrors.departamento}</span>}
</div>


            <div className="informacion-cliente__form-group">
              <label htmlFor="ciudad">Ciudad:</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                maxLength={40}
                required
              />
              {formErrors.ciudad && <span className="error-message">{formErrors.ciudad}</span>}
            </div>
            <button type="submit" className="informacion-cliente__submit-btn">
              Continuar
            </button>
          </form>
        </div>

        {/* Sección Selección de Método de Pago */}
        <div
          id="pago"
          className={`metodoPago ${currentForm === 'pago' ? 'active' : ''}`}
        >
          <h3>Seleccionar Método de Pago</h3>
          <form id="informacion-cliente__form" className="informacion-cliente__form" onSubmit={handleSubmit}>
            <div className="informacion-cliente__form-group">
              <label htmlFor="informacion-cliente__metodoPago">Método de Pago:</label>
              <select
                id="informacion-cliente__metodoPago"
                name="metodoPago"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                required
              >
                <option value="">Seleccionar método de pago</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <button type="submit" className="informacion-cliente__submit-btn">
              Finalizar Pedido
            </button>
          </form>
        </div>
      </div>

      {/* Sección Resumen de Compra */}
      <div className="informacion-cliente__resumen">
        <h2>Resumen de la Compra</h2>
        <div className="informacion-cliente__productos">
          {productosOrdenados.map((producto, index) => (
            <div key={producto.idProducto} className="informacion-cliente__producto-item">
              <img
                src={`data:image/jpeg;base64,${producto.imagen}`}
                alt={producto.nombre}
                className="informacion-cliente__producto-imagen"
              />
              <div className="informacion-cliente__producto-details">
                <p className="informacion-cliente__producto-name">{producto.nombre}</p>
                <p className="informacion-cliente__producto-info">
                  Precio: <span className="informacion-cliente__precio">${formatCurrency(producto.precio)}</span> | Cantidad:{' '}
                  {producto.cantidad} | Talla: {producto.talla} | Color: {producto.color} | Género: {producto.genero} | Tipo de
                  Zapato: {producto.tipoZapato}
                </p>
              </div>
              <button
                className="informacion-cliente__eliminar-btn"
                onClick={() => eliminarProducto(producto.idProducto)}
              >
                &times;
              </button>
              {index < productosOrdenados.length - 1 && (
                <div className="informacion-cliente__producto-separator"></div>
              )}
            </div>
          ))}
        </div>
        <div className="informacion-cliente__total">
          <p>Total: ${formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default InformacionCliente;