import React, { useEffect, useState } from "react";
import { getEquipment } from "../services/api";
import "../styles/equipment.css";

export default function EquipmentPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getEquipment();
      setItems(data);
    })();
  }, []);

  return (
    <div className="equip-wrapper">
      <h2 className="equip-title">Available Equipment</h2>

      {items.length === 0 ? (
        <p className="equip-empty">No equipment available.</p>
      ) : (
        <div className="equip-grid">
          {items.map((eq) => (
            <div key={eq._id} className="equip-card">
              <h3 className="equip-name">{eq.name}</h3>

              {/* Fee */}
              <p className="equip-price">₹{eq.unitFee}/hr</p>

              {/* Type */}
              <div className="equip-meta">
                <span>Type:</span> <strong>{eq.type || "General"}</strong>
              </div>

              {/* Stock */}
              <div className="equip-meta">
                <span>Total Stock:</span> <strong>{eq.stock || 10}</strong>
              </div>

              {/* Available */}
              <div className="equip-meta">
                <span>Available Now:</span>{" "}
                <strong>{eq.available || eq.stock || 10}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
