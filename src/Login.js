import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "./logo.png" // Asegúrate de que la ruta del logo sea correcta
import { useAuth } from "./AuthContext"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Principal")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    // Aquí puedes manejar la lógica de inicio de sesión
    console.log("Email:", email)
    console.log("Password:", password)

    // Crear datos del usuario para la autenticación
    const userData = {
      name: "Nombre Usuario",
      role: "Rol",
      email: email,
    }

    // Guardar la sesión en el contexto de autenticación
    login(userData)

    // Redirigir a la interfaz principal
    navigate("/Principal")
  }

  const handleForgotPassword = () => {
    navigate("/recuperar-contraseña") // Redirige a la interfaz de recuperación de contraseña
  }

  const handleCreateAccount = () => {
    navigate('/crear-cuenta'); // Redirige a la interfaz de creación de cuenta
  };


  return (
    <div style={styles.container}>
      {/* Logo en la parte izquierda */}
      <div style={styles.logoContainer}>
        <img src={logo || "/placeholder.svg"} alt="Logo" style={styles.logo} />
      </div>

      {/* Formulario de inicio de sesión (cuadro blanco) */}
      <div style={styles.loginContainer}>
        <h2 style={styles.title}>Inicio de sesión</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
        <p style={styles.createAccountLink} onClick={handleCreateAccount}>
          ¿Crear Cuenta? 
        </p>
        <p style={styles.forgotPassword} onClick={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Cambiado de height a minHeight
    backgroundColor: "#385792",
    fontFamily: "Arial, sans-serif",
    
    boxSizing: "border-box",
    overflow: "auto", // Cambiado de "hidden" a "auto" para permitir desplazamiento
    position: "relative", // Cambiado de "fixed" a "relative" para permitir desplazamiento
    width: "100%", // Ancho completo
  },
  logoContainer: {
    marginRight: '5px',
    marginLeft: '-50px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "50%", // Asigna un ancho fijo 
  },
  logo: {
    width: "100%",
    height: 'auto',
    maxWidth: '900px ', // Evita que el logo se desborde en pantallas pequeñas
    objectFit: "contain", // Mantiene la proporción
    maxHeight: "80vh", // Limita la altura
    marginRight: '150px', // Espacio entre el logo y el título
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: '3rem', // Unidad relativa (rem)
    marginLeft: '-80px',
    borderRadius: '1.5rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '50%',
    maxWidth: '400px', // Ancho máximo del formulario
    minWidth: '500px', // Ancho mínimo para evitar que se haga demasiado pequeño
    height: "auto", // Altura automática
    position: "relative", // Posición relativa para elementos internos
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    
  },
  title: {
    fontSize: '2.5rem', // Unidad relativa (rem)
    marginBottom: '4rem', // Unidad relativa (rem)
    fontWeight: "700",
    position: "reative", // Posición estable
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    position: "relative", // Posición estable
   
  },
  formGroup: {
    marginBottom: '1rem', // Unidad relativa (rem)
    position: "relative", // Posición estable
  },
  label: {
    fontSize: '1rem', // Unidad relativa (rem)
    marginBottom: '0.5rem', // Unidad relativa (rem)
    display: "block", // Asegura que sea un bloque
    position: "relative", // Posición estable
  },
  input: {
    padding: "1rem",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    position: "relative", // Posición estable
    transition: "border-color 0.2s ease", // Solo transición para el color del borde
    outline: "none", // Elimina el contorno al enfocar
  },
  button: {
    padding: "0.75rem",
    fontSize: "25px",
    backgroundColor: "#FCCE74",
    color: "black",
    border: "none",
    cursor: "pointer",
    borderRadius: "0.5rem",
    marginTop: "20px",
    position: "relative", // Posición estable
    transition: "background-color 0.2s ease", // Solo transición para el color de fondo
    transform: "none !important", // Evita transformaciones
  },
  forgotPassword: {
    marginTop: '1rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  createAccountLink: {
    marginTop: '1rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },

};

export default Login;