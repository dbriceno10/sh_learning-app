import { React, useState } from "react";
import SearchModificado from "./SearchModificado";
import Filterings from "../Filtering/Filterings";
import Cards from "../Cards/Cards";
import "./SearchModificado.css";
import "./CoursesBrowser.css";
import Button from "../Buttons/Buttons";
import Sorting from "../Sorting/Sorting";
import { useDispatch } from "react-redux";
import { getCourses } from "../../Actions/courses.actions";

function CoursesBrowser({ isLoggedIn }) {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");
	const valor=10;
	const [limite,setlimite]=useState(valor);

	const handleReset = (e) => {
		dispatch(getCourses({}));
		window.scrollTo({
			top: 0,
			behavior: "smooth",
			/* you can also use 'auto' behaviour
		   in place of 'smooth' */
		});
	};

	return (
		<section className="courses-browser">
			<header className="courses-browser_header title">
				<h1>Explora entre muchos cursos disponibles</h1>
			</header>
			<Button
				btnVariant={"flat"}
				text={"Reset"}
				onClick={handleReset}
				link={""}
			></Button>
			<section className="courses-browser_top-panel">
				<SearchModificado
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
				></SearchModificado>
				<Sorting  setlimite={setlimite} valor={valor}/>
			</section>
			<aside className="courses-browser_filter-controls">
				<Filterings setlimite={setlimite} valor={valor} />
			</aside>
			<section className="courses-browser_course-gallery">
				<Cards searchTerm={searchTerm} isLoggedIn={isLoggedIn} limite={limite} setlimite={setlimite} valor={valor}/>
			</section>
		</section>
	);
}

export default CoursesBrowser;