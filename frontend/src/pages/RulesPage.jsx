import { useEffect, useState } from "react";
import { getRules } from "../services/api";

export default function RulesPage() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    (async () => setRules(await getRules()))();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-3">Pricing Rules</h2>

      <ul className="space-y-2">
        {rules.map((r) => (
          <li key={r._id} className="border p-3 rounded">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm opacity-75">{JSON.stringify(r.conditions)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
