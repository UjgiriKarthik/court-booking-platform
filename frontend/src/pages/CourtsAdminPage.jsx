import React, { useEffect, useState } from "react";
import { getCourts } from "../services/api";
import "../styles/courtsAdmin.css"; // ✅ Add this line for external CSS

export default function CourtsAdminPage() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    (async () => setCourts(await getCourts()))();
  }, []);

  return (
    <div className="admin-wrapper">
      <h2 className="admin-title">Manage Courts</h2>

      {courts.length === 0 ? (
        <p className="no-data">No courts found.</p>
      ) : (
        <div className="court-grid">
          {courts.map((c) => (
            <div key={c._id} className="court-card">
              <h3 className="court-name">{c.name}</h3>

              <div className="court-detail">
                <span>Type:</span> <strong>{c.type}</strong>
              </div>

              <div className="court-detail">
                <span>Base Price:</span>{" "}
                <strong>₹{c.basePricePerHour}/hour</strong>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
