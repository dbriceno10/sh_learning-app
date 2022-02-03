import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import FormRegister from './Components/FormRegister';


function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
       <Route exact path = '/' element = {<Landing/>}/> 
       <Route exact path = '/signUp' element = {<FormRegister/>}/>  

    </Routes>
  )
}

export default App;
