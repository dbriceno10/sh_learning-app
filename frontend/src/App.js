import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomeUser from "./Components/HomeUser/HomeUser";
import LoginForm from "./Components/LoginForm/LoginForm";
import Profile from "./Pages/Profile/Profile";
import FormRegister from "./Components/FormRegister/FormRegister";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HomeUnlogin from "./Components/Home/HomeUnlogin";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
	// copy and paste for new component route ⬇⬇⬇⬇⬇
	//     <Route path = '' element = {</>}></Route>
	//    or <Route path = '/' element = {</>}/>
	

	return (
		<Routes>
			<Route exact path="/" element={<LandingPage />} />
			<Route
				path="/home"
				element={<PrivateRoute />}
			>
				<Route index element={<HomeUser />} />
			</Route>
			<Route
				path="/profile"
				element={<PrivateRoute />}
			>
				<Route index element={<HomeUser />} />
			</Route>
				<Route exact path="/profile" element={<Profile />} />
			<Route exact path="/login" element={<LoginForm />} />
			<Route exact path="/signUp" element={<FormRegister />} />
			<Route path="/unlogin" element={<HomeUnlogin />} />
			<Route
				path="/courses/:id"
				element={<PrivateRoute />}
			>
				<Route index element={<CourseDetail />} />
			</Route>
		</Routes>
	);
}

export default App;
