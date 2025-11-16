import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Example schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// API route
app.post("/contact", async (req, res) => {
  try {
    const msg = new Contact(req.body);
    await msg.save();
    res.json({ success: true, message: "Message saved" });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));
