import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (from backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Sarthi AI Headless Backend running on port: ${PORT}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database connection: ", err);
    process.exit(1);
  });
