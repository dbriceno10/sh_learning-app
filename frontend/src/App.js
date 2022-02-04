import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import Profile from './Components/Profile';
import Cards from './Components/Cards';



function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
       <Route path = '/' element = {[<Navbar/>, <Cards />]}/> 
       <Route exact path = '/login' element = {<LoginForm/>} />
       <Route exact path = '/profile' element = {<Profile/>} />
    </Routes>
  )
}

export default App;
