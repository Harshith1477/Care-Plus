import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { bookAppointment } from "@/lib/api";
import { addAppointment } from "@/data/appointmentStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

interface BookingDialogProps {
  doctor: Doctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ doctor, open, onOpenChange }: BookingDialogProps) {
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBook = async () => {
    if (!doctor || !date || !slot || !name || !email) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);

    // Save to localStorage appointment store (for doctor dashboard)
    const localAppt = addAppointment({
      patientName: name,
      patientEmail: email,
      doctorName: doctor.name,
      doctorId: doctor.id,
      category: doctor.category,
      date: format(date, "yyyy-MM-dd"),
      timeSlot: slot,
    });

    // Also save the patient email for notification lookups
    localStorage.setItem("careplus_patient_email", email);
    localStorage.setItem("careplus_patient_name", name);

    try {
      const data = await bookAppointment({
        patient_name: name,
        patient_email: email,
        doctor_name: doctor.name,
        category: doctor.category,
        appointment_date: format(date, "yyyy-MM-dd"),
        time_slot: slot,
      });
      setConfirmationId(data.confirmation_id);
    } catch {
      // API might not be running, use local confirmation ID instead
      setConfirmationId(localAppt.id);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmationId(null);
    setDate(undefined);
    setSlot("");
    setName("");
    setEmail("");
    onOpenChange(false);
  };

  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {confirmationId ? (
          <div className="py-6 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-healthcare-green" />
            <h3 className="font-display text-xl font-bold text-foreground">Booking Confirmed!</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your appointment with {doctor.name} has been booked.</p>
            <div className="mt-4 rounded-lg bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Confirmation ID</p>
              <p className="font-display text-lg font-bold text-primary">{confirmationId}</p>
            </div>
            <Button onClick={handleClose} className="mt-6 w-full">Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">Book Appointment with {doctor.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Your Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" />
              </div>
              <div>
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Time Slot</Label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      className={cn(
                        "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                        slot === t
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleBook} disabled={loading} className="w-full">
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
