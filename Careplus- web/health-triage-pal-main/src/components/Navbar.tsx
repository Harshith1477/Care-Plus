import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Stethoscope,
    Bell,
    BriefcaseMedical,
    LogIn,
} from "lucide-react";
import { PatientNotifications } from "./PatientNotifications";
import { ProfileDropdown } from "./ProfileDropdown";

export function Navbar() {
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-40 border-b text-white"
            style={{
                background: "linear-gradient(135deg, #166534 0%, #15803d 30%, #1e6cb6 80%, #1d4ed8 100%)",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)",
            }}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Left — Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white group-hover:bg-white/25 transition-colors shadow-sm">
                        <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="font-display text-lg font-bold text-white leading-tight">Care Plus</h1>
                        <p className="text-[10px] text-white/60 font-medium tracking-wide">Your Health, Simplified</p>
                    </div>
                </Link>

                {/* Right — Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Doctor Portal */}
                    <Link
                        to="/doctor-dashboard"
                        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all"
                    >
                        <BriefcaseMedical className="h-3.5 w-3.5" />
                        Doctor Portal
                    </Link>

                    {/* Notification Bell (from patient notifications component) */}
                    <PatientNotifications />

                    {/* Profile Avatar */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border-2 border-white/20 hover:border-white/40 transition-all overflow-hidden group"
                            aria-label="Open profile"
                        >
                            <img
                                src="https://api.dicebear.com/9.x/avataaars/svg?seed=harshith"
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover group-hover:scale-105 transition-transform"
                            />
                            {/* Online indicator */}
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-green-700" />
                        </button>

                        <ProfileDropdown
                            isOpen={profileOpen}
                            onClose={() => setProfileOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
