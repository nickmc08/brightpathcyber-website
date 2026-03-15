/*
 * Blog Page - Bright Path Cyber
 * Design: Concept D Editorial - "West Elm meets Apple"
 * Ivory backgrounds, brass gold accents, near-black text
 * Posts fetched from database via tRPC API
 */

import { useState, useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { Shield, Clock, ArrowRight, ChevronLeft, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Markdown Renderer ──────────────────────────────────────────────────────

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-display text-2xl font-bold mt-10 mb-4" style={{ color: "#1A1A1A" }}>
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-body font-semibold text-base mb-3" style={{ color: "#1A1A1A" }}>
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.startsWith("---")) {
      elements.push(
        <div key={i} className="my-10 flex items-center justify-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(201,168,76,0.3)" }} />
          <div className="w-1.5 h-1.5" style={{ backgroundColor: "#C9A84C", borderRadius: "50%" }} />
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(201,168,76,0.3)" }} />
        </div>
      );
    } else if (line.trim() !== "") {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} className="font-semibold" style={{ color: "#1A1A1A" }}>{part.replace(/\*\*/g, "")}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={i} className="font-body text-base leading-relaxed mb-4 text-warm-gray">
          {rendered}
        </p>
      );
    }
    i++;
  }
  return elements;
}

// ── Single Blog Post View ──────────────────────────────────────────────────

function BlogPostView({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { retry: false }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navigation />
        <div className="pt-32 pb-20 flex justify-center">
          <Loader2 size={32} className="animate-spin" style={{ color: "#C9A84C" }} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-ivory">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold mb-4" style={{ color: "#1A1A1A" }}>Post Not Found</h1>
            <p className="font-body text-base mb-8 text-warm-gray">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog">
              <button className="btn-editorial btn-editorial-filled">
                Back to Blog
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link href="/blog">
            <span className="flex items-center gap-2 text-sm font-body mb-8 transition-colors hover:opacity-70 text-warm-gray cursor-pointer">
              <ChevronLeft size={15} />
              Back to Blog
            </span>
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="division-badge">
              <Shield size={11} />
              {post.category}
            </span>
            <span className="text-xs font-body text-warm-gray">{post.date}</span>
            <span className="text-xs font-body text-warm-gray">-</span>
            <span className="text-xs font-body flex items-center gap-1 text-warm-gray">
              <Clock size={11} /> {post.readTime}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#1A1A1A" }}>
            {post.title}
          </h1>

          <div className="brass-bar mb-10" />

          <div className="prose-content">
            {renderContent(post.content)}
          </div>

          <div
            className="mt-14 p-8"
            style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "4px", backgroundColor: "rgba(201,168,76,0.06)" }}
          >
            <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#1A1A1A" }}>
              Want the full picture?
            </h3>
            <p className="font-body text-sm mb-5 text-warm-gray">
              Our e-book, Click with Confidence, covers everything you need to stay safe online - in plain language, at your own pace.
            </p>
            <Link href="/bright-path-cyber#ebook">
              <button className="btn-editorial btn-editorial-filled text-sm">
                Get the E-book - $27
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── Blog Listing Page ──────────────────────────────────────────────────────

function BlogListing() {
  const { data: posts, isLoading, error } = trpc.blog.list.useQuery();

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl">
            <div className="brass-bar mb-6" />
            <h1 className="font-display text-5xl sm:text-6xl font-bold mb-5" style={{ color: "#1A1A1A" }}>
              Insights &
              <br />
              <span className="text-brass">Resources</span>
            </h1>
            <p className="font-body text-lg text-warm-gray">
              Practical guidance on cybersecurity, online safety, and digital privacy - written in plain English for individuals, families, and anyone who wants to stay safe online.
            </p>
          </div>
        </div>
        <div className="brass-rule mt-16" />
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-ivory-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin" style={{ color: "#C9A84C" }} />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="font-body text-base text-warm-gray">Unable to load blog posts. Please try again later.</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && posts && posts.length === 0 && (
            <div className="text-center py-20">
              <Shield size={48} className="mx-auto mb-4" style={{ color: "rgba(201,168,76,0.4)" }} />
              <p className="font-body text-lg text-warm-gray">New articles coming soon. Check back shortly.</p>
            </div>
          )}

          {/* Posts */}
          {!isLoading && posts && posts.length > 0 && (
            <>
              {/* Featured Post (first post) */}
              <RevealSection className="mb-10">
                <Link href={`/blog/${posts[0].slug}`}>
                  <div className="w-full text-left group cursor-pointer">
                    <div
                      className="overflow-hidden card-lift"
                      style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px" }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-5">
                        <div
                          className="lg:col-span-2 min-h-48 flex items-center justify-center p-12"
                          style={{ backgroundColor: "rgba(201,168,76,0.08)" }}
                        >
                          <Shield size={64} className="text-brass" style={{ opacity: 0.6 }} />
                        </div>
                        <div className="lg:col-span-3 p-8 sm:p-10">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="division-badge">
                              <Shield size={11} /> {posts[0].category}
                            </span>
                            <span className="text-xs font-body text-brass font-semibold">Featured</span>
                          </div>
                          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 group-hover:text-brass transition-colors" style={{ color: "#1A1A1A" }}>
                            {posts[0].title}
                          </h2>
                          <p className="font-body text-sm leading-relaxed mb-5 text-warm-gray">
                            {posts[0].excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs font-body text-warm-gray">
                              <span>{posts[0].date}</span>
                              <span>-</span>
                              <span className="flex items-center gap-1"><Clock size={11} /> {posts[0].readTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold font-body text-sm text-brass group-hover:gap-3 transition-all">
                              Read Article <ArrowRight size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealSection>

              {/* Other Posts */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.slice(1).map((post, i) => (
                    <RevealSection key={post.slug} delay={i * 100}>
                      <Link href={`/blog/${post.slug}`}>
                        <div className="w-full text-left group cursor-pointer">
                          <div
                            className="overflow-hidden card-lift h-full flex flex-col"
                            style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px" }}
                          >
                            <div
                              className="h-36 flex items-center justify-center"
                              style={{ backgroundColor: "rgba(201,168,76,0.06)" }}
                            >
                              <Shield size={48} className="text-brass" style={{ opacity: 0.5 }} />
                            </div>
                            <div className="p-7 flex flex-col flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="division-badge">
                                  <Shield size={11} /> {post.category}
                                </span>
                              </div>
                              <h2 className="font-display text-xl font-bold mb-3 group-hover:text-brass transition-colors" style={{ color: "#1A1A1A" }}>
                                {post.title}
                              </h2>
                              <p className="font-body text-sm leading-relaxed mb-4 flex-1 text-warm-gray">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2 text-xs font-body text-warm-gray">
                                  <span>{post.date}</span>
                                  <span>-</span>
                                  <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-semibold font-body text-xs text-brass group-hover:gap-2.5 transition-all">
                                  Read <ArrowRight size={12} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </RevealSection>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="brass-rule mt-16" />

          {/* Newsletter CTA */}
          <RevealSection className="mt-16">
            <div
              className="p-10 text-center"
              style={{ backgroundColor: "#1A1A1A", borderRadius: "4px" }}
            >
              <h3 className="font-display text-2xl font-bold text-brass mb-3">
                Stay in the loop
              </h3>
              <p className="font-body text-sm mb-6" style={{ color: "rgba(245,240,232,0.7)" }}>
                New articles on cybersecurity and digital safety - delivered to your inbox, no spam ever.
              </p>
              <Link href="/#free-checklist">
                <button className="btn-editorial btn-editorial-filled">
                  Get the Free Checklist
                </button>
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Root Blog Component (Router) ───────────────────────────────────────────

export default function Blog() {
  const [match, params] = useRoute("/blog/:slug");

  if (match && params?.slug) {
    return <BlogPostView slug={params.slug} />;
  }

  return <BlogListing />;
}
