import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Droplets,
    CalendarDays,
    Users,
    Shield,
    CheckCircle,
    LogIn,
    LogOut,
    Stethoscope,
    Building2,
    Clock,
    ChevronRight,
} from "lucide-react";

interface ProfileDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

// Sample user data (would come from auth context in production)
const sampleUser = {
    name: "Harshith Kumar",
    email: "harshith@careplus.com",
    role: "Patient" as const,
    verified: true,
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=harshith",
    age: 25,
    gender: "Male",
    phone: "+91 98765 43210",
    bloodGroup: "B+",
    address: "Bangalore, Karnataka, India",
};

const assignedDoctor = {
    name: "Dr. Aisha Patel",
    specialization: "General Physician",
    hospital: "Apollo Hospitals",
    experience: 8,
    avatar: "https://api.dicebear.com/9.x/personas/svg?seed=doctor1-general-wellness",
    isOnline: true,
};

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("careplus_user");
        setIsLoggedIn(!!user);
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        if (isOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, onClose]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    const handleLogout = () => {
        localStorage.removeItem("careplus_user");
        localStorage.removeItem("careplus_patient_email");
        localStorage.removeItem("careplus_patient_name");
        setIsLoggedIn(false);
        onClose();
        navigate("/");
    };

    const handleLogin = () => {
        onClose();
        navigate("/signin");
    };

    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className="absolute right-0 top-14 z-50 w-[340px] sm:w-[380px] overflow-hidden"
            style={{
                animation: "profileDropdownIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <div
                className="rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(145deg, rgba(30,30,36,0.97) 0%, rgba(22,22,28,0.98) 100%)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                }}
            >
                {/* ─── 1. Profile Header ─── */}
                <div className="relative px-6 pt-6 pb-5">
                    {/* Decorative gradient bg */}
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: "linear-gradient(135deg, #2563eb 0%, #1e40af 50%, transparent 100%)",
                        }}
                    />
                    <div className="relative flex items-center gap-4">
                        {/* Avatar with glow */}
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-full bg-blue-500/30 blur-md" />
                            <img
                                src={sampleUser.avatar}
                                alt={sampleUser.name}
                                className="relative h-16 w-16 rounded-full border-2 border-blue-400/60 bg-gray-700 object-cover"
                            />
                            {sampleUser.verified && (
                                <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 border-2 border-[#1e1e24]">
                                    <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-white truncate">
                                    {sampleUser.name}
                                </h3>
                            </div>
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/20">
                                <Shield className="h-2.5 w-2.5" />
                                {sampleUser.role}
                            </span>
                            <p className="mt-1 text-xs text-gray-400 truncate flex items-center gap-1">
                                <Mail className="h-3 w-3 shrink-0" />
                                {sampleUser.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-white/[0.06]" />

                {/* ─── 2. User Details ─── */}
                <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                        Personal Info
                    </p>
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 space-y-3">
                        {[
                            { icon: CalendarDays, label: "Age", value: `${sampleUser.age} years` },
                            { icon: Users, label: "Gender", value: sampleUser.gender },
                            { icon: Phone, label: "Phone", value: sampleUser.phone },
                            { icon: Droplets, label: "Blood Group", value: sampleUser.bloodGroup },
                            { icon: MapPin, label: "Address", value: sampleUser.address },
                        ].map(({ icon: Icon, label, value }, i) => (
                            <div key={label}>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                        <Icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
                                        <p className="text-sm font-medium text-gray-200 truncate">{value}</p>
                                    </div>
                                </div>
                                {i < 4 && <div className="mt-3 h-px bg-white/[0.04]" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-white/[0.06]" />

                {/* ─── 3. Assigned Doctor ─── */}
                <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                        Assigned Doctor
                    </p>
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    src={assignedDoctor.avatar}
                                    alt={assignedDoctor.name}
                                    className="h-12 w-12 rounded-full border border-blue-500/30 bg-gray-700 object-cover"
                                />
                                {/* Online dot */}
                                <span
                                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#1e1e24] ${assignedDoctor.isOnline ? "bg-emerald-500" : "bg-gray-500"
                                        }`}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{assignedDoctor.name}</p>
                                <p className="text-xs text-blue-400">{assignedDoctor.specialization}</p>
                            </div>
                            <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${assignedDoctor.isOnline
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                        : "bg-gray-500/15 text-gray-400 border border-gray-500/20"
                                    }`}
                            >
                                {assignedDoctor.isOnline ? "Online" : "Offline"}
                            </span>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Building2 className="h-3 w-3 text-gray-500" />
                                <span className="truncate">{assignedDoctor.hospital}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Clock className="h-3 w-3 text-gray-500" />
                                <span>{assignedDoctor.experience} yrs experience</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-white/[0.06]" />

                {/* ─── 4. Action ─── */}
                <div className="px-5 py-4">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20"
                            style={{
                                background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                            }}
                        >
                            <LogOut className="h-4 w-4" />
                            Log Out
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
                            style={{
                                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            }}
                        >
                            <LogIn className="h-4 w-4" />
                            Log In
                        </button>
                    )}
                </div>
            </div>

            {/* Animation keyframes */}
            <style>{`
        @keyframes profileDropdownIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </div>
    );
}
