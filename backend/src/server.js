import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Sarthi AI Headless Backend is running on port: ${PORT}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/v1/health`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database connection: ", err);
    process.exit(1);
  });
