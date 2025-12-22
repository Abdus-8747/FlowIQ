import Model from "../models/Model.js";
import Session from "../models/Session.js";

/**
 * @desc    Get all models for a session
 * @route   GET /api/models/session/:sessionId
 * @access  Private
 */
export const getModelsBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const models = await Model.find({ session: sessionId });

    return res.json(models);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch models" });
  }
};

/**
 * @desc    Get single model details
 * @route   GET /api/models/:id
 * @access  Private
 */
export const getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id).populate("session");

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    if (model.session.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(model);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch model" });
  }
};
