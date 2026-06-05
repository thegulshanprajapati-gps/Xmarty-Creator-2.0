'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, BookOpen, Clock, User, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/format";


import { useContentBlock } from "@/hooks/use-content-block";

const COURSES = [
  {
    id: '1',
    title: 'Advanced Indigo Web Architecture',
    instructor: 'Dr. Sarah Indigo',
    duration: '12 Hours',
    level: 'Advanced',
    students: '1.2k',
    price: 9900,
    category: 'Architecture',
    image: "https://picsum.photos/seed/indigo1/800/600"
  },
  {
    id: '2',
    title: 'Enterprise Microservices with Node.js',
    instructor: 'Marcus Aurelius',
    duration: '8 Hours',
    level: 'Intermediate',
    students: '800',
    price: 7900,
    category: 'Backend',
    image: "https://picsum.photos/seed/arch/800/600"
  },
  {
    id: '3',
    title: 'UI/UX Excellence: Mastering ShadCN',
    instructor: 'Jessica Walters',
    duration: '15 Hours',
    level: 'Beginner',
    students: '2.5k',
    price: 12900,
    category: 'Frontend',
    image: "https://picsum.photos/seed/ai-design/800/600"
  }
];

export default function CoursesPage() {
  const seoTitle = useContentBlock("courses", "seo", "title", "Curriculum - Explore Our Courses", "text");
  const seoDesc = useContentBlock("courses", "seo", "description", "Explore the XmartyCreator curriculum. Practical frontend, backend, design and software courses.", "text");
  const seoKeywords = useContentBlock("courses", "seo", "keywords", "curriculum, coding courses, next.js, web development", "text");

  const [moduleFolders, setModuleFolders] = useState<{ id: string; title: string; description: string | null; is_paid?: boolean }[]>([]);
  const [modulesLoading, setModulesLoading] = useState(false);
  const [modulesError, setModulesError] = useState('');
  const categories = ["All", "Programming", "Architecture", "Backend", "Frontend", "Placement Prep"];

  useEffect(() => {
    const loadModules = async () => {
      setModulesLoading(true);
      setModulesError('');

      try {
        const res = await fetch('/api/folders?course_id=default');
        if (!res.ok) throw new Error('Failed to load modules');
        const data = await res.json();
        setModuleFolders(data || []);
      } catch (error: any) {
        setModulesError(error.message);
        setModuleFolders([]);
      } finally {
        setModulesLoading(false);
      }
    };

    loadModules();
  }, []);

  return (
    <div className="w-full bg-background">
      <title>{seoTitle.value}</title>
      <meta name="description" content={seoDesc.value} />
      <meta name="keywords" content={seoKeywords.value} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 text-center md:text-left">
              <Badge variant="outline" className="text-primary border-primary/20">CURRICULUM</Badge>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold">Course Library</h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Expert-led courses designed for the enterprise landscape of XmartyCreator.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10 h-12 rounded-xl" />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {moduleFolders.length > 0 ? (
            <section className="rounded-[2rem] border border-primary/10 bg-muted/10 p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">Curriculum Modules</p>
                  <h2 className="text-3xl font-headline font-bold">Published course structure</h2>
                </div>
                {modulesLoading ? (
                  <p className="text-sm text-muted-foreground">Refreshing modules…</p>
                ) : modulesError ? (
                  <p className="text-sm text-destructive">{modulesError}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">{moduleFolders.length} top-level modules available</p>
                )}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {moduleFolders.map((folder) => (
                  <Card key={folder.id} className="border-primary/5 shadow-sm rounded-[2rem] hover:-translate-y-1 transition-transform duration-300 ease-out">
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-bold">Module</p>
                          <CardTitle className="text-2xl font-headline leading-tight">{folder.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          {folder.is_paid ? (
                            <Badge className="bg-amber-500/10 text-amber-500 border-none">Paid</Badge>
                          ) : (
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Free</Badge>
                          )}
                          <Badge className="bg-primary/10 text-primary border-none">Live</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{folder.description || 'A course module created in supportdomain.'}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {folder.is_paid ? 'Premium content requires access' : 'Open access module'}
                        </span>
                        <Button asChild size="sm" variant="outline" className="rounded-full px-4 py-2">
                          <Link href={`/courses/${folder.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={cat === "All" ? "default" : "outline"} 
                className={cn("rounded-full px-6 font-bold whitespace-nowrap", cat === "All" ? "shadow-lg shadow-primary/20" : "border-2")}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {COURSES.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-[2rem] border-primary/5 shadow-sm transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      data-ai-hint="course thumbnail"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-white/90 text-black backdrop-blur-sm border-none font-bold">{course.category}</Badge>
                      <Badge className="bg-accent text-accent-foreground border-none font-bold">{course.level}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                      <User className="h-3 w-3" />
                      <span>{course.instructor}</span>
                    </div>
                    <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors leading-tight">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 font-medium">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>{course.students} Students</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t mt-4 pt-6 bg-muted/20">
                    <span className="text-2xl font-bold text-primary">{formatINR(course.price)}</span>
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold rounded-xl shadow-lg shadow-primary/20">
                      <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
