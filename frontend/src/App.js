import './App.css';
import {Routes, Route} from 'react-router-dom';

import HomeUser from './Components/HomeUser/HomeUser';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import Profile from './Components/Profile';
import Cards from './Components/Cards';
import FormRegister from './Components/FormRegister';
import LandingPage from './Views/LandingPage';
import HomeUnlogin from './Components/Home/HomeUnlogin'
import CourseDetail from './Views/CourseDetail';


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