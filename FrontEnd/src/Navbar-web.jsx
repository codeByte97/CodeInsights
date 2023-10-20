import React, { useEffect, useState } from "react";
import "./Navbar-web-style.css";
import { Link } from "react-router-dom";

function StickyNavbar(props) {
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
      <nav className="Navbar">
        <div className="Logo">
          CodeInsights
        </div>
        <div className="NavLink-style">
          <ul className="NavLink">
            <li><Link id="Home" to='/'>Home</Link></li>
            <li><Link id="Leaderboard" to='/leaderboard'>Leaderboard</Link></li>
            <li><Link id="contest" to='/contestlist'>Contest</Link></li>
            {props.usertype === 'admin' && <li><Link id="contest" to='/'>Add Contest</Link></li>}
            {props.username !== '' ? <li><Link id="Signin" onClick={handleLogout}>Logout</Link></li>
              :
              <li><Link id="Signin" to='/Signup'>Signin</Link></li>
            }

          </ul>
        </div>
      </nav>

    </>
  );
}

export default StickyNavbar;
