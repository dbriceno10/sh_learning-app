import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const userCredentials = JSON.parse(
		window.localStorage.getItem("userCredentials")
	);
  console.log(userCredentials);
	return userCredentials ? <Outlet/> : <Navigate to="/login" />
};

// El componente <Outlet>
// Este elemento es usado dentro del componente declarado en la ruta padre para renderizar sus elementos <Route> hijos. Esto permite a la interfaz anidada mostrar las rutas hijas cuando son renderizadas. Si la ruta seleccionada es la raíz, se renderizará la <Route index> hija. Si la ruta no está mapeada, se renderizará la <Route path='*'> hija.

export default PrivateRoute;