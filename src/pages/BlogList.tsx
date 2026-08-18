import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, Sparkles, BookOpen, Layers, Terminal, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSEO from "@/components/BlogSEO";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, BLOG_CATEGORIES, BlogCategory } from "@/data/blogData";

const ITEMS_PER_PAGE = 9;

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as BlogCategory) || "All";
  
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "priority">("featured");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const allPosts = useMemo(() => getAllPosts(), []);

  // Filter and sort logic
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      // Category match
      if (selectedCategory !== "All" && post.category !== selectedCategory) {
        return false;
      }
      // Content type match
      if (selectedType !== "All" && post.contentType !== selectedType) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesSummary = post.summary.toLowerCase().includes(query);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesKeywords = post.keywords.some((k) => k.toLowerCase().includes(query));
        return matchesTitle || matchesSummary || matchesTags || matchesKeywords;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.priority === "High" ? -1 : 1;
      }
      if (sortBy === "priority") {
        const pOrder: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
        return pOrder[a.priority] - pOrder[b.priority];
      }
      // Newest
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
  }, [allPosts, selectedCategory, selectedType, searchQuery, sortBy]);

  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  const visiblePosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  const handleCategoryChange = (category: BlogCategory) => {
    setSelectedCategory(category);
    setDisplayCount(ITEMS_PER_PAGE);
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <>
      <BlogSEO isList={true} category={selectedCategory} />

      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Header />

        <main className="pt-28 pb-20">
          {/* Hero Banner */}
          <section className="container-custom px-4 mb-12">
            <div className="relative rounded-3xl border border-border/80 bg-gradient-to-br from-card/90 via-card/50 to-background p-8 md:p-14 overflow-hidden shadow-card">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
              
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                  <Terminal size={14} />
                  <span>Engineering Knowledge Hub & Best Practices</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4 leading-tight">
                  Backend Architecture, <br />
                  <span className="gradient-text">Spring Boot & Cloud Systems</span>
                </h1>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                  Comprehensive, battle-tested guides on Spring Boot 3, Java Concurrency, AWS ECS Fargate, Docker optimization, Redis caching, and real-world backend troubleshooting.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setDisplayCount(ITEMS_PER_PAGE);
                    }}
                    placeholder="Search keywords (e.g., JWT, Redis caching, Docker, ECS, CORS)..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground outline-none shadow-sm text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Post Spotlight (When on All and no search) */}
          {selectedCategory === "All" && !searchQuery && (
            <section className="container-custom px-4 mb-14" aria-label="Featured Guide">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sparkles size={16} className="text-primary" />
                  Editor's Spotlight Guide
                </h2>
              </div>
              <BlogCard post={featuredPost} featured={true} />
            </section>
          )}

          {/* Category Filter Pills */}
          <section className="container-custom px-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
              {BLOG_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = cat === "All" ? allPosts.length : allPosts.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-card/70 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-border/60 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Filter size={14} /> Type:
                </span>
                {["All", "Tutorial", "How-to", "Guide", "Troubleshooting"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setDisplayCount(ITEMS_PER_PAGE);
                    }}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      selectedType === type
                        ? "font-semibold text-primary bg-primary/10 border border-primary/20"
                        : "hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span>Showing {visiblePosts.length} of {filteredPosts.length} guides</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-card border border-border rounded-lg px-2.5 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="featured">Featured / Priority</option>
                  <option value="newest">Latest Published</option>
                  <option value="priority">High Priority First</option>
                </select>
              </div>
            </div>
          </section>

          {/* Post Grid */}
          <section className="container-custom px-4 mb-16" aria-label="Article List">
            {visiblePosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visiblePosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setDisplayCount((prev) => prev + ITEMS_PER_PAGE)}
                      className="px-8 py-3.5 rounded-2xl font-semibold bg-card hover:bg-muted border border-border/80 text-foreground transition-all shadow-sm hover:scale-105"
                    >
                      Load More Guides ({filteredPosts.length - displayCount} remaining)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-card/40 p-8">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                  We couldn't find any guides matching "{searchQuery}". Try clearing filters or searching for terms like "Spring Boot", "Docker", "AWS", or "MySQL".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedType("All");
                  }}
                  className="btn-primary text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>

          {/* Knowledge Hub CTA */}
          <section className="container-custom px-4">
            <div className="rounded-3xl border border-border/80 bg-gradient-to-r from-card/80 via-muted/40 to-card/80 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Have a specific backend engineering challenge?
                </h3>
                <p className="text-sm text-muted-foreground">
                  I specialize in building fault-tolerant microservices, high-performance database architectures, and cloud deployments. Let's discuss your project.
                </p>
              </div>
              <a href="/#contact" className="btn-primary whitespace-nowrap flex items-center gap-2">
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
