"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import logo from "./logo.png"
import { FaCheck, FaEdit } from "react-icons/fa" // Necesitarás instalar react-icons

function Registros() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Datos de ejemplo para la tabla
  const [registros] = useState([
    {
      id: 1,
      nombre: "Pedro Perez",
      evento: "Bautismo",
      fecha: "24/05/2004",
      hora: "12:40",
      pagado: true,
    },
    {
      id: 2,
      nombre: "Martin Sanchez",
      evento: "Boda",
      fecha: "15/04/2015",
      hora: "20:10",
      pagado: true,
    },
    {
      id: 3,
      nombre: "José Contreras",
      evento: "Boda",
      fecha: "7/11/2010",
      hora: "15:00",
      pagado: true,
    },
    {
      id: 4,
      nombre: "Carlos Martinez",
      evento: "Bautismo",
      fecha: "23/7/2007",
      hora: "9:30",
      pagado: true,
    },
  ])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Función para navegar a la vista de registros
  const handleViewRegistros = () => {
    navigate("/registros")
  }

  const handleBack = () => {
    navigate("/Principal")
  }

  const handleSearch = () => {
    console.log("Búsqueda de partidas")
  }

  const handleAdd = () => {
    console.log("Añadir partida")
  }

  const handleCorrect = () => {
    console.log("Corregir partida")
  }

  const handlePrint = () => {
    console.log("Imprimir partidas")
  }

  const handleEdit = (id) => {
    console.log("Editar registro:", id)
  }

  return (
    <div style={styles.container}>
      {/* Barra superior */}
      <header style={styles.header}>
        <img src={logo || "/logo.png"} alt="Logo" style={styles.headerLogo} />
        <h1 style={styles.headerTitle}>Registros</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Salir
        </button>
        <div style={styles.userInfo}>
          <img src="/user.png" alt="Usuario" style={styles.userIcon} />
          <div style={styles.userText}>
            <span>{user?.name || "Nombre Usuario"}</span>
            <span style={styles.roleText}>{user?.role || "Rol"}</span>
          </div>
        </div>
      </header>

      <div style={styles.mainContent}>
        {/* Menú lateral */}
        <nav style={styles.sidebar}>
          <button style={styles.sidebarHeaderButton}>Vista de Registros</button>
          <button onClick={handleSearch} style={styles.sidebarButton}>
            Buscar partidas
          </button>
          <button onClick={handleAdd} style={styles.sidebarButton}>
            Añadir partidas
          </button>
          <button onClick={handleCorrect} style={styles.sidebarButton}>
            Corregir partidas
          </button>
          <button onClick={handlePrint} style={styles.sidebarButton}>
            Imprimir partidas
          </button>
          <button onClick={handleBack} style={styles.backButton}>
            Atras
          </button>
        </nav>

        {/* Tabla de registros */}
        <main style={styles.content}>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Cedula</th>
                  <th style={styles.th}>Evento</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Hora</th>
                  <th style={styles.th}>Pago</th>
                  <th style={styles.th}>Editar</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro) => (
                  <tr key={registro.id} style={styles.tr}>
                    <td style={styles.td}>{registro.nombre}</td>
                    <td style={styles.td}>{registro.cedula}</td>
                    <td style={styles.td}>{registro.evento}</td>
                    <td style={styles.td}>{registro.fecha}</td>
                    <td style={styles.td}>{registro.hora}</td>
                    <td style={styles.td}>{registro.pagado && <FaCheck style={{ color: "green" }} />}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(registro.id)} style={styles.editButton}>
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    
  },
  header: {
    backgroundColor: "#385792",
    color: "white",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "70px",
  },
  headerLogo: {
    height: "60px",
    marginRight: '800px', // Espacio entre el logo y el título
  },
  headerTitle: {
    margin: 0,
    flex: 1,
    fontSize: "1.5rem",
  },
  logoutButton: {
    backgroundColor: "#FF000F",
    color: "black",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    marginRight: "1rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  userIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "white",
  },
  userText: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8rem",
  },
  roleText: {
    opacity: 0.8,
    fontSize: "0.7rem",
  },
  mainContent: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  sidebar: {
    width: "270px",
    backgroundColor: "#f0f0f0",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  sidebarHeaderButton: {
    backgroundColor: "#808080",
    color: "white",
    border: "none",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
  },
  sidebarButton: {
    margin: '5px 0',
    padding: "0.75rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
    transition: "opacity 0.2s ease",
    color: "black",
    backgroundColor: "#FFE4B5"
  },
  backButton: {
    backgroundColor: "#FF000F",
    color: "black",
    border: "none",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    textAlign: "left",
    marginTop: "auto",
    fontSize: "15px",
    fontWeight: "600",

  },
  content: {
    flex: 1,
    padding: "2rem",
    overflow: "auto",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #dee2e6",
  },
  td: {
    padding: "1rem",
    verticalAlign: "middle",
  },
  editButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#385792",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}

export default Registros

