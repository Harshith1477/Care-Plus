export interface Appointment {
    id: string;
    patientName: string;
    patientEmail: string;
    doctorName: string;
    doctorId: string;
    category: string;
    date: string;
    timeSlot: string;
    status: "pending" | "accepted" | "declined";
    createdAt: string;
    doctorMessage?: string;
    notificationRead?: boolean;
}

const STORAGE_KEY = "careplus_appointments";

export function getAppointments(): Appointment[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

export function addAppointment(
    data: Omit<Appointment, "id" | "status" | "createdAt" | "notificationRead">
): Appointment {
    const appointments = getAppointments();
    const newAppointment: Appointment = {
        ...data,
        id: `APT-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
        notificationRead: false,
    };
    appointments.push(newAppointment);
    saveAppointments(appointments);
    return newAppointment;
}

export function updateAppointmentStatus(
    id: string,
    status: "accepted" | "declined",
    message?: string
): Appointment | null {
    const appointments = getAppointments();
    const idx = appointments.findIndex((a) => a.id === id);
    if (idx === -1) return null;

    appointments[idx].status = status;
    appointments[idx].notificationRead = false;
    appointments[idx].doctorMessage =
        message ||
        (status === "accepted"
            ? "Your appointment has been confirmed! We look forward to seeing you."
            : "The doctor is not available at this time. Please book another session.");

    saveAppointments(appointments);
    return appointments[idx];
}

export function getAppointmentsByDoctor(doctorName: string): Appointment[] {
    return getAppointments().filter((a) => a.doctorName === doctorName);
}

export function getAppointmentsByPatient(email: string): Appointment[] {
    return getAppointments().filter((a) => a.patientEmail === email);
}

export function getNotificationsForPatient(email: string): Appointment[] {
    return getAppointments().filter(
        (a) => a.patientEmail === email && a.status !== "pending"
    );
}

export function markNotificationRead(id: string): void {
    const appointments = getAppointments();
    const idx = appointments.findIndex((a) => a.id === id);
    if (idx !== -1) {
        appointments[idx].notificationRead = true;
        saveAppointments(appointments);
    }
}

export function deleteAppointment(id: string): void {
    const appointments = getAppointments().filter((a) => a.id !== id);
    saveAppointments(appointments);
}
