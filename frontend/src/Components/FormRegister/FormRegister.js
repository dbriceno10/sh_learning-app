import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginLocal } from "../../Actions/login.actions"
import "./FormRegister.css";
import axios from "axios";

const FormRegister = () => {
	const dispatch = useDispatch();
	let navigate = useNavigate();

	return (
		<>
			<div className="contenedor">
				<Formik
					initialValues={{
						name: "",
						lastName: "",
						email: "",
						password: "",
						confirmPassword: "",
						role: "",
					}}
					validate={(valores) => {
						let errores = {};
						if (!valores.name) {
							errores.name = "Ingrese un nombre";
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
							errores.name = "El nombre solo puede contener espacios y letras";
						}
						if (!valores.lastName) {
							errores.lastName = "Ingrese un apellido";
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.lastName)) {
							errores.lastName =
								"El apellido solo puede contener espacios y letras";
						}
						if (!valores.email) {
							errores.email = "Ingrese un email";
						} else if (
							!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(valores.email)
						) {
							errores.email = "El formato de email es incorrecto";
						}
						if (valores.confirmPassword !== valores.password) {
							errores.confirmPassword =
								"La contraseña no coincide con la ingresada anteriormente";
						}
						if (!valores.password) {
							errores.password = "Ingrese una contraseña";
						}
						return errores;
					}}
					onSubmit={async (valores, { resetForm }) => {
						if (!valores.role) {
							alert("Por favor, elige un rol");
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
								if (res.statusText === "OK") {
									alert("Felicitaciones! Te has registrado con éxito!");
									resetForm();
									navigate("/login");
								} else {
									alert("Ha ocurrido un error");
								}
							} catch (error) {
								alert("Ya existe un usuario registrado con ese email.");
							}
						}

						//enviar datos
						// console.log(valores); //estan todos los datos en un objeto
					}}
				>
					{({
						values,
						handleSubmit,
						handleChange,
						handleBlur,
						errors,
						touched,
					}) => (
						<form className="login-wrapper" onSubmit={handleSubmit}>
							<h1 className="text-center text-primary">Registrarse</h1>

							<div>
								<label name="name">Nombre</label>
								<input
									type="text"
									name="name"
									placeholder="Juan"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
								></input>
								{touched.name && errors.name && (
									<div className="error">{errors.name}</div>
								)}
							</div>
							<div>
								<label name="lastName">Apellido</label>
								<input
									type="text"
									name="lastName"
									placeholder="Perez"
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
								></input>
								{touched.lastName && errors.lastName && (
									<div className="error">{errors.lastName}</div>
								)}
							</div>
							<div>
								<label name="email">Email</label>
								<input
									type="email"
									name="email"
									placeholder="Juan@Perez.com"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
								></input>
								{touched.email && errors.email && (
									<div className="error">{errors.email}</div>
								)}
							</div>
							<div>
								<label name="password">Contraseña</label>
								<input
									type="password"
									name="password"
									placeholder="Ingresa tu contraseña"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
								></input>
								{touched.password && errors.password && (
									<div className="error">{errors.password}</div>
								)}
							</div>
							<div>
								<label name="confirmPassword">Confirma tu contraseña</label>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Ingresa nuevamente tu contraseña"
									value={values.confirmPassword}
									onChange={handleChange}
									onBlur={handleBlur}
								></input>
								{touched.confirmPassword && errors.confirmPassword && (
									<div className="error">{errors.confirmPassword}</div>
								)}
							</div>
							<h4 className="text-center text-primary h4-role">
								Registrarse como:
							</h4>
							<div className="role-container">
								<div>
									<label name="alumno">Alumno</label>
									<input
										type="radio"
										name="role"
										value="alumno"
										onChange={handleChange}
									></input>
								</div>
								<div>
									<label name="profesor">Profesor</label>
									<input
										type="radio"
										name="role"
										value="profesor"
										onChange={handleChange}
									></input>
								</div>
							</div>
							<button type="submit" className="btn btn-primary">
								Registrarse
							</button>
						</form>
					)}
				</Formik>
			</div>
		</>
	);
};
export default FormRegister;
