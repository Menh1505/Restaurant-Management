// client/src/pages/Booking/booking.js
import React, { useState } from "react";
import { useBooking } from '../../hooks/useBookingTable';
import "./booking.css";

export default function BookingTable() {
  const { loading, createBooking } = useBooking();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chuyển đổi dữ liệu form sang format API
      const bookingData = {
        customerName: formData.name,
        customerPhoneNumber: formData.phone,
        customerEmail: formData.email,
        personNum: parseInt(formData.persons),
        dayBooking: formData.date,
        status: true
      };

      await createBooking(bookingData);

      // Reset form sau khi đặt bàn thành công
      setFormData({
        name: "",
        phone: "",
        email: "",
        persons: "",
        date: "",
      });

      alert('Đặt bàn thành công!');
    } catch (err) {
      console.error('Error creating booking:', err);
      alert('Đặt bàn thất bại: ' + (err.message || 'Đã có lỗi xảy ra'));
    }
  };

  if (loading) return <div className="loading">Đang xử lý...</div>;

  return (
    <div className="frame-151 clip-contents">
      <div className="frame-113 clip-contents">
        <div className="input-form">
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
                  {num} {num === 1 ? 'person' : 'persons'}
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
              min={new Date().toISOString().split('T')[0]} // Không cho phép chọn ngày trong quá khứ
            />
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'BOOKING...' : 'BOOK NOW'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}