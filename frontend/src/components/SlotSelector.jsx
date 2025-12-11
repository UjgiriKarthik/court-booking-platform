import React from "react";
export default function SlotSelector({ value, onChange, startHour = 6, endHour = 22 }) {
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      {slots.map((s) => (
        <button
          key={s}
          className={`px-3 py-2 rounded border ${value === s ? "bg-black text-white" : ""}`}
          onClick={() => onChange(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
