import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { categories } from "@/data/categories";
import { getDoctorsByCategory, type Doctor } from "@/data/doctors";
import { getMedicinesByCategory } from "@/data/medicines";
import { products } from "@/data/products";
import { DoctorCard } from "@/components/DoctorCard";
import { MedicineCard } from "@/components/MedicineCard";
import { ProductCard } from "@/components/ProductCard";
import { BookingDialog } from "@/components/BookingDialog";

export default function HealthConditionPage() {
  const { id } = useParams<{ id: string }>();
  const category = categories.find((c) => c.id === id);
  const doctors = getDoctorsByCategory(id || "");
  const medicines = getMedicinesByCategory(id || "");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">Category not found</h2>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Care Plus</h1>
            <p className="text-xs text-muted-foreground">Symptom Triage Assistant</p>
          </div>
        </div>
      </header>

      {/* Back + Title */}
      <section className="container mx-auto px-4 pt-8 pb-4">
        <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to categories
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">{category.name}</h2>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Top Doctors</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onBookAppointment={(d) => {
                setSelectedDoctor(d);
                setBookingOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Medicines */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="mb-2 font-display text-lg font-semibold text-foreground">Common Medicines</h3>
        <p className="mb-4 text-xs text-muted-foreground">⚠ Information only — always consult a doctor before use</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {medicines.map((med) => (
            <MedicineCard key={med.id} medicine={med} />
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Recommended Products</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <BookingDialog
        doctor={selectedDoctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  );
}
