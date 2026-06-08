"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: name, role: 'student' })
      });
      
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Could not create account. Please verify your information and try again.");
      } else {
        router.push('/profile');
        window.location.reload();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 py-16 relative overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-[#04060E] text-slate-900 dark:text-white">
      
      {/* Background Lights (Only visible in Dark Mode) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[15%] -right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <motion.div 
          initial={{ y: 15, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }} 
          className="relative group"
        >
          {/* Card Border Glow in Dark Mode */}
          <div className="absolute -inset-0.5 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none bg-gradient-to-r from-primary to-accent hidden dark:block" />
          
          {/* Main Card */}
          <div className="relative p-6 sm:p-8 rounded-[2rem] border backdrop-blur-2xl shadow-xl space-y-6 bg-white dark:bg-slate-950/80 border-slate-200 dark:border-white/10 shadow-slate-200/50 dark:shadow-none">
            
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-black text-base shadow-md">
                XC
              </div>
              <div>
                <h1 className="text-xl font-headline font-bold tracking-tight text-slate-900 dark:text-white">Create Account</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get started today.</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-rose-400 font-semibold">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 block">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <input 
                    required 
                    id="name"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="John Doe" 
                    className="w-full h-11 pl-11 pr-4 rounded-xl border outline-none transition-all duration-200 text-sm border-slate-200 bg-slate-50 text-slate-950 focus:border-primary/60 focus:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:focus:border-primary/60 dark:focus:bg-slate-900/60"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 block">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <input 
                    required 
                    id="email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    className="w-full h-11 pl-11 pr-4 rounded-xl border outline-none transition-all duration-200 text-sm border-slate-200 bg-slate-50 text-slate-950 focus:border-primary/60 focus:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:focus:border-primary/60 dark:focus:bg-slate-900/60"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 block">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <input 
                    required 
                    id="password"
                    type={visible ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="w-full h-11 pl-11 pr-11 rounded-xl border outline-none transition-all duration-200 text-sm border-slate-200 bg-slate-50 text-slate-950 focus:border-primary/60 focus:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:focus:border-primary/60 dark:focus:bg-slate-900/60"
                  />
                  <button 
                    type="button" 
                    onClick={() => setVisible(!visible)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition duration-200 p-1"
                  >
                    <i className={`fa-solid ${visible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 block">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <input 
                    required 
                    id="confirmPassword"
                    type={confirmVisible ? "text" : "password"} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="w-full h-11 pl-11 pr-11 rounded-xl border outline-none transition-all duration-200 text-sm border-slate-200 bg-slate-50 text-slate-950 focus:border-primary/60 focus:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:focus:border-primary/60 dark:focus:bg-slate-900/60"
                  />
                  <button 
                    type="button" 
                    onClick={() => setConfirmVisible(!confirmVisible)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition duration-200 p-1"
                  >
                    <i className={`fa-solid ${confirmVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm mt-4"
              >
                {loading ? (
                  <span>
                    <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                    Registering...
                  </span>
                ) : (
                  <>
                    Sign Up
                    <i className="fa-solid fa-arrow-right"></i>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
                <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">Or register with</div>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
              </div>

              {/* OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button" 
                  className="flex items-center justify-center gap-2 h-10 rounded-xl border text-xs font-semibold transition-all duration-200 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] dark:text-white"
                >
                  <i className="fa-brands fa-google text-rose-500 text-sm"></i>
                  Google
                </button>
                <button 
                  type="button" 
                  className="flex items-center justify-center gap-2 h-10 rounded-xl border text-xs font-semibold transition-all duration-200 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] dark:text-white"
                >
                  <i className="fa-brands fa-microsoft text-blue-500 text-sm"></i>
                  Microsoft
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center text-xs pt-1">
              <span className="text-slate-500 dark:text-slate-400">Already have an account? </span>
              <Link href="/login" className="font-bold text-primary hover:underline">
                Sign In
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}


