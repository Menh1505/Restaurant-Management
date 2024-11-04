import React from "react";
import LoginForm from "../../component/Login/Login";
//import Navigation from "../../component/Navigation/Navigation";
//import Footer from "../../component/Footer/footer";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="page-container">
      <main className="main-content">
        <LoginForm />
      </main>
    </div>
  );
};