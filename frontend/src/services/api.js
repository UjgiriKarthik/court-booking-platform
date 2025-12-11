import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

// store token globally
export function setToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// ------------------- AUTH -----------------------
export async function loginApi(email, password) {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    console.error("Login error", err.response?.data || err.message);
    return null;
  }
}

export async function signupApi(name, email, password) {
  try {
    const res = await api.post("/auth/signup", { name, email, password });
    return res.data;
  } catch (err) {
    console.error("Signup error", err.response?.data || err.message);
    return null;
  }
}

// ------------------- COURTS -----------------------
export async function getCourts() {
  const res = await api.get("/courts");
  return res.data;
}

// ------------------- COACHES -----------------------
export async function getCoaches() {
  const res = await api.get("/coaches");
  return res.data;
}

// ------------------- EQUIPMENT -----------------------
export async function getEquipment() {
  const res = await api.get("/equipment");
  return res.data;
}

// ------------------- BOOKINGS ---------------------
export async function createBooking(payload) {
  const res = await api.post("/bookings", payload);
  return res.data;
}

// ------------------- PRICE QUOTE ---------------------
export async function quoteBooking(payload) {
  const res = await api.post("/bookings/quote", payload);
  return res.data;
}

// ------------------- BOOKING HISTORY ---------------------
export async function getHistory() {
  const res = await api.get("/bookings/history");
  return res.data;
}

// ------------------- RULES (ADMIN) ----------------
export async function getRules() {
  const res = await api.get("/pricing-rules");
  return res.data;
}

export async function createRule(payload) {
  const res = await api.post("/pricing-rules", payload);
  return res.data;
}

export async function deleteRule(id) {
  const res = await api.delete(`/pricing-rules/${id}`);
  return res.data;
}

export default api;
