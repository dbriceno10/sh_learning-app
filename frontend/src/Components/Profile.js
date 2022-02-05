import React from "react";
import "./Profile.css";

export default function Profile() {
	let user = JSON.parse(localStorage.getItem("user"));

	return (
		<div>
				<h3 style={{textAlign: "center"}}>¡Bienvenido a tu Perfil {user.firstName}!</h3>
			<div className="imageName-container">
				<img src={user.image ? user.image : ""} alt={user.firstName} className="profileImage"/>
        <h4>{user.firstName} {user.lastName}</h4>
			</div>
		</div>
	);
}
