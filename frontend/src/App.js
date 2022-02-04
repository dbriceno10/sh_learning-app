import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Home from './Components/Home/HomeUnlogin';


function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
       <Route exact path = '/' element = {<Landing/>}/> 
       <Route path = '/home' element = {<Home/>}/> 
    </Routes>
  )
}

export default App;
