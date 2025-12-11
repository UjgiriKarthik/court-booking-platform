import PricingRule from "../models/PricingRule.js";

export const getRules = async (req, res) => {
  try {
    const rules = await PricingRule.find().sort({ priority: 1 });
    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRule = async (req, res) => {
  try {
    const rule = await PricingRule.create(req.body);
    res.status(201).json(rule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRule = async (req, res) => {
  try {
    await PricingRule.findByIdAndDelete(req.params.id);
    res.json({ message: "Rule deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
