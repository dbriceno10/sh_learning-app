import React, { useState } from "react";
import {FaArrowCircleUp} from 'react-icons/fa';
import "./ScrollTopButton.css"

const ScrollTopButton = () => {
	const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 800){
      setVisible(true)
    } 
    else if (scrolled <= 800){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <div className="ir-arriba">
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} />
    </div>
  );
};

export default ScrollTopButton;
