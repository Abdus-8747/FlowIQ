import express from "express";
import {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession
} from "../controllers/sessionController.js";
import verifyUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createSession);
router.get("/", verifyUser, getMySessions);
router.get("/:id", verifyUser, getSessionById);
router.delete("/:id", verifyUser, deleteSession);

export default router;
