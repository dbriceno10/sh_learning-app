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
<<<<<<< HEAD
import ReactPlayer from 'react-player';
import CardsVideos from "../../Components/CardsVideos/CardsVideos";

const video= 'https://www.youtube.com/watch?v=QrDJ9zv0Pwg&ab_channel=ENTERTAIMENTNOW'
=======
import ReactPlayer from "react-player";

const video =
	"https://www.youtube.com/watch?v=QrDJ9zv0Pwg&ab_channel=ENTERTAIMENTNOW"; ///para mostar!!!
>>>>>>> mirror

export default function CourseDetail({ isLoggedIn }) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseDetail } = useSelector((state) => state.courses);
	const { localStorageCart } = useSelector((state) => state.cart);
	const [favourite, setFavourite] = useState(false);
	const { userCredentials } = useSelector((state) => state.login);

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
						showConfirmButton: false,
						timer: 2000,
					}).then(() => {
						MySwal.fire({
							// title: `¿Quieres agregar ${name} al carrito?`,
							icon: "info",
							showDenyButton: true,
							// showCancelButton: true,
							confirmButtonText: "Seguir viendo cursos",
							confirmButtonColor: "#2b174f",
							denyButtonText: "Ver mi carrito",
							denyButtonColor: "#eabb39",
						}).then((result) => {
							if (result.isConfirmed) {
								navigate("/home");
							} else {
								navigate("/carrito");
							}
						});
					});
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

	useEffect(() => {
		dispatch(getUserCredentials());
		dispatch(getCourseDetail(id));
		dispatch(getLocalStorage());
		dispatch(clearPage());
	}, [dispatch, id]);
	console.log(isLoggedIn);
	console.log(courseDetail?.teacherID);

	return (
		<section className="course-details">
			<div className="page-container">
				<Navbar isLoggedIn={isLoggedIn} />
				{courseDetail && (
					<div className="course-details_back-btn">
						<Button
							type={"raised"}
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
							width="100%"
							height="100%"
							controls
							volume="0.5"
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
								name="read-only"
								value={courseDetail?.meanReview}
								readOnly
							/>
							<p>{courseDetail?.description}</p>
							<h2>$ {courseDetail?.price}</h2>
							<div className="actionsButtons">
								{isLoggedIn === "teacher" &&
								userCredentials.id === courseDetail.teacherID ? null : (
									<div className="buyBtn">
										<Button
											icon={"bi:cart-plus"}
											type={"raised-icon"}
											text={"Agregar al carrito"}
											onClick={handleAddCart}
											link={""}
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
<<<<<<< HEAD
			<CardsVideos id={id}/>
		</section >
=======
		</section>
>>>>>>> mirror
	);
}
