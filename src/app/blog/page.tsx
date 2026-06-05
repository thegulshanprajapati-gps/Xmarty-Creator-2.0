'use client';

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const DEFAULT_BLOGS = [
  {
    id: '1',
    title: 'The Future of Web Architecture in 2024',
    slug: 'the-future-of-web-architecture-in-2024',
    excerpt: 'Exploring how server-side rendering and AI-driven design are reshaping the digital landscape...',
    author: 'Admin Sarah',
    date: 'Oct 24, 2024',
    readTime: '8 min',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Mastering the XmartyCreator Workflow',
    slug: 'mastering-the-xmartycreator-workflow',
    excerpt: 'A comprehensive guide to using our dynamic CMS and enterprise modules for your next big project...',
    author: 'Marcus Aurelius',
    date: 'Oct 20, 2024',
    readTime: '12 min',
    category: 'Guide',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Why AI-Powered Learning is the New Gold Standard',
    slug: 'why-ai-powered-learning-is-the-new-gold-standard',
    excerpt: 'How tools like Vasant AI are helping students bridge the gap between theory and real-world execution...',
    author: 'Vasant AI Team',
    date: 'Oct 15, 2024',
    readTime: '6 min',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>(DEFAULT_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('xmarty_blogs');
      if (stored) {
        setBlogs(JSON.parse(stored));
      } else {
        localStorage.setItem('xmarty_blogs', JSON.stringify(DEFAULT_BLOGS));
      }
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
  }, []);

  // Update Page Title / Tab Name dynamically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = "Xmarty Creator Journal";
    }
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category || 'General')))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Find the featured blog (prefer designated true, fallback to first in list)
  const featuredBlog = filteredBlogs.find(b => b.featured) || filteredBlogs[0];
  const standardBlogs = filteredBlogs.filter(b => b.id !== featuredBlog?.id);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10 relative z-10">
        
        {/* Header - Premium Red Theme */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-widest">
              <BookOpen className="h-4 w-4" /> Insights & News
            </div>
            <h1 className="text-4xl font-headline font-black tracking-tight text-slate-950 dark:text-white leading-tight">
              Creator <span className="text-red-500 underline decoration-red-500/20 decoration-wavy underline-offset-4">Journal</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Discover articles, guides, and updates from our engineering network.</p>
          </div>
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-11 text-sm rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/60 focus-visible:ring-red-500 focus-visible:ring-1 shadow-sm" 
              />
            </div>
          </div>
        </div>

        {/* Category Pills Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                  : "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-red-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Hero Banner */}
        {featuredBlog && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Featured Article</h2>
            <Link href={`/blog/${featuredBlog.slug || featuredBlog.id}`} className="block group">
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 shadow-md group-hover:border-red-500/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Section */}
                <div className="relative h-64 lg:h-auto lg:col-span-7 min-h-60 overflow-hidden">
                  <Image
                    src={featuredBlog.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-101"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white border-none font-bold text-xs py-1 px-3 shadow-md rounded">
                      {featuredBlog.category}
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredBlog.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredBlog.readTime}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-headline font-black text-slate-950 dark:text-white group-hover:text-red-500 transition-colors leading-tight">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                      {featuredBlog.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300">By {featuredBlog.author}</span>
                    <span className="text-red-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Featured Post <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Standard Related Articles Grid */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standardBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 rounded-xl overflow-hidden group hover:border-red-500/40 hover:shadow-md transition-all duration-300 flex items-stretch h-48">
                  
                  {/* Thumbnails */}
                  <div className="relative w-40 sm:w-44 overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900">
                    <Image 
                      src={blog.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=300&q=80'} 
                      alt={blog.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-102" 
                      data-ai-hint="blog preview" 
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <Badge className="bg-red-500 text-white border-none font-bold text-xs py-0.5 px-2 shadow-sm rounded">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow min-w-0">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {blog.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {blog.readTime}
                        </span>
                      </div>
                      
                      <Link href={`/blog/${blog.slug || blog.id}`} className="block">
                        <CardTitle className="text-base font-bold text-slate-950 dark:text-white group-hover:text-red-500 transition-colors leading-tight line-clamp-2">
                          {blog.title}
                        </CardTitle>
                      </Link>
                      
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-sm mt-2">
                      <span className="font-semibold text-slate-600 dark:text-slate-400 truncate max-w-[120px]">By {blog.author}</span>
                      <Link href={`/blog/${blog.slug || blog.id}`} className="text-red-500 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Read Article <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                </Card>
              </motion.div>
            ))}

            {filteredBlogs.length === 0 && (
              <div className="col-span-full text-center py-16 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950/20 border rounded-2xl">
                No matching articles found. Try searching for other topics.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
