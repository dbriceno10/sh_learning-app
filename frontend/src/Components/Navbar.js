import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar({ isUser }) {
	return (
		<nav className="nav-bar">
			<ul className="nav-bar_items">
				<Link to="/home">
					<img
						className="nav-bar_logo"
						src="https://i.imgur.com/sq20yHH.png"
						alt="Learnzilla online academy logo (with a purple dinosaur)"
					/>
				</Link>

				<section className="nav-bar_middle-btns">
					<li className="nav-bar_item">
						<Link to="#why-us-section" className="button-flat">
							Why us?
						</Link>
					</li>
					<li className="nav-bar_item">
						<Link to="#teach-section" className="button-flat">
							Teach
						</Link>
					</li>
					<li className="nav-bar_item">
						<Link to="#about-section" className="button-flat">
							About us
						</Link>
					</li>
				</section>
				<section className="nav-bar_cta">
					<li className="nav-bar_item">
						<Link
							to="/login"
							className="button-raised nav-bar_cta_login"
						>
							Login
						</Link>
					</li>
					<li className="nav-bar_item">
						<Link to="/signUp" className="button-raised" >
							Sign up
						</Link>
					</li>
				</section>
			</ul>
		</nav>
	);
}
