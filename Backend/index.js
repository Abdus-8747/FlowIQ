import "./config/env.js";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import morgan from "morgan";

// Routes
import userRoutes from "./routes/userRoute.js";
import sessionRoutes from "./routes/sessionRoute.js";
import modelRoutes from "./routes/modelRoute.js";
import llmRoutes from "./routes/llmRoute.js";

// DB
import connectDB from "./config/db.js";

const app = express();

/* =======================
   ENV VALIDATION
======================= */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

/* =======================
   SECURITY MIDDLEWARE
======================= */
app.use(helmet());

// app.use(morgan("dev")); // enable if needed

/* =======================
   RATE LIMITING
======================= */
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 mins
  max: process.env.RATE_LIMIT_MAX || 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api", limiter);

/* =======================
   CORS CONFIG
======================= */
const corsOptions = {
  origin: process.env.CLIENT_URL?.split(",") || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

/* =======================
   BODY PARSER
======================= */
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

/* =======================
   SERVER START
======================= */
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    // Routes
    app.use("/api/users", userRoutes);
    app.use("/api/sessions", sessionRoutes);
    app.use("/api/models", modelRoutes);
    app.use("/api/llm", llmRoutes);

    // Global error handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
