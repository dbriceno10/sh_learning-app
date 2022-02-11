import { React, useState, useEffect, useCallback } from 'react';
import { getCourses } from "../../Actions/courses.actions";
import { useDispatch, useSelector } from "react-redux";
import MaterialCard from "../Card/Card";
import './RecentCourses.css';

export default function RecentCourses({ isUser, hasRecents }) {
  const [courses, setCourses] = useState([]);
  // const { courses } = useSelector(state => state.courses);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    const res = await fetch(`http://localhost:3001/fakecourses`);
    const data = await res.json();
    setCourses(data.slice(0, 5));
  }, [courses]);

  useEffect(() => {
    // dispatch(getCourses())
    console.log(courses);
    getData();
  }, []);

  return (
    <section className='recent-courses'>
      {(isUser && hasRecents)
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