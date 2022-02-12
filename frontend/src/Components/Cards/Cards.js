import React, { useEffect, useState } from "react";
import MaterialCard from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
// import FilterCategories from "../Orders/filterCategories";
import Button from '../Buttons/Buttons';
import { getCourses } from "../../Actions/courses.actions"
import { useDispatch, useSelector } from "react-redux";
import './Cards.css';


const Cards = ({ searchTerm, isUser }) => {
	const [totalCourses, setTotalCourses] = useState([]);
	const [hasMore, sethasMore] = useState(true);
	const [page, setPage] = useState(2);
	const { courses } = useSelector(state => state.courses)
	const dispatch = useDispatch();
	// const [isStudent, setIsStudent] = useState(false);
	// const userCredentials = JSON.parse(
	// 	window.localStorage.getItem("userCredentials")
	// );

	useEffect(() => {
		dispatch(getCourses({}))
	}, [dispatch]);

	// const getData = useCallback(async () => {
	// 	const res = await fetch(`http://localhost:3001/fakecourses`);
	// 	const data = await res.json();
	// 	setCourses(data);
	// }, [courses]);

	// const fetchCourses = async () => {
	// 	const res = await fetch(
	// 		`http://localhost:3001/cursos?_page=${page}&_limit=10`
	// 	);
	// 	const data = await res.json();
	// 	return data;
	// };

	const fetchMoreCourses = async () => {
		setTotalCourses([...totalCourses, ...courses]);
		if (courses.length === 0 || courses.length < 5) {
			sethasMore(false);
		}
		setPage(prevPage => page + 1);
	};

	// return (
	// 	<section className="cards">
	// 		{
	// 			(courses && courses.length)
	// 				? (
	// 					courses.filter(val => {
	// 						if (searchTerm === "") {
	// 							document.querySelector('.cards')?.classList?.remove('search-result-cards');
	// 						} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
	// 							document.querySelector('.cards')?.classList?.add('search-result-cards');
	// 						}
	// 						return val;
	// 					}).map((c) => {
	// 						return (
	// 							<MaterialCard
	// 								key={c.id}
	// 								id={c.id}
	// 								name={c.name}
	// 								description={c.description}
	// 								image={c.img}
	// 								teacher="Instructor del curso"
	// 								price={c.price}
	// 								rating={c.score}
	// 								isStudent={isStudent}
	// 							/>
	// 						);
	// 					})
	// 				)
	// 				: <h2>No hay cursos disponibles!</h2>
	// 		}
	// 	</section>
	// );

	return (
		<InfiniteScroll
			className="cards"
			dataLength={courses.length} //This is important field to render the next data
			next={fetchMoreCourses}
			hasMore={hasMore}
			loader={<Loader />}
			endMessage={<Message msg="Has llegado al final!" bgColor="#444" />}
		>
			{courses
				? (
					courses.filter(val => {
						if (searchTerm === "") {
							document.querySelector('.cards')?.classList?.remove('search-result-cards');
						} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
							document.querySelector('.cards')?.classList?.add('search-result-cards');
						}
						return val;
					}).map((c) => {
						return (
							<MaterialCard
								key={c.id}
								id={c.id}
								name={c.name}
								description={c.description}
								image={c.img}
								teacher="Instructor del curso"
								price={c.price}
								rating={c.meanReview}
							/>
						);
					})
				)
				: <h2>No hay cursos disponibles!</h2>
			}
		</InfiniteScroll>
	)
};

export default Cards;