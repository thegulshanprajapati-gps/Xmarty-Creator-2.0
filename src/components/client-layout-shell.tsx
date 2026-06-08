'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VasantAI } from "@/components/vasant-ai";
import { PageTransition } from "@/components/page-transition";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

export function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isPagePending, setIsPagePending] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const startTime = Date.now();
    
    // Initial ping
    fetch('/api/security/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route: pathname, renderTime: 0 })
    }).catch(() => {});

    // Update time spent every 10 seconds
    const interval = setInterval(() => {
      fetch('/api/security/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route: pathname, renderTime: 10 })
      }).catch(() => {});
    }, 10000);

    return () => {
      clearInterval(interval);
      // Final flush
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      if (elapsed > 0) {
        fetch('/api/security/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ route: pathname, renderTime: elapsed % 10 }),
          keepalive: true
        }).catch(() => {});
      }
    };
  }, [pathname, mounted]);

  const isHome = pathname === '/';
  const shouldHideSiteChrome = false;

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      {!shouldHideSiteChrome && <Navbar />}
      <PageTransition onPendingChange={setIsPagePending}>
        <main
          className={cn(
            "flex-1 w-full max-w-full overflow-x-clip",
            !shouldHideSiteChrome && !isHome && "pt-20"
          )}
        >
          {children}
        </main>
      </PageTransition>
      {!shouldHideSiteChrome && !isPagePending && <Footer />}
      {!shouldHideSiteChrome && !isPagePending && <VasantAI />}
      <Toaster />
    </div>
  );
}
