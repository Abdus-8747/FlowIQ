import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import verifyUser from "../middlewares/userMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();


router.post(
  "/register-user",
  upload.single("profileImage"), // 👈 MUST MATCH frontend
  registerUser
);


router.post("/login-user", loginUser);


router.get("/get-user-profile", verifyUser, getUserProfile);

export default router;
