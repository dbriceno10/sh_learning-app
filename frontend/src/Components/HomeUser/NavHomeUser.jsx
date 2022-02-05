import React from "react";
import styles from "./NavHome.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import AccountMenu from "./AccountMenu";

export default function NavHomeUser() {
	return (
		<div>
			<nav className={styles.nav}>
				<ul className={styles.items}>
					<section className={styles.seccion0}>
						<Link to="/" className={styles.logo}>
						<img
							src="https://i.imgur.com/sq20yHH.png"
							alt="Learnzilla online academy logo (with a purple dinosaur)"
							/>
							</Link>
					</section>
					<section className={styles.seccion1}>
                <AccountMenu className={styles.perfilbtn}/>
					</section>
				</ul>
			</nav>
			<SearchBar />
		</div>
	);
}
