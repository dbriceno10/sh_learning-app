// import { ReactChild, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./Profile.css";
// import { getProfile } from "../../Actions/profile.action.js";
// import { getUserCredentials } from "../../Actions/login.actions";
import Navbar from "../../Components/NavBars/Navbars";
import Cards from "../../Components/Cards/Cards";
import Button from "../../Components/Buttons/Buttons";
import './Profile.css';

export default function Profile({ isLoggedIn }) {
	// const { userCredentials } = useSelector(state => state.login);
	// const dispatch = useDispatch();
	// const userData = useSelector(state => state.student);

	// useEffect(() => {
	// 	dispatch(getUserCredentials());
	// }, [dispatch])

	// useEffect(() => {
	// 	dispatch(getProfile(userCredentials.id));
	// }, [userCredentials])

	// console.log(userCredentials.id);
	// console.log(userData)
	// console.log(userCredentials);

	// "id": "09e993a4-a6f3-4db8-b759-6778efb8d02b",
	// 	"name": "Juan",
	// 		"lastName": "Rocha",
	// 			"email": "rebix58073@chatich.com",
	// 				"avatar": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
	// 					"role": "alumno"
	const user = {
		name: "Leo",
		lastName: "Davincci",
		email: "elojo@deDios.com",
		avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDM_viItMYZP__YWkRbp5U_-86mGXHmA0vw&usqp=CAU",
		role: "alumno"
	}

	return (
		<main className="profile">
			<div className="page-container">
				<Navbar isLoggedIn={isLoggedIn} className='profile_nav-bar'></Navbar>
				<header className="profile_details_header title">
					<h1>Mi perfil</h1>
				</header>
				<section className="profile_details ">
					<section className="profile_details_inputs">
						<div className="details_inputs_public-info">
							<label htmlFor='input_nombre' className="profile_label">
								Nombre
								<input name='input_nombre' className="profile_inputs" type={'text'} value={user.name} disabled />
							</label>
							<label htmlFor='input_lastName' className="profile_label">
								Lastname
								<input name='input_lastName' className="profile_inputs" type={'text'} value={user.lastName} disabled />
							</label>
							<label htmlFor='input_email' className="profile_label">
								Email
								<input name='input_email' className="profile_inputs" type={'text'} value={user.email}
									disabled />
							</label>

						</div>
						<div className="details_inputs_private-info">
							<label htmlFor='input_contraseña' className="profile_label">
								Contraseña actual
								<input name='input_contraseña' className="profile_inputs" type={'text'} value={"******"} disabled />
							</label>
							<label htmlFor='confirmpassword' className="profile_label">
								Contraseña nueva
								<input name='confirmpassword' className="profile_inputs" type={'text'} value={"******"} disabled />
							</label>
							<Button
								text={'Editar datos'}
								type={'raised-icon'}
								onClick={(e) => alert('Editar datos')}
								link={''}
								icon={'ci:edit'}
							></Button>
						</div>
					</section>
					<div className="profile_divider"></div>
					<section className="profile_details_profile-pic">
						<div className="details_profile-container">
							{/* <img src={user.avatar} alt='' className="details_profile-pic_photo" /> */}
							<div className="details_profile-pic_photo"
								style={{
									backgroundImage: `url(${user.avatar})`
								}}
							>
							</div>
							<Button
								text={'Cambiar foto'}
								type={'raised-icon'}
								onClick={(e) => alert('Cambiar foto')}
								link={''}
								icon={'eva:upload-outline'}
							></Button>
						</div>
					</section>
				</section>
				<header className="profile_courses_header title">
					{isLoggedIn === 'student'
						? <h1>Mis cursos comprados</h1>
						: <h1>Mis cursos creados</h1>}
				</header>
				<section className="profile_courses">
					<div className="profile_courses_create-btn">
						<Button
							type={'raised-icon'}
							text={'Crear nuevo curso'}
							icon={'eos-icons:content-new'}
							link={'/profile/create'}
						>
						</Button>
					</div>
					<Cards
						searchTerm={''}
						isLoggedIn={isLoggedIn}
					>
					</Cards>
				</section>
			</div>
		</main >
	);
}
