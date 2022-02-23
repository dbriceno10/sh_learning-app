import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Formik } from "formik";
import { Icon } from "@iconify/react";
import Button from "../Buttons/Buttons";
import "./FormRegister.css";
import FileUploader from "../FileUploader/FileUploader";

const FormRegister = () => {
	let navigate = useNavigate();
	const MySwal = withReactContent(Swal);
	const [isFileSelected, setIsFileSelected] = useState(false);
	const formikInitialValues = {
		name: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "",
	};

	const cb = (val) => {
		setIsFileSelected(prevIsfileSelected => val)
	}

	const validateInputs = (valores) => {
		let errores = {};
		if (!valores.name) {
			errores.name = "Ingresa un nombre";
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
			errores.name = "El nombre solo puede contener espacios y letras";
		}
		if (!valores.lastName) {
			errores.lastName = "Ingresa un apellido";
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName)) {
			errores.lastName =
				"El apellido solo puede contener espacios y letras";
		}
		if (!valores.email) {
			errores.email = "Ingresa un correo electrónico";
		} else if (
			!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(valores.email)
		) {
			errores.email = "El formato de correo electrónico es incorrecto";
		}
		if (!valores.password) {
			errores.password = "Ingresa una contraseña";
		} else if (valores.password.length < 4) {
			errores.password = "La contraseña debe ser de minimo 16 caracteres";
		}
		if (!valores.confirmPassword) {
			errores.confirmPassword = "Ingresa de nuevo tu contraseña";
		}
		if (valores.confirmPassword !== valores.password) {
			errores.confirmPassword =
				"La contraseña no coincide con la ingresada anteriormente";
		}
		return errores;
	}

	const submitForm = async (valores, { resetForm }) => {
		if (!valores.role) {
			MySwal.fire({
				position: "center",
				icon: "warning",
				title: "Por favor, elige un rol",
				showConfirmButton: false,
				timer: 2500,
			});
			return;
		} else if (valores.role === 'profesor' && !isFileSelected) {
			MySwal.fire({
				position: "center",
				icon: "error",
				title: "Por favor, agrega algun archivo para el curriculum",
				showConfirmButton: false,
				timer: 2500,
			});
			return;
		} else {
			let { name, lastName, email, password, role } = valores;
			let newUser = {
				name: name,
				lastName: lastName,
				email: email,
				password: password,
				role: role,
			};
			try {
				const res = await axios.post("/register", newUser);
				console.log(res);
				MySwal.fire({
					position: 'center',
					title: 'Espera un momento...',
					allowEscapeKey: false,
					allowOutsideClick: false,
					timer: 2500,
					onOpen: () => {
						Swal.showLoading()
					}
				});
				if (res.statusText === "OK") {
					MySwal.fire({
						position: "center",
						icon: "success",
						title: "Felicitaciones! Te has registrado con éxito! Revisa tu email para confirmar tu cuenta!",
						showConfirmButton: true,
					});
					// MySwal.fire(
					// 	"Felicitaciones! Te has registrado con éxito!",
					// 	"Por favor, revisa tu email para confirmar tu cuenta."
					// )
					resetForm();
					navigate("/login");
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
					title: "Ya existe un usuario registrado con ese email.",
					showConfirmButton: false,
					timer: 2500,
				});
			}
		}
		//enviar datos
		// console.log(valores); //estan todos los datos en un objeto
	}


	return (
		<main className="register-form">
			<div className="page-container">
				<header className="register-form_header">
					<h1>Crea una cuenta</h1>
				</header>
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
						<form className="register-form_container" onSubmit={handleSubmit}>
							<section className="register-form_role-section">
								<header className="role-section_header">
									<h2>
										¿Eres estudiante o profesor?
									</h2>
								</header>
								<section className="role-section_roles-group">
									<div>
										<input
											type="radio"
											name="role"
											id="role-section_teacher"
											value="profesor"
											onChange={handleChange}
										></input>
										<label htmlFor="role-section_teacher"
											className="role-section_label">
											<div>
												<img src="https://i.imgur.com/5McpoQp.png" alt="Man teacher standing and smiling" />
											</div>
											<span>Profesor</span>
											<Icon
												className="role-section_role-icon"
												icon={'fa-solid:check-circle'}
											></Icon>
										</label>
									</div>
									<div>
										<input
											type="radio"
											name="role"
											id="role-section_student"
											value="alumno"
											onChange={handleChange}
										></input>
										<label htmlFor="role-section_student"
											className="role-section_label">
											<div>
												<img src="https://i.imgur.com/dsw43zw.png" alt="Man teacher standing and smiling" />
											</div>
											<Icon
												className="role-section_role-icon"
												icon={'fa-solid:check-circle'}
											></Icon>
											<span>Alumno</span>
										</label>
									</div>
								</section>
								{document.querySelector('#role-section_teacher')?.checked
									? (
										<section className="role-section_cv-upload">
											<h3>
												Sube tu curriculum:
											</h3>
											<FileUploader
												acceptedTypes={['.pdf']}
												maxFileSize={10000000}
												sendIsFileSelected={cb}
											/>
										</section>
									)
									: null}
							</section>
							<section className="register-form_info-section">
								<header className="info-section_header">
									<h2>
										Ingresa tus datos:
									</h2>
								</header>
								<section className="info-section_public-details">
									<label htmlFor="info-section_name">
										Nombre
										<input
											className={
												(touched.name && errors.name)
													? "error-input"
													: ""
											}
											type="text"
											name="name"
											id="info-section_name"
											placeholder="Juan"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
										></input>
									</label>
									{(touched.name && errors.name)
										?
										(
											<div className="error-msg">{errors.name}</div>
										)
										: (
											<div className="error-msg hidden">''</div>
										)}
									<label htmlFor="info-section_last-name">
										Apellido
										<input
											className={
												(touched.lastName && errors.lastName)
													? "error-input"
													: ""
											}
											type="text"
											name="lastName"
											id="info-section_last-name"
											placeholder="Perez"
											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
										></input>
									</label>
									{(touched.lastName && errors.lastName)
										? (
											<div className="error-msg">{errors.lastName}</div>
										)
										: (
											<div className="error-msg hidden">''</div>
										)}
									<label htmlFor="info-section_email">
										Correo electrónico
										<input
											className={
												(touched.email && errors.email)
													? "error-input"
													: ""
											}
											type="email"
											name="email"
											id="info-section_email"
											placeholder="Juan@correo.com"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										></input>
									</label>
									{(touched.email && errors.email)
										? (
											<div className="error-msg">{errors.email}</div>
										)
										: (
											<div className="error-msg hidden">''</div>
										)}
								</section>
								<section className="info-section_private-details">
									<label htmlFor="info-section_password">
										Contraseña
										<input
											className={
												(touched.password && errors.password)
													? "error-input"
													: ""
											}
											type="password"
											name="password"
											id="info-section_password"
											placeholder="Ingresa tu contraseña"
											value={values.password}
											onChange={handleChange}
											onBlur={handleBlur}
										></input>
									</label>
									{(touched.password && errors.password)
										? (
											<div className="error-msg">{errors.password}</div>
										)
										: (
											<div className="error-msg hidden">''</div>
										)}
									<label name="info-section_confirm-password">
										Confirma tu contraseña
										<input
											className={
												(touched.confirmPassword && errors.confirmPassword)
													? "error-input"
													: ""
											}
											type="password"
											name="confirmPassword"
											id="info-section_confirm-password"
											placeholder="Ingresa de nuevo tu contraseña"
											value={values.confirmPassword}
											onChange={handleChange}
											onBlur={handleBlur}
										></input>
									</label>
									{(touched.confirmPassword && errors.confirmPassword)
										? (
											<div className="error-msg">{errors.confirmPassword}</div>
										)
										: (
											<div className="error-msg hidden">''</div>
										)}
									<Button
										btnVariant={'raised'}
										text={'Registrarse'}
										type={'submit'}
									>
									</Button>
								</section>
								<p className="register-form_login-prompt">
									Ya tienes una cuenta?
									<Link to={'/login'}>
										Iniciar sesión
									</Link>
								</p>
							</section>
						</form>
					)}
				</Formik>
			</div>
		</main >
	);
};
export default FormRegister;
