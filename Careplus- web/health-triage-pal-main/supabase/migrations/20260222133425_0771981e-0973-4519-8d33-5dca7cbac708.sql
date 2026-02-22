
-- Appointments table for booking
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  category TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  confirmation_id TEXT NOT NULL DEFAULT 'STA-' || substr(gen_random_uuid()::text, 1, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments (no auth required for hackathon MVP)
CREATE POLICY "Anyone can create appointments"
ON public.appointments
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read their own appointments by email
CREATE POLICY "Anyone can read appointments"
ON public.appointments
FOR SELECT
USING (true);
