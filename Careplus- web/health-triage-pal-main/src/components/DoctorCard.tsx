import { Star } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div className="animate-fade-in rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-16 w-16 rounded-full border-2 border-primary/20 bg-secondary object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-foreground">{doctor.name}</h3>
          <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{doctor.experience} yrs exp</span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-healthcare-orange text-healthcare-orange" />
              {doctor.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      <p className="mb-1 text-xs font-medium text-muted-foreground">Currently at</p>
      <p className="mb-2 text-sm font-medium text-foreground">{doctor.hospital}</p>
      <p className="mb-4 text-xs text-muted-foreground">
        <span className="font-medium">Good at:</span> {doctor.goodAt}
      </p>
      <Button
        onClick={() => onBookAppointment(doctor)}
        className="w-full"
        size="sm"
      >
        Book Appointment
      </Button>
    </div>
  );
}
