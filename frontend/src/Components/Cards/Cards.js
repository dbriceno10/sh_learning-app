import React, { useEffect, useState, useCallback } from "react";
import MaterialCard from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { getCourses, getCoursesTeacher } from "../../Actions/courses.actions"
import { getProfileStudent, getProfileTeacher } from "../../Actions/profile.action";
import { useDispatch, useSelector } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions"
import './Cards.css';

const Cards = ({ searchTerm, isLoggedIn, limite, setlimite, valor, isProfile }) => {
	// const [courses, setCourses] = useState([]);

	const [hasMore, sethasMore] = useState(true);
	const [page, setPage] = useState(2);
	const allCourses = useSelector(state => state.courses.courses);
	const teacherCourses = useSelector(state => state.courses.courses);
	// console.log('courses in cards:', courses);
	const longitud = allCourses?.length;
	const cursos = allCourses?.slice(0, 20);
	const dispatch = useDispatch();
	const { dataUser } = useSelector(state => state?.student)
	const { userCredentials } = useSelector(state => state?.login);

	console.log('user in cards:', dataUser);
	const userCourses = () => {
		console.log(isLoggedIn)
		// console.log(courses)
		let arrayId = []
		let results2 = []
		if (isLoggedIn === 'student') {
			arrayId = dataUser.courses?.map(element => {
				return element
			})
			allCourses.forEach((course) => {
				for (let index = 0; index < arrayId.length; index++) {
					if (course.id === arrayId[index]) results2.push(course)
				}
			})
		} else if (isLoggedIn === 'teacher') {
			console.log('techerCourses', teacherCourses);

			arrayId = teacherCourses?.map(element => {
				return element
			})
			results2 = [...arrayId]
		}
		console.log('[...arrayId]=', arrayId);
		// let results2 = courses.map((course)=>{
		// 		arrayId.filter(ele=>{
		// 			return course.id === ele
		// 		})
		// 	})
		// console.log('results inside userCourses',results2);
		console.log('results2', results2);

		return results2
	}



	// const getData = useCallback(async () => {
	// 	const res = await fetch(`http://localhost:3001/fakecourses`);
	// 	const data = await res.json();
	// 	setCourses(data);
	// }, []);
	function handlelimite(e) {
		e.preventDefault()
		setlimite(limite + valor)
	}
	const fetchMoreCourses = async () => {
		if (!userCourses().length) {
			if (allCourses.length === 0 || allCourses.length <= 40) {
				sethasMore(false);
			}
			setPage(prevPage => page + 1);
		} else {
			if (userCourses().length === 0
				|| userCourses().length <= 40) {
				sethasMore(false);
			}
			setPage(prevPage => page + 1);
		}

	};

	useEffect(() => {
		dispatch(getUserCredentials())
	}, [])

	useEffect(() => {
		if (isLoggedIn === 'student') {
			dispatch(getProfileStudent(userCredentials.id));
			dispatch(getCourses({}));
		} else if (isLoggedIn === 'teacher') {
			dispatch(getCoursesTeacher(userCredentials.id));
		}
	}, [dispatch, isLoggedIn]);
	// console.log(courses.length)
	// console.log('has more? ', hasMore)


	return (
		isProfile
			? (
				<div className="cards">
					{
						!userCourses()
							? <div>No hay nada</div>
							: userCourses().map((c) => {
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
					}
					{allCourses ? longitud > limite ? <button onClick={handlelimite}>Mostrar más cursos</button> : '' : ''}
				</div>
			)
			: (
				<InfiniteScroll
					style={{ overflowX: 'hidden' }}
					className="cards"
					dataLength={allCourses.length} //This is important field to render the next data
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
					{allCourses ? longitud > limite ? <button onClick={handlelimite}>Mostrar más cursos</button> : '' : ''}
				</InfiniteScroll>
			)
	)
};

export default Cards;
