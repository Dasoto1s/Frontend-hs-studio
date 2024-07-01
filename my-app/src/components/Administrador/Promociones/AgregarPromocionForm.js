import React, { useState } from 'react';
import axios from 'axios';

const AgregarPromocionForm = ({ producto, onPromocionAgregada, onCerrar, promociones }) => {
  const [descuento, setDescuento] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false); // Nueva variable de estado para el mensaje de éxito

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar si el descuento está vacío
    if (!descuento) {
      setError('Por favor, ingrese un descuento válido.');
      return;
    }
  
    // Verificar si el producto ya existe en la lista de promociones
    const productoExistente = promociones.find(
      (promocion) => promocion.producto.idProducto === producto.idProducto
    );
  
    if (productoExistente) {
      setError('El producto ya existe en la sección de promociones.');
      return;
    }
  
    try {
      await axios.post(`http://localhost:8080/promociones/${producto.idProducto}`, null, {
        params: {
          descuento: descuento,
        },
      });
      setError(''); // Limpiar el mensaje de error
      alert('Producto añadido exitosamente a la promoción.'); // Mostrar mensaje de éxito
      setDescuento('');
      onCerrar();
    } catch (error) {
      console.error('Error al agregar promoción:', error);
      setError('Error al agregar promoción.'); // Mostrar mensaje de error
    }
  };
  return (
    <div>
      {producto && <h3>{producto.nombre}</h3>}
      {error && <p>{error}</p>}
      {exito && <p>Producto añadido exitosamente a la promoción.</p>} {/* Mostrar el mensaje de éxito */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descuento"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
        />
        <button type="submit">Agregar promoción</button>
      </form>
    </div>
  );
};

export default AgregarPromocionForm;