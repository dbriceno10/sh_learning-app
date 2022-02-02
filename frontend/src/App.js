import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from "./Components/Landing"

function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
      <Route exact path = '/' element = {<Landing/>}/> 
    </Routes>
  )
}

export default App;
