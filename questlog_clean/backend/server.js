// server.js
// Entry point: Express app + MongoDB connection.
require("dotenv").config(); // loads MONGO_URI etc. from .env

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// A6: allow requests only from the frontend's address, not every origin.
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));

// A1: parse JSON request bodies
app.use(express.json());

// Simple health check, handy when debugging
app.get("/", (req, res) => res.json({ status: "QuestLog API is running" }));

app.use("/api/tasks", taskRoutes);

// Unknown routes -> JSON 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// A2: connect to MongoDB using the connection string from .env
async function start() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

start();
