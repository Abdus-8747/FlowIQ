import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },

  name: { type: String, required: true }, // Agile, Spiral, etc.

  whySelected: { type: String, required: true },

  bestFor: [{ type: String }],

  phases: [
    {
      name: String,
      description: String,
      steps: [String]
    }
  ],

  pros: [String],
  cons: [String],

  whenNotToUse: [String],

  diagramType: {
    type: String
  },

  llmConfidenceScore: { type: Number }, // optional but cool

  notes: { type: String, default: "" }
}, { timestamps: true });

const Model = mongoose.model("Model", modelSchema);
export default Model;