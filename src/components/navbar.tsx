'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Bell, Search, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import useTheme from '@/hooks/use-theme';
import { cn } from "@/lib/utils";
import { useCMS } from "@/components/cms-provider";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { EditableText } from '@/components/cms/editable-text';
import { motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings, refreshSettings } = useCMS();
  const { theme: localTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMounted(true), []);

  const toggleTheme = async () => {
    const newMode = localTheme === 'dark' ? 'light' : 'dark';
    setTheme(newMode);
    try {
      const payload = { theme_settings: { themeMode: newMode } };
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      refreshSettings().catch(() => {});
    } catch {}
  };

  useEffect(() => {
    if (settings?.themeMode) setTheme(settings.themeMode);
  }, [settings?.themeMode]);

  const links = [
    { labelKey: 'home', defaultLabel: 'Home', href: '/' },
    { labelKey: 'about', defaultLabel: 'About', href: '/about' },
    { labelKey: 'courses', defaultLabel: 'Courses', href: '/courses' },
    { labelKey: 'community', defaultLabel: 'Community', href: '/community' },
    { labelKey: 'blog', defaultLabel: 'Blog', href: '/blog' },
    { labelKey: 'contact', defaultLabel: 'Contact', href: '/contact' },
  ];

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const results = links.filter((l) =>
    (l.defaultLabel || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 z-[100] w-full select-none transition-all duration-300",
      scrolled ? "bg-background/95 backdrop-blur-md border-b py-2 shadow-sm" : "bg-background py-3"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-primary h-9 w-9 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 border-2 border-accent/20">
                <span className="text-white font-bold text-sm tracking-tighter">XC</span>
              </div>
              <EditableText
                pageSlug="navbar"
                sectionKey="brand"
                contentKey="siteName"
                defaultValue="XmartyCreator"
                as="span"
                className="font-headline text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-primary/5 relative">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={cn(
                    "relative px-5 py-2 text-sm font-bold transition-colors duration-300 rounded-full z-10",
                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/30"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <EditableText
                    pageSlug="navbar"
                    sectionKey="menu"
                    contentKey={link.labelKey}
                    defaultValue={link.defaultLabel}
                    as="span"
                    className="text-inherit"
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary transition-colors">
              <Link href="/updates">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {mounted ? (localTheme === 'dark' ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-foreground hover:text-primary" />
              )) : (
                <span className="h-5 w-5 inline-block" />
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(true)}
              className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="secondary" size="sm" asChild className="hover:bg-primary/10 transition-colors">
              <Link href={user ? "/profile" : "/login"} className="inline-flex items-center gap-2 px-4 py-2 text-primary hover:text-primary font-bold">
                <User className="h-4 w-4 text-primary" />
                <EditableText
                  pageSlug="navbar"
                  sectionKey="menu"
                  contentKey={user ? 'profile' : 'login'}
                  defaultValue={user ? 'Profile' : 'Login'}
                  as="span"
                  className="text-primary hover:text-primary"
                />
              </Link>
            </Button>

            {user && (
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="rounded-full h-10 w-10 text-muted-foreground hover:text-primary transition-colors">
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full h-10 w-10">
              <Link href="/updates">
                <Bell className="h-5 w-5" />
              </Link>
            </Button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="h-7 w-7 text-primary" /> : <Menu className="h-7 w-7 text-primary" />}
            </button>
          </div>
        </div>
      </div>

      <div className={cn(
        "lg:hidden absolute top-full left-0 w-full bg-background border-b overflow-y-hidden transition-all duration-300 shadow-2xl z-50", 
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 py-10 space-y-4 bg-background">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "block text-xl font-headline font-bold p-4 rounded-2xl transition-all active:scale-[0.98] motion-safe:active:scale-[0.98]",
                pathname === link.href ? "bg-primary text-white shadow-xl shadow-primary/20" : "hover:bg-muted"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.defaultLabel}
            </Link>
          ))}
          <Link
            href={user ? "/profile" : "/login"}
            className="block text-xl font-headline font-bold p-4 rounded-2xl transition-all hover:bg-muted"
            onClick={() => setIsOpen(false)}
          >
            {user ? "Profile" : "Login"}
          </Link>
          {user && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                handleSignOut();
              }}
              className="w-full text-left text-xl font-headline font-bold p-4 rounded-2xl transition-all hover:bg-muted"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
      {searchOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center p-8">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-xl bg-background rounded-2xl shadow-2xl p-6">
            <label className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (results.length > 0) router.push(results[0].href);
                    setSearchOpen(false);
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
                placeholder="Search pages... (Cmd/Ctrl+K)"
                className="w-full bg-transparent outline-none text-lg"
              />
            </label>

            <div className="mt-4 space-y-2">
              {results.length === 0 ? (
                <div className="text-sm text-muted-foreground">No results</div>
              ) : (
                results.map((r) => (
                  <a key={r.href} href={r.href} onClick={() => setSearchOpen(false)} className="block p-3 rounded-lg hover:bg-muted/10">
                    <div className="font-bold">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.href}</div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
