import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { clearPage, getCourseDetail } from "../../Actions/courses.actions";
import Rating from "@mui/material/Rating";
import Navbar from "../../Components/NavBars/Navbars";
import "./CourseDetail.css";
// import { Typography } from "@mui/material";
import Loader from "../../Components/Loader/Loader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "../../Components/Buttons/Buttons";

export default function CourseDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	console.log(id);
	const { courseDetail } = useSelector((state) => state.courses);
	console.log(courseDetail);

	const [favourite, setFavourite] = useState(false);
	// const [courseDetail, setCourseDetail] = useState([]);

	const handleFavouriteClick = () => {
		setFavourite(!favourite);
		if (!favourite) {
			alert("Curso agregado a Favoritos");
		} else {
			alert("Curso eliminado de favoritos");
		}
	};

	useEffect(() => {
		dispatch(getCourseDetail(id));
		console.log("llegue dispatch");
		dispatch(clearPage());
		// const getData = async () => {
		// 	const res = await fetch(`http://localhost:3001/fakecourses/${id}`);
		// 	const data = await res.json();
		// 	setCourseDetail(data);
		// };
		// getData();
	}, [dispatch, id]);
	return (
		<section className="course-details">
			<div className="page-container">
				<Navbar />
				{courseDetail &&
					(<div className="course-details_back-btn">
						<Button
							type={'raised'}
							text={'Volver a cursos'}
							link={'/home'}
						>
						</Button>
					</div>)
				}
				{courseDetail ? (
					<main className="course-details_card">
						<img
							className="course-details_image"
							src={courseDetail?.img}
							alt={courseDetail?.name}
						/>
						<div className="course-details_info">
							<header className="course-details_info_header">
								<h1 className="title">
									{courseDetail?.name}
								</h1>
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
								Author: Instructor del curso
							</h3>
							<Rating
								name="read-only"
								value={courseDetail?.score}
								readOnly
							/>
							<p>
								{courseDetail?.description}
							</p>
							<h2>
								$ {courseDetail?.price}
							</h2>
							<div className="actionsButtons">
								<div className="buyBtn">
									<Button
										icon={'icon-park-outline:buy'}
										type={'raised-icon'}
										text={'Comprar ahora'}
										onClick={() => alert("Redirigir a compra")}
										link={`/payment?id=${id}`}
									>
									</Button>
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
};
