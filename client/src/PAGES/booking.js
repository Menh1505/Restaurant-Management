import React, { useState } from "react";
import "../styles/booking.css";

export default function BookingTable() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    persons: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Xử lý logic gửi form ở đây
  };

  return (
    <div className="frame-151 clip-contents">
      <div className="frame-113 clip-contents">
        <div className="frame-149">
          <h2 className="book-title">Book A Table</h2>
          <form onSubmit={handleSubmit} className="booking-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <select
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="" disabled>
                How many persons?
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">
              BOOK NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
