import React, { useEffect, useState } from "react";
import { getCourts } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/courts.css";

export default function CourtsPage() {
  const [indoor, setIndoor] = useState([]);
  const [outdoor, setOutdoor] = useState([]);

  useEffect(() => {
    getCourts().then((courts) => {
      setIndoor(courts.filter((c) => c.type === "indoor"));
      setOutdoor(courts.filter((c) => c.type === "outdoor"));
    });
  }, []);

  return (
    <div className="courts-page-container">
      <h2 className="courts-title">Courts</h2>

      {/* Indoor Section */}
      <h3 className="section-title">Indoor Courts</h3>
      <div className="courts-grid">
        {indoor.map((c) => (
          <div key={c._id} className="court-card">
            <div className="court-name">{c.name}</div>
            <div className="court-type">{c.type}</div>

            <Link to={`/booking/${c._id}`} className="book-btn">
              Book
            </Link>
          </div>
        ))}
      </div>

      {/* Outdoor Section */}
      <h3 className="section-title">Outdoor Courts</h3>
      <div className="courts-grid">
        {outdoor.map((c) => (
          <div key={c._id} className="court-card">
            <div className="court-name">{c.name}</div>
            <div className="court-type">{c.type}</div>

            <Link to={`/booking/${c._id}`} className="book-btn">
              Book
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
