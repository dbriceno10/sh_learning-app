import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { confirmUser } from "../../Actions/puts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import "./ConfirmForm.css";

const ConfirmForm = () => {
  // const dispatch = useDispatch();
  const [confirmForm, setConfirmForm] = useState({ email: "" });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setConfirmForm({
      ...confirmForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(confirmUser(confirmForm))
    try {
      const res = await axios.put("/confirmput/confirm", confirmForm);
      console.log(res);
      MySwal.fire({
        position: "center-center",
        icon: "success",
        title: "Usuario confirmado, ya puedes iniciar sesión.",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/login");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Ha ocurrido un error, por favor intenta más tarde.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const MySwal = withReactContent(Swal);

  return (
    <div className="padre_confirm">
      <form className="hijo_container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Confirma tu email"
          name="email"
          value={confirmForm.email}
          onChange={handleChange}
        />
        <input id="input_confirm_btn" type="submit" value="Confirmar" />
      </form>
    </div>
  );
};

export default ConfirmForm;
