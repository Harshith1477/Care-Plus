import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const greetings = [
  "Hi! I'm Lena, your health assistant 💚 I can help you explore health categories, learn about conditions, or guide you through booking an appointment. How can I help you today?",
];

function getLenaResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hello! 😊 How can I assist you today? I can help you browse health conditions, understand medicines, or book an appointment.";

  if (lower.includes("diabetic") || lower.includes("diabetes") || lower.includes("blood sugar"))
    return "Diabetes management involves monitoring blood sugar levels, taking prescribed medications, and maintaining a healthy lifestyle. I'd recommend checking our **Diabetic Care** section for expert doctors and relevant medicines. Would you like me to guide you there?";

  if (lower.includes("heart") || lower.includes("cardiac") || lower.includes("chest pain"))
    return "Heart health is crucial! Our **Cardiac Care** section has experienced cardiologists. If you're experiencing chest pain, please seek immediate medical attention. Can I help you find a cardiac specialist?";

  if (lower.includes("cold") || lower.includes("fever") || lower.includes("cough") || lower.includes("immunity"))
    return "For cold and immunity concerns, check our **Cold & Immunity** section. Rest, hydration, and proper nutrition are key. We also have a list of common medicines and immunity boosters. Would you like to explore them?";

  if (lower.includes("appointment") || lower.includes("book") || lower.includes("schedule"))
    return "To book an appointment:\n1. Browse a health category\n2. Find a doctor you'd like to visit\n3. Click **Book Appointment**\n4. Select a date and time slot\n\nYou'll get a confirmation ID right away! Which category are you interested in?";

  if (lower.includes("medicine") || lower.includes("drug") || lower.includes("tablet"))
    return "Each health category has a list of commonly used medicines with their descriptions. Please remember: **always consult a doctor before taking any medication.** I can't prescribe medicines, but I can help you understand what's commonly used. Which condition are you looking at?";

  if (lower.includes("sexual") || lower.includes("std") || lower.includes("reproductive"))
    return "Our **Sexual Health Care** section covers reproductive health with expert doctors and relevant information. All consultations are confidential. Would you like to explore this category?";

  if (lower.includes("stomach") || lower.includes("digestion") || lower.includes("acidity"))
    return "Digestive issues are common and manageable! Our **Stomach Care** section has gastroenterologists and relevant medicines. Stay hydrated and avoid spicy foods if you're having issues. Want me to guide you there?";

  if (lower.includes("liver"))
    return "Liver health is important for overall well-being. Our **Liver Care** section has hepatologists and common liver health supplements. Would you like to explore it?";

  if (lower.includes("oral") || lower.includes("teeth") || lower.includes("dental"))
    return "For dental concerns, check our **Oral Care** section with dentists and oral hygiene products. Regular checkups are key! Want me to guide you there?";

  if (lower.includes("respiratory") || lower.includes("breathing") || lower.includes("asthma") || lower.includes("lung"))
    return "Breathing difficulties should be taken seriously. Our **Respiratory Care** section has pulmonologists who can help. If you're having acute breathing problems, please seek emergency care. Can I help you find a specialist?";

  if (lower.includes("diagnos") || lower.includes("what disease") || lower.includes("what's wrong"))
    return "I appreciate your trust, but I'm unable to diagnose medical conditions. I'm here to help you navigate health categories and connect with qualified doctors who can properly assess your situation. Would you like me to help you find the right specialist?";

  if (lower.includes("prescri") || lower.includes("should i take"))
    return "I'm not able to prescribe medications. Only a licensed doctor can do that after proper examination. I can share general information about commonly used medicines, but please consult a healthcare professional for personalized advice. Can I help you find a doctor?";

  return "I can help you with:\n• **Browse** health conditions and categories\n• **Find doctors** in specific specialties\n• **Learn about** common medicines\n• **Book appointments** with specialists\n\nWhat would you like to explore?";
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greetings[0] },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const reply: Message = { role: "assistant", content: getLenaResponse(input) };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105",
          "bg-primary text-primary-foreground"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="bg-primary px-4 py-3 text-primary-foreground">
            <p className="font-display text-sm font-bold">Lena — Health Assistant</p>
            <p className="text-xs opacity-80">Here to help, not to diagnose</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line",
                  m.role === "assistant"
                    ? "bg-secondary text-secondary-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                )}
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask Lena..."
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={send}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
