import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
const dbPath = process.env.DATABASE_PATH || path.join(dataDir, "careplus.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadAppointments() {
  ensureDataDir();
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(dbPath, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data.appointments) ? data.appointments : [];
  } catch {
    return [];
  }
}

function saveAppointments(appointments) {
  ensureDataDir();
  fs.writeFileSync(dbPath, JSON.stringify({ appointments }, null, 2), "utf8");
}

function generateConfirmationId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "CP";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function createAppointment(data) {
  const appointments = loadAppointments();
  const confirmationId = generateConfirmationId();
  const record = {
    id: String(Date.now()),
    confirmation_id: confirmationId,
    patient_name: data.patient_name,
    patient_email: data.patient_email,
    doctor_name: data.doctor_name,
    category: data.category,
    appointment_date: data.appointment_date,
    time_slot: data.time_slot,
    created_at: new Date().toISOString(),
  };
  appointments.push(record);
  saveAppointments(appointments);
  return confirmationId;
}

export function getAppointments() {
  return loadAppointments();
}
