import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

// ✅ Allow your frontend domain (replace with your real deployed frontend URL)
app.use(
  cors({
    origin: "*", // for testing, allow all — later restrict to your frontend domain
  })
);

// ✅ UPI link generator route
app.post("/api/create-upi-link", (req, res) => {
  const { name, amount, date } = req.body;

  if (!name || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Your UPI ID + payee info
  const vpa = "adit1709@ibl";
  const payeeName = "Adit Zinzuvadiya";
  const note = `Payment for ${name} on ${date}`;

  const upiLink = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  res.json({ upiLink });
});

// ✅ Listen on port 5000 (or dynamic port for hosting platforms)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
