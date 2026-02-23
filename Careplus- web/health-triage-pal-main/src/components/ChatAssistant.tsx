import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendChatMessage, BookingConfirmation } from "@/lib/api";

interface TextMessage {
  type: "text";
  role: "user" | "assistant";
  content: string;
}

interface BookingMessage {
  type: "booking";
  role: "assistant";
  content: string;
  booking: BookingConfirmation;
}

type Message = TextMessage | BookingMessage;

function getFallbackReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hello! 😊 I'm Lena, your health assistant. I can help you book an appointment or browse health categories. What can I help you with today?";
  if (lower.includes("appointment") || lower.includes("book"))
    return "I'd love to help you book an appointment! Please tell me what health issue or symptoms you're experiencing.";
  return "I can help you browse health categories, find doctors, and book appointments. For full AI chat, make sure the Care Plus API is running.";
}

const MAROON = "#800000";

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "text",
      role: "assistant",
      content:
        "Hi! I'm Lena, your health assistant 💚 I can help you explore health categories, find doctors, or **book an appointment** for you. Just tell me what you need!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: TextMessage = { type: "text", role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      // Build text-only history for the API
      const history = messages
        .filter((m): m is TextMessage => m.type === "text")
        .map((m) => ({ role: m.role, content: m.content }));

      const result = await sendChatMessage(text, history);

      // Add the AI reply text
      setMessages((prev) => [...prev, { type: "text", role: "assistant", content: result.reply }]);

      // If a booking was auto-created, add a booking confirmation card
      if (result.booking_confirmation) {
        const conf = result.booking_confirmation;
        const bookingMsg: BookingMessage = {
          type: "booking",
          role: "assistant",
          content: result.reply,
          booking: conf,
        };
        setMessages((prev) => [...prev, bookingMsg]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      const fallback = getFallbackReply(text);
      const reply = message.includes("Cannot reach")
        ? `${fallback}\n\n_(Connection: ${message})_`
        : `Sorry, something went wrong: ${message}`;
      setMessages((prev) => [...prev, { type: "text", role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: MAROON }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 text-white"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{ backgroundColor: "#EAF7F4" }}
          className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-80 flex-col overflow-hidden rounded-2xl border border-border shadow-2xl animate-slide-up"
        >
          {/* Header */}
          <div style={{ backgroundColor: MAROON }} className="px-4 py-3 text-white">
            <p className="font-display text-sm font-bold">Lena — Health Assistant</p>
            <p className="text-xs opacity-80">Ask me to book your appointment</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => {
              if (m.type === "booking") {
                const b = m.booking;
                return (
                  <div key={i} className="rounded-xl overflow-hidden border border-green-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: "#d4edda" }}>
                      <CheckCircle className="h-4 w-4 text-green-700 shrink-0" />
                      <span className="text-xs font-bold text-green-800">Appointment Confirmed!</span>
                    </div>
                    <div className="px-3 py-2 space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Confirmation</span>
                        <span className="font-bold" style={{ color: MAROON }}>{b.confirmation_id}</span>
                      </div>
                      <div className="flex justify-between"><span className="text-gray-500">Patient</span><span className="font-medium">{b.patient_name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Doctor</span><span className="font-medium">{b.doctor_name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{b.appointment_date}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{b.time_slot}</span></div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line",
                    m.role === "assistant"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "ml-auto text-white"
                  )}
                  style={m.role === "user" ? { backgroundColor: MAROON } : {}}
                >
                  {m.content}
                </div>
              );
            })}
            {loading && (
              <div className="max-w-[85%] rounded-xl px-3 py-2 text-sm bg-white text-gray-800 shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" style={{ color: MAROON }} />
                <span>Lena is typing...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 flex gap-2" style={{ backgroundColor: "#EAF7F4" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your symptoms or question..."
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              onClick={send}
              style={{ backgroundColor: MAROON }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
