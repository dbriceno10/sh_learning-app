import React, { useEffect, useState, useCallback } from "react";
import MaterialCard from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { getCourses } from "../../Actions/courses.actions"
import { useDispatch, useSelector } from "react-redux";
import './Cards.css';


const Cards = ({ searchTerm, isLoggedIn,limite, setlimite,valor }) => {
	// const [courses, setCourses] = useState([]);
	const [hasMore, sethasMore] = useState(true);
	const [page, setPage] = useState(2);
	const { courses } = useSelector(state => state.courses);
	const longitud=courses?.length;
	const cursos=courses?.slice(0,limite);
	const dispatch = useDispatch();

	// const getData = useCallback(async () => {
	// 	const res = await fetch(`http://localhost:3001/fakecourses`);
	// 	const data = await res.json();
	// 	setCourses(data);
	// }, []);
	function handlelimite(e){
		e.preventDefault()
		setlimite(limite+valor)
	}
	const fetchMoreCourses = async () => {
		if (courses.length === 0 || courses.length <= 40) {
			sethasMore(false);
		}
		setPage(prevPage => page + 1);
	};

	useEffect(() => {
		dispatch(getCourses({}));
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
			{cursos
				? (
					cursos.filter(val => {
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
								teacher="Instructor del curso"
								price={c.price}
								rating={c.meanReview}
								isLoggedIn={isLoggedIn}
							/>
						);
					})
				)
				: <h2>No hay cursos disponibles!</h2>
			}
			{courses? longitud>limite? <button onClick={handlelimite}>Mostrar más cursos</button>:'':''}
		</InfiniteScroll>
	)
};

export default Cards;
