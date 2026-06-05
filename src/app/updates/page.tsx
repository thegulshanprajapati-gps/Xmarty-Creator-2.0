'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Zap, Calendar, Rocket, Award, Info, Search, ArrowRight, MessageSquare, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const UPDATES = [
  {
    id: '1',
    title: 'XmartyCreator V2.4 Launch: Orchestration Engine',
    type: 'Announcement',
    date: 'Today',
    content: 'We are excited to unveil our new dynamic CMS and orchestration engine that gives students unprecedented control over their learning environment. Explore brand-new features in your dashboard.',
    icon: Rocket,
    color: null
  },
  {
    id: '2',
    title: 'New Course: Advanced System Design',
    type: 'Course',
    date: 'Yesterday',
    content: 'Master high-scale distributed systems with our latest module led by enterprise architects. Perfect for engineering roles.',
    icon: Award,
    color: null
  },
  {
    id: '3',
    title: 'Q4 Internship Drive Now Open',
    type: 'Internship',
    date: '2 days ago',
    content: 'Connect with over 50 top tech firms for real-world project placements through XmartyCreator support. Apply before the deadline.',
    icon: Zap,
    color: null
  },
  {
    id: '4',
    title: 'Live Workshop: React 19 Patterns',
    type: 'Event',
    date: 'Oct 28, 2024',
    content: 'Join our lead educator for an intensive session on modern React 19 architectural patterns and best practices.',
    icon: MessageSquare,
    color: null
  }
];

export default function UpdatesPage() {
  return (
    <div className="w-full bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-8 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm shadow-sm"
            >
              <Bell className="h-4 w-4 animate-bounce" /> LIVE STATUS: NOMINAL
            </motion.div>
            <h1 className="text-6xl lg:text-7xl font-headline font-bold tracking-tight">
              Platform <span className="text-primary">Updates</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Real-time synchronization of the XmartyCreator ecosystem. Follow for announcements, internship alerts, and curriculum drops.
            </p>
          </div>

          {/* Feed */}
          <div className="space-y-8 relative before:absolute before:left-0 md:before:left-6 before:top-0 before:h-full before:w-px before:bg-primary/10 before:hidden md:before:block">
            {UPDATES.map((update, idx) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative md:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[20px] top-8 h-3 w-3 rounded-full bg-primary hidden md:block border-4 border-background" />
                
                <Card className="border-primary/5 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-sm", "text-primary bg-primary/10 dark:bg-primary/30")}>
                          <update.icon className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold uppercase tracking-widest text-[10px]">{update.type}</Badge>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{update.date}</span>
                          </div>
                          <h3 className="text-2xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">{update.title}</h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">{update.content}</p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button className="font-bold rounded-xl h-12 px-8 shadow-lg shadow-primary/20">
                        View Details
                      </Button>
                      <Button variant="ghost" className="font-bold rounded-xl h-12 px-6 group border-2 border-transparent hover:border-primary/10">
                        Share Update <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-primary text-primary-foreground rounded-[3rem] p-12 text-center space-y-8 shadow-[0_20px_50px_rgba(var(--primary),0.2)]">
              <div className="h-20 w-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
                <Bell className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold">Never miss an update.</h2>
                <p className="text-xl opacity-80 max-w-xl mx-auto">Join 45,000+ creators receiving real-time synchronization alerts from XmartyCreator.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 font-bold text-lg rounded-2xl shadow-xl">
                  Enable Notifications
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 h-14 px-10 font-bold text-lg rounded-2xl">
                  Follow Telegram
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
