import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import logo from "./logo.png"
import { FaTimes, FaBars, FaSearch, FaPlus, FaPencilAlt, FaPrint, FaArrowLeft } from "react-icons/fa"

function Registros() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [eventoSeleccionado, setEventoSeleccionado] = useState('Todos');
  const [menuAbierto, setMenuAbierto] = useState(false) 
  
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

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto) // Alternar la visibilidad del menú
  }

  const registrosFiltrados = eventoSeleccionado === 'Todos'
  ? registros
  : registros.filter(registro => registro.evento === eventoSeleccionado);

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
        {/* Botón para abrir/cerrar el menú */}
        <button onClick={toggleMenu} style={styles.menuToggleButton}>
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>
       
        {/* Menú lateral */}
        <nav style={{ ...styles.sidebar, width: menuAbierto ? '250px' : '0', overflow: 'hidden', transition: 'width 0.3s' }}>
  
        <div style={styles.menuHeader}>
            <button style={styles.sidebarHeaderButton}>
              {menuAbierto ? "📋 Vista de Registros" : <FaBars />}
            </button>
          </div>
          <button onClick={handleSearch} style={styles.dropdownButton}>
            {menuAbierto ? "🔍 Buscar partidas" : <FaSearch />}
          </button>
          <button onClick={handleAdd} style={styles.sidebarButton}>
            {menuAbierto ? "📄 Añadir partidas" : <FaPlus />}
          </button>
          <button onClick={handleCorrect} style={styles.sidebarButton}>
            {menuAbierto ? "📝Corregir partidas" : <FaPencilAlt />}
          </button>
          <button onClick={handlePrint} style={styles.sidebarButton}>
            {menuAbierto ? "🖨️ Imprimir partidas" : <FaPrint />}
          </button>
          <button onClick={handleBack} style={styles.backButton}>
            {menuAbierto ? "Atras" : <FaArrowLeft />}
          </button>
        </nav>

        {/* Contenido principal */}
        <main style={styles.content}>
          {/* Selector de tipo de evento */}
          <div style={styles.filtroContainer}>
            <label htmlFor="evento" style={styles.label}>Seleccionar tipo de evento:</label>
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

