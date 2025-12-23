import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  projectDescription: {
    type: String,
    required: true,
    trim: true
  },

  teamSize: {
    frontend: { type: Number, default: 0 },
    backend: { type: Number, default: 0 },
    qa: { type: Number, default: 0 },
    devops: { type: Number, default: 0 },
    tester : { type: Number, default: 0 },
    aiengineer: { type: Number, default: 0 }
  },

  budget: {
    type: Number,
    required: true
  },

  timeline: {
    type: String,
    enum: ["short-term", "medium-term", "long-term"],
    required: true
  },


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

  groqModel: {
    type: String,
    enum: ["llama-3.1-8b-instant", "llama-3.1-70b-versatile", "llama-3.1-405b-instruct"],
    required: true
  },

  analysisStatus: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending"
  },

  modelsGenerated: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Model" }
  ],

  aiMeta: {
    modelUsed: String,
    tokensUsed: Number,
    processingTimeMs: Number
  }

}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
export default Session;
