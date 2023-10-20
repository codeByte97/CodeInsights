import React, { useState, useEffect } from "react";
import MobileNav from "./Navbar-mobile";
import WebNav from "./Navbar-web";
import "./HomePage.css";
import { TypeAnimation } from "react-type-animation";


function Navigationbar() {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const [username, setusername] = useState('');
  const [usertype, setusertype] = useState('');
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  useEffect(() => {
    async function FetchData() {
      try {
        const result = await fetch('/GetUser');
        const response = await result.json();
        if (response !== null) {
          setusername(response.Data.username);
          setusertype(response.Data.usertype);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
    window.addEventListener('resize', setDimension);
    return (() => {
      window.removeEventListener('resize', setDimension);
    })
    
  }, [screenSize])


  return (
    <>
      {screenSize.dynamicWidth <= 768 ? <MobileNav username={username} usertype={usertype} />
        : <WebNav username={username} usertype={usertype} />}
    </>
  );
}

export default Navigationbar;
