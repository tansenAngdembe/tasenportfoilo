import { useState } from "react";
import { Share2, Check, Link2 } from "lucide-react";

interface BlogShareProps {
  title: string;
  url: string;
}

export default function BlogShare({ title, url }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=tansenAngdembe`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const redditUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1">
        <Share2 size={14} /> Share:
      </span>

      {/* Twitter */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 hover:bg-primary/20 hover:text-primary border border-border transition-colors"
        aria-label="Share on X (Twitter)"
      >
        Twitter / X
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 hover:bg-primary/20 hover:text-primary border border-border transition-colors"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>

      {/* Reddit */}
      <a
        href={redditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 hover:bg-primary/20 hover:text-primary border border-border transition-colors"
        aria-label="Share on Reddit"
      >
        Reddit
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/60 hover:bg-primary/20 hover:text-primary border border-border transition-colors"
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <Check size={12} className="text-emerald-500" />
            <span className="text-emerald-500">Copied</span>
          </>
        ) : (
          <>
            <Link2 size={12} />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
