import React from "react";
//import Navigation from "../../component/Navigation/Navigation";
//import Footer from "../../component/Footer/footer";
import Menu from "../Menu/menu";
import "./home.css";

export default function Home() {
    return (
        <div className="home-container">
            {/* Main Content */}
            <main className="main-content">

                <section className="menu-section">
                    <Menu />
                </section>
            </main>
        </div>
    );
}