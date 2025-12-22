import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

// Optional safety logs
if (!process.env.CLOUDINARY_API_KEY) {
  console.warn("⚠️ CLOUDINARY_API_KEY missing");
}
