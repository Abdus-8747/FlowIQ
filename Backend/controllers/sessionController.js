import Session from "../models/Session.js";
import Model from "../models/Model.js";

/**
 * @desc    Create a new session (project idea)
 * @route   POST /api/sessions
 * @access  Private
 */
export const createSession = async (req, res) => {
  try {
    const {
      projectDescription,
      teamSize,
      budget,
      timeline,
      requirementsClarity,
      riskLevel,
      clientInvolvement,
      complianceRequired
    } = req.body;

    const session = await Session.create({
      user: req.user.id,
      projectDescription,
      teamSize,
      budget,
      timeline,
      requirementsClarity,
      riskLevel,
      clientInvolvement,
      complianceRequired,
      analysisStatus: "pending"
    });

    return res.status(201).json({
      message: "Session created successfully",
      session
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create session",
      error: error.message
    });
  }
};

/**
 * @desc    Get all sessions of logged-in user
 * @route   GET /api/sessions
 * @access  Private
 */
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    return res.json(sessions);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch sessions",
      error: error.message
    });
  }
};

/**
 * @desc    Get a single session with generated models
 * @route   GET /api/sessions/:id
 * @access  Private
 */
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("modelsGenerated");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Ownership check
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(session);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch session",
      error: error.message
    });
  }
};

/**
 * @desc    Delete a session and its models
 * @route   DELETE /api/sessions/:id
 * @access  Private
 */
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // delete generated models first
    await Model.deleteMany({ session: session._id });

    await session.deleteOne();

    return res.json({ message: "Session deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete session",
      error: error.message
    });
  }
};
