import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <p className="footer-title">Customer Service</p>
        <p className="footer-item">Email: support@example.com</p>
        <p className="footer-item">Phone: +123 456 7890</p>
      </div>
      <div className="footer-section">
        <p className="footer-title">Contact</p>
        <p className="footer-item">Address: TP.HCM, Viet Nam</p>
        <p className="footer-item">Email: contact@example.com</p>
      </div>
    </div>
  );
}