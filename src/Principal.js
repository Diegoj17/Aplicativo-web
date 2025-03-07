import { useAuth } from "./AuthContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./logo.png" // Asegúrate de tener el logo en esta ubicación
import logocentral from "./logocentral.png" // Asegúrate de tener el logo en esta ubicación

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
          <div style={styles.sidebarHeader} onClick={handleViewRegistros} className="clickable-header">
            Vista de Registros
          </div>
          <button onClick={handleSearch} style={{ ...styles.sidebarButton, backgroundColor: "#FFE4B5" }}>
            Buscar partidas
          </button>
          <button onClick={handleAdd} style={{ ...styles.sidebarButton, backgroundColor: "#FFE4B5" }}>
            Añadir partidas
          </button>
          <button onClick={handleCorrect} style={{ ...styles.sidebarButton, backgroundColor: "#FFE4B5" }}>
            Corregir partidas
          </button>
          <button onClick={handlePrint} style={{ ...styles.sidebarButton, backgroundColor: "#FFE4B5" }}>
            Imprimir partidas
          </button>
          <button onClick={handleLogout} style={{ ...styles.sidebarButton, backgroundColor: "#DC3545" }}>
            Salir
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
    width: "270px",
    backgroundColor: "#f0f0f0",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  sidebarHeader: {
    padding: "0.75rem",
    backgroundColor: "#808080",
    color: "white",
    borderRadius: "0.5rem",
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
    color: "black",
    backgroundColor: "#FF000F",
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

