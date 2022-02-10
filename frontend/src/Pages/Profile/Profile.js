import React from "react";
import "./Profile.css";

export default function Profile() {
	let user = JSON.parse(localStorage.getItem("user"));

	return (
		<div>
				<h1 style={{textAlign: "center"}}>¡Bienvenido a tu Perfil {user.firstName}!</h1>
			<div className="imageName-container">
				<img src={user.image ? user.image : ""} alt= "imagen no encontrada" className="profileImage"/>
        <h2 >{user.firstName} {user.lastName}</h2>
		<br></br>
		<h3> email: {user.email}</h3>
		<h3> {user.role}</h3>
			</div>
		</div>
	);
}
