import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from '../../Components/Buttons/Buttons';
import GoogleLogin from "react-google-login";
import { loginGoogle } from "../../Actions/login.actions";
import { getUserCredentials } from "../../Actions/login.actions";
import "./LoginPage.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function LoginPage({ isLoggedIn }) {
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
		<div className="login-form">
			<div className="page-container">
				<header className="login-form_header">
					<h1>Iniciar Sesión</h1>
				</header>
				<main className="login-form_container">
					<section className="login-form_login-section">
						<form onSubmit={handleSubmit}
							className={'login-section_form'}>
							<label htmlFor="email">
								Correo electrónico
								<input
									type="email"
									name="email"
									className="login-section_email"
									placeholder="samuelito22@gmail.com"
									value={userLogin.email}
									maxLength={50}
									onChange={handleChange}
								/>
							</label>
							<div className="login-section_password-wrapper">
								<label htmlFor="password">
									Contraseña
									{seePassword
										? (
											<input
												type="text"
												name="password"
												className="login-section_password"
												placeholder="Escribe aqui tu contraseña"
												value={userLogin.password}
												maxLength={50}
												onChange={handleChange}
											/>
										)
										: (
											<input
												type="password"
												name="password"
												className="login-section_password"
												placeholder="Escribe aqui tu contraseña"
												value={userLogin.password}
												maxLength={50}
												onChange={handleChange}
											/>
										)}
								</label>
								<button
									onClick={onClick}
									type="button"
									className={'password-button'}
								>
									<Icon icon={
										seePassword
											? 'bx:show'
											: 'bx:hide'
									}>
									</Icon>
								</button>
							</div>
							<Link
								to="/forgotPassword"
								className="login-section_forgot-password"
							>
								¿Olvidaste tu contraseña?
							</Link>
							<Button
								btnVariant={'raised'}
								text={'Iniciar sesión'}
								onClick={handleSubmit}
								link={''}
								type={'submit'}
							>
							</Button>
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
									className="login-section_google-login-btn"
								>
									Iniciar sesión con Google
									<Icon
										icon={'grommet-icons:google'}>
									</Icon>
								</button>
							)}
							onSuccess={respuestaGoogle}
							onFailure={respuestaGoogle}
							cookiePolicy="single_host_origin"
						/>
					</section>
					<div className="login-form_divider"></div>
					<section className="login-form_create-account-section">
						<section className="create-account-section_col1">
							<img src="https://i.imgur.com/FA1ef4x.png" alt="Woman of color looking forwards" />
						</section>
						<section className="create-account-section_col2">
							<h2>¿Aún no tienes una cuenta?</h2>
							<p>Conoce miles de cursos con profesores de todo el mundo</p>
							<Button
								btnVariant={'raised-icon'}
								text={'Registrate'}
								icon={'bi:arrow-right-circle'}
								link={'/signUp'}
								type={'button'}
							>
							</Button>
						</section>
					</section>
				</main>
			</div>
		</div>
	);
}

export default LoginPage;
