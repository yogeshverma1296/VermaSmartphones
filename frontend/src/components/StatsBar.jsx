import React from "react";

const StatsBar = ({ phones }) => {
  const total = phones.length;
  const inStock = phones.filter((p) => p.inStock).length;
  const totalValue = phones.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  const avgPrice = total > 0 ? totalValue / total : 0;

  const stats = [
    { label: "Total Devices", value: total, icon: "📱" },
    { label: "In Stock", value: inStock, icon: "✅" },
    { label: "Inventory Value", value: `₹${totalValue.toLocaleString("en-IN")}`, icon: "💰" },
    { label: "Average Price", value: `₹${avgPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, icon: "📊" },
  ];

  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-icon">{s.icon}</div>
          <div>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
