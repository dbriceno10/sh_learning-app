<<<<<<< HEAD
import React {useState} from "react";

import { changePassword } from './../../Actions/puts';
=======
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [forgotForm, setForgotForm] = useState({ email: "", password: "" })
    let navigate = useNavigate();
>>>>>>> mirror

    const handleChange = (e) => {
        setForgotForm({
            ...forgotForm,
            [e.target.name]: e.target.value
        })
    }

<<<<<<< HEAD
export default function Forgotpassword(){

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    


    return(
        <div>
            <form>
                <input
                placeholder='Your email..'
                />
                <input
                placeholder='Your password'
                />
=======
    const MySwal = withReactContent(Swal);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("/confirmput/forgotpassword", forgotForm);
            console.log(res);
            MySwal.fire({
                position: "center-center",
                icon: "success",
                title: "Contraseña actualizada correctamente.",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate("/login")
        } catch (error) {
            MySwal.fire({
                position: "center-center",
                icon: "error",
                title: "Email incorrecto.",
                showConfirmButton: false,
                timer: 2500,
            });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Ingresa tu email" name="email" value={forgotForm.email} onChange={handleChange} />
                <input type="password" placeholder="Ingresa tu nueva contraseña" name="password" value={forgotForm.password} onChange={handleChange} />
                <input type="submit" value="Cambiar contraseña" />
>>>>>>> mirror
            </form>
        </div>
    );
}
