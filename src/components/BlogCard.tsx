import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowUpRight, BookOpen } from "lucide-react";
import { BlogPost } from "@/data/blogData";
import { getPexelsImage, getCategoryFallbackImage } from "@/lib/pexels";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const [imageUrl, setImageUrl] = useState<string>(getCategoryFallbackImage(post.category));

  useEffect(() => {
    let isMounted = true;
    getPexelsImage(post.imageQuery || post.title, post.category).then((url) => {
      if (isMounted) {
        setImageUrl(url);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [post.imageQuery, post.title, post.category]);

  const priorityColors = {
    High: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  if (featured) {
    return (
      <div className="group relative rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Image */}
          <div className="lg:col-span-7 relative h-64 lg:h-96 overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent lg:hidden" />
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground shadow-lg">
              Featured Guide
            </span>
          </div>

          {/* Content */}
          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
            <div>
              {/* Category and badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {post.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {post.contentType}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[post.priority]}`}>
                  {post.priority} Priority
                </span>
              </div>

              {/* Title */}
              <Link to={`/blog/${post.slug}`} className="block">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                  {post.title}
                </h3>
              </Link>

              {/* Excerpt */}
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                {post.summary}
              </p>
            </div>

            {/* Footer meta */}
            <div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary" />
                  {post.publishedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-primary" />
                  {post.readTime}
                </span>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group-hover:translate-x-1 transition-transform"
              >
                Read Full Tutorial
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300">
      <div>
        {/* Card Thumbnail */}
        <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-muted/40">
          <img
            src={imageUrl}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-card/90 backdrop-blur-md text-foreground border border-border/60 shadow-sm">
              {post.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border bg-card/90 backdrop-blur-md ${priorityColors[post.priority]}`}>
              {post.contentType}
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-primary" />
              {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-primary" />
              {post.readTime}
            </span>
          </div>

          <Link to={`/blog/${post.slug}`}>
            <h4 className="text-base lg:text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
              {post.title}
            </h4>
          </Link>

          <p className="text-muted-foreground text-xs lg:text-sm line-clamp-2 leading-relaxed mb-4">
            {post.summary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 mt-auto border-t border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/preview.jpg"
            alt="Tansen Angdembe"
            className="w-6 h-6 rounded-full object-cover border border-border"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <span className="text-xs font-medium text-muted-foreground">Tansen Angdembe</span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          aria-label={`Read article: ${post.title}`}
        >
          <span>Read</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
