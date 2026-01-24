import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/tansenAngdembe", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:tansena54ang@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container-custom py-1">
        <div className="grid md:grid-cols-3 gap-8 mb-8 ml-5">
          {/* Brand */}
          <div>
            <a href="#" className="text-xl font-display font-bold text-foreground cursor-pointer ml-8">
              <img src="/mylogo.png" className="mix-blend-multiply w-15 h-20 " />
            </a>
            <p className="text-muted-foreground  text-sm leading-relaxed">
              Building scalable APIs, secure backend systems, and modern web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-4">
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="mt-4">
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
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
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {currentYear} Tansen Angdembe.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
