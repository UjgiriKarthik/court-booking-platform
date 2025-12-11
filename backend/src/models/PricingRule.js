// backend/src/models/PricingRule.js
import mongoose from "mongoose";

const PricingRuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  // Optional
  multiplier: {
    type: Number,
    default: null,
  },

  // Optional
  surcharge: {
    type: Number,
    default: null,
  },

  priority: {
    type: Number,
    default: 10,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PricingRule", PricingRuleSchema);
