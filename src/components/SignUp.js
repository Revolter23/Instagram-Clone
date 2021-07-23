import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "./firebase.js";

import "./AuthForm.css";

import instaLogo from "./Images/Instagram logo.png";

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (event) => {
        if(username) {
            event.preventDefault();
            auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                })
            })
            .catch((error) => alert(error.message))
        }
    };

    return (
        <div className="signupPage">
            <main>
                <div>
                    <form className="signupForm">
                        <center>
                            <img 
                                className="instaLogo1"
                                src={instaLogo}
                                alt="Instagram"
                            />
                        </center>

                        <input
                            type="text"
                            className="input"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        {
                            username.length < 1
                            &&
                            <p className="emptyText">Please enter your username</p>
                        }

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

                        <button type="submit" className="signupButton" onClick={signUp}>Sign Up</button>
                    </form>
                </div>

                <div className="loginBox">
                    <p>Already have an account? <Link className="loginLink" to="/login">Log In</Link></p>
                </div>
            </main>
        </div>
    );
}

export default SignUp;