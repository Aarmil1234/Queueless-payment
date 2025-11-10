import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://admin.queueless.co.in"], // restrict in production
    methods: ["GET", "POST"],
  })
);

app.post("/api/create-upi-link", (req, res) => {
  const { name, amount, date } = req.body;
  if (!name || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const vpa = "adit1709@ibl";
  const payeeName = "Adit Zinzuvadiya";
  const note = `Payment for ${name} on ${date}`;

  const upiLink = `upi://pay?pa=${vpa}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  res.json({ upiLink });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
