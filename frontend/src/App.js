import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import FormRegister from './Components/Register';


function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
       <Route exact path = '/' element = {<Landing/>}/> 
       <Route exact path = '/login' element = {<FormRegister/>}/>  

    </Routes>
  )
}

export default App;
