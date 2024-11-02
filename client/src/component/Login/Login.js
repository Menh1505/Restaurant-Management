import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Login attempt with:', credentials);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username" className="input-label">USERNAME</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input-field"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password" className="input-label">PASSWORD:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="input-field"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="login-button">LOGIN</button>

                <div className="extra-links">
                    <a href="#" className="forget-password">FORGET PASSWORD</a>
                    <a href="#" className="sign-in-link">DON'T HAVE ACCOUNT? SIGN IN</a>
                </div>
            </form>
        </div>
    );
}