import React, { useState, useEffect } from "react";
import MobileNav from "./Navbar-mobile";
import WebNav from "./Navbar-web";
import "./HomePage.css";
import { TypeAnimation } from "react-type-animation";
import useUserData from "./userData";
import Navigationbar from "./Navbar-new";


function HomePage() {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);
    return (() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])


  return (
    <>
      <Navigationbar/>
      <div className={`${screenSize.dynamicWidth <= 768 ? 'Animation-lessthan' : 'Animation'}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              'Welcome to World of coding',
              1000,
              'Welcome to World of coding',
              1000,
              'Welcome to Code Insights',
              1000,
              'Welcome to Code Insights',
              1000,
            ]}
            speed={50}
            style={{ fontSize: '100%', color: "black" }}
            repeat={Infinity}
          />
        </h1>
      </div>
    </>
  );
}

export default HomePage;
