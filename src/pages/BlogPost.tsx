import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  User,
  HelpCircle,
  AlertCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  Github,
  Linkedin,
  Mail,
  Share2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSEO from "@/components/BlogSEO";
import CodeBlock from "@/components/CodeBlock";
import TableOfContents from "@/components/TableOfContents";
import RelatedBlogs from "@/components/RelatedBlogs";
import BlogShare from "@/components/BlogShare";
import { getPostBySlug, BlogPost as BlogPostType } from "@/data/blogData";
import { getPexelsImage, getCategoryFallbackImage } from "@/lib/pexels";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    const found = getPostBySlug(slug);
    if (found) {
      setPost(found);
      window.scrollTo(0, 0);

      // Fetch Pexels Image
      getPexelsImage(found.imageQuery || found.title, found.category).then((url) => {
        setImageUrl(url);
      });
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />
        <main className="container-custom px-4 py-32 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The tutorial you are looking for might have been moved or renamed.
          </p>
          <Link to="/blog" className="btn-primary">
            Explore All Engineering Articles
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://tansenangdembe.com.np/blog/${post.slug}`;

  const renderCalloutIcon = (type: string) => {
    switch (type) {
      case "warning":
      case "danger":
        return <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />;
      case "tip":
        return <Lightbulb size={18} className="text-emerald-500 shrink-0 mt-0.5" />;
      case "info":
      default:
        return <Info size={18} className="text-primary shrink-0 mt-0.5" />;
    }
  };

  const getCalloutBg = (type: string) => {
    switch (type) {
      case "warning":
      case "danger":
        return "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200";
      case "tip":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200";
      case "info":
      default:
        return "bg-primary/10 border-primary/30 text-foreground";
    }
  };

  return (
    <>
      <BlogSEO post={post} imageUrl={imageUrl || getCategoryFallbackImage(post.category)} />

      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />

        <main className="pt-28 pb-20">
          {/* Breadcrumbs */}
          <nav className="container-custom px-4 mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground flex-wrap">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight size={14} className="opacity-60" />
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <ChevronRight size={14} className="opacity-60" />
              <li>
                <Link
                  to={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {post.category}
                </Link>
              </li>
              <ChevronRight size={14} className="opacity-60" />
              <li className="text-foreground font-semibold line-clamp-1 max-w-[200px] md:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Article Header & Hero */}
          <header className="container-custom px-4 mb-10">
            <div className="max-w-4xl">
              {/* Category & Badges */}
              <div className="flex items-center gap-2.5 flex-wrap mb-4">
                <Link
                  to={`/blog?category=${encodeURIComponent(post.category)}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {post.category}
                </Link>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {post.contentType}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {post.priority} Priority
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight leading-tight mb-6">
                {post.title}
              </h1>

              {/* Summary */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 font-normal">
                {post.summary}
              </p>

              {/* Meta & Share bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/80">
                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <img
                      src="/preview.jpg"
                      alt="Tansen Angdembe"
                      className="w-8 h-8 rounded-full object-cover border border-border"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div>
                      <span className="font-semibold text-foreground block">Tansen Angdembe</span>
                      <span className="text-[11px] text-muted-foreground">Backend & Cloud Engineer</span>
                    </div>
                  </div>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={15} className="text-primary" />
                    {post.publishedDate}
                  </span>
                  <span className="opacity-40">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-primary" />
                    {post.readTime}
                  </span>
                </div>

                <BlogShare title={post.title} url={currentUrl} />
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="container-custom px-4 mb-12">
            <div className="relative rounded-3xl overflow-hidden max-h-[460px] border border-border/80 shadow-card bg-muted/40">
              <img
                src={imageUrl || getCategoryFallbackImage(post.category)}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Article Main Body Grid (Content + Table of Contents Sidebar) */}
          <div className="container-custom px-4">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Content Column */}
              <article className="lg:col-span-8 space-y-10" itemScope itemType="https://schema.org/TechArticle">
                {post.sections.map((section, idx) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 space-y-4"
                    aria-labelledby={`heading-${section.id}`}
                  >
                    <h2
                      id={`heading-${section.id}`}
                      className="text-2xl md:text-3xl font-display font-bold text-foreground border-b border-border/60 pb-3"
                    >
                      {section.title}
                    </h2>

                    <div className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-4 whitespace-pre-line">
                      {section.content}
                    </div>

                    {/* Callout Box */}
                    {section.callout && (
                      <div
                        className={`p-4 md:p-5 rounded-2xl border flex items-start gap-3.5 my-4 ${getCalloutBg(
                          section.callout.type
                        )}`}
                      >
                        {renderCalloutIcon(section.callout.type)}
                        <div className="text-sm md:text-base leading-relaxed">
                          {section.callout.title && (
                            <strong className="block font-semibold mb-1 font-display">
                              {section.callout.title}
                            </strong>
                          )}
                          <span>{section.callout.text}</span>
                        </div>
                      </div>
                    )}

                    {/* Code Snippet with Copy */}
                    {section.codeSnippet && (
                      <CodeBlock
                        code={section.codeSnippet.code}
                        language={section.codeSnippet.language}
                        filename={section.codeSnippet.filename}
                      />
                    )}
                  </section>
                ))}

                {/* FAQ Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section id="faq-section" className="scroll-mt-28 mt-12 pt-8 border-t border-border">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                      <HelpCircle size={18} />
                      <span>Knowledge Base</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                      Frequently Asked Questions
                    </h3>

                    <div className="space-y-4">
                      {post.faqs.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div
                            key={idx}
                            className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden shadow-sm transition-all"
                          >
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                              className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-foreground hover:text-primary transition-colors text-base"
                            >
                              <span>{faq.question}</span>
                              <span className="text-primary text-xl font-mono">{isOpen ? "−" : "+"}</span>
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Internal Linking & Tag Cloud */}
                <div className="pt-8 border-t border-border">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Related Tech Tags:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?category=${encodeURIComponent(post.category)}`}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-muted hover:bg-primary/10 hover:text-primary border border-border/60 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Author Bio Card */}
                <div className="p-6 md:p-8 rounded-3xl border border-border bg-gradient-to-br from-card/90 to-muted/40 shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src="/preview.jpg"
                    alt="Tansen Angdembe"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/40 shadow-md shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="space-y-3 text-center sm:text-left">
                    <div>
                      <h4 className="text-xl font-display font-bold text-foreground">
                        Written by Tansen Angdembe
                      </h4>
                      <p className="text-xs text-primary font-medium">
                        Full Stack & Cloud Backend Engineer (Java, Spring Boot, AWS, Docker)
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Passionate software engineer building high-concurrency distributed systems, cloud microservices, and reliable web applications.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                      <a
                        href="https://github.com/tansenAngdembe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border bg-card hover:text-primary hover:border-primary transition-colors text-xs flex items-center gap-1.5"
                      >
                        <Github size={14} /> GitHub
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border bg-card hover:text-primary hover:border-primary transition-colors text-xs flex items-center gap-1.5"
                      >
                        <Linkedin size={14} /> LinkedIn
                      </a>
                      <a
                        href="/#contact"
                        className="p-2 rounded-lg border border-border bg-card hover:text-primary hover:border-primary transition-colors text-xs flex items-center gap-1.5"
                      >
                        <Mail size={14} /> Contact Me
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar Column (Sticky Table of Contents) */}
              <aside className="hidden lg:block lg:col-span-4">
                <TableOfContents
                  sections={post.sections}
                  hasFaqs={Boolean(post.faqs && post.faqs.length > 0)}
                />
              </aside>
            </div>

            {/* Related Blogs Section at Bottom */}
            <RelatedBlogs currentPost={post} />

            {/* Back to Blog Hub Navigation */}
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border bg-card hover:bg-muted font-medium text-foreground transition-all shadow-sm"
              >
                <ArrowLeft size={16} />
                <span>Explore All Technical Guides</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
