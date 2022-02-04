import React, { useEffect, useState } from 'react';
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './Loader';
import Message from './Message';
import "./Cards.css";

const Cards = () => {
    const [courses, setCourses] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setPage] = useState(2)

    useEffect(() => {
      // const getData = async () => {
      //   const coursesData = await dispatch(getCourses(page))
      //   setCourses(coursesData)
      //   console.log(coursesData);
      // } 
      // getData();
      const getData = async () => {
        // const data = await dispatch(getCourses(page))
        const res = await fetch(`http://localhost:3001/cursos?_page=1&_limit=5`)
        const data = await res.json();
        setCourses(data);
      } 
      getData();
      
    }, []);
    console.log(courses);
    
    const fetchCourses = async () => {
      const res = await fetch(`http://localhost:3001/cursos?_page=${page}&_limit=5`)
      const data = await res.json();
      return data;
    };

    const fetchData = async () => {
      const apiCourses = await fetchCourses();
      console.log(apiCourses);
  
      setCourses([...courses, ...apiCourses]);
      if (apiCourses.length === 0 || apiCourses.length < 5) {
        sethasMore(false);
      }
      setPage(page + 1);
    };
    

  return (
    // <section >
      <InfiniteScroll
      className='cardsContainer'
      style={{overflow: "hidden"}}
      dataLength={courses.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<Message msg="Has llegado al final!" bgColor="#444" />}
    >
      {/* <div className="container"> */}
        {/* <div className="row m-2"> */}
          {courses.map((c) => {
            return <Card key={c.id} id={c.id} name={c.name} image={c.image} price={c.price} rating={c.rating} />;
          })}
        {/* </div> */}
      {/* </div> */}
    </InfiniteScroll>
    // </section>
  ) 
};

export default Cards;
