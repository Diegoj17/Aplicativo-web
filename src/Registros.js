import { useState } from "react"
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
  FaBars, } from "react-icons/fa"

function Registros() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [eventoSeleccionado, setEventoSeleccionado] = useState('Todos');
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  
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

  const registrosFiltrados = eventoSeleccionado === 'Todos'
  ? registros
  : registros.filter(registro => registro.evento === eventoSeleccionado);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
    if (!menuAbierto) {
      setIsSubmenuOpen(false)
    }
  }

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

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


  return (
    <div style={styles.container}>
      {/* Barra superior */}
      <header style={styles.header}>
        <img src={logo || "/logo.png"} alt="Logo" style={styles.headerLogo} />
        <h1 style={styles.headerTitle}>Vista de Registros</h1>
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
        {/* Menú lateral estilo Gmail */}
        <nav
          style={{
            ...styles.sidebar,
            padding: menuAbierto ? "1rem" : "1.5rem 0",
            width: menuAbierto ? "250px" : "50px",
            transition: "all 0.2s ease-in-out",
            with: "100%", 
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
            <FaArrowLeft style={styles.icon} />
            {menuAbierto && <span style={styles.buttonText}>Atrás</span>}
          </button>
        </div>
      </nav>

        {/* Contenido principal */}
        <main
          style={{
            ...styles.content,
            marginLeft: menuAbierto ? "250px" : "50px",
            padding: menuAbierto ? "1rem" : "1rem",   
            transition: "margin-left 0.2s ease-in-out",
          }}
        >
          {/* Selector de tipo de evento */}
          <div style={styles.filtroContainer}>
            <label htmlFor="evento" style={styles.label}>
              Seleccionar tipo de evento:
            </label>
            <select
              id="evento"
              value={eventoSeleccionado}
              onChange={(e) => setEventoSeleccionado(e.target.value)}
              style={styles.select}
            >
              <option value="Todos">Todos</option>
              <option value="Bautismo">Bautizos</option>
              <option value="Confirmación">Confirmaciones</option>
              <option value="Primera Comunión">Primeras Comuniones</option>
              <option value="Matrimonio">Matrimonios</option>
              <option value="Defunción">Defunciones</option>
            </select>
          </div>

          {/* Tabla de registros */}
          <div style={styles.tableContainer}>
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
                {registrosFiltrados.map((registro) => (
                  <tr key={registro.id} style={styles.tr}>
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
  buttonText: {
    fontSize: "15px",
    flex: 1,
  },
  mainContent: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    
  },
  sidebar: {
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 60px)",
    position: "fixed",
    left: 0,
    zIndex: 5,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    gap: "0.5rem",
    with: "100%",
    minWidth: "70px",
   
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
  sidebarButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100% - 50px)", // Restar la altura del botón de toggle
    overflow: "hidden",
    "& button:hover": {
      backgroundColor: "#FFD79C",
    },
  },
  sidebarButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    overflow: "auto",
    "& button": {
      backgroundColor: "#FCCE74",
    },
    "& button:hover": {
      backgroundColor: "#FCCE74",
    },
  },
  sidebarIconButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "8px",
    border: "none",
    borderRadius: "0 16px 16px 0",
    backgroundColor: "#FFE4B5",
    cursor: "pointer",
    textAlign: "left",
    color: "#202124",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    position: "relative",
    width: "100%", // Ensure consistent width
    minHeight: "40px", // Consistent height for all buttons
  
  },
  menuToggleButton: {
    backgroundColor: "#FFE4B5",
    color: "#6c757d",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    alignSelf: "center",
    marginBottom: "1rem",
    padding: 0,
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "8px",
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
    width: "100%", // Ensure consistent width
    minHeight: "40px", // Consistent height for all buttons
  },
  content: {
    flex: 1,
    padding: "2rem",
    overflow: "auto",
  },
  filtroContainer: {
    marginBottom: "20px",	
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    display: 'flex',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    marginLeft: '1rem',
    width: '220px',
    fontWeight: '550',
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

export default Registros

