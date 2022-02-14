import React, { useEffect, useState, useCallback } from "react";
import MaterialCard from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { getCourses } from "../../Actions/courses.actions"
import { useDispatch, useSelector } from "react-redux";
import './Cards.css';


const Cards = ({ searchTerm }) => {
	// const [courses, setCourses] = useState([]);
	const [hasMore, sethasMore] = useState(true);
	const [page, setPage] = useState(2);
	const { courses } = useSelector(state => state.courses);
	const dispatch = useDispatch();

	// const getData = useCallback(async () => {
	// 	const res = await fetch(`http://localhost:3001/fakecourses`);
	// 	const data = await res.json();
	// 	setCourses(data);
	// }, []);

	const fetchMoreCourses = async () => {
		if (courses.length === 0 || courses.length <= 12) {
			sethasMore(false);
		}
		setPage(prevPage => page + 1);
	};

	useEffect(() => {
		dispatch(getCourses({}));
		// getData();
	}, [dispatch]);
	console.log(hasMore)

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
			style={{ overflowX: 'hidden' }}
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
							return val;
						} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
							document.querySelector('.cards')?.classList?.add('search-result-cards');
							return val;
						}
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
