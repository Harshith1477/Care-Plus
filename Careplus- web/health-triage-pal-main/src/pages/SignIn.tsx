import { useState } from "react";
import { Stethoscope, Mail, Lock, Eye, EyeOff, ArrowLeft, Shield, Clock, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../lib/firebase";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem("careplus_user", JSON.stringify({ email, loggedIn: true }));
            navigate("/");
        }, 1200);
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            localStorage.setItem("careplus_user", JSON.stringify({
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                loggedIn: true
            }));
            navigate("/");
        } catch (err: any) {
            console.error("Google Sign-In Error:", err);
            setError(err.message || "Failed to sign in with Google.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: 'linear-gradient(160deg, #e8f5e9 0%, #e3f2fd 25%, #f1f8e9 50%, #e8eaf6 75%, #e0f2f1 100%)' }}>

            {/* LEFT — Branding Panel */}
            <div
                className="hidden lg:flex lg:w-[48%] flex-col justify-between p-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #1b5e20 0%, #2e7d32 30%, #1565c0 100%)' }}
            >
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/5" />
                <div className="absolute top-1/2 right-10 w-40 h-40 rounded-full bg-white/5" />

                {/* Top — Logo */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        <span className="font-display text-2xl font-bold text-white">Care Plus</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1 ml-14">Your Health, Simplified</p>
                </div>

                {/* Middle — Value props */}
                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-white text-3xl font-display font-bold leading-tight mb-3">
                            Welcome to your<br />health companion
                        </h2>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                            Access top specialists, manage appointments, and take control of your health — all from one platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Shield, label: "Secure & Private", desc: "Your data is encrypted and protected" },
                            { icon: Clock, label: "24/7 Access", desc: "Book appointments anytime, anywhere" },
                            { icon: Users, label: "200+ Specialists", desc: "Connect with verified doctors" },
                        ].map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-white">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">{label}</p>
                                    <p className="text-white/60 text-xs">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom — Testimonial */}
                <div className="relative z-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
                    <p className="text-white/90 text-sm leading-relaxed italic">
                        "Care Plus made it incredibly easy to find the right specialist. I booked my appointment in under 2 minutes!"
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                            RP
                        </div>
                        <div>
                            <p className="text-white text-xs font-semibold">Rahul Patel</p>
                            <p className="text-white/50 text-xs">Verified Patient</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className="text-yellow-400 text-xs">★</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT — Sign-In Form */}
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 sm:px-10 py-5">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        New here?{" "}
                        <a href="#" className="text-primary font-semibold hover:underline">Create Account</a>
                    </p>
                </div>

                {/* Form area */}
                <div className="flex-1 flex items-center justify-center px-6 sm:px-10">
                    <div className="w-full max-w-[420px]">
                        {/* Mobile-only logo */}
                        <div className="flex items-center gap-2 mb-8 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-md">
                                <Stethoscope className="h-5 w-5" />
                            </div>
                            <span className="font-display text-xl font-bold text-foreground">Care Plus</span>
                        </div>

                        <h1 className="font-display text-3xl font-bold text-foreground mb-1">
                            Sign in
                        </h1>
                        <p className="text-muted-foreground text-sm mb-8">
                            Enter your credentials to access your dashboard
                        </p>

                        {/* Error */}
                        {error && (
                            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border-2 border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold text-foreground">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl border-2 border-gray-200 bg-white pl-11 pr-11 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-200"
                                    />
                                    <span className="text-sm text-muted-foreground">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-primary hover:underline font-semibold">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl px-4 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #1565c0 100%)' }}
                            >
                                {isLoading ? (
                                    <span className="inline-flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in…
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-7 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">or continue with</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-foreground hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-foreground hover:bg-gray-50 hover:border-gray-300 transition-all">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06.02-.17.04-.36.04-.55 0-1.12.535-2.22 1.235-3.01C13.66 1.57 15.025.87 16.03.71c.02.17.035.37.035.55 0 .06-.002.12-.005.17l.005.01zM18.53 19.74c-.68.96-1.41 1.88-2.54 1.88-.54 0-.91-.18-1.3-.37-.41-.2-.84-.41-1.56-.41s-1.19.22-1.62.42c-.37.18-.7.35-1.18.37-1.06.04-1.87-1.03-2.55-1.99-1.39-1.96-2.45-5.55-1.02-7.97.71-1.2 1.97-1.96 3.34-1.98.61-.01 1.2.22 1.7.42.39.16.73.3 1 .3.24 0 .56-.14.95-.3.58-.24 1.3-.53 2.1-.45 1.28.05 2.18.55 2.79 1.37-1.09.7-1.83 1.89-1.73 3.41.1 1.77 1.2 2.99 2.57 3.6-.21.59-.43 1.16-.72 1.7h.02z" /></svg>
                                Apple
                            </button>
                        </div>

                        {/* Mobile-only sign-up */}
                        <p className="text-center text-sm text-muted-foreground mt-8 lg:hidden">
                            Don't have an account?{" "}
                            <a href="#" className="text-primary font-semibold hover:underline">Create Account</a>
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="px-6 sm:px-10 py-5 text-center">
                    <p className="text-xs text-muted-foreground/70">
                        Protected by 256-bit SSL encryption · HIPAA Compliant
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
