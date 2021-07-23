import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./AuthForm.css";

import { auth } from "./firebase.js";

import instaLogo from "./Images/Instagram logo.png";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
    };

    return (
        <div className="loginPage">
            <main>
                <div>
                    <form className="loginForm">
                        <img 
                            className="instaLogo1"
                            src={instaLogo}
                            alt="Instagram"
                        />

                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <button type="submit" className="loginButton" onClick={logIn}>Log In</button>
                    </form>
                </div>

                <div className="signupBox">
                    <p>Don't have an account? <Link className="signupLink" to="/signup">Sign Up</Link></p>
                </div>
            </main>
        </div>
    );
}

export default LogIn;