import React, { useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Login = () => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const { state, dispatch, setUsuario } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        username: username,
        password: password,
      })
    })
    .then(res => res.json())
    .then((response)=>{
      console.log(response);
      if (response) {
        setUsuario(response);
        dispatch({ type: 'LOGIN' });
        navigate('/Info');
        console.log(state);
      }
    });
            
      
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  return (
    <>
        <Card style={{ width: '18rem' }} className="container mt-3">
          <Card.Body>
            <Card.Title>Login</Card.Title>
             <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Iniciar sesión
              </button>
          </Card.Body>
        </Card>
        
    </>
    
  );
};

export default Login;
