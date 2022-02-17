import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import Navbar from "../../Components/NavBars/Navbars";
import RecentCourses from "../../Components/RecentCourses/RecentCourses";
import CoursesBrowser from '../../Components/SharedHome/CoursesBrowser';
import './UserHome.css'

export default function UserHome({ isLoggedIn }) {
    const dispatch = useDispatch();
    const [hasRecents, setHasRecents] = useState(false);

    useEffect(() => {
        dispatch(getUserCredentials());
    }, [dispatch])

    return (
        <main className="user-homepage">
            <div className={'page-container'} >
                <Navbar isLoggedIn={isLoggedIn} />
                {/* <Button
                    link={''}
                    text={'Mostrar recientes'}
                    type='flat'
                    onClick={() => {
                        setIsUser(isLoggedIn => !isLoggedIn);
                        setHasRecents(hasRecents => !hasRecents)
                    }}
                ></Button> */}
                {(isLoggedIn === 'student' || isLoggedIn === 'teacher')
                    && <header className="user-homepage_header">
                        <h1 className="title">Bienvenido, Nombre de usuario</h1>
                    </header>}
                <RecentCourses isLoggedIn={isLoggedIn} hasRecents={hasRecents} />
                <CoursesBrowser />
            </div >
        </main>
    )
}