import { ReactChild, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import { getProfile } from "../../Actions/profile.action.js";
import { uptadeProfile } from './../../Actions/profile.action';
import { getUserCredentials } from "../../Actions/login.actions";
import Navbar from "../../Components/NavBars/Navbars";
import Cards from "../../Components/Cards/Cards";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../../Components/Buttons/Buttons";
import { Icon } from "@iconify/react";
import './Profile.css';

export default function Profile({ isLoggedIn }) {
	const MySwal = withReactContent(Swal);

	const dispatch = useDispatch();
	const { userCredentials } = useSelector(state => state.login);
	const student = useSelector(state => state.student);
	const [input, setInput] = useState({
		name: '',
		lastName: '',
		email: '',
		password: ''
	})
	
	useEffect(() => {
		dispatch(getUserCredentials());
	}, [dispatch])
	
	useEffect(() => {
		dispatch(getProfile(userCredentials.id));
	}, [userCredentials])
	


	function handleChange(e){
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
		console.log(input)
	}
	function handleSumbit(){
		try {
			dispatch(uptadeProfile(userCredentials.id,input));
			Swal.fire(
				'Cambios aplicados!',
				'success'
			  )
		} catch (error) {
			MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "HA ocurrido un error.",
                showConfirmButton: false,
                timer: 2500,
            });
		}
	}


	return (
		<main onSubmit={handleSumbit} className="profile">
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
								<input name='name' className="profile_inputs" type={'text'} placeholder={student.name} onChange={handleChange}/>
							</label>
							<label htmlFor='lastName' className="profile_label">
								Lastname
								<input name='lastName' className="profile_inputs" type={'text'} placeholder={student.lastName}  onChange={handleChange}/>
							</label>
							<label htmlFor='email' className="profile_label">
								Email
								<input name='email' className="profile_inputs" type={'text'} placeholder={student.email}onChange={handleChange}/>
							</label>

						</div>
						<div className="details_inputs_private-info">
							<label htmlFor='contraseña' className="profile_label">
								Contraseña actual
								<input name='contraseña' className="profile_inputs" type={'text'} placeholder={"******"} disabled />
							</label>
							<label htmlFor='password' className="profile_label">
								Contraseña nueva
								<input name='password' className="profile_inputs" type={'text'} placeholder={"******"} onChange={handleChange}/>
							</label>
							<Button
								text={'Editar datos'}
								type={'raised-icon'}
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
									backgroundImage: `url(${student.avatar})`
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
					<h1>Mis cursos</h1>
				</header>
				<section className="profile_courses">
					<Cards searchTerm={''}></Cards>
				</section>
			</div>
		</main >
	);
}
