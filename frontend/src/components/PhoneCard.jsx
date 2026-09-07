import React from "react";

const PhoneCard = ({ phone, onEdit, onDelete, onView }) => {
  const initials = `${phone.brand?.[0] || ""}${phone.model?.[0] || ""}`.toUpperCase();

  return (
    <div className="phone-card">
      <div className="phone-card-media">
        {phone.imageUrl ? (
          <img src={phone.imageUrl} alt={`${phone.brand} ${phone.model}`} onError={(e) => (e.target.style.display = "none")} />
        ) : (
          <div className="phone-placeholder">{initials}</div>
        )}
        <span className={`stock-pill ${phone.inStock ? "in-stock" : "out-stock"}`}>
          {phone.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="phone-card-body">
        <div className="phone-card-header">
          <h3>{phone.brand} {phone.model}</h3>
          <p className="phone-price">₹{Number(phone.price).toLocaleString("en-IN")}</p>
        </div>

        <div className="phone-specs">
          <span className="spec-chip">{phone.ram} RAM</span>
          <span className="spec-chip">{phone.storage}</span>
          {phone.camera && <span className="spec-chip">{phone.camera}</span>}
          {phone.battery && <span className="spec-chip">{phone.battery}</span>}
        </div>

        {phone.description && <p className="phone-desc">{phone.description}</p>}

        <div className="phone-card-actions">
          <button className="btn btn-ghost" onClick={() => onView(phone)}>
            View
          </button>
          <button className="btn btn-secondary" onClick={() => onEdit(phone)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(phone)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
