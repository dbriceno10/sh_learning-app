import React, { useEffect, useState } from "react";
import MaterialCard from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import {getCourses} from "../../Actions/courses.actions"
import { useDispatch, useSelector } from "react-redux";
import FilterCategories from "../Orders/filterCategories";


const Cards = () => {
	/* const [courses, setCourses] = useState([]); */
	const [hasMore, sethasMore] = useState(true);
	const [page, setPage] = useState(2);
	const {courses} = useSelector(state => state.courses)
	const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

 

	useEffect(() => {
    dispatch(getCourses({}))
	}, [dispatch]);
	console.log(courses); 

	/* const fetchCourses = async () => {
		const res = await fetch(
			`http://localhost:3001/cursos?_page=${page}&_limit=10`
		);
		const data = await res.json();
		return data;
	}; */

	/* const fetchData = async () => {
		const apiCourses = await fetchCourses();
		console.log(apiCourses);

		setCourses([...courses, ...apiCourses]);
		if (apiCourses.length === 0 || apiCourses.length < 5) {
			sethasMore(false);
		}
		setPage(page + 1);
	};
 */
	return (
		<div style={{display: "flex", flexWrap: "wrap"}}>

				<input
                    type="text"
                    /* className={styles.input} */
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Buscar..."
                />
			{
			
			 courses.filter(val => {
				if(searchTerm == ""){
					return val
				} else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
					return val
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
					rating={c.score}
				/>
			);
		})
			
		}
		</div>
		);
	};
	
	export default Cards;
	
	{/* <InfiniteScroll
		className="cards-container"
		style={{
			overflow: "hidden",
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",
		}}
		dataLength={courses.length} //This is important field to render the next data
		next={fetchData}
		hasMore={hasMore}
		loader={<Loader />}
		endMessage={<Message msg="Has llegado al final!" bgColor="#444" />}
	>
		{courses.map((c) => {
			return (
				<MaterialCard
					key={c.id}
					id={c.id}
					name={c.name}
					image={c.image}
					teacher="Instructor del curso"
					price={c.price}
		rating={c.rating}
				/>
			);
		})}
	</InfiniteScroll> */}