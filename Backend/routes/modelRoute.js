import express from "express";
import {
  getModelsBySession,
  getModelById
} from "../controllers/modelController.js";
import verifyUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get("/session/:sessionId", verifyUser, getModelsBySession);
router.get("/:id", verifyUser, getModelById);

export default router;
