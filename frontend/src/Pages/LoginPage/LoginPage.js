import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from '../../Components/Buttons/Buttons';
import GoogleLogin from "react-google-login";
import { loginGoogle } from "../../Actions/login.actions";
import { getUserCredentials } from "../../Actions/login.actions";
import { Formik } from "formik";
import "./LoginPage.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function LoginPage({ isLoggedIn }) {
	const [seePassword, setSeePassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal);
	const formikInitialValues = {
		email: "",
		password: "",
	};

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
		navigate("/home");
		return dispatch(loginGoogle(userData));
	};

	// const handleChange = (e) => {
	// 	setUserLogin({
	// 		...userLogin,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	const validateInputs = (valores) => {
		let errores = {};
		if (!valores.email) {
			errores.email = "Ingresa un correo electrónico";
		} else if (
			!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(valores.email)
		) {
			errores.email = "El formato de correo electrónico es incorrecto";
		}
		if (!valores.password) {
			errores.password = "Ingresa una contraseña";
		}
		return errores;
	}

	const submitForm = async (valores, { resetForm }) => {
		// if (!userLogin.email || !userLogin.password) {
		// 	alert("Completa los campos");
		// 	return;
		// }
		let { email, password } = valores;
		let User = {
			email: email,
			password: password,
		};
		try {
			const res = await axios.post("/login", User);
			// console.log(res);
			MySwal.fire({
				position: 'center',
				title: 'Espera un momento...',
				allowEscapeKey: false,
				allowOutsideClick: false,
				timer: 2500,
				onOpen: () => {
					MySwal.showLoading()
				}
			});
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
				navigate('/home');
				// if (isLoggedIn === 'student') {
				// 	navigate("/home");
				// } else {
				// 	navigate("/profile");
				// }
			} else {
				MySwal.fire({
					position: "center",
					icon: "error",
					title: "Ha ocurrido un error, por favor vuelve a intentarlo.",
					showConfirmButton: false,
					timer: 2500,
				});
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
					<h1>Inicia Sesión</h1>
				</header>
				<main className="login-form_container">
					<section className="login-form_login-section">
						<Formik
							initialValues={formikInitialValues}
							validate={validateInputs}
							onSubmit={submitForm}
						>
							{({
								values,
								handleSubmit,
								handleChange,
								handleBlur,
								errors,
								touched,
							}) => (
								<form onSubmit={handleSubmit}
									className={'login-section_form'}>
									<label htmlFor="email">
										Correo electrónico
										<input
											type="email"
											name="email"
											id="email"
											className={
												(touched.email && errors.email)
													? "error-input"
													: ""
											}
											placeholder="john@example.com"
											value={values.email}
											maxLength={350}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</label>
									{(touched.email && errors.email)
										?
										(
											<div className="error-msg">{errors.email}</div>
										)
										: (
											<div className="error-msg hidden">''</div>
										)}
									<div className="login-section_password-wrapper">
										<label htmlFor="password">
											Contraseña
											{seePassword
												? (
													<input
														type="text"
														name="password"
														id="password"
														className={
															(touched.password && errors.password)
																? "error-input"
																: ""
														}
														placeholder="Escribe aqui tu contraseña"
														value={values.password}
														maxLength={50}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												)
												: (
													<input
														type="password"
														name="password"
														id="password"
														className={
															(touched.password && errors.password)
																? "error-input"
																: ""
														}
														placeholder="Escribe aqui tu contraseña"
														value={values.password}
														maxLength={50}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												)}
										</label>
										{(touched.password && errors.password)
											?
											(
												<div className="error-msg">{errors.password}</div>
											)
											: (
												<div className="error-msg hidden">''</div>
											)}
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
										link={''}
										type={'submit'}
									>
									</Button>
								</form>
							)}
						</Formik>
						< div className="divider">O</div>
						<GoogleLogin
							clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE}
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
								text={'Regístrate'}
								icon={'bi:arrow-right-circle'}
								link={'/signUp'}
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
