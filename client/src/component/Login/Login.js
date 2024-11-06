import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login, error } = useAuth();
    const [credentials, setCredentials] = useState({
        userEmail: '',
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
            console.log('Sending credentials:', credentials);
            const response = await login(credentials);
            console.log('Login response:', response);

            if (response.success) {
                // Lưu thông tin user
                localStorage.setItem('user', JSON.stringify(response.user));

                // Chuyển hướng về trang Home
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Đăng nhập thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                <div className="login-title">
                    <h1>LOGIN</h1>
                </div>
                <div className="input-group">
                    <label htmlFor="userEmail" className="input-label">EMAIL</label>
                    <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        value={credentials.userEmail}
                        onChange={handleChange}
                        required
                        placeholder="Nhập email của bạn"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password" className="input-label">PASSWORD</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="Nhập mật khẩu"
                    />
                </div>

                <button type="submit" className="login-button">LOGIN</button>

                <div className="extra-links">
                    <a href="/" className="forget-password">Forget password</a>
                    <a href="/login" className="sign-in-link">Don't have account?</a>
                </div>
            </form>
        </div>
    );
}