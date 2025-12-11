// src/routes/index.js

import express from "express";

import authRoutes from "./authRoutes.js";
import courtRoutes from "./courtRoutes.js";
import coachRoutes from "./coachRoutes.js";
import equipmentRoutes from "./equipmentRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import pricingRuleRoutes from "./pricingRuleRoutes.js";

// -------------------------
// IMPORTANT: router MUST be created BEFORE using it
// -------------------------
const router = express.Router();

// -------------------------
// PUBLIC ROUTES
// -------------------------
router.use("/auth", authRoutes);
router.use("/courts", courtRoutes);
router.use("/coaches", coachRoutes);
router.use("/equipment", equipmentRoutes);

// -------------------------
// PROTECTED ROUTES
// -------------------------
router.use("/bookings", bookingRoutes);
router.use("/pricing-rules", pricingRuleRoutes);

// -------------------------
export default router;
