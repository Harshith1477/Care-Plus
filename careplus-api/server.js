import "./env.js";
import express from "express";
import cors from "cors";
import { createAppointment } from "./db.js";
import { chatWithGemini } from "./chat.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080", "http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Care Plus API is running" });
});

app.post("/api/appointments", (req, res) => {
  try {
    const { patient_name, patient_email, doctor_name, category, appointment_date, time_slot } = req.body;
    if (!patient_name || !patient_email || !doctor_name || !category || !appointment_date || !time_slot) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const confirmation_id = createAppointment({
      patient_name,
      patient_email,
      doctor_name,
      category,
      appointment_date,
      time_slot,
    });
    res.status(201).json({ confirmation_id });
  } catch (err) {
    console.error("Appointment error:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    let reply = await chatWithGemini(message, Array.isArray(history) ? history : []);

    // Detect and handle [[BOOK:{...}]] tag from Lena
    const bookTagMatch = reply.match(/\[\[BOOK:({.*?})\]\]/s);
    let booking_confirmation = null;

    if (bookTagMatch) {
      try {
        const bookData = JSON.parse(bookTagMatch[1]);
        const confirmation_id = createAppointment(bookData);
        booking_confirmation = {
          confirmation_id,
          patient_name: bookData.patient_name,
          patient_email: bookData.patient_email,
          doctor_name: bookData.doctor_name,
          category: bookData.category,
          appointment_date: bookData.appointment_date,
          time_slot: bookData.time_slot,
        };
        console.log("✅ Auto-booked appointment:", confirmation_id);
      } catch (bookErr) {
        console.error("Booking parse error:", bookErr);
      }
      // Strip the raw tag from the user-facing reply
      reply = reply.replace(/\[\[BOOK:{.*?}\]\]/s, "").trim();
    }

    res.json({ reply, booking_confirmation });
  } catch (err) {
    console.error("Chat error:", err);
    const msg = err?.message || String(err) || "Chat failed";
    res.status(500).json({ error: msg });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Care Plus API running at http://localhost:${PORT}`);
  console.log(`Make sure the frontend uses VITE_API_URL=http://localhost:${PORT}`);
});
