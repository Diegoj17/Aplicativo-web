import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Principal from './Principal';
import Registros from "./Registros"
import ScrollableContainer from "./ScrollableContainer" 
import RecuperarContraseña from './RecuperarContraseña';
import CrearCuenta from './CrearCuenta';
import { AuthProvider } from "./AuthContext"
import ProtectedRoute from "./ProtectedRoute"
import AñadirPartidas from './AñadirPartidas';
import BuscarPartidas from './BuscarPartidas';
import Layout from './Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollableContainer>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/recuperar-contraseña" element={<Layout pageTitle="Recuperar Contraseña"><RecuperarContraseña /></Layout>} />
            <Route path="/crear-cuenta" element={<Layout pageTitle="Crear Cuenta"><CrearCuenta /></Layout>} />
            <Route
              path="/Principal"
              element={
                <ProtectedRoute>
                  <Layout pageTitle="Panel Principal">
                    <Principal />
                  </Layout>
                </ProtectedRoute>
              }
              />
          <Route
            path="/registros"
            element={
              <ProtectedRoute>
                <Layout pageTitle="Registros">
                    <Registros />
                  </Layout>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/buscarPartidas"
            element={
              <ProtectedRoute>
                <Layout pageTitle="Buscar Partidas">
                    <BuscarPartidas />
                  </Layout>

              </ProtectedRoute>
            }
          /> 
          <Route
            path="/añadirPartidas"
            element={
              <ProtectedRoute>
                <Layout pageTitle="Añadir Partidas">
                    <AñadirPartidas />
                  </Layout>
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