import React from 'react';

function RecuperarContraseña() {
  return (
    <div style={styles.container}>
      <h2>Recuperar Contraseña</h2>
      <p>Por favor, ingresa tu correo electrónico para recuperar tu contraseña.</p>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    marginBottom: '50px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#FCCE74',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RecuperarContraseña;