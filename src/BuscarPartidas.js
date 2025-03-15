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
  import Layout from './Layout';

function BuscarPartidas() {

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchCedula, setSearchCedula] = useState("")
  const [selectedRow, setSelectedRow] = useState(null);
  const [printFormat, setPrintFormat] = useState("corto");
  
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
    const selectedRecord = registrosFiltrados.find(r => r.id === selectedRow);
    
    const formatos = {
      corto: [
        'primerNombre', 'segundoNombre', 
        'primerApellido', 'segundoApellido',
        'libro', 'folio', 'acta'
      ],
      largo: Object.keys(selectedRecord)
    };
  
    const camposImpresion = formatos[printFormat];
    
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Partida de ${selectedRecord.primerNombre}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { 
              border-bottom: 2px solid #000; 
              margin-bottom: 20px;
              padding-bottom: 10px;
            }
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            .formato-corto td { padding: 12px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${printFormat === 'corto' ? 'Certificado Resumido' : 'Certificado Completo'}</h2>
            <p>Emitido: ${new Date().toLocaleDateString()}</p>
          </div>
  
          <table class="${printFormat}">
            <tbody>
              ${camposImpresion.map(key => `
                <tr>
                  <th>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}</th>
                  <td>${selectedRecord[key] || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          ${printFormat === 'corto' ? `
            <div style="margin-top: 30px; text-align: right;">
              <p>_________________________</p>
              <p>Firma autorizada</p>
            </div>
          ` : ''}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrint2 = () => {
    const selectedRecord = registrosFiltrados.find(r => r.id === selectedRow);
    
    const formatos = {
      corto: [
        'primerNombre', 'segundoNombre', 
        'primerApellido', 'segundoApellido',
        'libro', 'folio', 'acta'
      ],
      largo: Object.keys(selectedRecord)
    };
  
    const camposImpresion = formatos[printFormat];
    
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Partida de ${selectedRecord.primerNombre}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { 
              border-bottom: 2px solid #000; 
              margin-bottom: 20px;
              padding-bottom: 10px;
            }
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            .formato-corto td { padding: 12px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${printFormat === 'corto' ? 'Certificado Resumido' : 'Certificado Completo'}</h2>
            <p>Emitido: ${new Date().toLocaleDateString()}</p>
          </div>
  
          <table class="${printFormat}">
            <tbody>
              ${camposImpresion.map(key => `
                <tr>
                  <th>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}</th>
                  <td>${selectedRecord[key] || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          ${printFormat === 'corto' ? `
            <div style="margin-top: 30px; text-align: right;">
              <p>_________________________</p>
              <p>Firma autorizada</p>
            </div>
          ` : ''}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  

  return (

    <Layout pageTitle="Buscar Partidas">
      {/* Contenido de la vista */}
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
                {menuAbierto && <span style={styles.buttonText}>Buscar Partidas</span>}
              </button>
  
              <button onClick={handleAdd} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Añadir partidas">
                <FaFileMedical style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Añadir Partidas</span>}
              </button>
  
              <button onClick={handleCorrect} style={{ ...styles.sidebarIconButton, justifyContent: menuAbierto ? "flex-start" : "center" }} title="Corregir partidas">
                <FaEdit style={styles.icon} />
                {menuAbierto && <span style={styles.buttonText}>Corregir Partidas</span>}
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
            height: "calc(100vh - 70px)",
            position: "relative",
          }}
        >
          {/* Selector de tipo de evento */}
          <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
            <div style={styles.searchSection}>
              <div style={styles.searchLeft}>
                <label style={styles.searchLabel}>Digite los Nombres o Apellidos:</label>
                <div style={styles.searchInputContainer}>
                  <input
                  type="text"
                  value={searchCedula}
                  onChange={(e) => setSearchCedula(e.target.value)}
                  style={styles.searchInput}
                  />
                  <button type="submit" style={styles.searchButton} title="Buscar">
                    <FaSearch style={styles.searchIcon} />
                  </button>
                </div>
              </div>
              <div style={styles.printControls}>
                <button onClick={() => handlePrint('corto')} style={styles.printButton} disabled={!selectedRow} title="Imprimir Formato Corto">
                <FaPrint style={styles.iconPrint} />
                {<span style={styles.buttonText}>Imprimir Formato Corto</span>}
                </button>
                <button onClick={() => handlePrint2('largo')} style={styles.printButton} disabled={!selectedRow} title="Imprimir Formato Largo">
                <FaPrint style={styles.iconPrint} />
                {<span style={styles.buttonText}>Imprimir Formato Largo</span>}
                </button>
              </div>
            </div>
          </form>
  
            {/* Tabla de registros */}
            {searchCedula && (
              <div style={styles.tableContainer}>
                {registrosFiltrados.length === 0 ? (
                <div style={styles.noResultsContainer}>
                  <span style={styles.noResultsText}>No se encontraron registros..</span>
                </div>
              ) : (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      
                      <th style={styles.th}>Id</th>
                      <th style={styles.th}>Primer Nombre</th>
                      <th style={styles.th}>Segundo Nombre</th>
                      <th style={styles.th}>Primer Apellido</th>
                      <th style={styles.th}>Segundo Apellido</th>
                      <th style={styles.th}>Libro</th>
                      <th style={styles.th}>Folio</th>
                      <th style={styles.th}>Acta</th>
                      <th style={styles.th}>Padre</th>
                      <th style={styles.th}>Madre</th>
                      <th style={styles.th}>Abuelo Paterno</th>
                      <th style={styles.th}>Abuelo Materno</th>
                      <th style={styles.th}>Abuela Paterna</th>
                      <th style={styles.th}>Abuela Materna</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrosFiltrados.map((registro, index) => (
                        <tr key={registro.id} style={{...(index % 2 === 0 ? styles.tr : styles.trAlternate),
                          backgroundColor: selectedRow === registro.id ? "#e3f2fd" : "inherit",
                          cursor: "pointer"}} onClick={() => setSelectedRow(registro.id)}>
                        
                        <td style={styles.td}>{registro.id}</td>
                        <td style={styles.td}>{registro.primerNombre}</td>
                        <td style={styles.td}>{registro.segundoNombre}</td>
                        <td style={styles.td}>{registro.primerApellido}</td>
                        <td style={styles.td}>{registro.segundoApellido}</td>
                        <td style={styles.td}>{registro.libro}</td>
                        <td style={styles.td}>{registro.folio}</td>
                        <td style={styles.td}>{registro.acta}</td>
                        <td style={styles.td}>{registro.padre}</td>
                        <td style={styles.td}>{registro.madre}</td>
                        <td style={styles.td}>{registro.abueloPaterno}</td>
                        <td style={styles.td}>{registro.abueloMaterno}</td>
                        <td style={styles.td}>{registro.abuelaPaterna}</td>
                        <td style={styles.td}>{registro.abuelaMaterna}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              </div>
            )}
          </main>
        </div>
      </div>
      </Layout>
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
    margin: -90,
    flex: 1,
    fontSize: "1.5rem",
    fontWeight: "600",
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
  iconPrint: {
    width: "18px",
    height: "18px",
    fill: "black",
    marginRight: "0.5rem"
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
    color: "#000000",
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
  printControls: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  printButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCCE74",
    color: "black",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    height: "40px",
    whiteSpace: "nowrap",
    marginLeft: "auto",
    marginBottom: "0.5rem",
    transition: "all 0.3s",
    opacity: props => props.disabled ? 0.5 : 1,
    cursor: props => props.disabled ? "not-allowed" : "pointer",
    '&:hover': {
      backgroundColor: "#2a4274"
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: "not-allowed"
    }
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
    display: "flex",
    gap: "38rem",
    marginBottom: "0.5rem",
    whiteSpace: "nowrap",
    margin: 0,
    width: "100%",
  },
  searchLabel: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginLeft: '0.5rem',
    color: '#000000',
    whiteSpace: "nowrap",
    margin: 0,
  },
  searchForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "700px",
  },
  searchInputContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    flex: 1,
    minWidth: "400px",
    maxWidth: "800px",
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
    color: "#000000",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
  },
  searchLeft: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flex: 1,
    maxWidth: "70%",
  },

  noResultsContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "100%",
  },
  noResultsText: {
    fontSize: "1.2rem",
    color: "#000000",
    fontStyle: "italic",
    whiteSpace: "nowrap",
  },
  searchIcon: {
    width: "18px",
    height: "18px",
    color: "#000000",
  },
  tableContainer: {
    backgroundColor: "whitesmoke",
    borderRadius: "0.5rem",
    boxShadow: "none",
    overflow: "auto",
    marginBottom: "20px",
    marginLeft: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    overflowX: "auto",
    maxHeight: "calc(100vh - 200px)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #000000",
    borderBottom: "1px solid #000000",
    fontSize: "1rem",
    fontWeight: "600",
    overflowX: "auto",
  },
  tableHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "#FCCE74",
    zIndex: 1,
  },
  tableBody: {
    overflowY: "auto",
  },
  th: {
    backgroundColor: "#FCCE74",
    padding: "1rem",
    textAlign: "center",
    border: "1px solid #000000",
    borderBottom: "1px solid #000000",
    fontWeight: "600",
    fontSize: "1rem",
    minWidth: "100px",
    overflow: "auto",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  tr:{
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #000000",
    border: "1px solid #000000",
    textAlign: "center",
    overflow: "auto",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    transition: "background-color 0.2s",
    '&:hover': {
      backgroundColor: "#f5f5f5",
    },
  },
  td: {
    backgroundColor: "#FFFFFF",
    padding: "1rem",
    verticalAlign: "middle",
    border: "1px solid #000000",
    borderBottom: "1px solid #000000",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "600",
    overflow: "auto",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}

export default BuscarPartidas

