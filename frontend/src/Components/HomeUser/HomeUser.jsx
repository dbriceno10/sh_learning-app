import NavHomeUser from "./NavHomeUser"
import styles from './HomeUser.module.css'
import Recentview from "./Recentview"
import Cards from "../Cards"
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
                <Cards />
            </section>

            


        </div>

    )

}