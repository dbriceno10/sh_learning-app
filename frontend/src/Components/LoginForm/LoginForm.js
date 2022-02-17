import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { loginGoogle } from "../../Actions/login.actions";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getUserCredentials } from "../../Actions/login.actions";

function LoginForm({ isLoggedIn }) {
	const [seePassword, setSeePassword] = useState(false);
	const [userLogin, setUserLogin] = useState({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal);

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
			tokenId: respuesta.tokenId,
		};
		console.log(userData);
		localStorage.setItem("user", JSON.stringify(userData));
		navigate("/profile");
		return dispatch(loginGoogle(userData));
	};

	const handleChange = (e) => {
		setUserLogin({
			...userLogin,
			[e.target.name]: e.target.value,
		});
	};
	console.log(userLogin);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userLogin);
		if (!userLogin.email || !userLogin.password) {
			alert("Completa los campos");
			return;
		}
		try {
			const res = await axios.post("/login", userLogin);
			// console.log(res);
			if (res.data.authorization) {
				window.localStorage.setItem(
					"userCredentials",
					JSON.stringify(res.data)
				);
				MySwal.fire({
					position: "center",
					icon: "success",
					title: "Has iniciado sesión correctamente",
					showConfirmButton: false,
					timer: 2500,
				});
				setUserLogin({
					email: "",
					password: "",
				});
				navigate('/home')
				// if (isLoggedIn === 'student') {
				// 	navigate("/home");
				// } else {
				// 	navigate("/profile");
				// }
			} else {
				alert("Ha ocurrido un error");
			}
		} catch (error) {
			MySwal.fire({
				position: "center",
				icon: "error",
				title: "Usuario o contraseña incorrectos",
				showConfirmButton: false,
				timer: 2500,
			});
		}
	};

	useEffect(() => {
		dispatch(getUserCredentials())
	}, [dispatch])

	return (
		<div className="form-container">
			<div className="login-wrapper">
				<h1 className="text-center text-primary">Iniciar Sesión</h1>
				<p className="text-center">
					Ingresa los datos con los que te has registrado para poder continuar
				</p>

				<form onSubmit={handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="Correo electrónico"
						value={userLogin.email}
						onChange={handleChange}
					/>
					<div className="input-group">
						{seePassword ? (
							<input
								type="text"
								name="password"
								placeholder="Contraseña"
								value={userLogin.password}
								onChange={handleChange}
							/>
						) : (
							<input
								type="password"
								name="password"
								placeholder="Contraseña"
								value={userLogin.password}
								onChange={handleChange}
							/>
						)}

						<button
							onClick={onClick}
							type="button"
							className={
								seePassword ? "active password-button" : "password-button"
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
							<Link
								to="/changepassword"
								className="formLinks"
							>
								¿Olvidaste tu contraseña?
							</Link>
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
						¿Aún no tienes una cuenta?{" "}
						<Link to="/signUp" className="formLinks">
							Regístrate
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;
