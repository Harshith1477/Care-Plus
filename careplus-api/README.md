# Care Plus API

Backend for the Care Plus health triage app: appointments (JSON file store) and AI chat (Google Gemini).

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment**
   - Copy `.env` or create one with:
   - `PORT=3001` (optional, default 3001)
   - `GOOGLE_API_KEY=<your Google AI Studio API key>`
   - `DATABASE_PATH=./data/careplus.json` (optional)

3. **Run**
   ```bash
   npm start
   ```
   Or with auto-reload: `npm run dev`

The `data/` folder and JSON store are created automatically on first appointment.

## Endpoints

- `GET /api/health` — Health check
- `POST /api/appointments` — Book appointment (body: patient_name, patient_email, doctor_name, category, appointment_date, time_slot). Returns `{ confirmation_id }`.
- `POST /api/chat` — AI chat (body: message, history?). Returns `{ reply }`.

## Frontend

Point the frontend to this API with `VITE_API_URL=http://localhost:3001` in the web app’s `.env`.
