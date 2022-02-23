import React, { useEffect, useState, useCallback } from "react";
import MaterialCard from "../../Components/Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../Components/Loader/Loader";
import Message from "../../Components/Message/Message";
import { getCoursesTeacher } from "../../Actions/courses.actions"
import { useDispatch, useSelector } from "react-redux";
import './CardsCoursesTeacher.css';


const CoursesTeacher = ({ searchTerm, isLoggedIn, id }) => {

	const [hasMore, sethasMore] = useState(true);
	const [page, setPage] = useState(2);
	const { courses } = useSelector(state => state.courses);
	const dispatch = useDispatch();


	const fetchMoreCourses = async () => {
		if (courses.length === 0 || courses.length <= 40) {
			sethasMore(false);
		}
		setPage(prevPage => page + 1);
	};

	useEffect(() => {
		dispatch(getCoursesTeacher(id));
		// getData();
	}, [dispatch]);
	console.log(courses.length)
	console.log('has more? ', hasMore)


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
					courses?.filter(val => {
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
								image={c.img}// seria la url del video 
								teacher={`${c.teacherName} ${c.teacherLastName}`}
								price={c.price}
								rating={c.meanReview}
								isLoggedIn={isLoggedIn}
							/>
						);
					})
				)
				: <h2>No hay cursos disponibles!</h2>
			}
		</InfiniteScroll>
	)
};

export default CoursesTeacher;