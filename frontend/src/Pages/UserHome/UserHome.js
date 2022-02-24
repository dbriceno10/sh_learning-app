import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCredentials } from "../../Actions/login.actions";
import { newReview, getStudentReview } from "../../Actions/review.actions"
import { getProfileStudent, uptadeProfileStudent } from "../../Actions/profile.action.js";
import { getProfileTeacher, uptadeProfileTeacher } from './../../Actions/profile.action';
import Navbar from "../../Components/NavBars/Navbars";
import Button from "../../Components/Buttons/Buttons";
import RecentCourses from "../../Components/RecentCourses/RecentCourses";
import CoursesBrowser from '../../Components/SharedHome/CoursesBrowser';
import './UserHome.css'

export default function UserHome({ isLoggedIn }) {
    const dispatch = useDispatch();
    const [hasRecents, setHasRecents] = useState(false);
    const { dataUser } = useSelector(state => state.student)
    console.log('dataUser:', dataUser);
    const { userCredentials } = useSelector(state => state?.login);
    const user = useSelector(state => state?.student.dataUser)

    useEffect(() => {
        dispatch(getUserCredentials());
    }, [dispatch])

    useEffect(() => {
        dispatch(getProfileStudent(userCredentials.id));
        dispatch(getProfileTeacher(userCredentials.id));
    }, [userCredentials])
    console.log(isLoggedIn)

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
                {/* {(isLoggedIn === 'student' && hasRecents)
                    ? (
                        <RecentCourses
                            isLoggedIn={isLoggedIn}
                            hasRecents={hasRecents}
                        />
                    )
                    : null} */}
                {(isLoggedIn === 'student')
                    ? (
                        <Button
                            btnVariant={'raised-icon'}
                            text={'Ver mis cursos'}
                            icon={'bi:arrow-right-circle'}
                            link={'/profile'}
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