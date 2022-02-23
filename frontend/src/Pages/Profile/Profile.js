import { ReactChild, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Profile.css";
import { getProfileStudent, uptadeProfileStudent } from "../../Actions/profile.action.js";
import { getProfileTeacher, uptadeProfileTeacher } from './../../Actions/profile.action';
import { getUserCredentials } from "../../Actions/login.actions";
import Navbar from "../../Components/NavBars/Navbars";
import Cards from "../../Components/Cards/Cards";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../../Components/Buttons/Buttons";
import './Profile.css';


export default function Profile({ isLoggedIn }) {
	const MySwal = withReactContent(Swal);
	const [perfil,setPerfil] = useState(false)
	const dispatch = useDispatch();
	const { userCredentials } = useSelector(state => state?.login);
	const user = useSelector(state => state?.student.dataUser)
	const [input, setInput] = useState({
		name: '',
		lastName: '',
		email: '',
		avatar: ''
	})

	useEffect(() => {
		dispatch(getUserCredentials());
		setPerfil(true)
	}, [dispatch])

	useEffect(() => {
		dispatch(getProfileStudent(userCredentials.id));
		dispatch(getProfileTeacher(userCredentials.id));
		setPerfil(true)
	}, [userCredentials])



	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
		console.log(input)
	}
	function handleSumbit(e) {
		e.preventDefault();
		if (input.name || input.lastName || input.email || input.avatar) {
			try {
				dispatch(uptadeProfileStudent(user.id, input))
				dispatch(uptadeProfileTeacher(user.id, input));
				setInput({
					name: '',
					lastName: '',
					email: ''
				})
				Swal.fire(
					'Cambios aplicados!',
					'Success'
				)
			} catch (error) {
				MySwal.fire({
					position: "center-center",
					icon: "error",
					title: "Ha ocurrido un error.",
					showConfirmButton: false,
					timer: 2500,
				});
			}
		} if (!input.name && !input.lastName && !input.email && !input.avatar) {
			MySwal.fire({
				position: "center-center",
				icon: "error",
				title: "Complete al menos un campo.",
				showConfirmButton: true,
				timer: 7000,
			});
		}
	}


	return (
		<form onSubmit={e => handleSumbit(e)} className="profile">
			<div className="page-container">
				<Navbar isLoggedIn={isLoggedIn} className='profile_nav-bar'></Navbar>
				<header className="profile_details_header title">
					<h1>Mi perfil</h1>
				</header>
				<section className="profile_details ">
					<section className="profile_details_inputs">
						<div className="details_inputs_public-info">
							<label htmlFor='name' className="profile_label">
								Nombre
								<input name='name' className="profile_inputs" type={'text'} placeholder={user.name} onChange={handleChange} />
							</label>
							<label htmlFor='lastName' className="profile_label">
								Apellidos
								<input name='lastName' className="profile_inputs" type={'text'} placeholder={user.lastName} onChange={handleChange} />
							</label>
							<label htmlFor='email' className="profile_label">
								Correo electrónico
								<input name='email' className="profile_inputs" type={'text'} placeholder={user.email} onChange={handleChange} />
							</label>

						</div>
						<div className="details_inputs_private-info">
							{/* <label htmlFor='contraseña' className="profile_label">
								Contraseña
								<input name='contraseña' className="profile_inputs" type={'text'} placeholder={"******"} disabled />
							</label> */}
							<Button
								btnVariant={'flat'}
								text={'Cambiar contraseña'}
								link={'/forgotPassword'}
							/>
							{/* <Link to='/changepassword'>
								<button className="changepassword-btn">Cambiar contraseña.</button>
							</Link> */}
							<Button
								btnVariant={'raised-icon'}
								icon={'ic:outline-save'}
								type={'submit'}
								text={'Guardar cambios'}
							/>
							{/* <button type="submit" className='submit-btn-profile'>Guardar cambios</button> */}
						</div>
					</section>
					<div className="profile_divider"></div>
					<section className="profile_details_profile-pic">
						<div className="details_profile-container">

							<div className="details_profile-pic_photo"
								style={{
									backgroundImage: `url(${user.avatar})`
								}}
							>
							</div>
							<label htmlFor='avatar' className="profile_label">
								Cambiar avatar
								<input name='avatar' className="avatar-url" type={'text'} placeholder={"Ingrese url..."} onChange={handleChange} />
							</label>
						</div>
					</section>
				</section>
				<header className="profile_courses_header title">
					{isLoggedIn === 'student'
						? <h1>Mis cursos comprados</h1>
						: <h1>Mis cursos creados</h1>}
				</header>
				<section className="profile_courses">
					{
						isLoggedIn === 'teacher'
						&& (
							<div className="profile_courses_create-btn">
								<Button
									btnVariant={'raised-icon'}
									text={'Crear nuevo curso'}
									icon={'eos-icons:content-new'}
									link={'/profile/create'}
								>
								</Button>
							</div>
						)
					}
					<Cards
						searchTerm={''}
						isLoggedIn={isLoggedIn}
						isProfile={perfil}
					>
					</Cards>
				</section>
			</div >
		</form >
	);
}