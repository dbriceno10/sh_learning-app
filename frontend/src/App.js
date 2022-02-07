import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import LandingPage from './Pages/LandingPage';



function App() {


  // copy and paste for new component route ⬇⬇⬇⬇⬇
  //     <Route path = '' element = {</>}></Route>
  //    or <Route path = '/' element = {</>}/>


  return (
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/landing' element={<LandingPage />} />
    </Routes>
  )
}

export default App;
