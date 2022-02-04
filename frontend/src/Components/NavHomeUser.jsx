import React from "react";
import styles from './NavHome.module.css';



export default function NavHomeUser() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.items}>
               <section className={styles.seccion0}>

                <img className={styles.logo}
                    src="https://i.imgur.com/sq20yHH.png"
                    alt="Learnzilla online academy logo (with a purple dinosaur)" />
               </section>
                
                <section className={styles.seccion1}>
                    <li className={styles.circulo}>
                        <a className={styles.icono} href="/"><span class="iconify" data-icon="ci:settings-filled"></span></a>
                    </li>
                    <li className={styles.circulo}>
                        <a className={styles.icono} href="/landing"><span class="iconify" data-icon="radix-icons:exit"></span></a>
                    </li>
                    <li className={styles.circulo}>
                        <a className={styles.icono} href="/landing">Foto</a>
                    </li>
                </section>
                
            </ul>
        </nav>
    )
}