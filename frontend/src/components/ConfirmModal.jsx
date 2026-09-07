import React from "react";

const ConfirmModal = ({ isOpen, phone, onCancel, onConfirm, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">🗑️</div>
        <h3>Delete Smartphone?</h3>
        <p>
          Are you sure you want to delete <strong>{phone?.brand} {phone?.model}</strong>? This action
          cannot be undone.
        </p>
        <div className="modal-footer center">
          <button className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
