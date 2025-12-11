import { Router } from "express";
import { getRules, createRule, deleteRule } from "../controllers/pricingRuleController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// No roles → only require login
router.get("/", requireAuth(), getRules);
router.post("/", requireAuth(), createRule);
router.delete("/:id", requireAuth(), deleteRule);

export default router;
