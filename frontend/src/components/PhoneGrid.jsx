import React from "react";
import PhoneCard from "./PhoneCard.jsx";

const PhoneGrid = ({ phones, loading, onEdit, onDelete, onView, onAddClick }) => {
  if (loading) {
    return (
      <div className="grid-state">
        <div className="spinner" />
        <p>Loading smartphones...</p>
      </div>
    );
  }

  if (phones.length === 0) {
    return (
      <div className="grid-state empty-state">
        <div className="empty-icon">📭</div>
        <h3>No smartphones found</h3>
        <p>Try adjusting your search, or add a new smartphone to your inventory.</p>
        <button className="btn btn-primary" onClick={onAddClick}>
          + Add Smartphone
        </button>
      </div>
    );
  }

  return (
    <div className="phone-grid">
      {phones.map((phone) => (
        <PhoneCard key={phone._id} phone={phone} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      ))}
    </div>
  );
};

export default PhoneGrid;
