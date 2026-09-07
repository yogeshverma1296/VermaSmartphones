import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="search-icon">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-btn" onClick={() => setSearchTerm("")} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="nameAsc">Name: A to Z</option>
      </select>
    </div>
  );
};

export default SearchBar;
