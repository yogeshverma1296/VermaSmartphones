import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "./components/Navbar.jsx";
import StatsBar from "./components/StatsBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PhoneGrid from "./components/PhoneGrid.jsx";
import PhoneForm from "./components/PhoneForm.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";
import ViewModal from "./components/ViewModal.jsx";
import Toast from "./components/Toast.jsx";
import { fetchPhones, createPhone, updatePhone, deletePhone } from "./api/phoneApi.js";
import "./App.css";

function App() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [viewingPhone, setViewingPhone] = useState(null);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  const loadPhones = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await fetchPhones();
      setPhones(data);
    } catch (err) {
      setErrorMsg(
        "Could not connect to the server. Make sure the backend is running on http://localhost:5000 and MongoDB is connected."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const handleAddClick = () => {
    setEditingPhone(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (phone) => {
    setViewingPhone(null);
    setEditingPhone(phone);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingPhone) {
        const updated = await updatePhone(editingPhone._id, formData);
        setPhones((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
        showToast("Smartphone updated successfully", "success");
      } else {
        const created = await createPhone(formData);
        setPhones((prev) => [created, ...prev]);
        showToast("Smartphone added successfully", "success");
      }
      setIsFormOpen(false);
      setEditingPhone(null);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong. Please try again.";
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletePhone(deleteTarget._id);
      setPhones((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      showToast("Smartphone deleted", "success");
      setDeleteTarget(null);
    } catch (err) {
      showToast("Failed to delete smartphone", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPhones = useMemo(() => {
    let result = [...phones];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) => p.brand?.toLowerCase().includes(term) || p.model?.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        result.sort((a, b) => `${a.brand}${a.model}`.localeCompare(`${b.brand}${b.model}`));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [phones, searchTerm, sortBy]);

  return (
    <div className="app">
      <Navbar total={phones.length} onAddClick={handleAddClick} />

      <main className="main-content">
        {errorMsg && (
          <div className="alert-banner">
            <span>⚠️</span>
            <p>{errorMsg}</p>
            <button className="btn btn-ghost btn-sm" onClick={loadPhones}>
              Retry
            </button>
          </div>
        )}

        <StatsBar phones={phones} />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} />

        <PhoneGrid
          phones={filteredPhones}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={setDeleteTarget}
          onView={setViewingPhone}
          onAddClick={handleAddClick}
        />
      </main>

      <PhoneForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPhone(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingPhone}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        phone={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

      <ViewModal
        isOpen={!!viewingPhone}
        phone={viewingPhone}
        onClose={() => setViewingPhone(null)}
        onEdit={handleEditClick}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
