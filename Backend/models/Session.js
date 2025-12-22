import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  // who created this session
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // main idea
  projectDescription: {
    type: String,
    required: true,
    trim: true
  },

  // clearer team structure (better AI reasoning)
  teamSize: {
    frontend: { type: Number, default: 0 },
    backend: { type: Number, default: 0 },
    qa: { type: Number, default: 0 },
    devops: { type: Number, default: 0 },
    tester : { type: Number, default: 0 },
    aiengineer: { type: Number, default: 0 }
  },

  // project constraints
  budget: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true
  },

  timeline: {
    type: String,
    enum: ["short-term", "medium-term", "long-term"],
    required: true
  },

  // decision-driving fields for SDLC selection
  requirementsClarity: {
    type: String,
    enum: ["clear", "partial", "unclear"],
    required: true
  },

  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true
  },

  clientInvolvement: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true
  },

  complianceRequired: {
    type: Boolean,
    default: false
  },

  // AI processing metadata
  analysisStatus: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending"
  },

  modelsGenerated: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Model" }
  ],

  aiMeta: {
    modelUsed: String,        // gpt-4, llama, gemini etc
    tokensUsed: Number,
    processingTimeMs: Number
  }

}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
export default Session;
