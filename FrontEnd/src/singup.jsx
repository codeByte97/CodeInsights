import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserData from './userData';
const LoginForm = () => {
  const history = useNavigate();
  const { setUser } = useUserData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState("");
  const Notify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const NotifyError = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email, password,
      })
    });
    const res = await result.json();
    console.log(res);
    if (res.status === 200) {
      Notify(res.message);
      const intervalId = setInterval(() => {
        history('/');
      }, 2000);
      return () => {
        clearInterval(intervalId);
      };

    }
    else {
      NotifyError(res.message);
    }
  };
  return (
    <>
      <div id="signu">
        <form onSubmit={handleSubmit} className='fr'>
          <h2 id='head2'>Login</h2>
          <div>
            <label htmlFor="email" className='em'>Email:</label>
            <input
              type="email"
              id="em"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='pa'>Password:</label>
            <input
              type="password"
              id="pas"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p style={{ color: 'red' }}>{Error}</p>
          <center>
            <button type="submit" id="lo">Login</button>
          </center>
          <br/>
          <p style={{fontSize:'1rem'}}>Doesn't have an account?<Link to='/signin' style={{textDecoration:'none'}}>Create Account</Link></p>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
export default LoginForm;