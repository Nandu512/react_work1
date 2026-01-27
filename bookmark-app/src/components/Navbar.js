import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-link">
            📚 BookmarkApp
          </div>
        </div>

        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/bookmarks" className="navbar-link">
                My Bookmarks
              </Link>
              <Link to="/add" className="navbar-link">
                Add Bookmark
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-link">
                Signup
              </Link>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </>
          )}
        </div>

        {user && (
          <div className="navbar-actions">
            <span className="user-greeting">
              Welcome, {user.email.split('@')[0]}!
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-text">Logout</span>
              <span className="logout-icon">🚪</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
