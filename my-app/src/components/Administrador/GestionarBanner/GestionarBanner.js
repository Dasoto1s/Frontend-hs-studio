import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideMenu from '../SideMenu';
import BuscarImagenBanner from './BuscarImagenBanner';

const GestionarBanner = () => {
  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    obtenerImagenesBanner();
  }, []);

  const obtenerImagenesBanner = async () => {
    try {
      const response = await axios.get('http://localhost:8080/banner');
      setBannerImages(response.data);
    } catch (error) {
      console.error('Error al obtener las imágenes del banner:', error);
    }
  };

  const handleImagenModificada = async () => {
    try {
      await obtenerImagenesBanner();
    } catch (error) {
      console.error('Error al obtener las imágenes del banner actualizadas:', error);
    }
  };

  return (
    <div className="container">
      <SideMenu />
      <div className="content">
        <h2>Gestionar Banner</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Posición</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bannerImages.map((banner) => (
              <tr key={banner.id}>
                <td>{banner.id}</td>
                <td>
                  <img src={`data:image/jpeg;base64,${banner.imagen}`} alt={`Banner ${banner.id}`} />
                </td>
                <td>{banner.posicion}</td>
                <td>
                  <BuscarImagenBanner
                    onImagenModificada={handleImagenModificada}
                    bannerImages={bannerImages}
                    banner={banner}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionarBanner;