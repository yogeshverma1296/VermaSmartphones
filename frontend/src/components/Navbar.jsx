import React from "react";

const Navbar = ({ total, onAddClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="2" width="12" height="20" rx="3" stroke="white" strokeWidth="1.8" />
              <line x1="6" y1="18" x2="18" y2="18" stroke="white" strokeWidth="1.8" />
              <circle cx="12" cy="20" r="0.9" fill="white" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>VermaSmartphones</h1>
            <span>Smartphone Inventory Manager</span>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="badge-count">
            <span className="badge-dot" />
            {total} {total === 1 ? "device" : "devices"}
          </div>
          <button className="btn btn-primary" onClick={onAddClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            Add Smartphone
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
