// AgregarProducto.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../../CSS/Administrador/AgregarProducto.css';

const AgregarProducto = ({ onProductoAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [talla, setTalla] = useState(0);
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoZapato, setTipoZapato] = useState('');
  const [imagen, setImagen] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [stock, setStock] = useState(0);
  const [cantidadMinimaRequerida, setCantidadMinimaRequerida] = useState(0);

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos faltantes
    if (!nombre || !descripcion || !precio || !talla || !color || !genero || !tipoZapato || !imagen || !cantidad || !stock || !cantidadMinimaRequerida) {
      window.alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    // Validaciones de caracteres máximos
    if (nombre.length > 50) {
      window.alert('El nombre no puede tener más de 50 caracteres.');
      return;
    }

    if (descripcion.length > 270) {
      window.alert('La descripción no puede tener más de 270 caracteres.');
      return;
    }

    if (color.length > 10) {
      window.alert('El color no puede tener más de 10 caracteres.');
      return;
    }

    if (genero.length > 10) {
      window.alert('El género no puede tener más de 10 caracteres.');
      return;
    }

    if (tipoZapato.length > 50) {
      window.alert('El tipo de zapato no puede tener más de 50 caracteres.');
      return;
    }

    // Validaciones de cantidad, stock y cantidad mínima requerida
    if (cantidad < 0 || cantidad > 99999) {
      window.alert('La cantidad debe ser un valor positivo y no puede exceder las 5 cifras.');
      return;
    }

    if (stock < 0 || stock > 99999) {
      window.alert('El stock debe ser un valor positivo y no puede exceder las 5 cifras.');
      return;
    }

    if (cantidadMinimaRequerida < 0 || cantidadMinimaRequerida > 99999) {
      window.alert('La cantidad mínima requerida debe ser un valor positivo y no puede exceder las 5 cifras.');
      return;
    }

    // Validaciones de precio y talla
    if (precio < 0 || precio > 999999999) {
      window.alert('El precio debe ser un valor positivo y no puede exceder los 9 dígitos.');
      return;
    }

    if (talla < 0 || talla > 99) {
      window.alert('La talla debe ser un valor positivo y no puede exceder las 2 cifras.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('talla', talla);
    formData.append('color', color);
    formData.append('genero', genero);
    formData.append('tipoZapato', tipoZapato);
    formData.append('imagen', imagen);
    formData.append('cantidad', cantidad);
    formData.append('stock', stock);
    formData.append('cantidadMinimaRequerida', cantidadMinimaRequerida);

    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage

      const response = await axios.post('http://localhost:8080/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
      });

      console.log('Producto agregado:', response.data);
      window.alert('El producto se ha agregado con éxito.');
      onProductoAgregado();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <form id="agregar-producto-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={50}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          maxLength={270}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        ></textarea>
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(parseFloat(e.target.value))}
          min={0}
          max={999999999}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="talla">Talla:</label>
        <input
          type="number"
          id="talla"
          placeholder="Talla"
          value={talla}
          onChange={(e) => setTalla(parseInt(e.target.value))}
          min={0}
          max={99}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          maxLength={10}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="genero">Género:</label>
        <select
          id="genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="">Seleccione un género</option>
          <option value="Mujer">Mujer</option>
          <option value="Hombre">Hombre</option>
          <option value="Niño">Niño</option>
        </select>
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="tipoZapato">Tipo de Zapato:</label>
        <select
          id="tipoZapato"
          value={tipoZapato}
          onChange={(e) => setTipoZapato(e.target.value)}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        >
          <option value="">Seleccione un tipo de zapato</option>
          <option value="Casuales">Casuales</option>
          <option value="Sandalias">Sandalias</option>
          <option value="Botas">Botas</option>
          <option value="Zapatillas">Zapatillas</option>
          <option value="Elegantes">Elegantes</option>
        </select>
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImagenChange}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          min={0}
          max={99999}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
          min={0}
          max={99999}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <div className="form-group" style={{ width: '100%' }}>
        <label htmlFor="cantidadMinimaRequerida">Cantidad Mínima Requerida:</label>
        <input
          type="number"
          id="cantidadMinimaRequerida"
          placeholder="Cantidad Mínima Requerida"
          value={cantidadMinimaRequerida}
          onChange={(e) => setCantidadMinimaRequerida(parseInt(e.target.value))}
          min={0}
          max={99999}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#8FBDBB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}>
        Agregar Producto
      </button>
    </form>
  );
};

export default AgregarProducto;