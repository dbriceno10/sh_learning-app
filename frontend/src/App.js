import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import ForgotPassword from "./Pages/LoginPage/ForgotPassword";
import UserHome from "./Pages/UserHome/UserHome";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Profile from "./Pages/Profile/Profile";
import FormRegister from "./Components/FormRegister/FormRegister";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HomeUnlogin from "./Components/Home/HomeUnlogin";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ConfirmForm from "./Components/FormRegister/ConfirmForm";
import CreateForm from "./Pages/FormCreate/FormCreate";
import { useSelector, useDispatch } from "react-redux";
import { getUserCredentials } from "./Actions/login.actions";
import Pasarela from "./Components/Pasarela/Pasarela.jsx";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import VideoDetail from "./Pages/VideoDetail/VideoDetail";
import UploadInputFiles from "./Components/UploadInputFile/UploadInputFile";
import FormVideo from "./Pages/FormVideo/FormVideo";

function App() {
  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>
  const dispatch = useDispatch();
  const { userCredentials } = useSelector((state) => state.login);

  const isLoggedIn = useMemo(() => {
    if (!userCredentials) return "none";
    if (userCredentials && userCredentials?.role === "alumno") return "student";
    if (userCredentials && userCredentials?.role === "profesor")
      return "teacher";
  }, [userCredentials]);

  useEffect(() => {
    dispatch(getUserCredentials());
  }, [dispatch]);
  console.log(isLoggedIn);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage isLoggedIn={isLoggedIn} />} />
      <Route
        exact
        path="/home"
        element={
          isLoggedIn === "none" || !isLoggedIn ? (
            <UserHome isLoggedIn={isLoggedIn} />
          ) : isLoggedIn === "student" ? (
            <UserHome isLoggedIn={isLoggedIn} />
          ) : (
            <Navigate to="/profile" />
          )
        }
      />
      <Route
        exact
        path="/login"
        element={
          isLoggedIn === "none" || !isLoggedIn ? (
            <LoginPage />
          ) : isLoggedIn === "student" ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/profile" />
          )
        }
      />
      <Route path="/profile" element={<PrivateRoute />}>
        <Route index element={<Profile isLoggedIn={isLoggedIn} />} />
      </Route>
      <Route exact path="/signUp" element={<FormRegister />} />
      <Route path="/unlogin" element={<HomeUnlogin />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/confirmUser" element={<ConfirmForm />} />
      <Route
        exact
        path="/courses/:id"
        element={<CourseDetail isLoggedIn={isLoggedIn} />}
      />
      <Route path="/pay" element={<Pasarela />} />
      <Route path="/cart" element={<PrivateRoute />}>
        <Route index element={<ShoppingCart isLoggedIn={isLoggedIn} />} />
      </Route>
      <Route exact path="/profile/create" element={<CreateForm />} />
      <Route exact path="/profile/createVideo" element={<FormVideo />} />
      <Route
        path="/video/detail/:id"
        element={<VideoDetail isLoggedIn={isLoggedIn} />}
      />

      <Route path="/upload" element={<UploadInputFiles />} />
      {/*Ruta experimental para probar la carga de archivos al back*/}
    </Routes>
  );
}

export default App;
