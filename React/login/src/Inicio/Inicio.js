import React from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const InfoPage = () => {
  const { state, dispatch, usuario } = useAuth();

  return (
    <div>
      {state.isAuthenticated ? (
        <div>
          <div className="container mt-5">
            <h2>Perfil de Usuario</h2>
            <div className="row">
              <div className="col-md-4">
                <img src={usuario.image} alt="Imagen de usuario" thumbnail />
              </div>
              <div className="col-md-8">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Nombre de Usuario</th>
                      <td>{usuario.username}</td>
                    </tr>
                    <tr>
                      <th>Nombre</th>
                      <td>{usuario.firstName}</td>
                    </tr>
                    <tr>
                      <th>Apellido</th>
                      <td>{usuario.lastName}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{usuario.email}</td>
                    </tr>
                    <tr>
                      <th>Género</th>
                      <td>{usuario.gender}</td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>{usuario.id}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card className="text-center container mt-5">
        <Card.Body>
          <Card.Title>¡Atención!</Card.Title>
          <Card.Text>
             Debes iniciar sesión para acceder a esta página.
          </Card.Text>
          <Button href="/" variant="primary">Iniciar Sesion</Button>
        </Card.Body>
      </Card>
      )}
    </div>
  );
};

export default InfoPage;
