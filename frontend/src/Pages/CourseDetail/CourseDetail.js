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

export default function CourseDetail({ isStudent }) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseDetail } = useSelector((state) => state.courses);
	const { localStorageCart } = useSelector((state) => state.cart);
	console.log(courseDetail);
	const [favourite, setFavourite] = useState(false);
	const { userCredentials } = useSelector((state) => state.login);
	// const [courseCart, setCourseCart] = useState({
	// 	id: "",
	// 	name: "",
	// 	price: "",
	// 	img: "",
	// });

	const MySwal = withReactContent(Swal);

	const handleFavouriteClick = () => {
		if (isStudent) {
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
		if(localStorageCart) {
			const coursesNames = localStorageCart.map(course => course.name)
			const yaHayCurso = coursesNames.includes(courseDetail.name);
			return yaHayCurso
		}
	}


	function handleAddCart() {
		if (isStudent) {
			if(getCoursesNames()) {
				MySwal.fire({
					position: "center-center",
					icon: "error",
					title: "Ya tienes este curso en tu carrito",
					showConfirmButton: false,
					timer: 2500,
				});
				return
			}
			dispatch(addToCart(courseDetail));
			MySwal.fire({
				position: "center-center",
				icon: "success",
				title: "Curso agregado correctamente",
				showConfirmButton: false,
				timer: 2500,
			});
			navigate("/carrito");
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
	}

	useEffect(() => {
		dispatch(getUserCredentials());
		dispatch(getCourseDetail(id));
		dispatch(clearPage());
		dispatch(getLocalStorage())
	}, [dispatch, id]);

	return (
		<section className="course-details">
			<div className="page-container">
				<Navbar isStudent={isStudent} />
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
						<img
							className="course-details_image"
							src={courseDetail?.img}
							alt={courseDetail?.name}
						/>
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
								<div className="buyBtn">
									<Button
										icon={"icon-park-outline:buy"}
										type={"raised-icon"}
										text={"Agregar al carrito"}
										onClick={handleAddCart}
										link={""}
									></Button>
								</div>
							</div>
						</div>
					</main>
				) : (
					<Loader />
				)}
			</div>
		</section>
	);
}
