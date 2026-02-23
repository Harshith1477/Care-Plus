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
    LayoutDashboard,
    CalendarDays,
    FileText,
    MessageSquare,
    Bell,
    Search,
    Filter,
    ChevronRight,
    Phone,
    MapPin,
    Droplets,
    Heart,
    Pill,
    AlertTriangle,
    Video,
    Upload,
    Download,
    ClipboardList,
    Plus,
    X,
    RefreshCw,
} from "lucide-react";
import { categories } from "@/data/categories";
import { getDoctorsByCategory } from "@/data/doctors";
import {
    getAppointmentsByDoctor,
    updateAppointmentStatus,
    type Appointment,
} from "@/data/appointmentStore";

// Gather all doctors
const allDoctors = categories.flatMap((cat) =>
    getDoctorsByCategory(cat.id).map((d) => ({ ...d, categoryName: cat.name }))
);
const uniqueDoctors = allDoctors.filter(
    (d, i, arr) => arr.findIndex((x) => x.name === d.name) === i
);

// Sample patient data for detail view
const samplePatients: Record<string, {
    allergies: string[];
    conditions: string[];
    prescriptionHistory: { name: string; date: string; status: string }[];
    labReports: { name: string; date: string }[];
    notes: string;
}> = {};

type SidebarTab = "overview" | "appointments" | "patients" | "consultations";

export default function DoctorDashboard() {
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [activeTab, setActiveTab] = useState<SidebarTab>("overview");
    const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("all");
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const refreshAppointments = useCallback(() => {
        if (!selectedDoctor) { setAppointments([]); return; }
        const appts = getAppointmentsByDoctor(selectedDoctor);
        setAppointments(appts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, [selectedDoctor]);

    useEffect(() => {
        refreshAppointments();
        const interval = setInterval(refreshAppointments, 3000);
        return () => clearInterval(interval);
    }, [refreshAppointments]);

    const handleAction = (id: string, status: "accepted" | "declined") => {
        setActionLoading(id);
        setTimeout(() => {
            updateAppointmentStatus(id, status);
            refreshAppointments();
            setActionLoading(null);
        }, 600);
    };

    const filtered = (filter === "all" ? appointments : appointments.filter((a) => a.status === filter))
        .filter((a) => !searchQuery || a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || a.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()));

    const stats = {
        total: appointments.length,
        pending: appointments.filter((a) => a.status === "pending").length,
        accepted: appointments.filter((a) => a.status === "accepted").length,
        declined: appointments.filter((a) => a.status === "declined").length,
    };

    const sidebarItems: { id: SidebarTab; label: string; icon: typeof LayoutDashboard }[] = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "appointments", label: "Appointments", icon: CalendarDays },
        { id: "patients", label: "Patients", icon: Users },
        { id: "consultations", label: "Consultations", icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen flex" style={{ background: "#0f172a" }}>

            {/* ─── Left Sidebar ─── */}
            <aside
                className={`fixed lg:sticky top-0 left-0 z-30 h-screen flex flex-col border-r transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 lg:w-20"
                    }`}
                style={{
                    background: "linear-gradient(180deg, #0c1425 0%, #0f172a 100%)",
                    borderColor: "rgba(255,255,255,0.06)",
                }}
            >
                <div className="overflow-hidden flex flex-col h-full">
                    {/* Logo */}
                    <div className="px-5 py-5 flex items-center gap-3 border-b border-white/[0.06]">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        {sidebarOpen && (
                            <div className="min-w-0">
                                <h1 className="font-display text-base font-bold text-white truncate">Doctor Portal</h1>
                                <p className="text-[10px] text-gray-500">Care Plus</p>
                            </div>
                        )}
                    </div>

                    {/* Doctor Selector */}
                    {sidebarOpen && (
                        <div className="px-4 py-4 border-b border-white/[0.06]">
                            <select
                                value={selectedDoctor}
                                onChange={(e) => { setSelectedDoctor(e.target.value); setSelectedPatient(null); }}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                                <option value="">Select Doctor</option>
                                {uniqueDoctors.map((d) => (
                                    <option key={d.id} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Nav Items */}
                    <nav className="flex-1 px-3 py-4 space-y-1">
                        {sidebarItems.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => { setActiveTab(id); setSelectedPatient(null); }}
                                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${activeTab === id
                                        ? "bg-blue-600/15 text-blue-400 shadow-sm"
                                        : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                                    }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {sidebarOpen && <span>{label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* Back to Home */}
                    <div className="px-3 py-4 border-t border-white/[0.06]">
                        <Link
                            to="/"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-all"
                        >
                            <ArrowLeft className="h-4 w-4 shrink-0" />
                            {sidebarOpen && <span>Back to Home</span>}
                        </Link>
                    </div>
                </div>
            </aside>

            {/* ─── Main Content ─── */}
            <main className="flex-1 min-h-screen overflow-x-hidden">
                {/* Top Bar */}
                <div
                    className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b"
                    style={{
                        background: "rgba(15,23,42,0.85)",
                        backdropFilter: "blur(16px)",
                        borderColor: "rgba(255,255,255,0.06)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                        </button>
                        <h2 className="font-display text-lg font-bold text-white capitalize">
                            {selectedPatient ? "Patient Details" : activeTab}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                            <Search className="h-4 w-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search patients..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent text-sm text-gray-300 placeholder:text-gray-600 outline-none w-40"
                            />
                        </div>
                        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors relative">
                            <Bell className="h-4 w-4" />
                            {stats.pending > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                                    {stats.pending}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!selectedDoctor ? (
                        /* ─── No Doctor Selected ─── */
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="text-center max-w-md">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/10 text-blue-400 mb-5">
                                    <Stethoscope className="h-9 w-9" />
                                </div>
                                <h2 className="font-display text-2xl font-bold text-white mb-2">Welcome, Doctor</h2>
                                <p className="text-gray-400 text-sm">Select your profile from the sidebar to start managing appointments and patients.</p>
                            </div>
                        </div>
                    ) : selectedPatient ? (
                        /* ─── Patient Detail View ─── */
                        <div>
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back to list
                            </button>

                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Left — Patient Info */}
                                <div className="lg:col-span-2 space-y-5">
                                    {/* Header Card */}
                                    <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 text-xl font-bold">
                                                {selectedPatient.patientName.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{selectedPatient.patientName}</h3>
                                                <p className="text-sm text-gray-400">{selectedPatient.patientEmail}</p>
                                            </div>
                                            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold capitalize ${selectedPatient.status === "pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                                                    : selectedPatient.status === "accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                                        : "bg-red-500/10 text-red-400 border border-red-500/15"
                                                }`}>{selectedPatient.status}</span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {[
                                                { icon: Calendar, label: "Date", value: selectedPatient.date },
                                                { icon: Clock, label: "Time", value: selectedPatient.timeSlot },
                                                { icon: Stethoscope, label: "Category", value: selectedPatient.category.replace("-", " ") },
                                                { icon: Activity, label: "ID", value: selectedPatient.id.slice(0, 12) },
                                            ].map(({ icon: Icon, label, value }) => (
                                                <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <Icon className="h-3 w-3 text-gray-500" />
                                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{label}</span>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-200 truncate capitalize">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Medical History */}
                                    <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-400" /> Medical History
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Conditions</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1.5 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/15">Hypertension</span>
                                                    <span className="px-3 py-1.5 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/15">Diabetes Type 2</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Allergies</p>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/15">Penicillin</span>
                                                    <span className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/15">Aspirin</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prescription History */}
                                    <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <Pill className="h-4 w-4 text-blue-400" /> Prescription History
                                        </h4>
                                        <div className="space-y-2">
                                            {[
                                                { name: "Metformin 500mg", date: "2026-02-15", status: "Active" },
                                                { name: "Lisinopril 10mg", date: "2026-01-20", status: "Active" },
                                                { name: "Amoxicillin 250mg", date: "2025-12-10", status: "Completed" },
                                            ].map((rx, i) => (
                                                <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-200">{rx.name}</p>
                                                        <p className="text-xs text-gray-500">Prescribed: {rx.date}</p>
                                                    </div>
                                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${rx.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                                            : "bg-gray-500/10 text-gray-400 border border-gray-500/15"
                                                        }`}>{rx.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Doctor Notes */}
                                    <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <ClipboardList className="h-4 w-4 text-blue-400" /> Doctor Notes
                                        </h4>
                                        <textarea
                                            className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-300 p-4 placeholder:text-gray-600 outline-none focus:border-blue-500/30 transition-colors resize-none h-32"
                                            placeholder="Add clinical notes, diagnosis, or observations..."
                                        />
                                        <div className="flex gap-2 mt-3">
                                            <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/15 text-blue-400 px-3 py-2 text-xs font-semibold hover:bg-blue-600/25 transition-colors">
                                                <Plus className="h-3 w-3" /> Add Diagnosis
                                            </button>
                                            <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/15 text-blue-400 px-3 py-2 text-xs font-semibold hover:bg-blue-600/25 transition-colors">
                                                <Pill className="h-3 w-3" /> Add Prescription
                                            </button>
                                            <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/15 text-blue-400 px-3 py-2 text-xs font-semibold hover:bg-blue-600/25 transition-colors">
                                                <CalendarDays className="h-3 w-3" /> Schedule Follow-up
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right — Consultation Panel */}
                                <div className="space-y-5">
                                    <div className="rounded-2xl border border-white/[0.06] p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                            <MessageSquare className="h-4 w-4 text-blue-400" /> Consultation
                                        </h4>
                                        <div className="space-y-2">
                                            <button className="w-full flex items-center gap-3 rounded-xl bg-blue-600/10 border border-blue-500/15 p-3.5 text-sm font-semibold text-blue-400 hover:bg-blue-600/20 transition-colors">
                                                <Video className="h-4 w-4" /> Start Video Call
                                            </button>
                                            <button className="w-full flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-sm font-medium text-gray-300 hover:bg-white/[0.06] transition-colors">
                                                <MessageSquare className="h-4 w-4 text-gray-500" /> Chat with Patient
                                            </button>
                                            <button className="w-full flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-sm font-medium text-gray-300 hover:bg-white/[0.06] transition-colors">
                                                <Upload className="h-4 w-4 text-gray-500" /> Upload Prescription
                                            </button>
                                            <button className="w-full flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 text-sm font-medium text-gray-300 hover:bg-white/[0.06] transition-colors">
                                                <Download className="h-4 w-4 text-gray-500" /> Download Reports
                                            </button>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {selectedPatient.status === "pending" && (
                                        <div className="rounded-2xl border border-white/[0.06] p-5 space-y-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                                            <h4 className="text-sm font-bold text-white mb-3">Quick Actions</h4>
                                            <button
                                                onClick={() => handleAction(selectedPatient.id, "accepted")}
                                                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                                                style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)" }}
                                            >
                                                <CheckCircle className="h-4 w-4" /> Accept Appointment
                                            </button>
                                            <button
                                                onClick={() => handleAction(selectedPatient.id, "declined")}
                                                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-red-400 bg-red-500/10 border border-red-500/15 hover:bg-red-500/20 transition-all"
                                            >
                                                <XCircle className="h-4 w-4" /> Decline
                                            </button>
                                        </div>
                                    )}

                                    {selectedPatient.status !== "pending" && (
                                        <div className="rounded-2xl border border-white/[0.06] p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
                                            <button className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 hover:bg-emerald-500/20 transition-all">
                                                <CheckCircle className="h-4 w-4" /> Mark Case Completed
                                            </button>
                                        </div>
                                    )}

                                    {/* Lab Reports */}
                                    <div className="rounded-2xl border border-white/[0.06] p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-400" /> Lab Reports
                                        </h4>
                                        <div className="space-y-2">
                                            {[
                                                { name: "Complete Blood Count", date: "2026-02-18" },
                                                { name: "HbA1c Test", date: "2026-02-10" },
                                            ].map((report, i) => (
                                                <div key={i} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-300">{report.name}</p>
                                                        <p className="text-[10px] text-gray-500">{report.date}</p>
                                                    </div>
                                                    <Download className="h-3.5 w-3.5 text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ─── Main Dashboard Views ─── */
                        <>
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    {/* Stats */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[
                                            { label: "Total Patients", value: stats.total, icon: Users, color: "from-blue-500 to-blue-600", glow: "rgba(37,99,235,0.15)" },
                                            { label: "Today's Appointments", value: stats.pending, icon: CalendarDays, color: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.15)" },
                                            { label: "Accepted", value: stats.accepted, icon: CalendarCheck, color: "from-emerald-500 to-green-600", glow: "rgba(16,185,129,0.15)" },
                                            { label: "Declined", value: stats.declined, icon: AlertCircle, color: "from-red-400 to-red-500", glow: "rgba(239,68,68,0.15)" },
                                        ].map(({ label, value, icon: Icon, color, glow }) => (
                                            <div
                                                key={label}
                                                className="rounded-2xl border border-white/[0.06] p-5 transition-all hover:border-white/[0.12]"
                                                style={{ background: "rgba(255,255,255,0.03)", boxShadow: `0 0 30px ${glow}` }}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <span className="text-xs text-gray-600">This week</span>
                                                </div>
                                                <p className="font-display text-3xl font-bold text-white">{value}</p>
                                                <p className="text-xs text-gray-500 mt-1">{label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Appointments */}
                                    <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                                        <div className="flex items-center justify-between mb-5">
                                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-blue-400" /> Recent Appointments
                                            </h3>
                                            <button onClick={() => setActiveTab("appointments")} className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                                                View all <ChevronRight className="h-3 w-3" />
                                            </button>
                                        </div>
                                        {appointments.length === 0 ? (
                                            <div className="text-center py-8">
                                                <CalendarDays className="mx-auto h-10 w-10 text-gray-700 mb-2" />
                                                <p className="text-sm text-gray-500">No appointments yet</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {appointments.slice(0, 5).map((appt) => (
                                                    <div
                                                        key={appt.id}
                                                        onClick={() => setSelectedPatient(appt)}
                                                        className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.05] p-3.5 cursor-pointer hover:bg-white/[0.05] transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 text-xs font-bold">
                                                                {appt.patientName.split(" ").map(n => n[0]).join("")}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-200">{appt.patientName}</p>
                                                                <p className="text-xs text-gray-500">{appt.date} · {appt.timeSlot}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${appt.status === "pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                                                                    : appt.status === "accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                                                        : "bg-red-500/10 text-red-400 border border-red-500/15"
                                                                }`}>{appt.status}</span>
                                                            <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-gray-400 transition-colors" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(activeTab === "appointments" || activeTab === "patients") && (
                                <div className="space-y-5">
                                    {/* Filter Tabs */}
                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                        {(["all", "pending", "accepted", "declined"] as const).map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => setFilter(f)}
                                                className={`rounded-full px-5 py-2 text-xs font-bold transition-all capitalize ${filter === f
                                                        ? "text-white shadow-md"
                                                        : "bg-white/5 text-gray-500 hover:text-gray-300 border border-white/[0.06]"
                                                    }`}
                                                style={filter === f ? { background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" } : undefined}
                                            >
                                                {f} ({f === "all" ? stats.total : stats[f]})
                                            </button>
                                        ))}
                                    </div>

                                    {/* List */}
                                    {filtered.length === 0 ? (
                                        <div className="rounded-2xl border border-white/[0.06] p-12 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                            <Users className="mx-auto h-10 w-10 text-gray-700 mb-2" />
                                            <p className="text-sm text-gray-500">No {filter === "all" ? "" : filter} appointments found</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-3 lg:grid-cols-2">
                                            {filtered.map((appt) => (
                                                <div
                                                    key={appt.id}
                                                    className="rounded-2xl border border-white/[0.06] overflow-hidden cursor-pointer hover:border-white/[0.12] transition-all group"
                                                    style={{ background: "rgba(255,255,255,0.03)" }}
                                                    onClick={() => setSelectedPatient(appt)}
                                                >
                                                    <div className={`h-1 ${appt.status === "pending" ? "bg-gradient-to-r from-amber-400 to-orange-400"
                                                            : appt.status === "accepted" ? "bg-gradient-to-r from-emerald-400 to-green-500"
                                                                : "bg-gradient-to-r from-red-400 to-red-500"
                                                        }`} />
                                                    <div className="p-5">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 text-sm font-bold">
                                                                    {appt.patientName.split(" ").map(n => n[0]).join("")}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-white">{appt.patientName}</p>
                                                                    <p className="text-xs text-gray-500">{appt.patientEmail}</p>
                                                                </div>
                                                            </div>
                                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${appt.status === "pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                                                                    : appt.status === "accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                                                                        : "bg-red-500/10 text-red-400 border border-red-500/15"
                                                                }`}>{appt.status}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{appt.date}</span>
                                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{appt.timeSlot}</span>
                                                            <span className="flex items-center gap-1 capitalize"><Stethoscope className="h-3 w-3" />{appt.category.replace("-", " ")}</span>
                                                        </div>
                                                        {appt.status === "pending" && (
                                                            <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                                                                <button
                                                                    onClick={() => handleAction(appt.id, "accepted")}
                                                                    disabled={actionLoading === appt.id}
                                                                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white disabled:opacity-50 transition-all hover:-translate-y-0.5"
                                                                    style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)" }}
                                                                >
                                                                    <CheckCircle className="h-3.5 w-3.5" /> Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAction(appt.id, "declined")}
                                                                    disabled={actionLoading === appt.id}
                                                                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/15 hover:bg-red-500/20 disabled:opacity-50 transition-all"
                                                                >
                                                                    <XCircle className="h-3.5 w-3.5" /> Decline
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "consultations" && (
                                <div className="rounded-2xl border border-white/[0.06] p-12 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                                    <MessageSquare className="mx-auto h-12 w-12 text-gray-700 mb-3" />
                                    <h3 className="text-lg font-bold text-white mb-1">Consultations</h3>
                                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                        Click on any patient to start a consultation. You can video call, chat, upload prescriptions, and download reports.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
