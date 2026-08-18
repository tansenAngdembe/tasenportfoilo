import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, BookOpen } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/tansenAngdembe", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:tansena54ang@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/#experience", label: "Experience" },
    { href: "/blog", label: "Engineering Blog" },
    { href: "/chat", label: "Ask AI Assistant" },
    { href: "/#contact", label: "Contact" },
  ];

  const blogCategories = [
    { name: "Spring Boot & Java", href: "/blog?category=Spring%20Boot%20%26%20Java" },
    { name: "AWS Cloud & ECS", href: "/blog?category=AWS" },
    { name: "Docker & Containers", href: "/blog?category=Docker" },
    { name: "Redis Caching", href: "/blog?category=Redis" },
    { name: "Troubleshooting Guides", href: "/blog?category=Troubleshooting" },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border mt-16">
      <div className="container-custom py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-display font-bold text-foreground cursor-pointer flex items-center gap-2 mb-3">
              <img src="/mylogo.png" alt="Tansen Logo" className="mix-blend-multiply w-14 h-18" />
            </Link>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Full Stack & Cloud Backend Engineer building high-scale distributed systems, REST APIs, and modern web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Blog Knowledge Base */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm flex items-center gap-1.5">
              <BookOpen size={16} className="text-primary" />
              <span>Engineering Guides</span>
            </h4>
            <nav className="flex flex-col gap-2">
              {blogCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.href}
                  className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">Connect</h4>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Open for backend engineering, cloud architecture, and consulting opportunities.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Tansen Angdembe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
