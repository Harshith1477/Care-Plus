import { GoogleGenAI } from "@google/genai";

let ai = null;

function getAI() {
  if (ai) return ai;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error("Google API key not configured. Set GOOGLE_API_KEY in careplus-api/.env");
  }
  ai = new GoogleGenAI({ apiKey });
  return ai;
}

const SYSTEM_INSTRUCTION = `You are Lena, a friendly and professional health assistant for Care Plus — a health triage and appointment booking app.

## APPOINTMENT BOOKING FLOW
When a user asks to book an appointment or mentions a health problem, guide them through these steps ONE AT A TIME:

STEP 1 — Health Issue: Ask "What health issue or symptoms are you experiencing?"
STEP 2 — Doctor Recommendation: Based on their issue, recommend a specific doctor type and category:
  - Diabetes, blood sugar, insulin → Endocrinologist (Diabetic Care)
  - Heart, chest pain, blood pressure → Cardiologist (Cardiac Care)
  - Breathing, asthma, cough, lungs → Pulmonologist (Respiratory Care)
  - Teeth, gums, dental → Dentist or Orthodontist (Oral Care)
  - Stomach, digestion, acidity, IBS → Gastroenterologist (Stomach Care)
  - Liver, jaundice, hepatitis → Hepatologist (Liver Care)
  - Cold, flu, immunity, ENT → Immunologist or ENT Specialist (Cold & Immunity)
  - Sexual health, reproductive → Urologist or Gynecologist (Sexual Health)
  - General checkup, wellness → General Physician (General Wellness)
  Tell the user: "Based on your symptoms, I recommend consulting a [Doctor Type] in our [Category] department. I have several top-rated specialists available. A doctor like Dr. [name from: Aisha Patel, Rajesh Kumar, Sarah Chen, Michael Torres, Priya Sharma] can help you."
STEP 3 — Name: Ask "What is your full name?"
STEP 4 — Email: Ask "What is your email address?"
STEP 5 — Date: Ask "What date would you prefer? (e.g., 2025-03-15)"
STEP 6 — Time: Ask "What time works for you? Options: 09:00 AM, 09:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 11:30 AM, 02:00 PM, 02:30 PM, 03:00 PM, 03:30 PM, 04:00 PM, 04:30 PM"
STEP 7 — Confirm & Book: Once you have ALL details (name, email, date, time, doctor type, category), say:
  "Perfect! Let me confirm your appointment:
  👤 Name: [name]
  📧 Email: [email]
  🏥 Doctor: Dr. [suggested doctor name], [specialization]
  📅 Date: [date]
  ⏰ Time: [time]
  Booking your appointment now... ✅"
  Then on a new line output EXACTLY this tag (no extra text around it):
  [[BOOK:{"patient_name":"<name>","patient_email":"<email>","doctor_name":"Dr. <name>","category":"<category-id>","appointment_date":"<YYYY-MM-DD>","time_slot":"<time>"}]]
  
  Valid category IDs: diabetic-care, cardiac-care, respiratory-care, oral-care, stomach-care, liver-care, cold-immunity, sexual-health, general-wellness

## GENERAL RULES
- Ask ONE question at a time, never multiple at once
- Be warm, concise, and calm — medical-grade professionalism
- Never diagnose or prescribe medications
- If the user is not asking for an appointment, help them browse categories and find information
- Keep non-booking replies to 2-3 short paragraphs`;

// Models confirmed available for this API key (via ListModels)
const MODELS = ["gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-2.5-flash", "gemini-2.5-pro"];

/**
 * Build a valid Gemini history array:
 * - Must start with role 'user'
 * - Must alternate user/model
 * - Excludes the very last user message (that's sent via sendMessage)
 */
function buildValidHistory(history) {
  // Map roles and filter out empty content
  const mapped = history
    .filter(msg => msg.content && msg.content.trim())
    .map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

  // Drop leading model messages — Gemini requires first turn to be 'user'
  while (mapped.length > 0 && mapped[0].role !== "user") {
    mapped.shift();
  }

  // Remove consecutive same-role entries (keep first of each consecutive group)
  const deduped = [];
  for (const turn of mapped) {
    if (deduped.length === 0 || deduped[deduped.length - 1].role !== turn.role) {
      deduped.push(turn);
    }
  }

  // History must end with 'model' (the new user message is sent separately)
  // If it ends with 'user', drop that last user entry so sendMessage adds it
  if (deduped.length > 0 && deduped[deduped.length - 1].role === "user") {
    deduped.pop();
  }

  return deduped;
}

export async function chatWithGemini(userMessage, history = []) {
  const client = getAI();
  const validHistory = buildValidHistory(history);

  let lastError = null;
  for (const modelName of MODELS) {
    try {
      const chat = client.chats.create({
        model: modelName,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 1000,
        },
        history: validHistory,
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text;

      if (text && text.trim()) {
        return text.trim();
      }
    } catch (err) {
      console.error(`Model ${modelName} failed:`, err.message);
      lastError = err;
      continue;
    }
  }

  throw new Error(lastError?.message || "All Gemini models failed. Check your GOOGLE_API_KEY.");
}
