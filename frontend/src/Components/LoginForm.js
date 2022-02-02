import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { changeInputPassword } from '../Helpers/loginFormHelpers';
import './LoginForm.css';

function LoginForm() {
  const [seePassword, setSeePassword] = useState(false);

  const onClick = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div className="form-container">
      <div className="login-wrapper">
        <h1 className="text-center text-primary">Iniciar Sesión</h1>
        <p className="text-center">
          Ingresa los datos con los que te has registrado para poder continuar
        </p>

        <form>
          <input type="email" name="email" placeholder="Correo electrónico" />
          <div className="input-group">
            {seePassword ? (
              <input type="text" name="password" placeholder="Contraseña" />
            ) : (
              <input type="password" name="password" placeholder="Contraseña" />
            )}

            <button
              onClick={onClick}
              type="button"
              className={
                seePassword ? 'active password-button' : 'password-button'
              }
            >
              <span
                className="iconify"
                data-inline="false"
                data-icon="akar-icons:eye-open"
              />
            </button>
          </div>
          <label htmlFor="remember">
            <input type="checkbox" name="remember" />
            Recordar mis datos
          </label>

          <button type="submit" className="btn btn-primary">
            INICIAR SESIÓN
          </button>

          <div className="text-center">
            <small>
              <Link to="/">¿Olvidaste tu contraseña?</Link>
            </small>
          </div>
        </form>

        <div className="divider">O</div>

        <Link to="/login" className="btn btn-google">
          <span
            className="iconify"
            data-inline="false"
            data-icon="grommet-icons:google"
          />
          Iniciar sesión con Google
        </Link>

        <div className="text'center">
          <small>
            ¿Aún no tienes una cuenta? <Link to="/register">Regístrate</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
