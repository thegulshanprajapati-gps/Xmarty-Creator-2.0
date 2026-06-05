'use client';

import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Award, Users, Rocket, Heart } from "lucide-react";
import { useContentBlock } from "@/hooks/use-content-block";
import Image from "next/image";

export default function AboutPage() {
  const seoTitle = useContentBlock("about", "seo", "title", "About Us - XmartyCreator", "text");
  const seoDesc = useContentBlock("about", "seo", "description", "Learn about XmartyCreator, our story, mission, and how we help creators build real software.", "text");
  const seoKeywords = useContentBlock("about", "seo", "keywords", "about us, mission, story, xmartycreator", "text");

  const values = [
    { title: "Innovation", icon: Rocket, desc: "We push the boundaries of EdTech through AI and modern design." },
    { title: "Quality", icon: Award, desc: "Only the highest standard of industry-relevant curriculum." },
    { title: "Community", icon: Users, desc: "A collaborative ecosystem where creators grow together." },
    { title: "Passion", icon: Heart, desc: "We are educators first, driven by the success of our students." },
  ];

  return (
    <div className="w-full">
      <title>{seoTitle.value}</title>
      <meta name="description" content={seoDesc.value} />
      <meta name="keywords" content={seoKeywords.value} />
      <main className="bg-background text-foreground transition-colors duration-300">
        
        {/* Hero */}
        <section className="py-24 relative overflow-hidden bg-slate-500/[0.02] border-b border-slate-200/40 dark:border-slate-800/40">
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-red-500/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 text-center space-y-8 relative z-10">
            <Badge variant="outline" className="px-4 py-1 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20 uppercase tracking-widest font-extrabold text-[10px] bg-red-500/5">WHO WE ARE</Badge>
            <h1 className="text-6xl lg:text-8xl font-headline font-black tracking-tight leading-none text-slate-900 dark:text-white">
              We are <span className="text-red-600 dark:text-red-500 relative">XmartyCreator</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              XmartyCreator is more than an EdTech platform; it's a launchpad for the next generation of digital architects and creators. We bridge the gap between academic theory and enterprise reality.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b border-slate-200/40 dark:border-slate-800/40 bg-slate-500/[0.01]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: "45K+", label: "Active Students" },
                { number: "150+", label: "Expert Courses" },
                { number: "98%", label: "Satisfaction Rate" },
                { number: "24/7", label: "AI Tutor Support" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1.5">
                  <h3 className="text-4xl lg:text-5xl font-black text-red-600 dark:text-red-500 font-headline tracking-tight">{stat.number}</h3>
                  <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-32 border-b border-slate-200/40 dark:border-slate-800/40">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <Badge variant="outline" className="px-4 py-1 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20 uppercase tracking-widest font-extrabold text-[10px] bg-red-500/5">Our Journey</Badge>
              <h2 className="text-4xl lg:text-5xl font-headline font-black text-slate-900 dark:text-white leading-tight">Our Story</h2>
              <div className="space-y-6 text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <p>
                  XmartyCreator was born out of a simple observation: the tech industry was moving faster than traditional education could keep up. Students were graduating with skills that were already obsolete.
                </p>
                <p>
                  In 2021, we set out to build a platform that treated learning like professional development. We didn't just want to teach code; we wanted to teach architectural thinking, scalability, and design excellence.
                </p>
                <p>
                  Today, XmartyCreator is home to over 45,000 students globally, powered by the Vasant AI Assistant and mentored by some of the brightest minds in the industry.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" alt="Team Workshop" fill className="object-cover" data-ai-hint="team work" />
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-32 bg-slate-500/[0.01] border-b border-slate-200/40 dark:border-slate-800/40 relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row-reverse items-center gap-20 relative z-10">
            <div className="flex-1 space-y-6">
              <Badge variant="outline" className="px-4 py-1 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20 uppercase tracking-widest font-extrabold text-[10px] bg-red-500/5">Meet Our Founder</Badge>
              <h2 className="text-4xl lg:text-5xl font-headline font-black text-slate-900 dark:text-white leading-tight">Gulshan Kumar</h2>
              <p className="text-xs font-bold text-red-600 dark:text-red-500 uppercase tracking-widest -mt-2">Founder & CEO, XmartyCreator</p>
              
              <blockquote className="border-l-4 border-red-500 pl-4 italic text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium">
                "Our mission is simple: we don't just teach syntax, we forge digital architects who build production-grade, scalable software from day one."
              </blockquote>
              
              <div className="space-y-4 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <p>
                  Gulshan Kumar started XmartyCreator with a vision to revolutionize tech education. With years of experience leading engineering teams and building enterprise architectures, he realized that traditional coursework fails to prepare students for real-world software creation.
                </p>
                <p>
                  By introducing AI-mentorship (Vasant AI) and codebases that mirror real tech environments, he bridged the gap between learning and architectural execution. Under his leadership, XmartyCreator has grown into a global community.
                </p>
              </div>

              {/* Founder Social Links */}
              <div className="flex gap-3 pt-2">
                <a href="#" className="h-10 w-10 rounded-xl bg-slate-200/50 hover:bg-red-500/10 text-slate-700 hover:text-red-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-red-500 flex items-center justify-center transition-all">
                  <i className="fa-brands fa-x-twitter text-base"></i>
                </a>
                <a href="#" className="h-10 w-10 rounded-xl bg-slate-200/50 hover:bg-red-500/10 text-slate-700 hover:text-red-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-red-500 flex items-center justify-center transition-all">
                  <i className="fa-brands fa-linkedin-in text-base"></i>
                </a>
                <a href="#" className="h-10 w-10 rounded-xl bg-slate-200/50 hover:bg-red-500/10 text-slate-700 hover:text-red-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-red-500 flex items-center justify-center transition-all">
                  <i className="fa-brands fa-github text-base"></i>
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full relative max-w-sm aspect-[3/4] rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
              <Image 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" 
                alt="Gulshan Kumar, Founder" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-32 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300 border-b border-slate-200/40 dark:border-slate-800/40">
          {/* Glow spots */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-red-500/10 dark:bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[250px] h-[250px] bg-rose-500/5 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 space-y-16 relative z-10">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <Badge variant="outline" className="px-4 py-1 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20 uppercase tracking-widest font-extrabold text-[10px] bg-red-500/5">Our Values</Badge>
              <h2 className="text-4xl lg:text-5xl font-headline font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                The Pillars of Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base font-medium">
                At XmartyCreator, we are driven by core standards designed to empower developers and creators globally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/20 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-lg dark:hover:bg-slate-900/50 transition-all duration-300 space-y-6 text-center group relative overflow-hidden">
                  <div className="h-16 w-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-500 mx-auto group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
                    <v.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{v.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 bg-slate-500/[0.01]">
          <div className="max-w-4xl mx-auto px-4 space-y-16">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="px-4 py-1 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20 uppercase tracking-widest font-extrabold text-[10px] bg-red-500/5">FAQ</Badge>
              <h2 className="text-4xl lg:text-5xl font-headline font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Everything you need to know about the XmartyCreator ecosystem.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "Is XmartyCreator suitable for beginners?", a: "Absolutely. Our curriculum starts from foundations and scales to enterprise levels, ensuring anyone with passion can learn." },
                { q: "What makes Vasant AI different?", a: "Vasant is trained specifically on our curriculum to provide context-aware, 24/7 technical guidance that feels like a real tutor." },
                { q: "Do I get a certificate?", a: "Yes, every completed course includes an industry-verified digital certificate that you can share on LinkedIn." },
                { q: "Can I access courses offline?", a: "Our platform is optimized for web access, but all resource materials and code templates are downloadable for offline use." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-950/40 rounded-2xl px-6">
                  <AccordionTrigger className="text-base md:text-lg font-bold hover:no-underline text-slate-900 dark:text-white py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
}
