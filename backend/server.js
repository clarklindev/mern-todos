import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection error:", err);
}

// Routes
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
