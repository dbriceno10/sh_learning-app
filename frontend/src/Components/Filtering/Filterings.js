import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCourses } from "../../Actions/courses.actions";
import { setFilterCategory } from "../../Actions/filter.actions";
import CategoryFiltering from "./CategoryFiltering";
import "./Filterings.css";

// const array = ['Programacion', 'Matematica', 'Ingles', 'Español', 'UI/UX', 'React', 'Java']
function Filterings({ setlimite, valor }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.courses);
  const { order } = useSelector((state) => state.filters);

  function handleCategories(e) {
    // if (e.target.checked) {
    if (e.target.value === "no-category") {
      dispatch(setFilterCategory(""));
      setlimite(valor);
      dispatch(getCourses({}));
    } else {
      setlimite(valor);
      dispatch(setFilterCategory(e.target.value));
      dispatch(getCourses({ category: e.target.value, order }));
      console.log("I dispatched it");
      console.log(e.target.value);
    }
    // }
  }

  useEffect(
    (e) => {
      dispatch(getCategories({}));
    },
    [dispatch]
  );
  console.log(categories);

  return (
    <main className="filterings">
      <section className="filterings_category  filter-type">
        <label htmlFor="category-select">
          <h2>Categorias:</h2>
        </label>
        <select
          name="category-select"
          className="filterings_category-select"
          id="category-select"
          onChange={handleCategories}
        >
          <option
            // className='categories_checkbox'
            name="category"
            value="no-category"
          >
            Selecciona una categoria
          </option>
          {categories?.map((category, i) => (
            <CategoryFiltering
              key={category.id}
              category={category}
            ></CategoryFiltering>
          ))}
        </select>
      </section>
      {/* <section className='filterings_rating filter-type'>
        <h2>Rating:</h2>
        {array?.map((el) =>
          <Categorias key={el} categoria={el} setrenderizado={setrenderizado} renderizado={renderizado} />)}
      </section> */}
    </main>
  );
}

export default Filterings;
