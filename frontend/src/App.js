import './App.css';
import {Routes, Route} from 'react-router-dom';

import HomeUser from './Components/HomeUser/HomeUser.jsx' ;
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import Profile from './Components/Profile';
import Cards from './Components/Cards';
import FormRegister from './Components/FormRegister';



function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>


       <Route path = '/' element = {[<Navbar key="1"/>, <Cards key="2"/>]}/> 
       <Route path='HomeUser' element={<HomeUser/>} />
       <Route exact path = '/login' element = {<LoginForm/>} />
       <Route exact path = '/profile' element = {<Profile/>} />
       <Route exact path = '/signUp' element = {<FormRegister/>}/>  


    </Routes>
  )
}

export default App;