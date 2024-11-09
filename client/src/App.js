import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components
import Navigation from './component/Navigation/Navigation';
import Footer from './component/Footer/footer';
import InvoiceDetailPage from './component/InvoiceDetail/InvoiceDetail';
import Booking from './component/Booking/booking';

// Pages
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import MenuPage from './pages/Menu/MenuPage';
import Admin from './pages/Admin/Admin';
import Staff from './pages/Staff/staff';
import Customer from './pages/Customer/custormer';
import RevenuePage from './pages/Revenue/RevenuePage';

// Dishes Pages
import AddDishes from './pages/Dishes/AddDishes/add';
import DeleteDishes from './pages/Dishes/DeleteDishes/dele';
import ConfirmDishes from './pages/Dishes/ConfirmDish/comfirm';
import TableDishes from './pages/Dishes/TableDishes/tableDishes';

function App() {
  return (
    <AuthProvider>
      <Router>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/booking-table" element={<Booking />} />
              <Route path="/revenue" element={<RevenuePage />} />
              <Route path="/detail-invoice/:detailId" element={<InvoiceDetailPage />} />

              {/* Dishes Routes */}
              <Route path="/add-dishes" element={<AddDishes />} />
              <Route path="/delete-dishes" element={<DeleteDishes />} />
              <Route path="/confirm-dishes" element={<ConfirmDishes />} />
              <Route path="/table-dishes" element={<TableDishes />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 