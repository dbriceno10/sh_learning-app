import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import UserHome from "./Pages/UserHome/UserHome";
import LoginForm from "./Components/LoginForm/LoginForm";
import ForgotPassword from "./Components/LoginForm/ForgotPassword";
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


function App() {
	// copy and paste for new component route ⬇⬇⬇⬇⬇
	//     <Route path = '' element = {</>}></Route>
	//    or <Route path = '/' element = {</>}/>
	const dispatch = useDispatch();
	const { userCredentials } = useSelector(state => state.login);

	const isStudent = useMemo(() => {
		if (!userCredentials) return false;
		if (userCredentials && userCredentials?.role === 'alumno')
			return true;
	}, [userCredentials])

	useEffect(() => {
		dispatch(getUserCredentials());

	}, [dispatch])
	console.log(isStudent);


	return (
		<Routes>
			<Route
				exact path="/"
				element={<LandingPage isStudent={isStudent} />}
			/>
			<Route
				exact path="/home"
				element={<UserHome isStudent={isStudent} />}
			/>
			<Route
				exact path="/login"
				element={isStudent
					? <Navigate to='/home' />
					: <LoginForm />}
			/>
			<Route path="/profile" element={<PrivateRoute />}>
				<Route index element={<Profile />} />
			</Route>
			<Route exact path="/signUp" element={<FormRegister />} />
			<Route path="/unlogin" element={<HomeUnlogin />} />
			<Route path='/changepassword' element={<ForgotPassword />} />
			<Route path='/confirmUser' element={<ConfirmForm />} />
			<Route
				exact path="/courses/:id"
				element={<CourseDetail isStudent={isStudent} />}
			/>
			<Route exact path="/home/create" element={<CreateForm/>}/>
		</Routes>
	);
}

export default App;