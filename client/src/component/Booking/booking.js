// client/src/pages/Booking/booking.js
import React, { useState } from "react";
import { useBooking } from '../../hooks/useBookingTable';
import "./booking.css";

export default function BookingTableForm() {
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

  const validateForm = (data) => {
    const errors = {};

    // Validate name
    if (data.name.length < 2 || data.name.length > 100) {
      errors.name = "Tên phải có độ dài từ 2 đến 100 ký tự";
    }

    // Validate phone
    if (!/^[0-9]{10,15}$/.test(data.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Validate persons
    const persons = parseInt(data.persons);
    if (isNaN(persons) || persons < 1 || persons > 8) {
      errors.persons = "Số người phải từ 1 đến 8";
    }

    // Validate date
    const bookingDate = new Date(data.date);
    const today = new Date();
    if (bookingDate < today) {
      errors.date = "Ngày đặt bàn phải là ngày trong tương lai";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (errors) {
      const errorMessage = Object.values(errors).join('\n');
      alert(errorMessage);
      return;
    }

    try {
      const formattedDate = new Date(formData.date).toISOString();

      const bookingData = {
        customerName: formData.name,
        customerPhoneNumber: formData.phone,
        customerEmail: formData.email,
        personNum: parseInt(formData.persons),
        dayBooking: formattedDate,
        status: true
      };

      await createBooking(bookingData);

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
      const errorMessage = err.response?.data?.message || err.message || 'Đã có lỗi xảy ra';
      alert('Đặt bàn thất bại: ' + errorMessage);
    }
  };

  if (loading) return <div className="loading">Đang xử lý...</div>;

  return (
    <div className="main-content">
      <div className="input-form">
        <h2 className="book-title">Booking Table</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="booking-input-field"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="booking-input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="booking-input-field"
          />
          <select
            name="persons"
            value={formData.persons}
            onChange={handleChange}
            required
            className="booking-input-field"
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
            className="booking-input-field"
            min={new Date().toISOString().split('T')[0]} // Không cho phép chọn ngày trong quá khứ
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'BOOKING...' : 'BOOK NOW'}
          </button>
        </form>
      </div>
    </div>
  );
}