import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { loginGoogle} from "../Actions/login.actions";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    setSeePassword(!seePassword);
  };

  const respuestaGoogle = (respuesta) => {
    console.log(respuesta);
    console.log(respuesta.profileObj);
    let userData = {
      firstName: respuesta.profileObj.givenName,
      lastName: respuesta.profileObj.familyName,
      image: respuesta.profileObj.imageUrl,
      email: respuesta.profileObj.email,
      tokenId: respuesta.tokenId
    }
    console.log(userData)
    localStorage.setItem("user", JSON.stringify(userData));
    navigate('/profile')
    return dispatch(loginGoogle(userData))
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

          <button type="submit" className="btn btn-primary">
            INICIAR SESIÓN
          </button>

          <div className="text-center">
            <small>
              <Link to="/login" className='formLinks' onClick={() => alert("Redirigir a reseteo de contraseña")}>¿Olvidaste tu contraseña?</Link>
            </small>
          </div>
        </form>

        <div className="divider">O</div>
        <GoogleLogin
          clientId="481476732546-redihub2q7951q72m79sjcgglp0iatsc.apps.googleusercontent.com"
          // buttonText="Login"
          render={(renderProps) => (
            <button
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn btn-google"
            >
              <span
                className="iconify"
                data-inline="false"
                data-icon="grommet-icons:google"
              />
              Iniciar sesión con Google
            </button>
          )}
          onSuccess={respuestaGoogle}
          onFailure={respuestaGoogle}
          cookiePolicy="single_host_origin"
        />

        <div className="text-center">
          <small>
            ¿Aún no tienes una cuenta? <Link to="/signUp" className='formLinks'>Regístrate</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
