import { BlogPost, getRelatedPosts } from "@/data/blogData";
import BlogCard from "./BlogCard";
import { Sparkles } from "lucide-react";

interface RelatedBlogsProps {
  currentPost: BlogPost;
}

export default function RelatedBlogs({ currentPost }: RelatedBlogsProps) {
  const relatedPosts = getRelatedPosts(currentPost, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border" aria-labelledby="related-articles-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={16} />
            <span>Continue Reading</span>
          </div>
          <h3 id="related-articles-heading" className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Related Engineering Tutorials
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
