import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Terminal,
  Home,
  BookOpen,
  Bot,
  ArrowRight,
  Search,
  FileQuestion,
  Sparkles,
  Compass,
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route requested:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    {
      title: "Homepage & Projects",
      description: "Explore enterprise projects, technical skills & experience.",
      icon: Home,
      to: "/",
    },
    {
      title: "Developer Knowledge Hub",
      description: "Browse 179+ guides on Spring Boot, AWS, Docker & MySQL.",
      icon: BookOpen,
      to: "/blog",
    },
    {
      title: "Ask Tansen AI (RAG)",
      description: "Instant answers about Tansen's experience and architecture.",
      icon: Bot,
      to: "/chat",
    },
  ];

  return (
    <>
      <Helmet>
        <title>404 — Route Not Found | Tansen Angdembe</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col justify-between text-foreground">
        <Header />

        <main className="flex-1 flex items-center justify-center pt-28 pb-16 px-4 relative overflow-hidden bg-grid-tech">
          {/* Ambient Glows */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom max-w-2xl text-center">
            {/* Terminal Window Card */}
            <div className="glass-card overflow-hidden shadow-card border border-border text-left mb-8">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Terminal size={12} className="text-primary" />
                  <span>route-dispatcher.sh: 404</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">
                  ERR_NOT_FOUND
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 md:p-8 space-y-4 font-mono text-xs md:text-sm">
                <div className="text-muted-foreground">
                  <span className="text-emerald-500 font-bold">$</span> curl -I https://tansenangdembe.com.np{location.pathname}
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-rose-400 font-semibold">HTTP/2 404 NOT FOUND</p>
                  <p className="text-muted-foreground">content-type: application/json; charset=utf-8</p>
                  <p className="text-muted-foreground">x-error-reason: "Requested endpoint or document does not exist."</p>
                </div>

                <div className="pt-2 text-foreground font-sans">
                  <div className="text-4xl md:text-6xl font-extrabold font-display gradient-text my-2 tracking-tight">
                    404
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1 font-display">
                    Page Not Found
                  </h1>
                  <p className="text-xs md:text-sm text-muted-foreground font-normal leading-relaxed">
                    The requested URL <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-xs font-mono">{location.pathname}</code> could not be found in the current routing tree.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="space-y-3 mb-8 text-left">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground font-mono block text-center mb-4">
                Recommended Destinations:
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="glass-card-hover p-4 rounded-xl flex flex-col justify-between group"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground mb-2.5 shadow-soft">
                          <Icon size={16} />
                        </div>
                        <h2 className="font-display font-bold text-xs md:text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                          {item.title}
                        </h2>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-primary pt-3">
                        <span>Go</span>
                        <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex justify-center gap-3">
              <Link to="/" className="btn-primary text-xs py-2.5 px-5">
                <Home size={14} />
                <span>Return to Homepage</span>
              </Link>
              <Link to="/chat" className="btn-outline text-xs py-2.5 px-5">
                <Bot size={14} className="text-primary" />
                <span>Ask AI Assistant</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
