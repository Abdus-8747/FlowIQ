import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },

  name: { type: String, required: true },

  whySelected: { type: String, required: true },

  bestFor: [{ type: String }],

  estimatedTime: { type: String, required: true },

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

  llmConfidenceScore: { type: Number },

  notes: { type: String, default: "" }
}, { timestamps: true });

const Model = mongoose.model("Model", modelSchema);
export default Model;