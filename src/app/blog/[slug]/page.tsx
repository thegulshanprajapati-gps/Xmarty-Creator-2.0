'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, User, ArrowLeft, ArrowRight, Share2, Copy, Send, Star, MessageSquare, BookOpen, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const DEFAULT_BLOGS = [
  {
    id: '1',
    title: 'The Future of Web Architecture in 2024',
    slug: 'the-future-of-web-architecture-in-2024',
    excerpt: 'Exploring how server-side rendering and AI-driven design are reshaping the digital landscape...',
    content: `<h2>Introduction to RSCs</h2><p>Web architecture is evolving at a breakneck speed. As we move into 2024, the integration of Server-Side Rendering (SSR) with React Server Components (RSC) is becoming the baseline standard for high-performance applications.</p>
    <h2>AI-Driven Interfaces</h2><p>Furthermore, artificial intelligence is no longer just a backend helper; it is actively shaping dynamic user interfaces in real-time. By utilizing edge networks and modern CMS pipelines, creators can deliver customized content instances to users in milliseconds.</p>
    <h2>Core Architectural Takeaways</h2><p>XmartyCreator stands at the forefront of this shift, ensuring our developers are equipped with the exact modular tools needed to orchestrate these modern web frameworks.</p>`,
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
    content: `<h2>Workspace Foundations</h2><p>Getting started with a new development ecosystem can be challenging. This guide breaks down the core concepts of the XmartyCreator workspace architecture.</p>
    <h2>Database Driver Integration</h2><p>From connecting database drivers to modifying global client layouts and configuring initial theme variables, we take you step-by-step through the optimal development cycle.</p>
    <h2>CMS Inline Controls</h2><p>We will also explore how to use the built-in Content Management System (CMS) providers to modify page text inline, empowering non-technical stakeholders to collaborate on copies without git commits.</p>`,
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
    content: `<h2>The Scaling Education Problem</h2><p>Traditional education methods often struggle to scale when dealing with complex, fast-changing technology sectors.</p>
    <h2>Vasant AI Core Competencies</h2><p>AI assistants like Vasant AI solve this bottleneck by providing context-aware, immediate answers to students' compilation and logical queries. Vasant is trained on our core course structure to assist with student projects, debugging, and framework configurations in real time.</p>
    <h2>Hands-on Debugging Loops</h2><p>This allows students to learn at their own pace, transforming passive video absorption into an active, hands-on debugging loop that mirrors a real-world software engineering job.</p>`,
    author: 'Vasant AI Team',
    date: 'Oct 15, 2024',
    readTime: '6 min',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  }
];

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>(DEFAULT_BLOGS);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Review states
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerComment, setReviewerComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Sibling navigation
  const [prevPost, setPrevPost] = useState<any>(null);
  const [nextPost, setNextPost] = useState<any>(null);

  // Related posts
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('xmarty_blogs');
      const blogsList = stored ? JSON.parse(stored) : DEFAULT_BLOGS;
      setBlogs(blogsList);

      const currentIndex = blogsList.findIndex(
        (b: any) => b.slug === params.slug || b.id === params.slug
      );

      if (currentIndex !== -1) {
        const found = blogsList[currentIndex];
        setBlog(found);

        // Set siblings
        setPrevPost(currentIndex > 0 ? blogsList[currentIndex - 1] : null);
        setNextPost(currentIndex < blogsList.length - 1 ? blogsList[currentIndex + 1] : null);

        // Set related posts (filter current and choose other 2)
        const filtered = blogsList.filter((b: any) => b.id !== found.id).slice(0, 2);
        setRelatedPosts(filtered);

        // Load reviews
        const savedReviews = localStorage.getItem(`reviews_${found.id}`);
        setReviews(savedReviews ? JSON.parse(savedReviews) : []);
      } else {
        setBlog(null);
      }
    } catch (e) {
      const found = DEFAULT_BLOGS.find(
        (b: any) => b.slug === params.slug || b.id === params.slug
      );
      setBlog(found || null);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  // Update Page Title / Tab Name dynamically based on loaded article
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (blog) {
        const cleanTitle = blog.title.replace(/<[^>]*>/g, '').trim();
        document.title = `${cleanTitle} | Xmarty Creator Journal`;
      } else if (!loading) {
        document.title = "Article Not Found | Xmarty Creator Journal";
      }
    }
  }, [blog, loading]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied", description: "Article URL copied to clipboard!" });
    }
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      toast({ variant: "destructive", title: "Missing details", description: "Please enter your name and comment." });
      return;
    }

    const newReview = {
      id: String(Date.now()),
      name: reviewerName,
      comment: reviewerComment,
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${blog.id}`, JSON.stringify(updated));

    setReviewerName('');
    setReviewerComment('');
    setRating(5);
    toast({ title: "Review Submitted", description: "Thank you for reviewing this post!" });
  };

  // Simple Heading parser to build a Table of Contents (extract h2 tags)
  const extractHeadings = (htmlContent: string) => {
    if (!htmlContent) return [];
    const headings: string[] = [];
    const regex = /<h2[^>]*>(.*?)<\/h2>/g;
    let match;
    while ((match = regex.exec(htmlContent)) !== null) {
      headings.push(match[1].replace(/<[^>]*>/g, ''));
    }
    return headings;
  };

  const headingsList = blog ? extractHeadings(blog.content) : [];

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712]">
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="h-8 w-8 text-red-500 animate-pulse" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Loading article details...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712] px-4 text-center">
        <h2 className="text-2xl font-headline font-bold text-slate-950 dark:text-white mb-2">Article Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">The blog post you are trying to view does not exist or has been deleted.</p>
        <Button asChild className="bg-red-500 hover:bg-red-650 text-white rounded-lg">
          <Link href="/blog" className="text-white hover:text-white flex items-center">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Journal
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative pb-16">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-4 py-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Article content and review modules */}
        <div className="lg:col-span-8 space-y-6">
          <Button variant="ghost" asChild className="text-slate-500 hover:text-red-500 pl-0">
            <Link href="/blog" className="text-slate-500 hover:text-red-500 flex items-center">
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Journal
            </Link>
          </Button>

          {/* Heading */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 text-white border-none font-bold text-xs py-0.5 px-2.5 rounded">
                Category: {blog.category || 'General'}
              </Badge>
              {blog.featured && (
                <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-bold text-xs py-0.5 px-2.5 rounded">
                  Featured Article
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black tracking-tight text-slate-950 dark:text-white leading-tight">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Clean metadata strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-slate-800 py-3.5 font-medium">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <User className="h-4 w-4 text-red-500" /> By {blog.author || 'Admin'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-slate-400" /> Published {blog.date}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" /> {blog.readTime || '5 min'} read
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
            <Image 
              src={blog.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'} 
              alt={blog.title} 
              fill 
              className="object-cover" 
              priority
            />
          </div>

          {/* Content Body */}
          <article className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:font-headline prose-headings:font-bold prose-headings:text-slate-950 dark:prose-headings:text-white prose-a:text-red-500 pt-4 space-y-4">
            <div dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }} />
          </article>

          {/* Next / Previous Sibling Controls */}
          <div className="grid grid-cols-2 gap-4 border-y border-slate-200 dark:border-slate-800 py-6">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug || prevPost.id}`} className="group text-left space-y-1 block max-w-xs">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1 group-hover:text-red-500 transition-colors">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:underline">{prevPost.title}</p>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug || nextPost.id}`} className="group text-right space-y-1 block max-w-xs ml-auto">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center justify-end gap-1 group-hover:text-red-500 transition-colors">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:underline">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Review System */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <MessageSquare className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-headline font-bold text-slate-950 dark:text-white">User Reviews ({reviews.length})</h3>
            </div>

            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 p-6 rounded-2xl shadow-sm">
              <form onSubmit={submitReview} className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Leave a Review</h4>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setRating(val)}
                        onMouseEnter={() => setHoverRating(val)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-yellow-400 hover:scale-115 transition-transform"
                      >
                        <Star 
                          className="h-6 w-6" 
                          fill={val <= (hoverRating || rating) ? "currentColor" : "none"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Your Name</label>
                    <input 
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-1 focus:ring-red-500 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Feedback Comment</label>
                    <textarea 
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      placeholder="Share your feedback..."
                      className="w-full h-24 p-3 rounded-lg border bg-background text-sm focus:ring-1 focus:ring-red-500 outline-none resize-none"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-red-500 hover:bg-red-650 text-white font-bold rounded-lg h-10 px-5">
                  Submit Review <Send className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </form>
            </Card>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-white dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-950 dark:text-white">{rev.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{rev.date}</p>
                    </div>
                    <div className="flex text-yellow-400 gap-0.5">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star 
                          key={starIdx} 
                          className="h-3.5 w-3.5" 
                          fill={starIdx < rev.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}

              {reviews.length === 0 && (
                <div className="text-center py-6 text-sm text-slate-400 dark:text-slate-500">
                  No reviews yet. Share your experience!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column - Sticky structure */}
        <div className="lg:col-span-4 lg:sticky lg:top-[104px] space-y-6 self-start">
          
          {/* Table of Contents Widget */}
          {headingsList.length > 0 && (
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
              <CardHeader className="p-4 border-b border-slate-100 dark:border-slate-800/80">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <nav className="space-y-2.5">
                  {headingsList.map((head, idx) => (
                    <div key={idx} className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 cursor-pointer">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 shrink-0" />
                      <span>{head}</span>
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
          )}

          {/* Related Articles Widget */}
          {relatedPosts.length > 0 && (
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
              <CardHeader className="p-4 border-b border-slate-100 dark:border-slate-800/80">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {relatedPosts.map((post) => (
                  <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="flex gap-3 items-center group">
                    <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900 border">
                      <Image
                        src={post.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=100&q=80'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-red-500 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{post.category}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Share Widget */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 shadow-sm">
            <CardHeader className="p-4 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <Share2 className="h-4 w-4 text-red-500 animate-pulse" />
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Share Article</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-2.5">
              <button 
                onClick={handleCopyLink} 
                className="w-full flex items-center justify-between p-2 rounded-lg border bg-background hover:border-red-500/30 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all text-left"
              >
                Copy Link URL <Copy className="h-3.5 w-3.5" />
              </button>
              
              <div className="grid grid-cols-3 gap-2">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center p-2 rounded-lg border bg-background hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold gap-1"
                >
                  <i className="fa-brands fa-twitter text-sm text-sky-400"></i> X
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center p-2 rounded-lg border bg-background hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold gap-1"
                >
                  <i className="fa-brands fa-linkedin text-sm text-indigo-500"></i> LI
                </a>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center p-2 rounded-lg border bg-background hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold gap-1"
                >
                  <i className="fa-brands fa-whatsapp text-sm text-emerald-500"></i> WA
                </a>
              </div>
            </CardContent>
          </Card>

        </div>

      </main>
    </div>
  );
}
