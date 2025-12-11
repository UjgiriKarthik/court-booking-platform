import React, { useEffect, useState } from "react";
import { getRules, createRule, deleteRule } from "../services/api";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {
  const [rules, setRules] = useState([]);
  const [name, setName] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [surcharge, setSurcharge] = useState("");

  useEffect(() => {
    loadRules();
  }, []);

  async function loadRules() {
    const data = await getRules();
    setRules(data);
  }

  async function addRule() {
    if (!name) return alert("Enter rule name");

    const payload = {
      name,
      multiplier: multiplier ? Number(multiplier) : undefined,
      surcharge: surcharge ? Number(surcharge) : undefined,
      priority: 10,
    };

    await createRule(payload);
    setName("");
    setMultiplier("");
    setSurcharge("");
    loadRules();
  }

  async function removeRule(id) {
    await deleteRule(id);
    loadRules();
  }

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Add New Rule */}
      <div className="add-box">
        <h3 className="add-title">Add New Rule</h3>

        <input
          className="input-field"
          placeholder="Rule Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input-field"
          placeholder="Multiplier (optional)"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
        />

        <input
          className="input-field"
          placeholder="Surcharge (optional)"
          value={surcharge}
          onChange={(e) => setSurcharge(e.target.value)}
        />

        <button className="add-btn" onClick={addRule}>
          Add Rule
        </button>
      </div>

      {/* Existing Rules */}
      <h3 className="rules-title">Existing Rules</h3>

      <div className="space-y-3">
        {rules.map((r) => (
          <div key={r._id} className="rule-card">
            <div>
              <div className="rule-name">{r.name}</div>
              <div className="rule-info">
                Multiplier: {r.multiplier || "—"} | Surcharge: {r.surcharge || "—"}
              </div>
            </div>

            <button className="delete-btn" onClick={() => removeRule(r._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
