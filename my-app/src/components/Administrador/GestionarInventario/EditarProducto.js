import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../../../CSS/Administrador/EditarProducto.css'; // Importa el archivo CSS

const EditarProducto = () => {
  const { idProducto } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [producto, setProducto] = useState(location.state || {
    nombre: '',
    descripcion: '',
    precio: 0,
    talla: 0,
    color: '',
    genero: '',
    tipoZapato: '',
    imagen: null,
    cantidad: 0,
    stock: 0,
    cantidadMinimaRequerida: 0,
  });

  useEffect(() => {
    if (location.state && location.state.nombre) {
      setProducto(location.state);
    } else {
      console.log('No se recibieron datos del producto');
      navigate('/gestionarInventario');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('nombre', producto.nombre);
      formData.append('descripcion', producto.descripcion);
      formData.append('precio', producto.precio);
      formData.append('talla', producto.talla);
      formData.append('color', producto.color);
      formData.append('genero', producto.genero);
      formData.append('tipoZapato', producto.tipoZapato);
      formData.append('imagen', producto.imagen);
      formData.append('cantidad', producto.cantidad);
      formData.append('stock', producto.stock);
      formData.append('cantidadMinimaRequerida', producto.cantidadMinimaRequerida);

      const response = await axios.put(`http://localhost:8080/productos/${idProducto}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Producto actualizado:', response.data);
      navigate('/gestionarInventario'); // Redirigir a la página de gestión de inventario después de actualizar
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleImagenChange = (e) => {
    setProducto((prevProducto) => ({
      ...prevProducto,
      imagen: e.target.files[0],
    }));
  };

  return (
    <div className="editar-producto-container">
      <h2>Editar Producto</h2>
      <form className="editar-producto-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="talla">Talla:</label>
          <input
            type="number"
            id="talla"
            name="talla"
            value={producto.talla}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={producto.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={producto.genero}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoZapato">Tipo de Zapato:</label>
          <input
            type="text"
            id="tipoZapato"
            name="tipoZapato"
            value={producto.tipoZapato}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImagenChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={producto.cantidad}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={producto.stock}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidadMinimaRequerida">Cantidad Mínima Requerida:</label>
          <input
            type="number"
            id="cantidadMinimaRequerida"
            name="cantidadMinimaRequerida"
            value={producto.cantidadMinimaRequerida}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn-guardar">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;