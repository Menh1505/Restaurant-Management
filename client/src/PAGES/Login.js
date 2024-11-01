import React from "react";
import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="username" className="input-label">USERNAME</label>
          <input type="text" id="username" name="username" className="input-field" />
        </div>
        
        <div className="input-group">
          <label htmlFor="password" className="input-label">PASSWORD:</label>
          <input type="password" id="password" name="password" className="input-field" />
        </div>
        
        <button type="submit" className="login-button">LOGIN</button>
        
        <div className="extra-links">
          <a href="#" className="forget-password">FORGET PASSWORD</a>
          <a href="#" className="sign-in-link">DON’T HAVE ACCOUNT? SIGN IN</a>
        </div>
      </form>
    </div>
  );
}
