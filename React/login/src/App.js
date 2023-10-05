import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext';
import Login from './Login/Login';
import InfoPage from './Inicio/Inicio';
import Header from './Header/Header';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;