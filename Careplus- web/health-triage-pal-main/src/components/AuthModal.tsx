import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
    onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
    const { loginWithGoogle, loginWithEmail, register } = useAuth();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const clearError = () => setError("");

    const handleGoogle = async () => {
        setLoading(true);
        clearError();
        try {
            await loginWithGoogle();
            onClose();
        } catch (err: any) {
            const msg =
                err.code === "auth/popup-closed-by-user"
                    ? "Sign-in popup was closed. Please try again."
                    : err.message || "Google sign-in failed.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) { setError("Please fill in all fields."); return; }
        clearError();
        setLoading(true);
        try {
            if (mode === "login") {
                await loginWithEmail(email, password);
            } else {
                await register(email, password);
            }
            onClose();
        } catch (err: any) {
            const msg =
                err.code === "auth/user-not-found" ? "No account found with this email."
                    : err.code === "auth/wrong-password" ? "Incorrect password."
                        : err.code === "auth/email-already-in-use" ? "Email already registered."
                            : err.code === "auth/weak-password" ? "Password must be at least 6 characters."
                                : err.code === "auth/invalid-credential" ? "Invalid email or password."
                                    : err.code === "auth/invalid-email" ? "Please enter a valid email address."
                                        : err.message || "Authentication failed.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header gradient */}
                <div className="px-6 pt-8 pb-6 text-center" style={{ background: "linear-gradient(135deg, #006064 0%, #00838f 100%)" }}>
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                        <span className="text-3xl">🏥</span>
                    </div>
                    <h2 className="text-xl font-black text-white">Care Plus</h2>
                    <p className="text-sm text-white/80 mt-0.5">
                        {mode === "login" ? "Welcome back! Sign in to continue." : "Create your Care Plus account."}
                    </p>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Body */}
                <div className="px-6 py-6 space-y-4">

                    {/* Google Sign-In */}
                    <button
                        onClick={handleGoogle}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all active:scale-95 disabled:opacity-60"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                        ) : (
                            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center gap-3">
                        <div className="flex-1 border-t border-gray-200" />
                        <span className="text-xs text-gray-400 font-medium">or</span>
                        <div className="flex-1 border-t border-gray-200" />
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailAuth} className="space-y-3">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all active:scale-95 disabled:opacity-60",
                            )}
                            style={{ background: "linear-gradient(135deg, #006064 0%, #00838f 100%)" }}
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {mode === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500">
                        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => { setMode(mode === "login" ? "register" : "login"); clearError(); }}
                            className="font-semibold text-primary hover:underline"
                        >
                            {mode === "login" ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
