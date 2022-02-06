import NavHomeUser from "./NavHomeUser"
import styles from './HomeUser.module.css'
import Recentview from "./Recentview"
import Homeshare from "../HomeCompartida/Homeshare"
export default function HomeUser(){


    
    return (
        <div className={styles.container} >
            <section className={styles.seccion}>
                <NavHomeUser/>
            </section>

            <section className={styles.view}>
                <Recentview/>
            </section>
            <section>
                <Homeshare/>
            </section>

            


        </div>

    )

}