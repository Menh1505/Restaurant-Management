import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext" // Import useAuth
import "./Navigation.css"

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navigation render:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="frame-88 clip-contents">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/kir21mwt109-417%3A233?alt=media&token=0ba50cdc-2d20-444d-8564-fb46a542522e"
        alt="Not Found"
        className="rectangle-218"
      />
      <p className="the-boy-s">THE BOY'S</p>
      <div className="frame-95 clip-contents">
        <div className="frame-971 clip-contents">
          <Link to="/" className="active">
            HOME
          </Link>
        </div>

        <div className="frame-971 clip-contents">
          <Link to="/menu" className="menu">
            MENU
          </Link>
        </div>

        <div className="frame-971 clip-contents">
          <Link to="/booking" className="bookingtable">
            BOOKING
          </Link>
        </div>

        <div className="frame-971 clip-contents">
          <Link to="/admin" className="pages">
            PAGES
          </Link>
        </div>
      </div>

      <div>
        <Link to="/revenue" className="return">
          Revenue
        </Link>
      </div>

      {/* User Section */}
      <div className="user-section">
        {isAuthenticated && user ? (
          <div className="user-profile">
            <div className="user-icon-container">
              <div className="user-icon">&#128100;</div>
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <span className="user-name">{user.userName}</span>
                  <span className="user-email">{user.userEmail}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="logout-button" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <button className="login-button2">LOGIN</button>
          </Link>
        )}
      </div>
    </div>
  )
}