import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import BlogCard from "./BlogCard";
import { ALL_BLOG_POSTS } from "@/data/blogData";

export default function LatestBlogs() {
  const featuredPosts = ALL_BLOG_POSTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              <BookOpen size={18} />
              <span>Technical Insights & Engineering Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Latest Architecture & Code Guides
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm md:text-base">
              Hands-on tutorials on Spring Boot 3, AWS Cloud deployments, Docker orchestration, and high-performance backend systems.
            </p>
          </div>

          <Link
            to="/blog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-sm transition-all duration-300 w-fit"
          >
            <span>View All Guides</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
