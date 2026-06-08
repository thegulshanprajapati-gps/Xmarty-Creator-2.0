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

// ─── Premium Magazine Loader ─────────────────────────────────────────────────
function MagazineLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative flex flex-col items-center gap-8 select-none">
        {/* Animated pages */}
        <div className="relative w-44 h-32 perspective-1000">
          {/* Back page shadow */}
          <div
            className="absolute inset-0 rounded-xl border border-red-200/30 dark:border-red-900/30 bg-gradient-to-br from-red-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-xl"
            style={{ transform: 'rotate(-6deg) translateX(-6px)', transformOrigin: 'left center' }}
          />
          {/* Middle page */}
          <div
            className="absolute inset-0 rounded-xl border border-red-200/40 dark:border-red-900/40 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 shadow-lg"
            style={{
              transform: 'rotate(-2deg) translateX(-2px)',
              transformOrigin: 'left center',
              animation: 'pageFlutter 2.4s ease-in-out infinite',
            }}
          >
            {/* Fake text lines */}
            <div className="p-5 space-y-2.5 opacity-40">
              <div className="h-2 w-3/4 bg-current rounded-full animate-pulse" />
              <div className="h-1.5 w-full bg-current rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="h-1.5 w-5/6 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="h-1.5 w-4/5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
          {/* Front page (animated) */}
          <div
            className="absolute inset-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
            style={{ animation: 'pageLift 2.4s ease-in-out infinite' }}
          >
            <div className="h-full w-full bg-gradient-to-br from-white via-red-50/30 to-white dark:from-slate-900 dark:to-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <div className="h-1.5 w-16 bg-red-200 dark:bg-red-900/40 rounded-full" />
              </div>
              <div className="h-2.5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
              <div className="h-2 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" style={{ animationDelay: '0.45s' }} />
              <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>

        {/* Floating sparkle dots */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-3">
          {[0, 0.3, 0.6, 0.9, 1.2].map((delay, i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-red-400"
              style={{ animation: `floatDot 1.8s ease-in-out infinite`, animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <BookOpen className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wide">Opening article</span>
          </div>
          <div className="flex gap-1">
            {[0, 0.2, 0.4].map((d, i) => (
              <span
                key={i}
                className="inline-block h-1.5 w-1.5 rounded-full bg-red-400"
                style={{ animation: `bounce 1.2s ease-in-out infinite`, animationDelay: `${d}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes pageLift {
          0%, 100% { transform: rotateY(0deg) translateX(0); }
          40% { transform: rotateY(-15deg) translateX(4px); }
          60% { transform: rotateY(-8deg) translateX(2px); }
        }
        @keyframes pageFlutter {
          0%, 100% { transform: rotate(-2deg) translateX(-2px); }
          40% { transform: rotate(-8deg) translateX(-6px); }
          60% { transform: rotate(-4deg) translateX(-3px); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
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
    const loadBlogData = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
          setBlog(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setBlogs(data);

        const currentIndex = data.findIndex(
          (b: any) => b.slug === params.slug || b.id === params.slug
        );

        if (currentIndex !== -1) {
          const found = data[currentIndex];
          setBlog(found);

          // Set siblings
          setPrevPost(currentIndex > 0 ? data[currentIndex - 1] : null);
          setNextPost(currentIndex < data.length - 1 ? data[currentIndex + 1] : null);

          // Set related posts (filter current and choose other 2)
          const filtered = data.filter((b: any) => b.id !== found.id).slice(0, 2);
          setRelatedPosts(filtered);

          // Load reviews
          const savedReviews = localStorage.getItem(`reviews_${found.id}`);
          setReviews(savedReviews ? JSON.parse(savedReviews) : []);
        } else {
          setBlog(null);
        }
      } catch (e) {
        console.error('Failed to load blog details:', e);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    loadBlogData();
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

  // ── Premium Magazine Loader ──
  if (loading) {
    return <MagazineLoader />;
  }

  // ── 404 State ──
  if (!blog) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712] px-4 text-center py-24 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-red-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-black text-slate-950 dark:text-white">Article Not Found</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            The blog post you are looking for does not exist, has been moved, or was permanently deleted.
          </p>
        </div>
        <Button asChild className="bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 px-6 font-bold">
          <Link href="/blog" className="text-white hover:text-white flex items-center">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Journal
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300 relative pb-16">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Sticky Back Bar - Sits right below Navbar (top-20 / 80px offset) */}
      <div className="sticky top-20 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-sm transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary pl-0 h-auto py-1 font-semibold text-xs sm:text-sm transition-colors duration-200">
            <Link href="/blog" className="flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back to Journal
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column - Article content and review modules */}
        <div className="lg:col-span-8 space-y-8">

          {/* Heading */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 font-bold text-xs py-0.5 px-3 rounded-full transition-colors duration-200">
                Category: {blog.category || 'General'}
              </Badge>
              {blog.featured && (
                <Badge className="bg-primary text-primary-foreground border-none font-bold text-xs py-0.5 px-3 rounded-full">
                  Featured
                </Badge>
              )}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black tracking-tight text-foreground leading-tight"
              style={{
                fontFamily: blog.titleFont || undefined,
                color: blog.titleColor || undefined,
              }}
            >
              {blog.title}
            </h1>

            <p
              className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed"
              style={{
                fontFamily: blog.excerptFont || undefined,
                color: blog.excerptColor || undefined,
              }}
            >
              {blog.excerpt}
            </p>

            {/* Clean metadata strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground border-y border-border py-3.5 font-medium">
              <span
                className="flex items-center gap-1.5 text-foreground/80"
                style={{
                  fontFamily: blog.authorFont || undefined,
                  color: blog.authorColor || undefined,
                }}
              >
                <User className="h-4 w-4 text-primary" /> By <span className="inline-block" dangerouslySetInnerHTML={{ __html: blog.author || 'Admin' }} />
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" /> Published {blog.date}
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" /> {blog.readTime || '5 min'} read
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-border">
            <Image
              src={blog.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Body */}
          <article className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-foreground/85 dark:prose-p:text-foreground/85 prose-headings:font-headline prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary pt-2 space-y-6">
            <div dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }} />
          </article>

          {/* Next / Previous Sibling Controls */}
          <div className="grid grid-cols-2 gap-4 border-y border-border py-6">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug || prevPost.id}`} className="group text-left space-y-1 block max-w-xs">
                <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1 group-hover:text-primary transition-colors">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <p className="text-sm font-bold text-foreground line-clamp-1 group-hover:underline">{prevPost.title}</p>
              </Link>
            ) : (
              <div />
            )}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug || nextPost.id}`} className="group text-right space-y-1 block max-w-xs ml-auto">
                <span className="text-xs font-bold text-muted-foreground uppercase flex items-center justify-end gap-1 group-hover:text-primary transition-colors">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <p className="text-sm font-bold text-foreground line-clamp-1 group-hover:underline">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Review System */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 border-b border-border pb-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-headline font-bold text-foreground">User Reviews ({reviews.length})</h3>
            </div>

            <Card className="border-border bg-card p-6 rounded-2xl shadow-sm">
              <form onSubmit={submitReview} className="space-y-4">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Leave a Review</h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setRating(val)}
                        onMouseEnter={() => setHoverRating(val)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-yellow-400 hover:scale-110 transition-transform"
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
                    <label className="text-xs font-bold text-muted-foreground uppercase">Your Name</label>
                    <input
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Feedback Comment</label>
                    <textarea
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      placeholder="Share your feedback..."
                      className="w-full h-24 p-3 rounded-lg border border-input bg-background text-sm focus:ring-1 focus:ring-primary outline-none resize-none"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold rounded-lg h-10 px-5 transition-colors">
                  Submit Review <Send className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </form>
            </Card>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-card border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-foreground">{rev.name}</p>
                      <p className="text-xs text-muted-foreground">{rev.date}</p>
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
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}

              {reviews.length === 0 && (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  No reviews yet. Share your experience!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column - Sticky structure below sticky header */}
        <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6 self-start transition-all duration-300">

          {/* Table of Contents Widget */}
          {headingsList.length > 0 && (
            <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="p-5 border-b border-border">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <nav className="space-y-2.5">
                  {headingsList.map((head, idx) => (
                    <div key={idx} className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 cursor-pointer group">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all shrink-0" />
                      <span className="group-hover:translate-x-0.5 transition-transform">{head}</span>
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
          )}

          {/* Trending Blogs Widget */}
          <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
            <div className="bg-primary/10 px-5 py-4 flex items-center gap-2 border-b border-primary/20">
              <span className="text-base animate-pulse">🔥</span>
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Trending Blogs</h3>
            </div>
            <CardContent className="p-0 divide-y divide-border">
              {blogs.slice(0, 5).map((post) => (
                <Link
                  href={`/blog/${post.slug || post.id}`}
                  key={post.id}
                  className="block px-5 py-4 hover:bg-muted/40 transition-all duration-200 group"
                >
                  <p className="text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
                    {post.title}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Related Articles Widget */}
          {relatedPosts.length > 0 && (
            <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardHeader className="p-5 border-b border-border">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {relatedPosts.map((post) => (
                  <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="flex gap-3 items-center group">
                    <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-muted border border-border">
                      <Image
                        src={post.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=100&q=80'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="inline-block text-[9px] text-primary font-bold uppercase tracking-wider mt-1 bg-primary/10 px-1.5 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Share Widget */}
          <Card className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
            <CardHeader className="p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Share Article</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 flex flex-col gap-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-input bg-muted/30 hover:bg-primary/5 hover:border-primary/30 text-xs font-semibold text-foreground/80 transition-all text-left"
              >
                <span>Copy Link URL</span>
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl border border-input bg-muted/30 hover:bg-muted text-foreground/80 text-xs font-bold gap-1.5 transition-colors"
                >
                  <i className="fa-brands fa-twitter text-sm text-sky-400"></i> X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl border border-input bg-muted/30 hover:bg-muted text-foreground/80 text-xs font-bold gap-1.5 transition-colors"
                >
                  <i className="fa-brands fa-linkedin text-sm text-indigo-500"></i> LI
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-xl border border-input bg-muted/30 hover:bg-muted text-foreground/80 text-xs font-bold gap-1.5 transition-colors"
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
