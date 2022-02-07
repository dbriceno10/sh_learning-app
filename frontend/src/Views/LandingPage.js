import React from 'react';
import Navbar from '../Components/Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div >
            <div className="right">
                <div className="wrapper">
                    <h2>Hola! Bienvenidos a Learnzilla</h2>
                    {/* <h3>Soy: <span ref={textRef}></span></h3> */}
                </div>
            </div>
            <div className="left">
                <div className="imgContainer"></div>
            </div>
        </div>
    </div>

  ) 
};

export default LandingPage;
