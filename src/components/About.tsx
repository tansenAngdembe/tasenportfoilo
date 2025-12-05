import { Code, Database, Server, Layers } from "lucide-react";

const About = () => {
  const highlights = [
    { icon: Server, label: "Backend Engineering", description: "Secure & Scalable APIs" },
    { icon: Code, label: "Frontend Integration", description: "React-based UIs" },
    { icon: Database, label: "Database Design", description: "MySQL & MongoDB" },
    { icon: Layers, label: "Full-Stack", description: "End-to-End Solutions" },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Passionate About Building
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am Tansen Angdembe, a passionate Software Developer experienced in building scalable APIs, secure backend systems, React-based UI integrations, and end-to-end full-stack solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in <span className="text-primary font-medium">Java, Spring Boot, Node.js, React.js, MySQL, and MongoDB</span>. I enjoy developing automation tools, admin dashboards, and modern web applications with strong attention to detail.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["Problem Solver", "Clean Code", "Team Player", "Fast Learner"].map((trait) => (
                <span key={trait} className="skill-tag">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="glass-card-hover p-6 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
