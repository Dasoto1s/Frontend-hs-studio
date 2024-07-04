import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../CSS/Administrador/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/gestionarInventario');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/productos/admin/login', null, {
        params: {
          email,
          password
        }
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/gestionarInventario');
    } catch (error) {
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container" style={{
      display: 'flex',
      justifyContent: 'star',
      alignItems: 'star',
      height: '100vh'
    }}>
      <div className="login-form" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '5px'
      }}>
        <h2>Inicio de Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <button type="submit" className="login-button" style={{
            padding: '0.5rem 1rem',
            marginTop: '1rem'
          }}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;