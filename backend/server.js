// Core modules & dependencies
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");

// Database connection
const connectDB = require("./config/db");

// Register background cron jobs
require("./cron");

// Middleware for data sanitization
const { sanitizeMiddleware } = require("./middleware/sanitizeMiddleware");

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

// Establish MongoDB connection
connectDB();

// Whitelisted frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://financetracker-rosy.vercel.app"
];

// ⭐ FIXED CORS SETUP (EXPRESS v5 SAFE, NO CRASH)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ⭐ EXPRESS v5 SAFE — Handle preflight automatically
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

// JSON parsing
app.use(express.json());

// Attach sanitization middleware
app.use(sanitizeMiddleware());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/receipts", require("./routes/receiptRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/recurring", require("./routes/recurringTransactionRoutes"));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route
app.get("/", (req, res) => {
  res.send("API is online and running");
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Backend server is listening on port ${PORT}`)
);

// Keep-alive cron job
cron.schedule("*/10 * * * *", async () => {
  const keepAlive = process.env.KEEP_ALIVE_URL;

  if (!keepAlive) {
    console.warn("KEEP_ALIVE_URL is not configured — skipping ping.");
    return;
  }

  try {
    await axios.get(keepAlive);
    console.log("Keep-alive ping successfully sent!");
  } catch (err) {
    console.error("Keep-alive request failed:", err.message);
  }
});

// Export for testing
module.exports = { app, server };
