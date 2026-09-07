import React, { useState, useEffect } from "react";

const emptyForm = {
  brand: "",
  model: "",
  price: "",
  ram: "",
  storage: "",
  battery: "",
  camera: "",
  releaseYear: "",
  color: "",
  imageUrl: "",
  inStock: true,
  description: "",
};

const PhoneForm = ({ isOpen, onClose, onSubmit, initialData, isSubmitting }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.brand.trim()) newErrors.brand = "Brand is required";
    if (!form.model.trim()) newErrors.model = "Model is required";
    if (!form.price || Number(form.price) < 0) newErrors.price = "Enter a valid price";
    if (!form.ram.trim()) newErrors.ram = "RAM is required";
    if (!form.storage.trim()) newErrors.storage = "Storage is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      price: Number(form.price),
      releaseYear: form.releaseYear ? Number(form.releaseYear) : undefined,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? "Edit Smartphone" : "Add New Smartphone"}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="phone-form">
          <div className="form-grid">
            <div className={`form-field ${errors.brand ? "has-error" : ""}`}>
              <label>Brand *</label>
              <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Samsung" />
              {errors.brand && <span className="error-text">{errors.brand}</span>}
            </div>

            <div className={`form-field ${errors.model ? "has-error" : ""}`}>
              <label>Model *</label>
              <input name="model" value={form.model} onChange={handleChange} placeholder="e.g. Galaxy S24 Ultra" />
              {errors.model && <span className="error-text">{errors.model}</span>}
            </div>

            <div className={`form-field ${errors.price ? "has-error" : ""}`}>
              <label>Price (₹) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 129999" min="0" />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className={`form-field ${errors.ram ? "has-error" : ""}`}>
              <label>RAM *</label>
              <input name="ram" value={form.ram} onChange={handleChange} placeholder="e.g. 12GB" />
              {errors.ram && <span className="error-text">{errors.ram}</span>}
            </div>

            <div className={`form-field ${errors.storage ? "has-error" : ""}`}>
              <label>Storage *</label>
              <input name="storage" value={form.storage} onChange={handleChange} placeholder="e.g. 256GB" />
              {errors.storage && <span className="error-text">{errors.storage}</span>}
            </div>

            <div className="form-field">
              <label>Battery</label>
              <input name="battery" value={form.battery} onChange={handleChange} placeholder="e.g. 5000mAh" />
            </div>

            <div className="form-field">
              <label>Camera</label>
              <input name="camera" value={form.camera} onChange={handleChange} placeholder="e.g. 200MP Triple Camera" />
            </div>

            <div className="form-field">
              <label>Release Year</label>
              <input type="number" name="releaseYear" value={form.releaseYear} onChange={handleChange} placeholder="e.g. 2024" min="2000" max="2100" />
            </div>

            <div className="form-field">
              <label>Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Titanium Black" />
            </div>

            <div className="form-field">
              <label>Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <div className="form-field full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description or notes about this smartphone..."
              rows={3}
            />
          </div>

          <label className="checkbox-field">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
            Currently in stock
          </label>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Add Smartphone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneForm;
