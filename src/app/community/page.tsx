'use client';

import { useState, useEffect } from "react";
import { useContentBlock } from "@/hooks/use-content-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Sparkles, Send, Play, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  // SEO Content Blocks
  const seoTitle = useContentBlock("community", "seo", "title", "Community - XmartyCreator", "text");
  const seoDesc = useContentBlock("community", "seo", "description", "Join the XmartyCreator community. Connect, learn, build and grow together.", "text");
  const seoKeywords = useContentBlock("community", "seo", "keywords", "community, learning, coding, support", "text");

  // Hero Section Blocks
  const heroBadge = useContentBlock("community", "hero", "badgeText", "Community HQ", "text");
  const heroTitle = useContentBlock("community", "hero", "title", "Community", "text");
  const heroSubtitle = useContentBlock("community", "hero", "subtitle", "Connects with social...", "text");
  const heroWhatsappLink = useContentBlock("community", "hero", "whatsappLink", "#", "text");
  const heroIntroLink = useContentBlock("community", "hero", "introLink", "#", "text");
  const heroChannelsStat = useContentBlock("community", "hero", "channelsStat", "WhatsApp, Telegram, App", "text");
  const heroEventsStat = useContentBlock("community", "hero", "eventsStat", "Weekly sessions", "text");

  // Video Section Blocks
  const videoEmbedUrl = useContentBlock("community", "video", "youtubeEmbedUrl", "https://www.youtube.com/embed/dQw4w9WgXcQ", "text");

  // Hub Banner Blocks
  const hubBadge = useContentBlock("community", "hub", "badgeText", "Coming soon", "text");
  const hubTitle = useContentBlock("community", "hub", "title", "Join our Community Hub", "text");
  const hubDesc = useContentBlock("community", "hub", "description", "A dedicated space for events, resources, and member shout-outs. Launching shortly.", "text");
  const hubButtonText = useContentBlock("community", "hub", "buttonText", "Open hub", "text");
  const hubButtonLink = useContentBlock("community", "hub", "buttonLink", "#", "text");

  // Benefits Section Blocks
  const benefitsBadge = useContentBlock("community", "benefits", "badgeText", "Why join our community", "text");
  const benefitsTitle = useContentBlock("community", "benefits", "title", "Learn, build, and grow together", "text");
  const benefitsSubtitle = useContentBlock("community", "benefits", "subtitle", "Get instant updates, live doubt-solving, weekly challenges, and exclusive resources curated for you.", "text");

  // Channels Section Blocks
  const channelsBadge = useContentBlock("community", "channels", "badgeText", "Join our communities", "text");
  const channelsTitle = useContentBlock("community", "channels", "title", "Pick your favorite channel", "text");
  const channelsSubtitle = useContentBlock("community", "channels", "subtitle", "Choose where you want to stay connected with Xmarty Creator", "text");
  const channelsWhatsappLink = useContentBlock("community", "channels", "whatsappLink", "#", "text");
  const channelsAppLink = useContentBlock("community", "channels", "appLink", "#", "text");
  const channelsTelegramLink = useContentBlock("community", "channels", "telegramLink", "#", "text");
  const channelsYoutubeLink = useContentBlock("community", "channels", "youtubeLink", "#", "text");

  // User reviews states & hooks
  const [blogs, setBlogs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const refreshReviews = () => {
    const saved = localStorage.getItem("community_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      const defaultReviews = [
        {
          id: "1",
          name: "Aarav Sharma",
          rating: "5",
          comment: "This platform is absolutely amazing! The Kushal Yuva Program (KYP) details helped me register without any issues.",
          blogTitle: "Kushal Yuva Program (KYP) Complete Enrollment Guide",
          blogSlug: "kyp-complete-enrollment-guide",
          date: "Jun 5, 2026"
        },
        {
          id: "2",
          name: "Neha Patel",
          rating: "5",
          comment: "I love the detailed content modules. The instructions are so clear, and the resource downloads work perfectly.",
          blogTitle: "Next.js Production-Grade Best Practices",
          blogSlug: "nextjs-production-grade-best-practices",
          date: "May 28, 2026"
        }
      ];
      localStorage.setItem("community_reviews", JSON.stringify(defaultReviews));
      setReviews(defaultReviews);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogs();
    refreshReviews();
  }, []);

  return (
    <div className="w-full bg-[#FAFCFF] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <style>{`
        @keyframes flow-dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.85;
          }
        }
        @keyframes float-nodes {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .node-flow-line {
          stroke-dasharray: 6 4;
          animation: flow-dash 1.5s linear infinite;
        }
        .node-outer-glow {
          transform-origin: center;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .node-container-float {
          animation: float-nodes 4s ease-in-out infinite;
        }
      `}</style>
      <title>{String(seoTitle.value)}</title>
      <meta name="description" content={String(seoDesc.value)} />
      <meta name="keywords" content={String(seoKeywords.value)} />

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        
        {/* 1. Hero Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column info */}
          <div className="space-y-6">
            <Badge className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-1 rounded-full font-bold text-xs tracking-wider flex items-center gap-1.5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              {String(heroBadge.value)}
            </Badge>

            <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              {String(heroTitle.value)}
            </h1>

            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {String(heroSubtitle.value)}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white h-12 px-6 font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                <a href={String(heroWhatsappLink.value)} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-whatsapp text-lg"></i> Join WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 h-12 px-6 font-bold text-sm rounded-xl flex items-center gap-2">
                <a href={String(heroIntroLink.value)} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 fill-current" /> Watch Intro
                </a>
              </Button>
            </div>

            {/* Stats Blocks Container */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">CHANNELS</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{String(heroChannelsStat.value)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">LIVE EVENTS</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{String(heroEventsStat.value)}</span>
              </div>
            </div>
          </div>

          {/* Right Column visual: triangle node graphic inside soft container */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl bg-[#F0F5FF] dark:bg-[#111827] flex items-center justify-center border border-[#E0EBFD] dark:border-slate-800/80 shadow-inner">
              <svg width="220" height="220" viewBox="0 0 200 200" className="text-rose-500/85 dark:text-rose-400/85 node-container-float">
                {/* SVG Connections with Flow animation */}
                <line x1="100" y1="45" x2="50" y2="140" stroke="currentColor" strokeWidth="2" className="node-flow-line" />
                <line x1="100" y1="45" x2="150" y2="140" stroke="currentColor" strokeWidth="2" className="node-flow-line" />
                <line x1="50" y1="140" x2="150" y2="140" stroke="currentColor" strokeWidth="2" className="node-flow-line" />
                
                {/* Top Node Outer Glow */}
                <circle cx="100" cy="45" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="node-outer-glow" style={{ animationDelay: '0s' }} />
                <circle cx="100" cy="45" r="6" fill="currentColor" />
                
                {/* Bottom Left Node Outer Glow */}
                <circle cx="50" cy="140" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="node-outer-glow" style={{ animationDelay: '1s' }} />
                <circle cx="50" cy="140" r="6" fill="currentColor" />
                
                {/* Bottom Right Node Outer Glow */}
                <circle cx="150" cy="140" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="node-outer-glow" style={{ animationDelay: '2s' }} />
                <circle cx="150" cy="140" r="6" fill="currentColor" />
              </svg>
            </div>
          </div>
        </section>

        {/* 2. KYP YouTube Video Embed Section */}
        <section className="w-full">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-black">
            <iframe 
              className="w-full h-full"
              src={String(videoEmbedUrl.value)} 
              title="Community Intro Video" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </section>

        {/* 3. Community Hub CTA Banner */}
        <section>
          <div className="w-full bg-gradient-to-r from-blue-550/10 to-indigo-500/10 bg-[#EEF2F6] dark:bg-[#1E1B4B]/10 border border-[#D5E1FF] dark:border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <Badge className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold px-2.5 py-0.5 rounded-full text-xs">
                {String(hubBadge.value)}
              </Badge>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{String(hubTitle.value)}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">{String(hubDesc.value)}</p>
            </div>
            <Button asChild className="bg-white hover:bg-slate-50 text-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-blue-400 border border-[#CBD5E1] dark:border-slate-800 font-bold text-xs h-11 px-5 rounded-xl shrink-0 gap-1 shadow-sm">
              <Link href={String(hubButtonLink.value)}>
                {String(hubButtonText.value)} <span className="text-sm">→</span>
              </Link>
            </Button>
          </div>
        </section>

        {/* 4. Benefits Section ("Learn, build, and grow together") */}
        <section className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge className="bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-800 px-3 py-1 rounded-full font-bold text-xs tracking-wider uppercase">
              {String(benefitsBadge.value)}
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {String(benefitsTitle.value)}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {String(benefitsSubtitle.value)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Instant updates */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center text-blue-500">
                <Send className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">Instant updates</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Never miss drops, deadlines, or release notes.
                </p>
              </div>
            </div>

            {/* Card 2: Peer power */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center text-blue-500">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">Peer power</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Team up for projects, mock interviews, and accountability.
                </p>
              </div>
            </div>

            {/* Card 3: Exclusive goodies */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center text-blue-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">Exclusive goodies</h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Early access templates, notes, and surprise bonuses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pick your favorite channel section */}
        <section className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge className="bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-800 px-3 py-1 rounded-full font-bold text-xs tracking-wider uppercase">
              {String(channelsBadge.value)}
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {String(channelsTitle.value)}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {String(channelsSubtitle.value)}
            </p>
          </div>

          {/* 4 Gradient Channel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WhatsApp */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-b from-[#10B981] to-[#059669] dark:from-[#10B981]/90 dark:to-[#059669]/90 p-6 flex flex-col justify-between aspect-[3/4] text-white shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-15 text-white/50 pointer-events-none">
                <i className="fa-brands fa-whatsapp text-8xl"></i>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <i className="fa-brands fa-whatsapp text-2xl"></i>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">WhatsApp</h3>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Get instant updates, notes, and quick support from the main group.
                  </p>
                </div>
              </div>
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 font-semibold text-xs h-10 rounded-xl relative z-10 text-white">
                <a href={String(channelsWhatsappLink.value)} target="_blank" rel="noopener noreferrer">
                  Join <span className="ml-1">→</span>
                </a>
              </Button>
            </div>

            {/* App */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] dark:from-[#2563EB]/95 dark:to-[#1E3A8A]/95 p-6 flex flex-col justify-between aspect-[3/4] text-white shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-15 text-white/50 pointer-events-none">
                <Download className="h-24 w-24" />
              </div>
              <div className="space-y-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Download className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">App</h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Access classes, announcements, and community resources in one place.
                  </p>
                </div>
              </div>
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 font-semibold text-xs h-10 rounded-xl relative z-10 text-white">
                <a href={String(channelsAppLink.value)} target="_blank" rel="noopener noreferrer">
                  Download <span className="ml-1">→</span>
                </a>
              </Button>
            </div>

            {/* Telegram */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-b from-[#06B6D4] to-[#0369A1] dark:from-[#0891B2]/95 dark:to-[#075985]/95 p-6 flex flex-col justify-between aspect-[3/4] text-white shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-15 text-white/50 pointer-events-none">
                <i className="fa-brands fa-telegram text-8xl"></i>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <i className="fa-brands fa-telegram text-2xl"></i>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">Telegram</h3>
                  <p className="text-xs text-cyan-100 leading-relaxed">
                    Join focused discussion channels and fast-moving updates.
                  </p>
                </div>
              </div>
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 font-semibold text-xs h-10 rounded-xl relative z-10 text-white">
                <a href={String(channelsTelegramLink.value)} target="_blank" rel="noopener noreferrer">
                  Join <span className="ml-1">→</span>
                </a>
              </Button>
            </div>

            {/* YouTube */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-b from-[#EF4444] to-[#B91C1C] dark:from-[#DC2626]/95 dark:to-[#991B1B]/95 p-6 flex flex-col justify-between aspect-[3/4] text-white shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-15 text-white/50 pointer-events-none">
                <i className="fa-brands fa-youtube text-8xl"></i>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <i className="fa-brands fa-youtube text-2xl"></i>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">YouTube</h3>
                  <p className="text-xs text-red-100 leading-relaxed">
                    Watch latest videos, tutorials, and live sessions from Xmarty Creator.
                  </p>
                </div>
              </div>
              <Button asChild className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 font-semibold text-xs h-10 rounded-xl relative z-10 text-white">
                <a href={String(channelsYoutubeLink.value)} target="_blank" rel="noopener noreferrer">
                  Subscribe <span className="ml-1">→</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* 6. User Reviews Section */}
        <section className="border-t border-slate-200 dark:border-slate-800 pt-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 px-3 py-1 rounded-full font-bold text-xs tracking-wider uppercase">
                Reviews
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                User Reviews & Blog Comments
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl font-medium">
                Hear what our community has to say about our platform resources and recent articles.
              </p>
            </div>
            
            {/* Modal Dialog Trigger */}
            <ReviewDialog blogs={blogs} onReviewAdded={refreshReviews} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium col-span-2 text-center py-6">No reviews submitted yet. Be the first to leave one!</p>
            ) : (
              reviews.map((rev: any) => (
                <div key={rev.id} className="p-6 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 shadow-sm flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white">{rev.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={cn(
                            "fa-solid fa-star text-xs",
                            i < Number(rev.rating) ? "text-amber-500" : "text-slate-200 dark:text-slate-800"
                          )}
                        ></i>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-355 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                  
                  {rev.blogTitle && (
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Commented on:</span>
                      <Link
                        href={`/blog/${rev.blogSlug || rev.blogTitle}`}
                        className="text-blue-500 hover:underline font-semibold flex items-center gap-1"
                      >
                        {rev.blogTitle} <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

// ── Review Dialog Component ──
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function ReviewDialog({ blogs, onReviewAdded }: { blogs: any[]; onReviewAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedBlog, setSelectedBlog] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const matchedBlog = blogs.find(b => b.id === selectedBlog || b.title === selectedBlog);

    const newReview = {
      id: String(Date.now()),
      name,
      comment,
      rating,
      blogTitle: matchedBlog ? matchedBlog.title : selectedBlog || null,
      blogSlug: matchedBlog ? (matchedBlog.slug || matchedBlog.id) : null,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const current = localStorage.getItem("community_reviews");
    const list = current ? JSON.parse(current) : [];
    list.unshift(newReview);
    localStorage.setItem("community_reviews", JSON.stringify(list));

    // Reset values
    setName("");
    setComment("");
    setRating(5);
    setSelectedBlog("");
    setOpen(false);
    onReviewAdded();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm h-11 px-6 rounded-xl shadow-sm">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Leave your review</DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Share your comments about our platform resources and recent articles.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Rating</label>
            <div className="flex items-center gap-1 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-xl focus:outline-none transition-transform active:scale-95"
                >
                  <i className={cn("fa-star text-amber-500", star <= rating ? "fa-solid" : "fa-regular")}></i>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Associated Blog</label>
            <select
              value={selectedBlog}
              onChange={(e) => setSelectedBlog(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-950"
            >
              <option value="" className="text-slate-400 dark:bg-slate-950">-- None / General Platform --</option>
              {blogs.map((b) => (
                <option key={b.id} value={b.id} className="dark:bg-slate-950">
                  {b.title.replace(/<[^>]*>/g, '')}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Comment / Review</label>
            <textarea
              required
              rows={4}
              placeholder="What did you think of the article or resources?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md">
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
