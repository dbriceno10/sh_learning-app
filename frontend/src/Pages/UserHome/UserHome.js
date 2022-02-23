import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import Navbar from "../../Components/NavBars/Navbars";
import RecentCourses from "../../Components/RecentCourses/RecentCourses";
import CoursesBrowser from '../../Components/SharedHome/CoursesBrowser';
import './UserHome.css'
import { newReview, getStudentReview } from "../../Actions/review.actions"

export default function UserHome({ isLoggedIn }) {
    const dispatch = useDispatch();
    const [hasRecents, setHasRecents] = useState(false);
    const {dataUser} = useSelector(state=>state.student)
    console.log('dataUser:',dataUser);

    useEffect(() => {
        dispatch(getUserCredentials());
    }, [dispatch])
    // console.log(isLoggedIn)

    return (
        <main className="user-homepage">
            <div className={'page-container'} >
                <Navbar isLoggedIn={isLoggedIn} />
                {/* <Button
                    link={''}
                    text={'Mostrar recientes'}
                    btnVariant='flat'
                    onClick={() => {
                        setHasRecents(hasRecents => !hasRecents)
                    }}
                ></Button> */}
                {(isLoggedIn === 'student' || isLoggedIn === 'teacher')
                    && <header className="user-homepage_header">
                        <h1 className="title">Bienvenido, {dataUser.name}</h1>
                    </header>}
                {(isLoggedIn === 'student' && hasRecents)
                    ? (
                        <RecentCourses
                            isLoggedIn={isLoggedIn}
                            hasRecents={hasRecents}
                        />
                    )
                    : null}
                <CoursesBrowser
                    isLoggedIn={isLoggedIn}
                />
            </div >
        </main>
    )
}