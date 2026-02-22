import { Stethoscope } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">STA</h1>
            <p className="text-xs text-muted-foreground">Symptom Triage Assistant</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Your Health, Simplified
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Browse health conditions, connect with specialists, and book appointments — all in one place.
        </p>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
          Browse by Health Conditions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
