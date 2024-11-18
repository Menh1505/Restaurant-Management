import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { detailInvoiceService } from '../../services/detailInvoiceService';
import { invoiceService } from '../../services/invoiceService';
import './InvoiceDetail.css';

export default function InvoiceDetail() {
    const { detailId } = useParams();
    const [detail, setDetail] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const data = await detailInvoiceService.getDetailInvoiceById(detailId);
                console.log('Detail data:', data);
                setDetail(data);

                if (data.invoiceId) {
                    const invoiceData = await invoiceService.getInvoiceById(data.invoiceId);
                    setInvoice(invoiceData);
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [detailId]);


    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!detail) return <div className="error">No detail found</div>;

    return (
        <div className="detail-container">
            <div className="detail-header">
                <h1>Invoice Detail #{detailId}</h1>
            </div>

            <div className="detail-content">
                <div className="detail-section">
                    <h2>Invoice Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Invoice ID:</label>
                            <span>{detail.invoiceId}</span>
                        </div>
                        <div className="check-in-out">
                            <div className="info-item">
                                <label>Check In:</label>
                                <span>{invoice ? new Date(invoice.checkIn).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <label>Check Out:</label>
                                <span>{invoice ? new Date(invoice.checkOut).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                        <div className="info-item dishes-list">
                            <label>Ordered Dishes:</label>
                            <div className="dishes-container">
                                {detail.listDishesWithAmount && detail.listDishesWithAmount.map((dish) => (
                                    <div key={dish.dishId} className="dish-item">
                                        <span className="dish-name">{dish.dishName}</span>
                                        <div className="dish-details">
                                            <span className="dish-quantity">x {dish.amount}</span>
                                            <span className="dish-subtotal">
                                                ${(dish.amount * dish.dishPrice).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="total-amount">
                            <label>Total Amount:</label>
                            <span>${detail.total}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="back-button-container">
                <Link to="/revenue" className="back-button">Back to Revenue</Link>
            </div>
        </div>
    );
}