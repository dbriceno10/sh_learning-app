// import NavHomeUser from "./NavHomeUser"
import { useState, useEffect } from "react";
// import Button from "../../Components/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import Navbar from "../../Components/NavBars/Navbars";
import RecentCourses from "../../Components/RecentCourses/RecentCourses";
import CoursesBrowser from '../../Components/SharedHome/CoursesBrowser';
import './UserHome.css'

export default function UserHome({ isStudent }) {
    const dispatch = useDispatch();
    const [hasRecents, setHasRecents] = useState(false);

    // const [isStudent, setIsStudent] = useState(false);
    // const userCredentials = JSON.parse(
    //     window.localStorage.getItem("userCredentials")
    // );

    // useEffect(() => {
    //     const verifyRole = () => {
    //         if (userCredentials) {
    //             if (userCredentials?.role === 'alumno')
    //                 setIsStudent(curr => true)
    //         } else {
    //             setIsStudent(curr => false)
    //         }
    //     }
    //     verifyRole()
    // }, [userCredentials])

    useEffect(() => {
        dispatch(getUserCredentials());
    }, [dispatch])

    return (
        <main className="user-homepage">
            <div className={'page-container'} >
                <Navbar isStudent={isStudent} />
                {/* <Button
                    link={''}
                    text={'Mostrar recientes'}
                    type='flat'
                    onClick={() => {
                        setIsUser(isStudent => !isStudent);
                        setHasRecents(hasRecents => !hasRecents)
                    }}
                ></Button> */}
                {isStudent && <header className="user-homepage_header">
                    <h1 className="title">Bienvenido, Nombre de usuario</h1>
                </header>}
                <RecentCourses isStudent={isStudent} hasRecents={hasRecents} />
                <CoursesBrowser />
            </div >
        </main>
    )
}