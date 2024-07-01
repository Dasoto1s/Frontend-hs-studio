import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import Encabezado from './components/Cliente/PaginaPrincipal/Encabezado';
import BarraNavegacion from './components/Cliente/PaginaPrincipal/BarraNavegacion';
import CarritoCompras from './components/Cliente/CarritoCompras/CarritoCompras';
import PaginaPrincipal from './components/Cliente/PaginaPrincipal/PaginaPrincipal';
import DetallesProducto from './components/Cliente/PaginaPrincipal/DetallesProducto';
import ProductosHombre from './components/Cliente/PaginaPrincipal/ProductosHombre';
import ProductosMujer from './components/Cliente/PaginaPrincipal/ProductosMujer';
import ProductosPromocion from './components/Cliente/PaginaPrincipal/ProductosPromocion';
import SobreNosotros from './components/Cliente/PaginaPrincipal/SobreNosotros';
import CambioDevolucion from './components/Cliente/PaginaPrincipal/CambioDevolucion';
import InformacionCliente from './components/Cliente/Pedido/InformacionCliente';
import AdminLogin from './components/Administrador/inicioSesion/AdminLogin';
import GestionarInventario from './components/Administrador/GestionarInventario/GestionarInventario';
import Destacados from './components/Administrador/Destacados/Destacados';
import PromocionesDestacados from './components/Administrador/Promociones/PromocionesDestacados';
import PedidosList from './components/Administrador/Pedidos/PedidosList';
import SolicitudList from './components/Administrador/CambioDevolucion/SolicitudList ';
import GestionarBanner from './components/Administrador/GestionarBanner/GestionarBanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ConfirmacionPago from './components/Cliente/Pedido/ConfirmacionPago';
import EditarProducto from './components/Administrador/GestionarInventario/EditarProducto';
import SolicitudDetalles from './components/Administrador/CambioDevolucion/SolicitudDetalles '; 
import PedidoDetalles from './components/Administrador/Pedidos/PedidoDetalles';
import ProductosNinos from './components/Cliente/PaginaPrincipal/ProductosNinos';


const AppContent = () => {
  const location = useLocation();
  const [carritoData, setCarritoData] = useState(null);
  const [showCarritoModal, setShowCarritoModal] = useState(false);
  const [carritoNumeroProductos, setCarritoNumeroProductos] = useState(0);

  const obtenerCarrito = useCallback(async () => {
    try {
      const sessionId = Cookies.get('sessionId');
      const response = await axios.get('http://localhost:8080/carrito-compras/productos', {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      setCarritoData(response.data);
      setCarritoNumeroProductos(response.data.productos.length);
    } catch (error) {
      console.error('Error al obtener el carrito de compras:', error);
    }
  }, []);

  useEffect(() => {
    let sessionId = Cookies.get('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      Cookies.set('sessionId', sessionId, { expires: 1 });
    }
    obtenerCarrito();
  }, [obtenerCarrito]);

  useEffect(() => {
    const interval = setInterval(obtenerCarrito, 5000);
    return () => clearInterval(interval);
  }, [obtenerCarrito]);

  const eliminarProducto = async (idProducto) => {
    try {
      const sessionId = Cookies.get('sessionId');
      await axios.delete(`http://localhost:8080/carrito-compras/eliminar-producto/${idProducto}`, {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      await obtenerCarrito();
      if (carritoData && carritoData.productos.length === 0) {
        setShowCarritoModal(false);
      }
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const toggleCarritoModal = () => {
    setShowCarritoModal(prev => !prev);
  };

  const shouldShowHeaderAndNav = ![
    '/admin/login',
    '/gestionarInventario',
    '/destacados',
    '/gestionarbannerDestacados',
    '/pedidos',
    '/solicitudList',
    '/gestionarCambiosDevoluciones',
    '/gestionarBanner',
    '/solicitud/:solicitudId',
    '/editar-producto/:idProducto'

  ].includes(location.pathname);

  return (
    <div>
      {shouldShowHeaderAndNav && (
        <>
          <Encabezado />
          <BarraNavegacion toggleCarritoModal={toggleCarritoModal} carritoNumeroProductos={carritoNumeroProductos} />
        </>
      )}
      {showCarritoModal && (
        <CarritoCompras
          isModal={true}
          toggleCarritoModal={toggleCarritoModal}
          carritoData={carritoData}
          eliminarProducto={eliminarProducto}
        />
      )}
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/producto/:id" element={<DetallesProducto obtenerCarrito={obtenerCarrito} />} />
        <Route path="/carrito" element={
          <CarritoCompras
            isModal={false}
            carritoData={carritoData}
            eliminarProducto={eliminarProducto}
          />
        } />
        <Route path="/productos-hombre" element={<ProductosHombre />} />
        <Route path="/productos-mujer" element={<ProductosMujer />} />
        <Route path="/productos-promocion" element={<ProductosPromocion />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/cambio-devolucion" element={<CambioDevolucion />} />
        <Route path="/informacion-cliente" element={<InformacionCliente />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/gestionarInventario" element={<GestionarInventario />} />
        <Route path="/destacados" element={<Destacados />} />
        <Route path="/gestionarbannerDestacados" element={<PromocionesDestacados />} />
        <Route path="/pedidos" element={<PedidosList />} />
        <Route path="/gestionarCambiosDevoluciones" element={<SolicitudList />} />
        <Route path="/gestionarBanner" element={<GestionarBanner />} />
        <Route path="/confirmacion-pago" element={<ConfirmacionPago />} />
        <Route path="/editar-producto/:idProducto" element={<EditarProducto />} />
        <Route path="/editar-producto/:idProducto" element={<EditarProducto />} />
        <Route path="/solicitud/:solicitudId" element={<SolicitudDetalles />} />
        <Route path="/pedido/:pedidoId" element={<PedidoDetalles />} />
        <Route path="/productos-ninos" element={<ProductosNinos />} />
        
        
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
