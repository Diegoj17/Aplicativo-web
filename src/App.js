import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Principal from './Principal';
import ScrollableContainer from "./ScrollableContainer" // Importar el nuevo componente
import RecuperarContraseña from './RecuperarContraseña';
import { AuthProvider } from "./AuthContext"
import ProtectedRoute from "./ProtectedRoute"


function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollableContainer>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
            <Route
              path="/Principal"
              element={
                <ProtectedRoute>
                  <Principal />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ScrollableContainer>
      </Router>
    </AuthProvider>
  )
}

export default App