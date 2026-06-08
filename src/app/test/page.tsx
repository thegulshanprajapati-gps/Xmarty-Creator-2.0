'use client';

import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { motion } from "framer-motion";

export default function TestAccessPage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center bg-slate-50 dark:bg-[#04060E] py-16">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          <i className="fa-solid fa-spinner animate-spin mr-2"></i>
          Loading test access...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-[#04060E] text-slate-900 dark:text-white py-16">
        <motion.div 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4 max-w-sm w-full bg-white dark:bg-slate-950/80 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl"
        >
          <div className="text-3xl text-primary">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>
          <h2 className="text-lg font-headline font-bold text-slate-900 dark:text-white">Sign in to continue</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">You must be logged in to access the test dashboard.</p>
          <Link href="/login" className="inline-block w-full">
            <button className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold transition-all duration-200 shadow-md">
              Sign In
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-[#04060E] text-slate-900 dark:text-white py-16">
      
      {/* Background Lights (Dark Mode only) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[15%] -right-[10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div 
          initial={{ y: 15, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }} 
          className="relative group"
        >
          {/* Card Border Glow */}
          <div className="absolute -inset-0.5 rounded-[2rem] blur opacity-40 group-hover:opacity-60 transition duration-700 pointer-events-none bg-gradient-to-r from-primary to-accent hidden dark:block" />
          
          {/* Access Card */}
          <div className="relative p-6 sm:p-10 rounded-[2rem] border backdrop-blur-2xl shadow-xl space-y-6 bg-white dark:bg-slate-950/80 border-slate-200 dark:border-white/10 shadow-slate-200/50 dark:shadow-none">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20 text-primary shrink-0 select-none">
                <i className="fa-solid fa-graduation-cap text-2xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-headline font-bold text-slate-900 dark:text-white tracking-tight">Skill Test Access</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Access your learning checks and community test workflows.</p>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Welcome back, <span className="font-bold text-slate-900 dark:text-white">{user.full_name || user.email}</span>. Select a skill assessment pathway below to continue practicing.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <Link href="/courses" className="block">
                  <button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg shadow-primary/20 text-xs sm:text-sm">
                    <i className="fa-solid fa-book-open"></i>
                    Browse course assessments
                  </button>
                </Link>
                
                <Link href="/community" className="block">
                  <button className="w-full h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/[0.08] font-bold transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <i className="fa-solid fa-users"></i>
                    View community practice labs
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
