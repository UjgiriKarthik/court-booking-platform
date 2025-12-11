// backend/src/routes/bookingRoutes.js
import { Router } from "express";
import { quote } from "../controllers/priceController.js";
import {
  createBooking,
  listHistory,
  cancelBooking,
} from "../controllers/bookingController.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

// 🟢 PUBLIC — Quote does NOT require login
r.post("/quote", quote);

// 🔒 PROTECTED — User must be logged in (no roles)
r.post("/", requireAuth(), createBooking);
r.get("/history", requireAuth(), listHistory);
r.patch("/:id/cancel", requireAuth(), cancelBooking);

export default r;
