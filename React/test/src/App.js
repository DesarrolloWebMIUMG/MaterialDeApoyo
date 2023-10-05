import React, {useEffect, useState} from 'react';
import {Contexto} from './Contexto/Contexto';
import Componente1 from './Componente1/Componente1';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AcercaDe = () => <h2>Acerca de Nosotros</h2>;
const Contacto = () => <h2>Información de Contacto </h2>;
const Contacto1 = () => <h2>Información de Contacto 1</h2>;
const Contacto2 = () => <h2>Información de Contacto 2</h2>;

function Inicio(){
  return(
    <h1>Inicio</h1>
  );
}

const App = () => {
  const [digimon, setDigimon] = useState([]);
  useEffect(()=>{
    
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://digimon-api.vercel.app/api/digimon'
      };

axios.request(config)
.then((response) => {
  setDigimon(response.data);
})
.catch((error) => {
  console.log(error);
});
  },[]);
  return (
    <Router>
      <Link to="/">Inicio</Link>
      <br/>
      <Link to="/contacto">Contacto</Link>
        <Routes>
          <Route path="/"           element={<Inicio />} />
          <Route path="/acerca-de"  element={<AcercaDe />} />
          <Route path="/contacto"   element={<Contacto />} />
          <Route path="/contacto/1" element={<Contacto1 />} />
          <Route path="/contacto/2" element={<Contacto2 />} />
        </Routes>

        {digimon.map((item)=>(
        
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.img} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Button variant="primary">{item.level}</Button>
          </Card.Body>
          </Card>
        ))}
    </Router>
  );
};

export default App;
