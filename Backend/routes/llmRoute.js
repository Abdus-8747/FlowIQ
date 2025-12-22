import express from "express";
import { analyzeSessionWithLLM, isModelsGenerated } from "../controllers/llmController.js";
import verifyUser from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/analyze/:sessionId", verifyUser, analyzeSessionWithLLM);
router.get("/is-generated/:sessionId", verifyUser, isModelsGenerated);
export default router;
