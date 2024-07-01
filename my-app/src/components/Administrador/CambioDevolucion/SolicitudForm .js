// SolicitudForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SolicitudForm = () => {
  const [formData, setFormData] = useState({
    Estado_solicitud: '0',
    Motivo_solicitud: '',
    Producto_relacionado: '',
    Mensaje_recivido_cliente: '',
    correo_cliente: '',
    tipo_solicitud: '',
    nombreCliente: '',
    numeroContactoCliente: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/solicitud', formData);
      console.log(response.data);
      // Restablecer el formulario después de enviar los datos
      setFormData({
        Estado_solicitud: '0',
        Motivo_solicitud: '',
        Producto_relacionado: '',
        Mensaje_recivido_cliente: '',
        correo_cliente: '',
        tipo_solicitud: '',
        nombreCliente: '',
        numeroContactoCliente: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      
    </form>
  );
};

export default SolicitudForm;