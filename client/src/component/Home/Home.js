import React from "react";
import "./home.css";
import { useNavigate } from 'react-router-dom';
import steak from "../../assets/image/steak.jpg"
import seafoodpasta from "../../assets/image/seafoodpasta.jpg"
import grilledsalmon from "../../assets/image/grilledsalmon.jpg"
import caesarsalad from "../../assets/image/caesarsalad.jpg"

export default function HomePages() {
    const navigate = useNavigate();

    const handleViewMenu = () => {
        navigate('/menu');
    };

    return (
        <div className="home-container">
            <main className="main-content">

                {/* Banner Section */}
                <section className="banner-section">
                    <div className="banner-content">
                        <h1>Welcome to The Boy's Restaurant</h1>
                        <p>Discover the finest dining experience</p>
                        <button className="menu-btn" onClick={handleViewMenu}>View Menu</button>
                    </div>
                </section>

                {/* Opening Hours Section */}
                <section className="opening-section">
                    <div className="opening-content">
                        <h2>OPENING TIME HOURS</h2>
                        <div className="time-slots">
                            <div className="time-slot">
                                <span className="day">Monday - Friday</span>
                                <span className="time">9:00 AM - 10:00 PM</span>
                            </div>
                            <div className="time-slot">
                                <span className="day">Saturday</span>
                                <span className="time">10:00 AM - 11:00 PM</span>
                            </div>
                            <div className="time-slot">
                                <span className="day">Sunday</span>
                                <span className="time">8:00 AM - 9:00 PM</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dishes-section">
                    <div className="dishes-content">
                        <h2>Our Special Dishes</h2>
                        <div className="dishes-grid">
                            <div className="dish-card">
                                <div className="dish-image">
                                    <img src={steak} alt="" />
                                </div>
                                <div className="dish-info">
                                    <h3>Steak</h3>
                                    <p>Tender and juicy steak cooked to perfection</p>
                                    <span className="price">$19.00</span>
                                </div>
                            </div>

                            <div className="dish-card">
                                <div className="dish-image">
                                    <img src={seafoodpasta} alt="" />
                                </div>
                                <div className="dish-info">
                                    <h3>Seafood Pasta</h3>
                                    <p>Fresh seafood with homemade pasta and creamy sauce</p>
                                    <span className="price">$15.00</span>
                                </div>
                            </div>

                            <div className="dish-card">
                                <div className="dish-image">
                                    <img src={grilledsalmon} alt="" />
                                </div>
                                <div className="dish-info">
                                    <h3>Grilled Salmon</h3>
                                    <p>Atlantic salmon with seasonal vegetables</p>
                                    <span className="price">$17.99</span>
                                </div>
                            </div>

                            <div className="dish-card">
                                <div className="dish-image">
                                    <img src={caesarsalad} alt="" />
                                </div>
                                <div className="dish-info">
                                    <h3>Caesar Salad</h3>
                                    <p>Classic caesar with homemade croutons and grilled chicken</p>
                                    <span className="price">$8.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <div className="about-content">
                        <h2>About Us</h2>
                        <div className="about-grid">
                            <div className="about-text">
                                <p>Welcome to The Boy's Restaurant, where culinary excellence meets warm hospitality. Our journey began with a simple passion for creating extraordinary dining experiences.</p>
                                <p>We take pride in serving you the finest dishes made from carefully selected ingredients, prepared by our talented chefs who bring years of expertise to every plate.</p>
                            </div>
                            <div className="about-features">
                                <div className="feature">
                                    <span className="feature-number">10+</span>
                                    <span className="feature-text">Years of Experience</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-number">20+</span>
                                    <span className="feature-text">Special Dishes</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-number">5000+</span>
                                    <span className="feature-text">Happy Customers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}