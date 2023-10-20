import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
    repassword: "",
    leetcode: "",
    codechef: "",
    codeforces: "",
  });
  const [Error, setError] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const Notify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const NotifyError = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { Email, password, repassword, leetcode, codechef, codeforces } = formData;
    const result = await fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        Email,
        password,
        repassword,
        leetcode,
        codechef,
        codeforces,
      }),
    });
    const email = formData.Email;
    const pattern = /\b[A-Za-z0-9._%+-]+@charusat\.edu\.in\b/;
    const newemail=pattern.test(email);
    if (!newemail) {
    NotifyError('Please enter Charusat Email')
    }
    else{

    }
    const res = await result.json();
    if (res.status === 200) {
      Notify(res.message);
      const intervalId = setInterval(() => {
        history('/Singin');
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
    <div className="SignupContainer">
      <div className="SignupBox">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>

          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Re-enter Password:
            <input
              type="password"
              name="repassword"
              value={formData.repassword}
              onChange={handleChange}
              required
            />
          </label>
          <div className="labels">
            <label>
              LeetCode Username:
              <input
                id="leetcode"
                type="text"
                name="leetcode"
                value={formData.leetcodeUsername}
                onChange={handleChange}
              />
            </label>
            <label>
              CodeChef Username:
              <input
                type="text"
                name="codechef"
                value={formData.codechefUsername}
                onChange={handleChange}
              />
            </label>
            <label>
              CodeForces Username:
              <input
                type="text"
                name="codeforces"
                value={formData.codeforcesUsername}
                onChange={handleChange}
              />
            </label>
          </div>
          <p style={{ color: "red" }}>{Error.length > 0 && Error}</p>
          <center>

            <button id="Signup-btn" type="submit">Sign Up</button>
            <br/>
          <p style={{fontSize:'1.2rem'}}>Already have an account?<Link to='/signup' style={{textDecoration:'none'}}>Login</Link></p>
          </center>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default Signup;
