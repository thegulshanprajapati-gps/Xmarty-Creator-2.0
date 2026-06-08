'use client';

import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setName(user.full_name || "");
    }
  }, [user]);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    window.location.reload();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name, password: password || undefined })
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setPassword("");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        const err = await res.json();
        setMessage({ type: "error", text: err.error || "Failed to update profile" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving details." });
    } finally {
      setUpdating(false);
    }
  };

  if (userLoading) {
    return (
      <div className="w-full flex items-center justify-center bg-slate-50 dark:bg-[#04060E] py-16">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          <i className="fa-solid fa-spinner animate-spin mr-2"></i>
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center p-4 py-16 bg-slate-50 dark:bg-[#04060E] text-slate-900 dark:text-white">
        <div className="text-center space-y-4 max-w-sm w-full bg-white dark:bg-slate-950/80 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl">
          <div className="text-3xl text-primary">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <p className="text-base font-semibold">You are not signed in.</p>
          <Link href="/login" className="inline-block w-full">
            <button className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold transition-all duration-200 shadow-md">
              Go to Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-4 py-16 relative overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-[#04060E] text-slate-900 dark:text-white">
      
      {/* Background Lights (Dark Mode only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[15%] -right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto py-8">
        
        {/* Floating Back Link */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition duration-200 group py-1">
            <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
            Home
          </Link>
          <button 
            onClick={handleSignOut} 
            className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
          >
            <i className="fa-solid fa-right-from-bracket mr-1"></i> Sign Out
          </button>
        </div>

        <motion.div 
          initial={{ y: 15, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }} 
          className="relative group"
        >
          {/* Outer Border Glow */}
          <div className="absolute -inset-0.5 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none bg-gradient-to-r from-primary to-accent hidden dark:block" />
          
          {/* Profile Card */}
          <div className="relative p-6 sm:p-8 rounded-[2rem] border backdrop-blur-2xl shadow-xl space-y-6 bg-white dark:bg-slate-950/80 border-slate-200 dark:border-white/10 shadow-slate-200/50 dark:shadow-none">
            
            {/* Header / Avatar */}
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20 text-primary shrink-0 select-none">
                <i className="fa-solid fa-user-gear text-2xl"></i>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-headline font-bold text-slate-900 dark:text-white truncate">
                  {user.full_name || "User Profile"}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                <div className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mt-1">
                  {user.role || 'Student'}
                </div>
              </div>
            </div>

            {/* Notification message */}
            {message.text && (
              <div className={`rounded-xl p-3 text-xs font-semibold ${
                message.type === 'success' 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-destructive/10 border border-destructive/20 text-rose-500'
              }`}>
                <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} mr-1.5`}></i>
                {message.text}
              </div>
            )}

            {/* Edit details form */}
            <form onSubmit={handleUpdate} className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Edit Account Settings</h2>
              
              {/* Full Name field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 block">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <input 
                    required 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                    className="w-full h-11 pl-11 pr-4 rounded-xl border outline-none transition-all duration-200 text-sm border-slate-200 bg-slate-50 text-slate-950 focus:border-primary/60 focus:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:focus:border-primary/60 dark:focus:bg-slate-900/60"
                  />
                </div>
              </div>

              {/* Password change field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 block">New Password (Optional)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <input 
                    type={visible ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter new password" 
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

              {/* Save changes button */}
              <button 
                type="submit" 
                disabled={updating} 
                className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-sm mt-3"
              >
                {updating ? (
                  <span>
                    <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                    Saving...
                  </span>
                ) : (
                  <>
                    <i className="fa-solid fa-floppy-disk mr-1"></i>
                    Save Changes
                  </>
                )}
              </button>
            </form>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
