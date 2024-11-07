import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login, error, isAuthenticated } = useAuth();
    const [credentials, setCredentials] = useState({
        userEmail: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Reset form khi component mount
    useEffect(() => {
        setCredentials({
            userEmail: '',
            password: ''
        });
    }, []);

    // Redirect nếu đã đăng nhập
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await login(credentials);
            if (response.success) {
                // Navigation được handle bởi useEffect
            }
        } catch (err) {
            console.error('Login failed:', err);
            // Reset password field khi có lỗi
            setCredentials(prev => ({
                ...prev,
                password: ''
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                <div className="login-title">
                    <h1>LOGIN</h1>
                </div>
                <div className="input-group-login">
                    <label htmlFor="userEmail" className="input-label">EMAIL</label>
                    <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        value={credentials.userEmail}
                        onChange={handleChange}
                        required
                        placeholder="Nhập email của bạn"
                        disabled={isLoading}
                    />
                </div>

                <div className="input-group-login">
                    <label htmlFor="password" className="input-label">PASSWORD</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="Nhập mật khẩu"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className={`login-button ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'ĐANG ĐĂNG NHẬP...' : 'LOGIN'}
                </button>

                <div className="extra-links">
                    <a href="/" className="forget-password">Forget password</a>
                    <a href="/login" className="sign-in-link">Don't have account?</a>
                </div>
            </form>
        </div>
    );
}