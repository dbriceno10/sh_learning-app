import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCredentials } from "../../Actions/login.actions";
import { clearPage, getCourseDetail } from "../../Actions/courses.actions";
import Rating from "@mui/material/Rating";
import Navbar from "../../Components/NavBars/Navbars";
import "./CourseDetail.css";
import Loader from "../../Components/Loader/Loader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "../../Components/Buttons/Buttons";
import { addToCart, getLocalStorage } from "../../Actions/cart.actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPlayer from 'react-player';
import { newReview } from "../../Actions/review.actions"
import CardsVideos from "../../Components/CardsVideos/CardsVideos";
import { getVideosCurses } from "../../Actions/videos.actions";
import { getProfileStudent } from "../../Actions/profile.action";

let video = "https://www.youtube.com/watch?v=1R3hlqUMmk8";

export default function CourseDetail({ isLoggedIn }) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseDetail } = useSelector((state) => state.courses);
	console.log(courseDetail)
	const { localStorageCart } = useSelector((state) => state.cart);
	const [favourite, setFavourite] = useState(false);
	const { userCredentials } = useSelector((state) => state.login);
	console.log(userCredentials)
	const {dataUser} = useSelector((state) => state.student)
	console.log(dataUser);
	const [rating, setRating] = useState(0)

  const { videos_curses } = useSelector((state) => state.videosCursos);

  useEffect(() => {
    dispatch(getVideosCurses(id));
    // getData(); 
  }, [dispatch, id]);
  console.log("id: ",id)
  console.log("videos_curses.length: ", videos_curses.length)
  if(videos_curses.length > 0) {
    video = videos_curses[0].url;
  } else {
    video = "https://www.youtube.com/watch?v=1R3hlqUMmk8";
  }

	// const [courseCart, setCourseCart] = useState({
	// 	id: "",
	// 	name: "",
	// 	price: "",
	// 	img: "",
	// });

	console.log(isLoggedIn)

	const MySwal = withReactContent(Swal);

	const handleFavouriteClick = () => {
		if (isLoggedIn === "student" || isLoggedIn === "teacher") {
			setFavourite(!favourite);
			if (!favourite) {
				MySwal.fire({
					position: "center-center",
					icon: "success",
					title: "Curso agregado a Favoritos",
					showConfirmButton: false,
					timer: 2500,
				});
			} else {
				MySwal.fire({
					position: "center-center",
					icon: "error",
					title: "Curso eliminado de Favoritos",
					showConfirmButton: false,
					timer: 2500,
				});
			}
		} else {
			MySwal.fire({
				position: "center-center",
				icon: "warning",
				title: "Por favor, inicia sesión para continuar",
				showConfirmButton: false,
				timer: 2500,
			});
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		}
	};

	// function handlePurchase() {
	// 	if (isStudent) {
	// 		navigate(`/pay?courseId=${id}&&studentId=${userCredentials.id}`)
	// 	} else {
	// 		navigate('/login');
	// 	}
	// }
	const getCoursesNames = () => {
		if (localStorageCart) {
			const coursesNames = localStorageCart.map((course) => course.name);
			const yaHayCurso = coursesNames.includes(courseDetail.name);
			return yaHayCurso;
		}
	};

	function handleAddCart() {
		if (isLoggedIn === "student" || isLoggedIn === "teacher") {
			MySwal.fire({
				title: `¿Quieres agregar ${courseDetail.name} al carrito?`,
				icon: "info",
				showDenyButton: true,
				// showCancelButton: true,
				confirmButtonText: "Aceptar",
				denyButtonText: "Cancelar",
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				console.log(result);
				if (result.isConfirmed) {
					if (getCoursesNames()) {
						MySwal.fire({
							position: "center",
							icon: "error",
							title: "Ya tienes este curso en tu carrito",
							showConfirmButton: false,
							timer: 2000,
						});
						return;
					}
					dispatch(addToCart(courseDetail));
					MySwal.fire({
						position: "center",
						icon: "success",
						title: "Curso agregado correctamente",
						showConfirmButton: true,
						showDenyButton: true,
						// showCancelButton: true,
						denyButtonText: "Seguir viendo cursos",
						denyButtonColor: "#2b174f",
						confirmButtonText: "Ver mi carrito",
						confirmButtonColor: "#eabb39"
					}).then(() => {
						if (result.isConfirmed) {
							navigate("/cart");
						} else {
							navigate("/home");
						}
					})
				}
			});
		} else {
			MySwal.fire({
				position: "center",
				icon: "warning",
				title: "Por favor, inicia sesión para continuar",
				showConfirmButton: false,
				timer: 2000,
			});
			navigate("/login");
		}
	}

	const onChange = (e) => {
		e.preventDefault()
		setRating(e.target.value)
	}
	console.log(rating)
	/* console.log(courseDetail.id) */



	const handleSubmit = (e) => {
		e.preventDefault()
		if (isLoggedIn !== "student" || isLoggedIn !== "teacher") {
			MySwal.fire({
				position: "center-center",
				icon: "warning",
				title: "Por favor, inicia sesión para continuar",
				showConfirmButton: false,
				timer: 2500,
			});
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		} else {
			dispatch(newReview({
				score: rating,
				courseId: courseDetail.id,
				studentId: userCredentials.id
			}))
			MySwal.fire({
				position: "center-center",
				icon: "success",
				title: "Gracias por dejar tu review!",
				showConfirmButton: false,
				timer: 2000,
			});
		}

	}

		const disabled = dataUser.courses.find(e => e === courseDetail.id)
		console.log(disabled);





	/* 
		let courseId = courseDetail.id
	j
		let studentId = userCredentials.id */

	useEffect(() => {
		dispatch(getProfileStudent())
		dispatch(getUserCredentials());
		dispatch(getCourseDetail(id));
		dispatch(getLocalStorage());
	}, [dispatch, id]);


	/* console.log(userCredentials) */

	


	return (
		<section className="course-details">
			<div className="page-container">
				<Navbar isLoggedIn={isLoggedIn} />
				{courseDetail && (
					<div className="course-details_back-btn">
						<Button
							btnVariant={"raised"}
							text={"Volver a cursos"}
							link={"/home"}
						></Button>
					</div>
				)}
				{courseDetail ? (
					<main className="course-details_card">
						<ReactPlayer
							className="course-details_image"
							url={video} //{courseDetail?.img} ---->  url del video!!!

							width='100%'
							height='100%'
							controls
							volume='0.5'

						/>
						{/* <img
							className="course-details_image"
							src={courseDetail?.img}
							alt={courseDetail?.name}
						/> */}
						<div className="course-details_info">
							<header className="course-details_info_header">
								<h1 className="title">{courseDetail?.name}</h1>
								{favourite ? (
									<FavoriteIcon
										className="favorite-btn"
										onClick={handleFavouriteClick}
									/>
								) : (
									<FavoriteBorderIcon
										className="favorite-btn"
										onClick={handleFavouriteClick}
									/>
								)}
							</header>
							<h3 className="course-details_info_author">
								Autor:{" "}
								{`${courseDetail?.teacherName} ${courseDetail?.teacherLastName}`}
							</h3>


							<Rating
								value={rating}
								onChange={onChange}
							/>


							{rating > 0 ? (

								<button type="button" onClick={handleSubmit}>Agregar Review</button>
							) : null}
							<p>{courseDetail?.description}</p>
							<h2>$ {courseDetail?.price}</h2>
							<div className="actionsButtons">
								{(isLoggedIn === 'teacher' && userCredentials.id === courseDetail.teacherID)
									? null
									: (
										<div className="buyBtn">
											<Button
												icon={"bi:cart-plus"}
												btnVariant={"raised-icon"}
												text={"Agregar al carrito"}
												onClick={handleAddCart}
												link={""}
												disabled={disabled}
											></Button>
										</div>
									)}
							</div>
						</div>
					</main>
				) : (
					<Loader />
				)}
			</div>
			<CardsVideos id={id} />
		</section >
	);
}