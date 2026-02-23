import { Stethoscope, Mail, Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-card mt-8">
            <div className="container mx-auto px-4 py-10">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Stethoscope className="h-4 w-4" />
                            </div>
                            <span className="font-display text-lg font-bold text-foreground">Care Plus</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your trusted health companion — browse conditions, connect with top specialists, and book appointments in minutes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Browse Conditions</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Find a Doctor</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Book Appointment</a></li>
                        </ul>
                    </div>

                    {/* Health Categories */}
                    <div className="space-y-3">
                        <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">Specialties</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Diabetic Care</li>
                            <li>Cardiac Care</li>
                            <li>Respiratory Care</li>
                            <li>General Wellness</li>
                            <li>Oral Care</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                        <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary shrink-0" />
                                <a href="mailto:support@careplus.health" className="hover:text-primary transition-colors">
                                    support@careplus.health
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary shrink-0" />
                                <span>+1 (800) CARE-PLUS</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span>123 Health Avenue,<br />Wellness City, HC 10001</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                    <p>© {year} Care Plus. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for better healthcare
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
