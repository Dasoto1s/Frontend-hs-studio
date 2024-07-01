import React, { useState } from 'react';
import axios from 'axios';

const BuscarImagenBanner = ({ onImagenModificada, banner }) => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleImagenSeleccionada = async (evento) => {
    const imagen = evento.target.files[0];
    setImagenSeleccionada(imagen);
  
    if (imagen && banner.id) {
      try {
        const formData = new FormData();
        formData.append('imagen', imagen);
  
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:8080/banner/${banner.id}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
  
        onImagenModificada();
        setImagenSeleccionada(null);
      } catch (error) {
        console.error('Error al modificar la imagen del banner:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImagenSeleccionada} />
    </div>
  );
};

export default BuscarImagenBanner;