import { React, useState, useEffect, useCallback } from 'react';
import { getCourses } from "../../Actions/courses.actions";
import { useDispatch, useSelector } from "react-redux";
import MaterialCard from "../Card/Card";
import './RecentCourses.css';

export default function RecentCourses({ isLoggedIn, hasRecents }) {
  const [courses, setCourses] = useState([]);
  // const { courses } = useSelector(state => state.courses);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    const res = await fetch(`https://learnzilla-app.herokuapp.com/fakecourses`);
    const data = await res.json();
    setCourses(data.slice(0, 5));
  }, []);

  useEffect(() => {
    // dispatch(getCourses())
    if (hasRecents) {
      getData();
    }
  }, [getData, hasRecents]);
  console.log(courses);

  return (
    <section className='recent-courses'>
      {(isLoggedIn)
        ? (
          <div>
            <header className='recent-courses_header title'>
              <h1>Continua donde te quedaste</h1>
            </header>
            <section className='recent-courses_cards'>
              {courses.map((c) => {
                return (
                  <MaterialCard
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    image={c.img}
                    teacher="Instructor del curso"
                    price={c.price}
                    rating={c.rating}
                  />
                );
              })}
            </section>
          </div>
        )
        : null}
    </section>
  )
}
