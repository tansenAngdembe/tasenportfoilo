import { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";
import { BlogSection } from "@/data/blogData";

interface TableOfContentsProps {
  sections: BlogSection[];
  hasFaqs?: boolean;
}

export default function TableOfContents({ sections, hasFaqs }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    if (hasFaqs) {
      const faqEl = document.getElementById("faq-section");
      if (faqEl) observer.observe(faqEl);
    }

    return () => observer.disconnect();
  }, [sections, hasFaqs]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-28 p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-card">
      <div className="flex items-center gap-2 mb-4 text-foreground font-display font-semibold text-sm">
        <ListOrdered size={18} className="text-primary" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1.5 text-sm">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left py-1.5 px-3 rounded-lg text-xs md:text-sm transition-all duration-200 ${
                isActive
                  ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="line-clamp-1">{section.title}</span>
            </button>
          );
        })}

        {hasFaqs && (
          <button
            onClick={() => scrollToSection("faq-section")}
            className={`block w-full text-left py-1.5 px-3 rounded-lg text-xs md:text-sm transition-all duration-200 ${
              activeId === "faq-section"
                ? "font-semibold text-primary bg-primary/10 border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span>Frequently Asked Questions</span>
          </button>
        )}
      </nav>
    </div>
  );
}
