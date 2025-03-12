import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import logo from "./logo.png"
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

function BuscarPartidas() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchCedula, setSearchCedula] = useState("")
  
  // Datos de ejemplo para la tabla
  const [registros] = useState([
    {
      id: 1,
      nombre: "Pedro Perez",
      cedula: "1234567890",
      libro: "1",
      folio: "2",
      acta: "3",
      evento: "Bautismo",
      fecha: "24/05/2004",
      sacerdote: "Juan Rodriguez",

    },
    {
      id: 2,
      nombre: "Martin Sanchez",
      cedula: "0987654321",
      libro: "2",
      folio: "3",
      acta: "3",
      evento: "Matrimonio",
      fecha: "15/04/2015",
      sacerdote: "David Martinez",
    },
    {
      id: 3,
      nombre: "José Contreras",
      cedula: "9876543210",
      libro: "3",
      folio: "4",
      acta: "4",
      evento: "Defunción",
      fecha: "7/11/2010",
      sacerdote: "Pedro Hernandez",
    },
    {
      id: 4,
      nombre: "Carlos Martinez",
      cedula: "1234567890",
      libro: "4",
      folio: "5",
      acta: "5",
      evento: "Primera Comunión",
      fecha: "23/7/2007",
      sacerdote: "Juan Perez",
    },
  ])

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
    if (!menuAbierto) {
      setIsSubmenuOpen(false)
    }
  }

  const handleViewRegistros = () => {
    navigate("/registros")
  }


  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleBack = () => {
    navigate("/Principal")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setShowResults(true) // Mostrar resultados solo después de buscar
    console.log("Buscando cédula:", searchCedula)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const resultados = registros.filter(registro => 
      registro.cedula.includes(searchCedula.trim())
    );
    setRegistrosFiltrados(resultados);
  };

  useEffect(() => {
    if (!searchCedula) setRegistrosFiltrados([]);
  }, [searchCedula]);

  const handleAdd = () => {
    navigate("/añadirPartidas")
  }

  const handleCorrect = () => {
    console.log("Corregir partida")
  }

  const handlePrint = () => {
    console.log("Imprimir partidas")
  }


  return (
    <div style={styles.container}>
      {/* Barra superior */}
      <header style={styles.header}>
        <img src={logo || "/logo.png"} alt="Logo" style={styles.headerLogo} />
        <h1 style={styles.headerTitle}>Busqueda de Partidas</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={styles.iconLogout} />
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
        {/* Menú lateral estilo Gmail */}
        <nav
          style={{
            ...styles.sidebar,
            padding: menuAbierto ? "1rem" : "1.5rem 0",
            width: menuAbierto ? "250px" : "50px",
            transition: "all 0.2s ease-in-out",
            gap: menuAbierto ? "0.5rem" : "0",
            overflow: menuAbierto ? "hidden" : "auto",
            position: "fixed",
            zIndex: 1000,
            height: "calc(100vh - 70px)", // Ajusta la altura del menú
          }}
        >
          {/* Botón para expandir/colapsar */}
          <button onClick={toggleMenu} style={styles.menuToggleButton}>
            {menuAbierto ? <FaChevronRight /> : <FaBars />}
          </button>
  
          {/* Contenedor principal de botones */}
          <div style={styles.sidebarButtonsContainer}>
            {/* Botones de navegación */}
            <div style={styles.sidebarButtons}>
              <button onClick={handleViewRegistros} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Vista de Registros">
                <FaFileAlt style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Vista de Registros</span>}
              </button>
  
              <button onClick={handleSearch} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Buscar partidas">
                <FaSearch style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Buscar partidas</span>}
              </button>
  
              <button onClick={handleAdd} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Añadir partidas">
                <FaFileMedical style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Añadir partidas</span>}
              </button>
  
              <button onClick={handleCorrect} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Corregir partidas">
                <FaEdit style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Corregir partidas</span>}
              </button>
  
              <button onClick={handlePrint} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Imprimir partidas">
                <FaPrint style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Imprimir partidas</span>}
              </button>
            </div>
  
            {/* Botón "Atrás" al final del menú */}
            <button onClick={handleBack} style={styles.backButton} title="Atrás">
              <FaArrowLeft style={styles.iconBack} />
              {menuAbierto && <span style={styles.buttonText}>Atrás</span>}
            </button>
          </div>
        </nav>
  
        {/* Contenido principal */}
        <main
          style={{
            ...styles.content,
            marginLeft: menuAbierto ? "250px" : "50px",
            padding: menuAbierto ? "1.5rem" : "1.5rem",
            transition: "margin-left 0.2s ease-in-out",
            overflow: "auto",
            height: "calc(100vh - 70px)", // Ajusta la altura del contenido
          }}
        >
          {/* Selector de tipo de evento */}
          <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
          <div style={styles.searchSection}>
              <label style={styles.searchLabel}>Digite el número de cédula:</label>
              <div style={styles.searchInputContainer}>
                <input
                  type="text"
                  value={searchCedula}
                  onChange={(e) => setSearchCedula(e.target.value)}
                  style={styles.searchInput}  
                />
                <button type="submit" style={styles.searchButton}title="Buscar">
                  <FaSearch style={styles.searchIcon} />
                </button>
              </div>
          </div>
            </form>
  
            {/* Tabla de registros */}
            {searchCedula && (
              <div style={styles.tableContainer}>
                {registrosFiltrados.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Id</th>
                      <th style={styles.th}>Apellidos y Nombres</th>
                      <th style={styles.th}>Cedula</th>
                      <th style={styles.th}>Libro</th>
                      <th style={styles.th}>Folio</th>
                      <th style={styles.th}>Acta</th>
                      <th style={styles.th}>Evento</th>
                      <th style={styles.th}>Fecha</th>
                      <th style={styles.th}>Sacerdote</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFiltrados.map((registro, index) => (
                        <tr key={registro.id} style={index % 2 === 0 ? styles.tr : styles.trAlternate}>
                        <td style={styles.td}>{registro.id}</td>
                        <td style={styles.td}>{registro.nombre}</td>
                        <td style={styles.td}>{registro.cedula}</td>
                        <td style={styles.td}>{registro.libro}</td>
                        <td style={styles.td}>{registro.folio}</td>
                        <td style={styles.td}>{registro.acta}</td>
                        <td style={styles.td}>{registro.evento}</td>
                        <td style={styles.td}>{registro.fecha}</td>
                        <td style={styles.td}>{registro.sacerdote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                ) : (
                  <div style={styles.noResults}>
                    No se encontraron resultados para la búsqueda.
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    
  );
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
    marginRight: '800px',
  },
  headerTitle: {
    margin: 0,
    flex: 1,
    fontSize: "1.5rem",
  },
  icon: {
    width: "18px",
    height: "18px",
    fill: "black",
  },
  iconBack: {
    width: "18px",
    height: "18px",
    fill: "white",
  },
  iconLogout: {
    width: "20px",
    height: "20px",
    fill: "white",
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
  buttonText: {
    fontSize: "1rem",
    flex: 1,
  },
  mainContent: {
    display: "flex",
    flex: 1,
    position: "relative",
    overflow: "hidden",   
  },
  sidebar: {
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 70px)",
    position: "fixed",
    left: 0,
    zIndex: 1000,
    boxShadow: "3px 0 8px rgba(0,0,0,0.15)",
    gap: "0.8rem",
    with: "100%",
    minWidth: "70px",
    borderRight: "1px solid #e0e0e0",
  },
  sidebarButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100% - 50px)", // Restar la altura del botón de toggle
    overflow: "hidden",
  },
  sidebarButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
    overflow: "auto",
    height: "100%",
  },
  sidebarIconButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    border: "none",
    borderRadius: "0 16px 16px 0",
    backgroundColor: "#FCCE74",
    cursor: "pointer",
    textAlign: "left",
    color: "#202124",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    width: "100%", 
    minHeight: "40px", 
  },
  menuToggleButton: {
    backgroundColor: "#FCCE74",
    color: "#6c757d",
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    alignSelf: "center",
    marginBottom: "1rem",
    top: "5rem",
    left: "1rem",
    zIndex: 100,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF000F",
    gap: "0.5rem",
    color: "white",
    border: "none",
    fontSize: "1rem",
    padding: "0.5rem 1.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    marginRight: "1.5rem",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    border: "none",
    borderRadius: "0 16px 16px 0",
    backgroundColor: "#FF000F",
    cursor: "pointer",
    textAlign: "left",
    color: "white",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    width: "100%", 
    minHeight: "40px", 
  },
  content: {
    flex: 1,
    padding: "1.5rem",
    overflow: "auto",
    height: "calc(100vh - 70px)",
  },
  filtroContainer: {
    alignItems: "center",
    marginBottom: "20px",	
    marginLeft: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    gap: '0rem',
  },
  label: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginLeft: '0.5rem',
    color: '#6c757d',
  },
  searchSection: {
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  searchLabel: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginLeft: '0.5rem',
    color: '#6c757d',
    whiteSpace: "nowrap",
    margin: 0,
  },
  searchForm: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
    maxWidth: "500px",
  },
  searchInputContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  searchInput: {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    width: "100%",
    paddingRight: "40px",
  },
  searchButton: {
    position: "absolute",
    right: "0",
    top: "0",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    padding: "0.5rem",
    cursor: "pointer",
  },
  noResults: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",  
    width: "100%",
    marginTop: "20px",
  },
  searchIcon: {
    width: "18px",
    height: "18px",
    color: "#000000",
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    overflow: "hidden",
    marginBottom: "20px",
    marginLeft: '1rem',
    marginTop: '1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "1rem",
    fontWeight: "500",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    fontWeight: "600",
    fontSize: "0.875rem",
  },
  tr: {
    borderBottom: "1px solid #dee2e6",
  },
  td: {
    padding: "1rem",
    verticalAlign: "middle",
  },
}

export default BuscarPartidas

