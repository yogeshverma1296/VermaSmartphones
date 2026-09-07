import React, { useEffect } from "react";

const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      <span className="toast-icon">{toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}</span>
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
