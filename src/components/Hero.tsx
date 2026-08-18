import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom text-center">


        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-up opacity-0 stagger-1">
          Hi, I'm <span className="gradient-text">Tansen Angdembe</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up opacity-0 stagger-2">
          Full-Stack & API Developer
        </p>

        <p className="text-muted-foreground mb-10 max-w-xl mx-auto animate-fade-up opacity-0 stagger-3">
          Building scalable APIs, secure backend systems, and modern web applications with attention to detail.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up opacity-0 stagger-4">
          <a href="#contact" className="btn-primary">
            Contact Me
          </a>
          <a href="#projects" className="btn-outline">
            View Projects
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 animate-fade-up opacity-0 stagger-5">
          <a
            href="https://github.com/tansenAngdembe"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 shadow-soft"
          >
            <Github size={20} />
          </a>
          <a
            href="https://np.linkedin.com/in/tansen-angdembe-a7851a311"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 shadow-soft"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:tansena54ang@gmail.com"
            className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 shadow-soft"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={24} />
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
