import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';
import { AuthProvider } from './context/AuthContext';
// Components
import Navigation from './component/Navigation/Navigation';
import Footer from './component/Footer/footer';
// Pages
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import Menu from './pages/Menu/MenuPage';
import Admin from './pages/Admin/Admin';
import Staff from './pages/Staff/staff';
import Customer from './pages/Customer/custormer';
import Booking from './component/Booking/booking';
import Revenue from './pages/Revenue/revenus';

// Dishes Pages
import AddDishes from './pages/Dishes/AddDishes/add';
import DeleteDishes from './pages/Dishes/DeleteDishes/dele';
import ConfirmDishes from './pages/Dishes/ConfirmDish/comfirm';
import TableDishes from './pages/Dishes/TableDishes/tableDishes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/revenue" element={<Revenue />} />

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