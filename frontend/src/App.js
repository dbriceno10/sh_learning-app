import './App.css';
import {Routes, Route} from 'react-router-dom';

import HomeUser from './Components/HomeUser/HomeUser';
import LoginForm from './Components/LoginForm/LoginForm';
import Profile from './Pages/Profile/Profile.js';
import FormRegister from './Components/FormRegister/FormRegister';
import LandingPage from './Pages/LandingPage/LandingPage';
import HomeUnlogin from './Components/Home/HomeUnlogin';
import CourseDetail from './Pages/CourseDetail/CourseDetail';


function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>


       <Route exact path = '/' element = {<LandingPage />}/> 
       <Route exact path='/home' element={<HomeUser />} />
       <Route exact path = '/login' element = {<LoginForm/>} />
       <Route exact path = '/profile' element = {<Profile/>} />
       <Route exact path = '/signUp' element = {<FormRegister/>}/> 
       <Route path = '/unlogin' element = {<HomeUnlogin/>}/> 
       <Route exact path='/courses/:id' element={<CourseDetail />} />


    </Routes>
  )
}

export default App;