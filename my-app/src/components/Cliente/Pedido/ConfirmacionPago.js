import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmacionPago = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const idPedido = searchParams.get('idPedido');

    if (idPedido) {
      // Mostrar el mensaje de pago exitoso
      alert(`¡Pago exitoso! Número de pedido: ${idPedido}`);

      // Redirigir a la página principal después de 5 segundos
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Si no hay idPedido, redirigir a la página principal
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className="confirmacion-pago">
      <h2>Confirmación de Pago</h2>
      <p>¡Gracias por tu compra! Tu pago ha sido procesado exitosamente.</p>
      <p>Serás redirigido a la página principal en unos segundos...</p>
    </div>
  );
};

export default ConfirmacionPago;