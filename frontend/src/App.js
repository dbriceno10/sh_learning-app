import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import HomeUser from './Components/HomeUser/HomeUser.jsx' ;



function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
       <Route exact path = '/login' element = {<Landing/>}/> 
       <Route path='HomeUser' element={<HomeUser/>} />
    </Routes>
  )
}

export default App;
