import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserHome from "./Pages/UserHome/UserHome";
import LoginForm from "./Components/LoginForm/LoginForm";
import Profile from "./Pages/Profile/Profile";
import FormRegister from "./Components/FormRegister/FormRegister";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HomeUnlogin from "./Components/Home/HomeUnlogin";
import CourseDetail from "./Pages/CourseDetail/CourseDetail";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Forgotpassword from './Components/LoginForm/Forgotpassword';

function App() {
	// copy and paste for new component route ⬇⬇⬇⬇⬇
	//     <Route path = '' element = {</>}></Route>
	//    or <Route path = '/' element = {</>}/>

	return (
		<Routes>
			<Route exact path="/" element={<LandingPage />} />
			<Route exact path="/home" element={<UserHome />} />
			<Route exact path="/login" element={<LoginForm />} />
			<Route path="/profile" element={<PrivateRoute />}>
				<Route index element={<Profile />} />
			</Route>
			<Route exact path="/signUp" element={<FormRegister />} />
			<Route path="/unlogin" element={<HomeUnlogin />} />
			<Route exact path="/courses/:id" element={<CourseDetail />} />
			<Route path = '/changepassword' element = {<Forgotpassword/>}/>
		</Routes>
	);
}

export default App;
