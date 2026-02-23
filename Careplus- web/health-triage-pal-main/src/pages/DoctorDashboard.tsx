import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    Stethoscope,
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Mail,
    CheckCircle,
    XCircle,
    AlertCircle,
    Activity,
    Users,
    CalendarCheck,
    CalendarX,
} from "lucide-react";
import { categories } from "@/data/categories";
import { getDoctorsByCategory } from "@/data/doctors";
import {
    getAppointmentsByDoctor,
    updateAppointmentStatus,
    type Appointment,
} from "@/data/appointmentStore";

// Gather all doctors for the selector
const allDoctors = categories.flatMap((cat) =>
    getDoctorsByCategory(cat.id).map((d) => ({
        ...d,
        categoryName: cat.name,
    }))
);

// Deduplicate by name (some doctors appear in multiple categories)
const uniqueDoctors = allDoctors.filter(
    (d, i, arr) => arr.findIndex((x) => x.name === d.name) === i
);

export default function DoctorDashboard() {
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("all");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const refreshAppointments = useCallback(() => {
        if (!selectedDoctor) {
            setAppointments([]);
            return;
        }
        const appts = getAppointmentsByDoctor(selectedDoctor);
        setAppointments(appts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, [selectedDoctor]);

    useEffect(() => {
        refreshAppointments();
        // Poll for new appointments every 3 seconds
        const interval = setInterval(refreshAppointments, 3000);
        return () => clearInterval(interval);
    }, [refreshAppointments]);

    const handleAction = (id: string, status: "accepted" | "declined") => {
        setActionLoading(id);
        // Small delay for UX feedback
        setTimeout(() => {
            updateAppointmentStatus(id, status);
            refreshAppointments();
            setActionLoading(null);
        }, 600);
    };

    const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

    const stats = {
        total: appointments.length,
        pending: appointments.filter((a) => a.status === "pending").length,
        accepted: appointments.filter((a) => a.status === "accepted").length,
        declined: appointments.filter((a) => a.status === "declined").length,
    };

    return (
        <div
            className="min-h-screen"
            style={{
                background:
                    "linear-gradient(160deg, #e8f5e9 0%, #e3f2fd 25%, #f1f8e9 50%, #e8eaf6 75%, #e0f2f1 100%)",
            }}
        >
            {/* Header */}
            <header
                className="border-b border-border text-white"
                style={{
                    background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #1565c0 100%)",
                }}
            >
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                        >
                            <Stethoscope className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="font-display text-xl font-bold text-white">Doctor Portal</h1>
                            <p className="text-xs text-white/80">Manage Appointments</p>
                        </div>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/25 transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Doctor Selector */}
                <div className="mb-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-6">
                    <label className="block text-sm font-bold text-foreground mb-2">
                        Select Doctor Profile
                    </label>
                    <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full max-w-md rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium text-foreground focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                    >
                        <option value="">— Choose a doctor —</option>
                        {uniqueDoctors.map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name} · {d.specialization} · {d.hospital}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedDoctor ? (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[
                                { label: "Total", value: stats.total, icon: Activity, color: "from-blue-500 to-blue-600" },
                                { label: "Pending", value: stats.pending, icon: AlertCircle, color: "from-amber-500 to-orange-500" },
                                { label: "Accepted", value: stats.accepted, icon: CalendarCheck, color: "from-green-500 to-emerald-600" },
                                { label: "Declined", value: stats.declined, icon: CalendarX, color: "from-red-400 to-red-500" },
                            ].map(({ label, value, icon: Icon, color }) => (
                                <div
                                    key={label}
                                    className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-md p-5 flex items-center gap-4"
                                >
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-md`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-display text-2xl font-bold text-foreground">{value}</p>
                                        <p className="text-xs text-muted-foreground">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                            {(["all", "pending", "accepted", "declined"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all capitalize ${filter === f
                                            ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md"
                                            : "bg-white/70 text-muted-foreground hover:bg-white border border-gray-200"
                                        }`}
                                >
                                    {f} {f === "all" ? `(${stats.total})` : `(${stats[f]})`}
                                </button>
                            ))}
                        </div>

                        {/* Appointments */}
                        {filtered.length === 0 ? (
                            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-md p-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                                <p className="text-lg font-display font-semibold text-foreground mb-1">
                                    No appointments found
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {filter === "all"
                                        ? "When patients book appointments with you, they'll appear here."
                                        : `No ${filter} appointments at the moment.`}
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4 lg:grid-cols-2">
                                {filtered.map((appt) => (
                                    <div
                                        key={appt.id}
                                        className="rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-md overflow-hidden transition-all hover:shadow-lg"
                                    >
                                        {/* Status stripe */}
                                        <div
                                            className={`h-1.5 ${appt.status === "pending"
                                                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                                                    : appt.status === "accepted"
                                                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                                        : "bg-gradient-to-r from-red-400 to-red-500"
                                                }`}
                                        />
                                        <div className="p-5">
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-mono">{appt.id}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <User className="h-4 w-4 text-primary shrink-0" />
                                                        <span className="font-display text-base font-bold text-foreground">
                                                            {appt.patientName}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold capitalize ${appt.status === "pending"
                                                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                                                            : appt.status === "accepted"
                                                                ? "bg-green-50 text-green-700 border border-green-200"
                                                                : "bg-red-50 text-red-600 border border-red-200"
                                                        }`}
                                                >
                                                    {appt.status === "pending" && <AlertCircle className="h-3 w-3" />}
                                                    {appt.status === "accepted" && <CheckCircle className="h-3 w-3" />}
                                                    {appt.status === "declined" && <XCircle className="h-3 w-3" />}
                                                    {appt.status}
                                                </span>
                                            </div>

                                            {/* Details */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Mail className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">{appt.patientEmail}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                                    <span>{appt.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Clock className="h-3.5 w-3.5 shrink-0" />
                                                    <span>{appt.timeSlot}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Stethoscope className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate capitalize">{appt.category.replace("-", " ")}</span>
                                                </div>
                                            </div>

                                            {/* Doctor message (if acted upon) */}
                                            {appt.doctorMessage && appt.status !== "pending" && (
                                                <div
                                                    className={`rounded-xl px-4 py-2.5 text-xs mb-4 ${appt.status === "accepted"
                                                            ? "bg-green-50 text-green-700 border border-green-100"
                                                            : "bg-red-50 text-red-600 border border-red-100"
                                                        }`}
                                                >
                                                    {appt.doctorMessage}
                                                </div>
                                            )}

                                            {/* Actions */}
                                            {appt.status === "pending" && (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleAction(appt.id, "accepted")}
                                                        disabled={actionLoading === appt.id}
                                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                                    >
                                                        {actionLoading === appt.id ? (
                                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                            </svg>
                                                        ) : (
                                                            <CheckCircle className="h-4 w-4" />
                                                        )}
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(appt.id, "declined")}
                                                        disabled={actionLoading === appt.id}
                                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-300 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                        Decline
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    /* No doctor selected */
                    <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg p-16 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 mb-5">
                            <Stethoscope className="h-9 w-9 text-green-600" />
                        </div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                            Welcome to Doctor Portal
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Select your doctor profile from the dropdown above to view and manage your appointment requests.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
