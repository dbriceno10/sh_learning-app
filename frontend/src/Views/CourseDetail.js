import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { clearPage, getCourseDetail } from "../Actions/courses.actions";
import Rating from "@mui/material/Rating";
import Navbar from "../Components/Navbar";
import "./CourseDetail.css";
import { Typography } from "@mui/material";
import Loader from "../Components/Loader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CourseDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	// console.log(id);
	const {courseDetail} = useSelector((state) => state.courses);
	// console.log(course);
	console.log(courseDetail);

	const [favourite, setFavourite] = useState(false);

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
	}, [dispatch, id]);
	return (
		<>
			<Navbar />
			{courseDetail ? (
				<div>
					<div className="detailContainer">
						<img
							className="imgDetail"
							src={courseDetail?.img}
							alt={courseDetail?.name}
						/>
						<div className="courseDetails">
							<Typography variant="h5" gutterBottom component="div">
								{courseDetail?.name}
							</Typography>
							<Typography gutterBottom variant="body2" color="text.secondary">
								Author: Instructor del curso
							</Typography>
							<Rating
								name="read-only"
								value={courseDetail?.score}
								readOnly
							/>
							<Typography variant="body2" gutterBottom mt={1}>
								{courseDetail?.description}
							</Typography>
							<Typography variant="subtitle1" gutterBottom component="div">
								$ {courseDetail?.price}
							</Typography>
							<div className="actionsButtons">
								{favourite ? (
									<FavoriteIcon
										className="favouriteIcon"
										onClick={handleFavouriteClick}
									/>
								) : (
									<FavoriteBorderIcon
										className="favouriteIcon"
										onClick={handleFavouriteClick}
									/>
								)}
								<button
									className="buyBtn"
									onClick={() => alert("Redirigir a compra")}
								>
									BUY NOW
								</button>
							</div>
						</div>
					</div>
					<div>
						<Link to="/home">
							<button className="goBackBtn">Go Back</button>
						</Link>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default CourseDetail;
