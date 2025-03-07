import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Principal from './Principal';
import ScrollableContainer from "./ScrollableContainer" // Importar el nuevo componente
import RecuperarContraseña from './RecuperarContraseña';

function App() {
  return (
    <Router>
      <ScrollableContainer>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/Principal" element={<Principal />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ScrollableContainer>
    </Router>
  )
}

export default App