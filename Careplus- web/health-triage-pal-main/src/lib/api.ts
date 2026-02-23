const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function bookAppointment(payload: {
  patient_name: string;
  patient_email: string;
  doctor_name: string;
  category: string;
  appointment_date: string;
  time_slot: string;
}): Promise<{ confirmation_id: string }> {
  const res = await fetch(`${API_BASE}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "Booking failed");
  }
  return res.json();
}

export interface BookingConfirmation {
  confirmation_id: string;
  patient_name: string;
  patient_email: string;
  doctor_name: string;
  category: string;
  appointment_date: string;
  time_slot: string;
}

export async function sendChatMessage(
  message: string,
  history: { role: string; content: string }[] = []
): Promise<{ reply: string; booking_confirmation?: BookingConfirmation }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
  } catch (e) {
    throw new Error(
      `Cannot reach Care Plus API at ${API_BASE}. Start it with: cd careplus-api && npm start`
    );
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error || "Chat failed");
  }
  return body as { reply: string; booking_confirmation?: BookingConfirmation };
}
