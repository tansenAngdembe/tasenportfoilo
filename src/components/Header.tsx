import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isBlog = location.pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: isHomePage ? "#about" : "/#about", label: "About" },
    { href: isHomePage ? "#skills" : "/#skills", label: "Skills" },
    { href: isHomePage ? "#projects" : "/#projects", label: "Projects" },
    { href: isHomePage ? "#experience" : "/#experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "/chat", label: "Ask AI", isSpecial: true },
    { href: isHomePage ? "#contact" : "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-card/90 backdrop-blur-xl shadow-card py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold text-foreground cursor-pointer ml-8 flex items-center gap-2">
          <img src="/mylogo.png" alt="Tansen Logo" className="mix-blend-multiply w-15 h-20" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isBlogLink = link.label === "Blog";
            const isActive = isBlogLink && isBlog;

            if (link.href.startsWith("/")) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`transition-colors duration-300 font-medium ${isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                      : isBlogLink
                        ? "text-primary hover:text-primary/80 font-semibold"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            );
          })}
          <ThemeToggle />
          <a href="/my-cv.pdf" download className="btn-primary flex items-center gap-2 text-sm">
            <Download size={16} />
            Download CV
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border shadow-card">
          <div className="container-custom py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.href.startsWith("/")) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <ThemeToggle />

              <a
                href="/my-cv.pdf"
                download
                className="btn-primary flex items-center justify-center gap-2 text-sm flex-1"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
