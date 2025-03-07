import axios from 'axios';
import React, { useState } from 'react';
import TodoApp from './Todo';

function Signin() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [userEmail, setUserEmail] = useState(null);

    const handleChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginForm.email.trim() || !loginForm.password.trim()) {
            alert("email and password are required");
            return;
        }

        try {
            const response = await axios.post("https://todo-backend-4tog.onrender.com/api/login", loginForm);

            if (response.data.user) {
                alert("Login Successfully");
                setUserEmail(response.data.user.email); // Store email after login
            }
            
            setLoginForm({ email: "", password: "" });
        } catch (err) {
            alert("Login error or user may not exist, sign up first");
            console.log(err);
        }
    };

    return (
        <div id='formsignin'>
            {userEmail ? (
                <TodoApp userEmail={userEmail} /> // Pass email to TodoApp
            ) : (
                <div className="container">
                    <div className="login-box">
                        <h2>Sign In</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="email" name='email' placeholder="Email" onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <input type="password" name='password' placeholder="Password" onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn">Sign In</button>
                            <p className="register-link">Don't have an account? <a href="/">Sign Up</a></p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signin;
