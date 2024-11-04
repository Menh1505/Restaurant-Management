import React from "react";
//import Navigation from "../../component/Navigation/Navigation";
//import Footer from "../../component/Footer/footer";
//import Menu from "../Menu/menu";
import "./home.css";
import pic from "../../assets/image/pic.jpg";

export default function Home() {
    return (
        // <div className="home-container">
        //     {/* Main Content */}
        //     <main className="main-content">

        //         <section className="menu-section">
        //             <Menu />
        //         </section>
        //     </main>
        // </div>
        <img src={pic} alt="Not Found" className="frame-90" />
    );
}
