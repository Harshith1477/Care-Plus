import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle, XCircle, X } from "lucide-react";
import {
    getNotificationsForPatient,
    markNotificationRead,
    type Appointment,
} from "@/data/appointmentStore";

export function PatientNotifications() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Appointment[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    const patientEmail = localStorage.getItem("careplus_patient_email") || "";

    const refresh = () => {
        if (!patientEmail) return;
        setNotifications(getNotificationsForPatient(patientEmail));
    };

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 3000);
        return () => clearInterval(interval);
    }, [patientEmail]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const unreadCount = notifications.filter((n) => !n.notificationRead).length;

    const handleMarkRead = (id: string) => {
        markNotificationRead(id);
        refresh();
    };

    if (!patientEmail) return null;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl bg-white border border-gray-200 shadow-2xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-display text-sm font-bold text-foreground">
                            Notifications
                        </h3>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-5 py-8 text-center">
                                <Bell className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                                <p className="text-sm text-muted-foreground">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`px-5 py-4 border-b border-gray-50 last:border-0 transition-colors ${n.notificationRead ? "bg-white" : "bg-blue-50/40"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${n.status === "accepted"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-500"
                                                }`}
                                        >
                                            {n.status === "accepted" ? (
                                                <CheckCircle className="h-4 w-4" />
                                            ) : (
                                                <XCircle className="h-4 w-4" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground">
                                                {n.status === "accepted"
                                                    ? "Appointment Confirmed! ✅"
                                                    : "Doctor Unavailable ⚠️"}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {n.doctorMessage ||
                                                    (n.status === "accepted"
                                                        ? `Your appointment with ${n.doctorName} on ${n.date} at ${n.timeSlot} is confirmed.`
                                                        : `${n.doctorName} is not available at ${n.timeSlot} on ${n.date}. Please book another session.`)}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground/60 mt-1">
                                                {n.doctorName} · {n.date} · {n.timeSlot}
                                            </p>
                                            {!n.notificationRead && (
                                                <button
                                                    onClick={() => handleMarkRead(n.id)}
                                                    className="mt-2 text-xs text-primary font-semibold hover:underline"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
