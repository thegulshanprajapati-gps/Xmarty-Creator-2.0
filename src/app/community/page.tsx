'use client';

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, ArrowRight, Zap, Globe, Heart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
  const highlights = [
    { title: "Study Circles", count: "12 Groups", icon: Users },
    { title: "Daily Chats", count: "450+ Active", icon: MessageSquare },
    { title: "Live Reviews", count: "Weekly Friday", icon: Zap },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-0">
      <main className="max-w-5xl mx-auto px-4 py-2 space-y-8">
        
        {/* Compact Hero Section */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-md font-bold text-xs tracking-widest uppercase">
            Global Hub
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-headline font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Learn and Grow <span className="text-red-500 underline decoration-red-500/30 decoration-wavy underline-offset-4">Together</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Connect with 45,000+ passionate creators, developers, and designers building the future together at XmartyCreator.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button className="bg-red-500 hover:bg-red-600 text-white h-11 px-6 font-bold text-sm rounded-lg shadow-sm">
              <i className="fa-brands fa-discord mr-1.5 text-base"></i> Join Discord Server
            </Button>
            <Button variant="outline" className="border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 h-11 px-6 font-bold text-sm rounded-lg">
              Explore Channels
            </Button>
          </div>
        </section>

        {/* Highlight Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-slate-200 dark:border-slate-800 py-4">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div className="h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                <h.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-950 dark:text-white">{h.title}</h4>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">{h.count}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Hub Selection Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-headline font-bold text-slate-950 dark:text-white">Active Channels</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Pick the platform that matches your communication style.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <HubCard 
               title="The Discord Matrix" 
               desc="Our primary engineering hub for technical discussions, real-time debugging, and live streaming events." 
               platform="Discord"
               color="bg-indigo-600 dark:bg-indigo-500"
               iconClass="fa-brands fa-discord"
               image="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=400&q=80"
            />
            <HubCard 
               title="WhatsApp Circles" 
               desc="Fast, focused groups for direct course announcements, updates, and local workspace meetups." 
               platform="WhatsApp"
               color="bg-emerald-600 dark:bg-emerald-500"
               iconClass="fa-brands fa-whatsapp"
               image="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=400&q=80"
            />
            <HubCard 
               title="Telegram Broadcasts" 
               desc="Instant access to asset resource drops, tech career alerts, and platform news feeds." 
               platform="Telegram"
               color="bg-sky-600 dark:bg-sky-500"
               iconClass="fa-brands fa-telegram"
               image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80"
            />
          </div>
        </section>

        {/* Compact Benefits Section */}
        <section className="flex flex-col md:flex-row gap-6 items-center p-6 bg-slate-100/55 dark:bg-slate-950/20 rounded-2xl border border-slate-200 dark:border-slate-800/80">
          <div className="w-full md:w-2/5 relative aspect-video rounded-xl overflow-hidden shadow-sm shrink-0">
            <Image 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80" 
              alt="Community Group" 
              fill 
              className="object-cover" 
              data-ai-hint="community learning" 
            />
          </div>
          <div className="w-full md:w-3/5 space-y-4">
            <div className="space-y-1">
              <Badge className="bg-red-500 text-white font-bold rounded text-xs py-0.5 px-2">Member Perks</Badge>
              <h3 className="text-xl font-headline font-bold text-slate-950 dark:text-white">Why Join the Community?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                XmartyCreator is a launchpad where creators support each other through every step of their career journey.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                "Peer code reviews",
                "Exclusive jobs board",
                "Direct advisor access",
                "Group hackathons",
                "Support logs portal",
                "Portfolio critiques"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 group">
                  <div className="h-5 w-5 rounded-md bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <Heart className="h-3 w-3 fill-current" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function HubCard({ title, desc, platform, color, iconClass, image }: any) {
  return (
    <Card className="overflow-hidden group border border-slate-200 dark:border-slate-800 hover:border-red-500/30 transition-all duration-300 rounded-xl bg-white dark:bg-slate-950/40 shadow-sm flex flex-col justify-between h-88">
      <div>
        <div className="relative h-36 overflow-hidden">
          <Image src={image} alt={platform} fill className="object-cover group-hover:scale-102 transition-transform duration-500" data-ai-hint={platform} />
          <Badge className={cn("absolute top-3 right-3 text-white border-none px-2.5 py-0.5 font-bold shadow-sm text-xs", color)}>
            <i className={cn(iconClass, "mr-1 text-sm")}></i> {platform}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-1">
          <CardTitle className="text-base font-bold text-slate-950 dark:text-white">{title}</CardTitle>
        </CardHeader>
        <div className="px-4 pb-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">{desc}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Button className="w-full h-10 font-bold text-xs rounded-lg transition-all bg-slate-950 hover:bg-slate-900 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 border border-slate-200 dark:border-slate-800">
          Join Hub <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}
