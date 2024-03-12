import express from "express";
import connectDB from "./DB/index.js";
import cors from "cors";
import studentRouter from "./routes/students.routes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/api/students", studentRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
