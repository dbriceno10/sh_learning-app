import React from "react";
import styles from './NavHome.module.css';
import { Icon } from '@iconify/react';



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
                        <a className={styles.icono} href="/"><Icon icon="ci:settings-filled" width="60%" height="40%" /></a>
                    </li>
                    <li className={styles.circulo}>
                        <a className={styles.icono} href="/landing"><Icon icon="radix-icons:exit" width="60%" height="40%" /></a>
                    </li>
                    <li className={styles.circulo}>
                        <a className={styles.icono} href="/landing">Foto</a>
                    </li>
                </section>
                
            </ul>
        </nav>
    )
}