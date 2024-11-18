// client/src/pages/Booking/booking.js
import React, { useState, useEffect } from "react";
import { useBooking } from '../../hooks/useBookingTable';
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./booking.css";

export default function BookingTableForm() {
  const { user } = useAuth();
  const { loading, bookings = [], createBooking, getAllBookings, updateBookingStatus } = useBooking();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    persons: "",
    date: "",
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      getAllBookings();
      console.log(bookings);
    }
  }, [user, getAllBookings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      toast.success(`Booking ${status} successfully`);
      getAllBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate name
    if (data.name.length < 2 || data.name.length > 100) {
      errors.name = "Name must be between 2 and 100 characters";
    }

    // Validate phone
    if (!/^[0-9]{10,15}$/.test(data.phone)) {
      errors.phone = "Invalid phone number";
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email";
    }

    // Validate persons
    const persons = parseInt(data.persons);
    if (isNaN(persons) || persons < 1 || persons > 8) {
      errors.persons = "Number of people must be between 1 and 8";
    }

    // Validate date
    const bookingDate = new Date(data.date);
    const today = new Date();
    if (bookingDate < today) {
      errors.date = "Booking date must be in the future";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (errors) {
      const errorMessage = Object.values(errors).join('\n');
      toast.error(errorMessage);
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

      toast.success('Booking successfully!');
    } catch (err) {
      console.error('Error creating booking:', err);
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      toast.error('Booking failed: ' + errorMessage);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (user?.role === 'admin') {
    // Kiểm tra nếu bookings là object đơn lẻ
    const bookingData = Array.isArray(bookings) ? bookings : [bookings];

    return (
      <div className="booking-admin">
        <h2>Booking Management</h2>
        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th className="booking-id">Booking ID</th>
                <th className="customer-name">Customer Name</th>
                <th className="phone">Phone</th>
                <th className="email">Email</th>
                <th className="persons">Persons</th>
                <th className="date">Date</th>
                <th className="status">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking, index) => (
                <tr key={booking.BookingID || index}>
                  <td>{booking.BookingID}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.customerPhoneNumber}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{booking.personNum}</td>
                  <td>{new Date(booking.dayBooking).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${booking.status ? 'confirmed' : 'cancelled'}`}>
                      {booking.status ? 'Confirmed' : 'Cancelled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!bookingData || bookingData.length === 0) && (
            <div className="no-bookings">No bookings found</div>
          )}
        </div>
      </div>
    );
  }

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