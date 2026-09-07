import React from "react";

const ViewModal = ({ isOpen, phone, onClose, onEdit }) => {
  if (!isOpen || !phone) return null;

  const details = [
    { label: "Brand", value: phone.brand },
    { label: "Model", value: phone.model },
    { label: "Price", value: `₹${Number(phone.price).toLocaleString("en-IN")}` },
    { label: "RAM", value: phone.ram },
    { label: "Storage", value: phone.storage },
    { label: "Battery", value: phone.battery || "—" },
    { label: "Camera", value: phone.camera || "—" },
    { label: "Release Year", value: phone.releaseYear || "—" },
    { label: "Color", value: phone.color || "—" },
    { label: "Availability", value: phone.inStock ? "In Stock" : "Out of Stock" },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{phone.brand} {phone.model}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {phone.imageUrl && (
          <div className="view-image">
            <img src={phone.imageUrl} alt={`${phone.brand} ${phone.model}`} onError={(e) => (e.target.style.display = "none")} />
          </div>
        )}

        <div className="view-details-grid">
          {details.map((d) => (
            <div className="view-detail-item" key={d.label}>
              <span className="view-detail-label">{d.label}</span>
              <span className="view-detail-value">{d.value}</span>
            </div>
          ))}
        </div>

        {phone.description && (
          <div className="view-description">
            <span className="view-detail-label">Description</span>
            <p>{phone.description}</p>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => onEdit(phone)}>
            Edit Smartphone
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
