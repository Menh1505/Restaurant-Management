import React, { useState, useEffect } from 'react';
import { invoiceService } from '../../services/invoiceService';
import './revenue.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Revenue() {
  const [invoices, setInvoices] = useState([]);
  const [originalInvoices, setOriginalInvoices] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });

  const calculateTotalRevenue = (data) => {
    const total = data.reduce((sum, invoice) => sum + parseFloat(invoice.total), 0);
    setTotalRevenue(total);
  };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getAllInvoices();
      console.log('Invoice data:', data);
      setInvoices(data);
      setOriginalInvoices(data);
      calculateTotalRevenue(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDateFilter = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filterInvoices = () => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    const filteredData = originalInvoices.filter(invoice => {
      const checkInDate = new Date(invoice.checkIn);
      const filterStart = new Date(dateFilter.startDate);
      const filterEnd = new Date(dateFilter.endDate);

      filterStart.setHours(0, 0, 0, 0);
      filterEnd.setHours(23, 59, 59, 999);

      console.log('Checking invoice:', {
        checkIn: checkInDate,
        start: filterStart,
        end: filterEnd,
        isInRange: checkInDate >= filterStart && checkInDate <= filterEnd
      });

      return checkInDate >= filterStart && checkInDate <= filterEnd;
    });

    console.log('Filtered data:', filteredData);
    setInvoices(filteredData);
    calculateTotalRevenue(filteredData);
  };

  // Thêm hàm reset
  const resetFilter = () => {
    setDateFilter({
      startDate: '',
      endDate: ''
    });
    setInvoices(originalInvoices);
    calculateTotalRevenue(originalInvoices);
  };

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div className="revenue-container">
      <h1 className="revenue-title">Revenue Report</h1>

      <div className="filter-section">
        <div className="date-inputs">
          <div className="input-group">
            <label>From day:</label>
            <input
              type="date"
              name="startDate"
              value={dateFilter.startDate}
              onChange={handleDateFilter}
            />
          </div>
          <div className="input-group">
            <label>To day:</label>
            <input
              type="date"
              name="endDate"
              value={dateFilter.endDate}
              onChange={handleDateFilter}
            />
          </div>
        </div>

        <div className="filter-buttons">
          <button onClick={filterInvoices}>Filter</button>
          <button onClick={resetFilter} className="reset-btn">Reset</button>
        </div>
      </div>

      <div className="summary-section">
        <div className="total-card">
          <h2>Total Revenue</h2>
          <p className="total-amount">${totalRevenue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</p>
        </div>
        <div className="total-card">
          <h2>Total Number of Invoices</h2>
          <p className="total-count">{invoices.length}</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Check In Time</th>
              <th>Check Out Time</th>
              <th>Detail ID</th>
              <th>Total Amount</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceId}</td>
                <td>{new Date(invoice.checkIn).toLocaleDateString('en-US')}</td>
                <td>{new Date(invoice.checkOut).toLocaleDateString('en-US')}</td>
                <td>{invoice.detailId || 'N/A'}</td>
                <td>${invoice.total}</td>
                <td>
                  <Link to={`/detail-invoice/${invoice.detailId}`} className="detail-link">
                    View Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}