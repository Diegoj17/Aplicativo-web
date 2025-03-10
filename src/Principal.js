import { useAuth } from "./AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./logo.png" // Asegúrate de tener el logo en esta ubicación
import logocentral from "./logocentral.png" // Asegúrate de tener el logo en esta ubicación
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
    console.log("Función de búsqueda")
    // Implementa la lógica de búsqueda aquí
  }

  const handleAdd = () => {
    console.log("Función para añadir")
    // Implementa la lógica para añadir aquí
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
          <img src="/user-icon.png" alt="Usuario" style={styles.userIcon} />
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
            <div style={styles.sidebarHeader} onClick={handleViewRegistros} className="clickable-header">
              <FaFileAlt style={styles.headerIcon} />
              <span>Vista de Registros</span>
            </div>

            <button onClick={handleSearch} style={{ ...styles.sidebarButton}} title="Buscar partidas">
              <FaSearch style={styles.buttonIcon} />
              <span>Buscar partidas</span>
            </button>

            <button onClick={handleAdd} style={{ ...styles.sidebarButton}} title="Añadir partidas">
              <FaFileMedical style={styles.buttonIcon} />
              <span>Añadir partidas</span>
            </button>

            <button onClick={handleCorrect} style={{ ...styles.sidebarButton}} title="Corregir partidas">
              <FaEdit style={styles.buttonIcon} />
              <span>Corregir partidas</span>
            </button>

            <button onClick={handlePrint} style={{ ...styles.sidebarButton, justifyItems: "center"}} title="Imprimir partidas">
              <FaPrint style={styles.buttonIcon} />
              {<span style={styles.buttonText}>Imprimir partidas</span>}
            </button>
          </div>

          {/* Espacio flexible para empujar los botones inferiores al fondo */}
          <div style={{ flex: 1 }}></div>

          {/* Botones inferiores */}
          <div style={styles.bottomButtons}>
            <button onClick={handleLogout} style={{ ...styles.logoutButton}}>
              <FaSignOutAlt style={styles.buttonIcon} />
              <span>Salir</span>
            </button>
          </div>
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
    fontWeight: "normal",
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
    minWidth: "250px",
    maxWidth: "300px",
    
  },
  sidebarHeader: {
    padding: "0.75rem",
    backgroundColor: "#FCCE74",
    color: "black",
    borderRadius: "0.5rem",
    fontSize: "15px",
  },
  sidebarButton: {
    margin: '8px 0',
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "0.75rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
    color: "black",
    backgroundColor: "#FCCE74",
    overflow: "hidden",
    position: "relative",
    width: "100%", 
    minHeight: "40px", 
    gap: "0.75rem",
  },
  buttonIcon: {
    width: "18px", 
    height: "18px",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    flexShrink: 0, 
    flexGrow: 0,
    marginBottom: "0rem",
  },
  buttonText: {
    fontSize: "15px",
    flex: 1,
    marginBottom: "0rem",
  },
  logoutButton: {
    verticalAlign: "middle",
    margin: '8px 0',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0.75rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
    color: "white",
    backgroundColor: "#FF000F",
    overflow: "hidden",
    position: "relative",
    width: "100%", 
    minHeight: "40px", 
    gap: "0.75rem",
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
    marginRight: '100px', // Espacio entre el logo y el título
  },
  logocentral: {
    width: "800px",
    height: "auto",
    objectFit: "contain",
    
  },

}

export default Principal

