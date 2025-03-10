import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "./logo.png";

function CrearCuenta() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para crear la cuenta
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    alert('Cuenta creada exitosamente.');
    navigate('/'); // Redirige al inicio de sesión después de crear la cuenta
  };

  const handleCancel = () => {
    navigate('/'); // Redirige al inicio de sesión al cancelar
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Logo positioned outside and above the white card */}
        <div style={styles.logoContainer}>
          <img src={logo || "/placeholder.svg"} alt="Logo" style={styles.logo} />
        </div>
        
        <div style={styles.card}>
          <h2 style={styles.title}>Crear Cuenta</h2>
          <p style={styles.description}>
            Por favor, ingresa tu correo electrónico y contraseña para crear una cuenta.
          </p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Correo Electrónico</label>
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
              <label htmlFor="password" style={styles.label}>Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.buttonContainer}>
              <button type="button" style={styles.cancelButton} onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" style={styles.submitButton}>
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#385792',
    padding: '20px',
    boxSizing: 'border-box',
    paddingTop: '40px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    width: '100%',
    gap: '20px',
  },
  logoContainer: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: '250px',
    height: 'auto',
    objectFit: 'contain',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    display: 'block',
    textAlign: 'left',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  cancelButton: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#FCCE74',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1,
  },
  submitButton: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#FCCE74',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1,
  },
};

export default CrearCuenta;