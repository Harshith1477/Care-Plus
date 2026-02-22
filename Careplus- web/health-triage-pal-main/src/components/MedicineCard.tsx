import { Pill, Droplets, CircleDot } from "lucide-react";
import type { Medicine } from "@/data/medicines";

const typeIcons: Record<string, typeof Pill> = {
  tablet: Pill,
  capsule: CircleDot,
  syrup: Droplets,
  cream: CircleDot,
  injection: CircleDot,
  drops: Droplets,
};

const typeBadge: Record<string, string> = {
  tablet: "bg-healthcare-blue/10 text-healthcare-blue",
  capsule: "bg-healthcare-purple/10 text-healthcare-purple",
  syrup: "bg-healthcare-orange/10 text-healthcare-orange",
  cream: "bg-healthcare-green/10 text-healthcare-green",
  injection: "bg-healthcare-red/10 text-healthcare-red",
  drops: "bg-healthcare-teal/10 text-healthcare-teal",
};

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  const Icon = typeIcons[medicine.type] || Pill;
  return (
    <div className="animate-fade-in rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h4 className="font-display text-sm font-semibold text-foreground">{medicine.name}</h4>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge[medicine.type]}`}>
          {medicine.type}
        </span>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{medicine.usage}</p>
      <p className="text-[10px] font-medium text-healthcare-red/80">⚠ Use only as advised by a doctor</p>
    </div>
  );
}
