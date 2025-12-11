export default function CourtCard({ court }) {
  return (
    <div className="border rounded p-4">
      <div className="font-semibold text-lg">{court.name}</div>
      <div className="text-sm">Type: {court.type}</div>
      <div className="text-sm">Base ₹{court.basePricePerHour}/hr</div>
      <button
        className="mt-3 px-3 py-1 rounded bg-green-600 text-white"
        onClick={() => {
          localStorage.setItem("selectedCourt", JSON.stringify(court));
          window.location.href = "/book";
        }}
      >
        Book this court
      </button>
    </div>
  );
}
