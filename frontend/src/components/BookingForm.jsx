import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  getCourts,
  getCoaches,
  getEquipment,
  quoteBooking,
  createBooking,
  getHistory,
} from "../services/api";

export default function BookingForm() {
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [equip, setEquip] = useState([]);

  const [payload, setPayload] = useState({
    courtId: "",
    coachId: null,
    startTime: "",
    endTime: "",
    equipment: [],
  });

  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);

  // Load courts, coaches, equipment, history
  useEffect(() => {
    (async () => {
      setCourts(await getCourts());
      setCoaches(await getCoaches());
      setEquip(await getEquipment());
      setHistory(await getHistory());
    })();
  }, []);

  // Auto-quote calculation
  useEffect(() => {
    (async () => {
      if (payload.courtId && payload.startTime && payload.endTime) {
        try {
          const q = await quoteBooking(payload);
          setQuote(q);
        } catch {
          setQuote(null);
        }
      }
    })();
  }, [payload]);

  // Submit booking (FIXED WITH 409 HANDLING)
  const submit = async () => {
    try {
      const result = await createBooking(payload);

      alert("Booking Successful! Total ₹" + result?.pricingBreakdown?.total);

      // reload history
      setHistory(await getHistory());

    } catch (err) {
      if (err.response?.status === 409) {
        alert("❌ This time slot is already booked! Please choose another time.");
      } else {
        alert("⚠ Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="booking-grid">
      {/* LEFT SIDE — BOOKING FORM */}
      <div className="booking-card">

        {/* Select Court */}
        <select
          className="booking-select"
          value={payload.courtId}
          onChange={(e) =>
            setPayload((p) => ({ ...p, courtId: e.target.value }))
          }
        >
          <option value="">Select Court</option>
          {courts.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.type})
            </option>
          ))}
        </select>

        {/* Time selection */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="datetime-local"
            className="booking-input"
            onChange={(e) =>
              setPayload((p) => ({
                ...p,
                startTime: dayjs(e.target.value).toISOString(),
              }))
            }
          />

          <input
            type="datetime-local"
            className="booking-input"
            onChange={(e) =>
              setPayload((p) => ({
                ...p,
                endTime: dayjs(e.target.value).toISOString(),
              }))
            }
          />
        </div>

        {/* Coach selection */}
        <select
          className="booking-select"
          value={payload.coachId || ""}
          onChange={(e) =>
            setPayload((p) => ({
              ...p,
              coachId: e.target.value || null,
            }))
          }
        >
          <option value="">No Coach</option>
          {coaches.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} (₹{c.hourlyRate}/hr)
            </option>
          ))}
        </select>

        {/* Equipment selection */}
        <div>
          {equip.map((eq) => (
            <div key={eq._id} className="equip-row">
              <label>
                {eq.name} (₹{eq.unitFee}/hr)
              </label>

              <input
                type="number"
                min={0}
                defaultValue={0}
                className="booking-input w-24"
                onChange={(e) => {
                  const q = parseInt(e.target.value || 0);
                  setPayload((p) => {
                    const remaining = p.equipment.filter(
                      (x) => x.equipmentId !== eq._id
                    );

                    return {
                      ...p,
                      equipment:
                        q > 0
                          ? [...remaining, { equipmentId: eq._id, quantity: q }]
                          : remaining,
                    };
                  });
                }}
              />
            </div>
          ))}
        </div>

        {/* Quote box */}
        <div className="quote-box">
          <strong>Live Price</strong>
          {quote ? (
            <ul className="text-sm mt-2 space-y-1">
              <li>Base: ₹{quote.base}</li>

              {quote.ruleAdjustments.map((r, i) => (
                <li key={i}>
                  {r.name}: ₹{Math.round(r.effect)}
                </li>
              ))}

              {quote.coachFee && <li>Coach: ₹{quote.coachFee}</li>}
              {quote.equipmentFee && (
                <li>Equipment: ₹{quote.equipmentFee}</li>
              )}

              <li className="font-bold">Total: ₹{quote.total}</li>
            </ul>
          ) : (
            <p className="text-sm">Select court & time to get price</p>
          )}
        </div>

        {/* Submit */}
        <button className="book-btn" onClick={submit}>
          Book
        </button>
      </div>

      {/* RIGHT SIDE — BOOKING HISTORY */}
      <div className="booking-card">
        <h2 className="history-title">Booking History</h2>

        {history.map((h) => (
          <div key={h._id} className="history-item">
            <div>{new Date(h.startTime).toLocaleString()}</div>
            <div>To: {new Date(h.endTime).toLocaleString()}</div>
            <div>Court: {h.court?.name}</div>
            <div>Coach: {h.coach?.name || "—"}</div>
            <div className="font-bold">
              Total: ₹{h.pricingBreakdown?.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
