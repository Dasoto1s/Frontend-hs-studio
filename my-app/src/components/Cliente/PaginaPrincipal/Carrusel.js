import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

const Carrusel = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/banner');
        setBannerImages(response.data);
      } catch (error) {
        console.error('Error al obtener las imágenes del banner:', error);
        setError('No se pudieron cargar las imágenes. Por favor, intente de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerImages();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="carrusel-container">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={500}
        stopOnHover={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
        {bannerImages.map((banner) => (
          <div key={banner.id} className="carrusel-slide">
            <div className="carrusel-image-container">
              <img src={`data:image/jpeg;base64,${banner.imagen}`} alt={`Banner ${banner.id}`} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;