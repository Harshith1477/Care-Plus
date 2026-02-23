import { useState, useEffect } from "react";
import { Stethoscope } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { Footer } from "@/components/Footer";

const CYCLING_WORDS = [
  "Simplified",
  "Organized",
  "Made Easy",
  "Our Priority",
  "Taken Care Of",
  "Streamlined",
];

// Each word stays for 3.5s, fades out over 0.45s, then next word fades in
const HOLD_MS = 3500;
const FADE_MS = 450;

const Index = () => {
  // Phase for the intro animation: 0=welcome, 1=welcome fades, 2=heading+subtitle visible
  const [introPhase, setIntroPhase] = useState(0);

  // Cycling word state
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(false);

  // Intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase(1), 1800); // fade out "Welcome"
    const t2 = setTimeout(() => {
      setIntroPhase(2);   // show heading
      setWordVisible(true); // show first cycling word
    }, 2400);
    const t3 = setTimeout(() => setIntroPhase(3), 3200); // show subtitle
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Word cycling — starts after intro finishes
  useEffect(() => {
    if (introPhase < 2) return;

    const cycle = () => {
      // Fade out current word
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, FADE_MS);
    };

    const interval = setInterval(cycle, HOLD_MS + FADE_MS);
    return () => clearInterval(interval);
  }, [introPhase]);

  const EASE = "opacity 0.45s ease-out, transform 0.45s ease-out";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Care Plus</h1>
            <p className="text-xs text-muted-foreground">Your Health, Simplified</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* LEFT — text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Trust badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Trusted by 50,000+ patients across India
            </div>

            {/* Heading */}
            <div className="relative h-[3.5rem] md:h-[3.8rem] flex items-center justify-center lg:justify-start mb-4">
              <h2
                className="font-display text-4xl font-bold text-foreground md:text-5xl absolute inset-x-0 lg:inset-x-auto"
                style={{
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                  opacity: introPhase === 0 ? 1 : 0,
                  transform: introPhase <= 1 ? "translateY(0)" : "translateY(-8px)",
                  animation: introPhase === 0 ? "heroSlideUp 0.8s ease-out both" : undefined,
                  pointerEvents: "none",
                }}
              >
                Welcome to CarePlus
              </h2>
              <h2
                className="font-display text-4xl font-bold text-foreground md:text-5xl absolute inset-x-0 lg:inset-x-auto"
                style={{
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                  opacity: introPhase >= 2 ? 1 : 0,
                  transform: introPhase >= 2 ? "translateY(0)" : "translateY(10px)",
                }}
              >
                Your Health,{" "}
                <span
                  className="text-primary"
                  style={{
                    display: "inline-block",
                    transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
                    opacity: wordVisible ? 1 : 0,
                    transform: wordVisible ? "translateY(0)" : "translateY(6px)",
                  }}
                >
                  {CYCLING_WORDS[wordIndex]}
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <p
              className="mx-auto lg:mx-0 max-w-lg text-base text-muted-foreground leading-relaxed"
              style={{
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                opacity: introPhase >= 3 ? 1 : 0,
                transform: introPhase >= 3 ? "translateY(0)" : "translateY(10px)",
              }}
            >
              Browse health conditions, connect with top-rated specialists, and book appointments — all in one place.
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              style={{ transition: "opacity 0.6s ease-out", opacity: introPhase >= 3 ? 1 : 0 }}
            >
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                Browse Conditions
              </a>
              <button
                onClick={() => document.querySelector<HTMLButtonElement>(".fixed.bottom-6.right-6")?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
              >
                Book via AI Assistant
              </button>
            </div>

            {/* Stats strip */}
            <div
              className="mt-9 flex flex-wrap justify-center lg:justify-start gap-8"
              style={{ transition: "opacity 0.6s ease-out", opacity: introPhase >= 3 ? 1 : 0 }}
            >
              {[["50K+", "Patients Served"], ["200+", "Specialists"], ["9", "Health Categories"], ["4.8★", "Avg Rating"]].map(([val, label]) => (
                <div key={label} className="flex flex-col items-center lg:items-start">
                  <span className="font-display text-2xl font-bold text-primary">{val}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — healthcare image */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md relative"
            style={{ transition: "opacity 0.8s ease-out", opacity: introPhase >= 2 ? 1 : 0 }}
          >
            {/* Main photo card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80&auto=format&fit=crop"
                alt="Doctor with patient in hospital"
                className="w-full h-80 lg:h-96 object-cover"
              />
              {/* gradient overlay for elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge — top left */}
            <div className="absolute -top-4 -left-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl border border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white text-lg">🩺</div>
              <div>
                <p className="text-xs font-bold text-foreground">200+ Doctors</p>
                <p className="text-xs text-muted-foreground">Available now</p>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl border border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600 text-lg">✅</div>
              <div>
                <p className="text-xs font-bold text-foreground">Appointment Booked</p>
                <p className="text-xs text-muted-foreground">Confirmation sent</p>
              </div>
            </div>
          </div>

        </div>
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

      <Footer />
    </div>
  );
};

export default Index;
