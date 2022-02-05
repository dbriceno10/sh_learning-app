import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { clearPage, getCourseDetail } from '../Actions/courses.actions';
import Rating from '@mui/material/Rating';
import Navbar from '../Components/Navbar';

const CourseDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  console.log(id);
  const course = useSelector((state) => state.courses)
  console.log(course);

  useEffect(() => {
    dispatch(getCourseDetail(id));
    console.log('llegue dispatch')
    dispatch(clearPage())
  }, [dispatch, id])
  return (
    <>
      <Navbar />
      {course.courseDetail
        ? (
          <div>
            <div className='detailContainer'>
              <img className='imgDetail' src={course.courseDetail?.image} alt={course.courseDetail?.name} />
              <div className='countryGeo'>
                <h3 className='name'>Name: <span>{course.courseDetail?.name}</span></h3>
                <h3 className='capital'>Description: <span>{course.courseDetail?.description}</span></h3>
                <h3>Price: $ {course.courseDetail?.price}</h3>
                <h3>Rating</h3>
                
                <Rating name="read-only" value={course.courseDetail?.rating} readOnly />
              </div>
            </div>
            <div>
              <Link to='/home'><button className='goBackBtn'>Go Back</button></Link>
            </div>
          </div>
          )
        : (
          <h1 className='loading'>Loading...</h1>
          )}    
    </>
  ) 
};

export default CourseDetail;
