import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import "../styles/booking.css";

export default function BookingPage() {
  const { courtId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="booking-wrapper">
      <button onClick={() => navigate("/")} className="back-btn">
        ⬅ Back
      </button>

      <h2 className="booking-title">Book Court</h2>

      <div className="booking-card">
        <BookingForm courtId={courtId} />
      </div>
    </div>
  );
}
