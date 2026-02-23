import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    X,
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
    Heart,
    Pill,
    AlertTriangle,
    FileText,
    Clock,
    Activity,
    Edit3,
    ShieldAlert,
    CreditCard,
} from "lucide-react";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const patientInfo = {
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
    emergencyContact: "+91 91234 56789",
    insuranceId: "CARE-INS-2024-8842",
};

const healthSummary = {
    recentAppointments: [
        { doctor: "Dr. Aisha Patel", date: "2026-02-20", status: "Completed", type: "General Check-up" },
        { doctor: "Dr. Rajesh Kumar", date: "2026-02-15", status: "Completed", type: "Blood Work" },
        { doctor: "Dr. Sarah Chen", date: "2026-02-10", status: "Cancelled", type: "Follow-up" },
    ],
    activePrescriptions: [
        { name: "Metformin 500mg", dosage: "Twice daily", till: "2026-03-15" },
        { name: "Vitamin D3", dosage: "Once daily", till: "2026-04-01" },
    ],
    conditions: ["Pre-diabetes", "Vitamin D Deficiency"],
    allergies: ["Penicillin", "Sulfa drugs"],
    upcomingFollowups: [
        { doctor: "Dr. Aisha Patel", date: "2026-03-05", type: "Diabetes Review" },
    ],
};

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<"personal" | "health">("personal");

    useEffect(() => {
        const user = localStorage.getItem("careplus_user");
        setIsLoggedIn(!!user);
    }, [isOpen]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Escape key
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
    };

    const handleLogin = () => {
        onClose();
        navigate("/signin");
    };

    const handleDoctorLogin = () => {
        onClose();
        navigate("/doctor-dashboard");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    animation: "modalFadeIn 0.3s ease",
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl"
                style={{
                    background: "linear-gradient(145deg, rgba(15,23,42,0.97) 0%, rgba(10,15,30,0.98) 100%)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.08)",
                    animation: "modalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Close + Edit buttons */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                    >
                        <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {/* ─── Profile Header ─── */}
                    <div className="relative px-8 pt-8 pb-6">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background: "linear-gradient(135deg, #2563eb 0%, #1e40af 40%, transparent 80%)",
                            }}
                        />
                        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-xl" />
                                <img
                                    src={patientInfo.avatar}
                                    alt={patientInfo.name}
                                    className="relative h-24 w-24 rounded-full border-3 border-blue-400/50 bg-gray-700 object-cover"
                                    style={{ borderWidth: "3px" }}
                                />
                                {patientInfo.verified && (
                                    <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 border-3 border-[#0f172a]" style={{ borderWidth: "3px" }}>
                                        <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                            {/* Info */}
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-white">{patientInfo.name}</h2>
                                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/20">
                                        <Shield className="h-3 w-3" />
                                        {patientInfo.role}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                                        <CheckCircle className="h-3 w-3" />
                                        Verified
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-gray-400 flex items-center justify-center sm:justify-start gap-1.5">
                                    <Mail className="h-3.5 w-3.5" />
                                    {patientInfo.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ─── Tab Switcher ─── */}
                    <div className="px-8 flex gap-1 border-b border-white/[0.06]">
                        {([
                            { id: "personal" as const, label: "Personal Info", icon: User },
                            { id: "health" as const, label: "Health Summary", icon: Activity },
                        ]).map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === id
                                        ? "border-blue-500 text-blue-400"
                                        : "border-transparent text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* ─── Tab Content ─── */}
                    <div className="px-8 py-6">
                        {activeTab === "personal" ? (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: CalendarDays, label: "Age", value: `${patientInfo.age} years` },
                                    { icon: Users, label: "Gender", value: patientInfo.gender },
                                    { icon: Phone, label: "Phone", value: patientInfo.phone },
                                    { icon: Droplets, label: "Blood Group", value: patientInfo.bloodGroup },
                                    { icon: MapPin, label: "Address", value: patientInfo.address },
                                    { icon: ShieldAlert, label: "Emergency Contact", value: patientInfo.emergencyContact },
                                    { icon: CreditCard, label: "Insurance ID", value: patientInfo.insuranceId },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.05] transition-colors"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</p>
                                            <p className="text-sm font-medium text-gray-200 mt-0.5">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Recent Appointments */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                                        <CalendarDays className="h-3.5 w-3.5" /> Recent Appointments
                                    </h4>
                                    <div className="space-y-2">
                                        {healthSummary.recentAppointments.map((appt, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 hover:bg-white/[0.05] transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Stethoscope className="h-4 w-4 text-blue-400 shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-200">{appt.doctor}</p>
                                                        <p className="text-xs text-gray-500">{appt.type} · {appt.date}</p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${appt.status === "Completed"
                                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                                            : "bg-red-500/10 text-red-400 border border-red-500/15"
                                                        }`}
                                                >
                                                    {appt.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Active Prescriptions */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                                        <Pill className="h-3.5 w-3.5" /> Active Prescriptions
                                    </h4>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {healthSummary.activePrescriptions.map((rx, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 hover:bg-white/[0.05] transition-colors"
                                            >
                                                <p className="text-sm font-semibold text-gray-200">{rx.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">{rx.dosage} · Until {rx.till}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Conditions + Allergies */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                                            <Heart className="h-3.5 w-3.5" /> Medical Conditions
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {healthSummary.conditions.map((c) => (
                                                <span key={c} className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/15">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                                            <AlertTriangle className="h-3.5 w-3.5" /> Allergies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {healthSummary.allergies.map((a) => (
                                                <span key={a} className="px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/15">
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Upcoming Follow-ups */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                                        <Clock className="h-3.5 w-3.5" /> Upcoming Follow-ups
                                    </h4>
                                    {healthSummary.upcomingFollowups.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 rounded-xl bg-blue-500/5 border border-blue-500/10 p-3.5"
                                        >
                                            <CalendarDays className="h-4 w-4 text-blue-400 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-200">{f.doctor}</p>
                                                <p className="text-xs text-gray-500">{f.type} · {f.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ─── Doctor Login Section ─── */}
                    <div className="px-8 py-5 border-t border-white/[0.06]">
                        <div className="rounded-2xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/15 p-5">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                                    <Stethoscope className="h-7 w-7" />
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h4 className="text-sm font-bold text-white">Switch to Doctor Mode</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Manage patients, consultations, and appointments in the Doctor Dashboard.
                                    </p>
                                </div>
                                <button
                                    onClick={handleDoctorLogin}
                                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 shrink-0"
                                    style={{
                                        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                                    }}
                                >
                                    <Stethoscope className="h-4 w-4" />
                                    Doctor Portal
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ─── Login / Logout ─── */}
                    <div className="px-8 pb-6">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20"
                                style={{ background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)" }}
                            >
                                <LogOut className="h-4 w-4" />
                                Log Out
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25"
                                style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
                            >
                                <LogIn className="h-4 w-4" />
                                Log In
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
        </div>
    );
}
