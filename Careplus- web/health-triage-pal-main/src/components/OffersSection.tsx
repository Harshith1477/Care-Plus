import { useState } from "react";
import { X } from "lucide-react";

interface Offer {
    id: string;
    category: string;
    headline: string;
    subtitle: string;
    tag: string;
    tagColor: string;
    gradient: string;
    image: string;
    detail: string;
}

const OFFERS: Offer[] = [
    {
        id: "medicines",
        category: "Medicines",
        headline: "Up to 25% OFF",
        subtitle: "On all branded & generic medicines",
        tag: "HOT",
        tagColor: "bg-yellow-400 text-yellow-900",
        gradient: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&auto=format&fit=crop",
        detail: "Get up to 25% off on all branded and generic medicines. Valid on all prescriptions. Offer applicable on orders above ₹199. Use code CARE25 at checkout.",
    },
    {
        id: "delivery",
        category: "Ramazan Special",
        headline: "FREE Delivery",
        subtitle: "On all orders above ₹299 this month",
        tag: "NEW",
        tagColor: "bg-white text-orange-600",
        gradient: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80&auto=format&fit=crop",
        detail: "Celebrate Ramazan with free delivery on all orders above ₹299. Available all month. No coupon needed — discount applied automatically at checkout.",
    },
    {
        id: "lab",
        category: "Lab Tests",
        headline: "Up to 50% OFF",
        subtitle: "Blood tests, full body checkup & more",
        tag: "SAVE",
        tagColor: "bg-green-300 text-green-900",
        gradient: "linear-gradient(135deg, #059669 0%, #065f46 100%)",
        image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=600&q=80&auto=format&fit=crop",
        detail: "Book lab tests at home — blood work, full body checkup, diabetic panel, thyroid, vitamin D, and 200+ more tests. Reports in 24 hours. Home sample collection included.",
    },
    {
        id: "consult",
        category: "First Consult",
        headline: "FREE ₹0",
        subtitle: "First online doctor consultation free",
        tag: "FREE",
        tagColor: "bg-purple-300 text-purple-900",
        gradient: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop",
        detail: "Your first online consultation with any specialist is absolutely free. Available for general physician, dermatologist, cardiologist, and more. Book in 2 minutes.",
    },
    {
        id: "insurance",
        category: "Health Insurance",
        headline: "₹99/month",
        subtitle: "Cashless cover for you & your family",
        tag: "DEAL",
        tagColor: "bg-cyan-300 text-cyan-900",
        gradient: "linear-gradient(135deg, #0891b2 0%, #164e63 100%)",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop",
        detail: "Get comprehensive health coverage for your entire family at just ₹99/month. Includes cashless hospitalization, OPD cover, and ambulance charges. No waiting period.",
    },
];

export function OffersSection() {
    const [selected, setSelected] = useState<Offer | null>(null);

    return (
        <>
            <section className="container mx-auto px-4 pb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-base font-semibold text-foreground">🎁 Offers &amp; Deals</h3>
                    <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View all →</span>
                </div>

                {/* Horizontal scroll strip */}
                <div
                    className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {OFFERS.map((offer) => (
                        <div
                            key={offer.id}
                            onClick={() => setSelected(offer)}
                            className="flex-shrink-0 w-60 rounded-2xl overflow-hidden shadow-md border border-border cursor-pointer
                         transition-all duration-300 ease-out
                         hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:z-10 active:scale-95"
                            style={{ scrollSnapAlign: "start" }}
                        >
                            {/* Image + gradient top */}
                            <div className="h-28 relative" style={{ background: offer.gradient }}>
                                <img
                                    src={offer.image}
                                    alt={offer.category}
                                    className="w-full h-full object-cover opacity-35 transition-opacity duration-300 hover:opacity-50"
                                />
                                <div className="absolute inset-0 flex flex-col justify-end p-3">
                                    <span className="text-white text-xs font-bold uppercase tracking-wide opacity-80">{offer.category}</span>
                                    <span className="text-white text-lg font-black leading-tight">{offer.headline}</span>
                                </div>
                                <div className={`absolute top-2 right-2 rounded-full text-[10px] font-black px-2 py-0.5 ${offer.tagColor}`}>
                                    {offer.tag}
                                </div>
                            </div>
                            {/* Bottom */}
                            <div className="bg-white px-3 py-2">
                                <p className="text-xs text-muted-foreground">{offer.subtitle}</p>
                                <p className="text-xs text-primary font-semibold mt-0.5">Tap to view →</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MODAL OVERLAY ── */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl bg-white
                        animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Large image + gradient */}
                        <div className="h-52 relative" style={{ background: selected.gradient }}>
                            <img
                                src={selected.image}
                                alt={selected.category}
                                className="w-full h-full object-cover opacity-40"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-5">
                                <span className="text-white text-sm font-bold uppercase tracking-widest opacity-80">{selected.category}</span>
                                <span className="text-white text-4xl font-black leading-none mt-1">{selected.headline}</span>
                            </div>
                            <div className={`absolute top-3 left-3 rounded-full text-xs font-black px-3 py-1 ${selected.tagColor}`}>
                                {selected.tag}
                            </div>
                            {/* Close */}
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">{selected.detail}</p>
                            <button
                                className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                                style={{ background: selected.gradient }}
                                onClick={() => setSelected(null)}
                            >
                                Claim This Offer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
