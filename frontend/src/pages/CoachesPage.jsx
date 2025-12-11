import React, { useEffect, useState } from "react";
import { getCoaches } from "../services/api";
import "../styles/coaches.css"; // Add CSS file

export default function CoachesPage() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    (async () => setCoaches(await getCoaches()))();
  }, []);

  return (
    <div className="coach-wrapper">
      <h2 className="coach-title">Our Coaches</h2>

      {coaches.length === 0 ? (
        <p className="coach-empty">No coaches found.</p>
      ) : (
        <div className="coach-grid">
          {coaches.map((c) => (
            <div key={c._id} className="coach-card">
              <h3 className="coach-name">{c.name}</h3>

              <p className="coach-rate">₹{c.hourlyRate}/hr</p>

              <div className="coach-meta">
                <span>Experience:</span>{" "}
                <strong>{c.experience || "1 year+"}</strong>
              </div>

              <div className="coach-meta">
                <span>Specialization:</span>{" "}
                <strong>{c.specialization || "General Training"}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
