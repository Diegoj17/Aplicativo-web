import { useAuth } from "./AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./logo.png" 
import user from "./user.png"
import logocentral from "./logocentral.png" 
import { FaFileAlt,
  FaSearch,
  FaFileMedical,
  FaEdit,
  FaPrint,
  FaChevronRight,
  FaChevronDown,
  FaArrowLeft,
  FaBars,
  FaSignOutAlt, } from "react-icons/fa"

function Principal() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Prevenir navegación hacia atrás después de cerrar sesión
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href)

    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.href)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  // Función para navegar a la vista de registros
  const handleViewRegistros = () => {
    navigate("/registros")
  }

  // Funciones para los botones
  const handleSearch = () => {
    navigate("/buscarPartidas")
  }

  const handleAdd = () => {
    navigate("/añadirPartidas")
  }

  const handleCorrect = () => {
    console.log("Función para corregir")
    // Implementa la lógica para corregir aquí
  }

  const handlePrint = () => {
    console.log("Función para imprimir")
    // Implementa la lógica de impresión aquí
  }

  const handleLogout = () => {
    // Llamar a la función logout del contexto de autenticación
    logout()
    // Redirigir al login
    navigate("/")
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div style={styles.container}>
      {/* Barra superior */}
      <header style={styles.header}>
        <img src={logo || "/placeholder.svg"} alt="Logo" style={styles.logo} />
        <h1 style={styles.headerTitle}>Basílica Menor de San Luis Gonzaga</h1>
        <div style={styles.userInfo}>
          <img src="/user.png" alt="Usuario" style={styles.userIcon} />
          <div style={styles.userText}>
            <span>{user?.name || "Nombre Usuario"}</span>
            <span style={styles.roleText}>{user?.role || "Rol"} </span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div style={styles.mainContent}>
        
        {/* Menú lateral */}
        <nav style={styles.sidebar}> 
          
          {/* Botones principales */}
          <div style={styles.sidebarButtons}>

          <button onClick={handleViewRegistros} style={{ ...styles.sidebarButton}} title="Vista de Registros de Partidas">
              <FaFileAlt style={styles.buttonIcon} />
              {<span style={styles.buttonText}>Vista de Registros</span>}
            </button>

            <button onClick={handleSearch} style={{ ...styles.sidebarButton}} title="Buscar partidas">
              <FaSearch style={styles.buttonIcon} />
              {<span style={styles.buttonText}>Buscar Partidas</span>}
            </button>

            <button onClick={handleAdd} style={{ ...styles.sidebarButton}} title="Añadir partidas">
              <FaFileMedical style={styles.buttonIcon} />
              {<span style={styles.buttonText}>Añadir Partidas</span>}
            </button>

            <button onClick={handleCorrect} style={{ ...styles.sidebarButton}} title="Corregir partidas">
              <FaEdit style={styles.buttonIcon} />
              {<span style={styles.buttonText}>Corregir Partidas</span>}
            </button>
          </div>

          {/* Espacio flexible para empujar los botones inferiores al fondo */}
          <div style={{ flex: 1 }}></div>

          {/* Botones inferiores */}
            <button onClick={handleLogout} style={{ ...styles.logoutButton}}>
              <FaSignOutAlt style={styles.buttonIcon} />
              {<span style={styles.buttonText}> Salir</span>}
            </button>
        </nav>

        {/* Área de contenido */}
        <main style={styles.content}>
          <div style={styles.logoContainer}>
            <img src={logocentral || "/logocentral.png"} alt="Logo Basílica" style={styles.logocentral} />
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
  headerTitle: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "600",
    
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
    backgroundColor: "#fff",
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
    width: "250px",
    backgroundColor: "#f0f0f0",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    with: "100%",
    height: "100%",
    overflow: "auto",
    boxShadow: "3px 0 8px rgba(0,0,0,0.15)",    
  },
  sidebarButton: {
    display: "flex",
    margin: '10px 0',
    gap: "0rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: "0.75rem",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "1rem",
    color: "black",
    backgroundColor: "#FCCE74",
    overflow: "hidden",
    position: "relative",
    whiteSpace: "nowrap",
    width: "100%", 
    minHeight: "40px",
    marginBottom: "1rem",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "0rem",
    padding: "0.75rem",
    border: "none",
    borderRadius: "1rem",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "50px",
    color: "white",
    backgroundColor: "#FF000F",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    width: "100%", 
    minHeight: "40px", 
  },
  buttonIcon: {
    width: "20px", 
    height: "20px",
    marginRight: "0.5rem",
  },
  buttonText: {
    fontSize: "1rem",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoContainer: {
    maxWidth: "400px",
    width: "100%",
  },
  logo: {
    width: "60px",
    height: "auto",
    objectFit: "contain",
    marginRight: '100px',
  },
  logocentral: {
    width: "800px",
    height: "auto",
    objectFit: "contain",
    
  },

}

export default Principal

