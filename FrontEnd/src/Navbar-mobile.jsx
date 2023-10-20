import React, { useState, useEffect } from "react";
import "./nav-mobile.css";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { Link } from "react-router-dom";
import useUserData from "./userData";

function MobileNav(props) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleclick = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const handleLogout = async () => {
    try {
      const res = await fetch('/logout');
      const result = await res.json();
      console.log(result);
      if (result.status === 200) {
        window.location.reload();
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <nav className="Navbar-mobile">
        <div className="Logo-mobile">
          CodeInsights
        </div>
        <div className="NavLink-style-mobile">
          <ul className="Menu-btn">
            <h1>{isMenuOpen ? <RxCross2 onClick={handleclick}></RxCross2> : <HiOutlineMenuAlt3 onClick={handleclick} />}</h1>
          </ul>
        </div>
      </nav>
      {isMenuOpen && <div className="Menu-toogle">
        <ul className="NavLink-mobile" >
          <li><Link id="Home" to='/'>Home</Link></li>
          <li><Link id="Leaderboard" to='/leaderboard'>Leaderboard</Link></li>
          <li><Link id="contest" to='/contestlist'>Contest</Link></li>
          {props.usertype === 'admin' && <li><Link id="contest" to='/'>Add Contest</Link></li>}
          {props.username !== '' ? <li><Link  onClick={handleLogout}>Logout</Link></li>
            :
            <li><Link id="Signin" to='/Signup'>Signin</Link></li>
          }

        </ul>
      </div>}
    </>
  );
}

export default MobileNav;
