// import NavHomeUser from "./NavHomeUser"
import { useState } from "react";
import Button from "../../Components/Buttons/Buttons";
import Navbar from "../../Components/NavBars/Navbars";
import RecentCourses from "../../Components/RecentCourses/RecentCourses";
import CoursesBrowser from '../../Components/SharedHome/CoursesBrowser';
import './UserHome.css'

export default function UserHome() {
    const [isUser, setIsUser] = useState(false);
    const [hasRecents, setHasRecents] = useState(false);
    return (
        <main className="user-homepage">
            <div className={'page-container'} >
                <Navbar isUser={isUser} />
                <Button
                    link={''}
                    text={'Mostrar recientes'}
                    type='flat'
                    onClick={() => {
                        setIsUser(isUser => !isUser);
                        setHasRecents(hasRecents => !hasRecents)
                    }}
                ></Button>
                {isUser && <header className="user-homepage_header">
                    <h1 className="title">Bienvenido, Usuario</h1>
                </header>}
                <RecentCourses isUser={isUser} hasRecents={hasRecents} />
                <CoursesBrowser />
            </div >
        </main>
    )
}