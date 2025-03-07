import React, { useState } from 'react'
import axios from "axios"
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [signUpData, setSignUpData] = useState ({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setSignUpData ({
            ...signUpData,
            [e.target.name]: e.target.value
        });
    }

    const navigate = useNavigate ();

    const handleSubmit = async (e) => {
      e.preventDefault ();

      if (!signUpData.name.trim () || !signUpData.email.trim () || !signUpData.password.trim ()) {
        alert ("all fields are required");
        return;
      }
      
      try {
        const response = await axios.post ("https://todo-backend-4tog.onrender.com/api/signup", signUpData);
        console.log ("signup data saved:", response.data);

        setSignUpData ({
          name: "",
          email: "",
          password: "",
        })

        alert ("signup successfully");
        navigate ("/signin");
      }

      catch (err) {
        alert ("error in sign up:", err);
      }
    }
  return (
    <div>
      <div id='formsignup'>
      <div className="container">
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="input-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name='name' placeholder="Enter your full name" onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name='email' placeholder="Enter your email" onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name='password' placeholder="Create a password" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn">Sign Up</button>
            <p className="login-link">Already have an account? <a href="/signin">Login</a></p>
        </form>
    </div>
      </div>
    </div>
  )
}

export default Signup
