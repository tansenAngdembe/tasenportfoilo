import { useState } from "react";
import { ExternalLink, Github, Calendar, Server, Layout, Layers, Hourglass, Globe, HeartPulse } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "Futsal Booking System",
      description: "Real-time booking system with slot availability, secure booking APIs, JWT authentication, and admin panel for pricing, grounds & schedule management.",
      tech: ["Spring Boot", "React", "MySQL", "JWT"],
      category: "Full-Stack",
      features: ["Real-time slot availability", "Secure booking APIs", "JWT authentication", "Admin panel", "Conflict detection"],
      icon: Calendar,
      gradient: "from-primary to-secondary",
      code: false,
      demo: false,
      codeLink: null
    },
    {
      title: "Lions International District 325 K, Nepal",
      description: "Comprehensive project highlighting Lions Clubs history, district growth, leadership, and community service initiatives in Nepal.",
      tech: ["React", "Tailwind CSS", "REST APIs"],
      category: "Frontend / Backend",
      features: [
        "Historical overview of Lions Clubs in Nepal since 1971",
        "Redistricting from 325 B1 to 325 K in 2022",
        "Leadership timeline for District Governors (2022-2026)",
        "Community service initiatives and ongoing projects",
        "Interactive UI for district information and events"
      ],
      icon: Globe,
      gradient: "from-primary/80 to-secondary/80",
      code: null,
      demo: "https://lions325k.org/",
      codeLink: null
    },
    {
      title: "E-Commerce System",
      description: "Complete e-commerce solution with JWT authentication, product management, order & payment APIs, and Liquibase migration support.",
      tech: ["Spring Boot", "React", "MySQL", "Liquibase"],
      category: "Full-Stack",
      features: ["JWT auth", "Product management", "Order & payment API", "Liquibase migrations"],
      icon: Server,
      gradient: "from-secondary to-primary",
      code: true,
      demo: null,
      codeLink: "https://github.com/tansenAngdembe/ecommerc2.0"
    },
    {
      title: "Admin Panel System",
      description: "Complex settings UI with role-based access control and reusable components for enterprise applications.",
      tech: ["React", "Tailwind CSS", "REST APIs"],
      category: "Frontend",
      features: ["Complex settings UI", "Role-based access", "Reusable components"],
      icon: Layout,
      gradient: "from-primary/80 to-secondary/80",
      code: false,
      demo: null,
      codeLink: null
    },
    {
      title: "Hospital Management System (HMS)",
      description: "A Java-based OOP Hospital Management System focusing on the four pillars OOPs.",
      tech: ["Java", "OOP Concepts", "Collections"],
      category: "Backend / CLI",
      features: [
        "Patient management with registration, history, and records",
        "Doctor management with specialization and schedules",
        "Appointment booking and management system",
        "Billing and payment management",
        "Secure data handling using OOP principles",
        "Modular and maintainable design using classes and inheritance"
      ],
      icon: HeartPulse,
      gradient: "from-primary/80 to-secondary/80",
      code: "https://github.com/tansenAngdembe/HMS",
      demo: null,
      codeLink: "https://github.com/tansenAngdembe/HMS"
    }


  ];

  const filters = ["All", "Full-Stack", "Frontend", "API"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Featured Work
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${activeFilter === filter
                ? "gradient-bg text-primary-foreground shadow-soft"
                : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="glass-card-hover overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Header */}
              <div className={`h-3 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <project.icon size={24} className="text-primary-foreground" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl mb-3 text-foreground">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {project.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {
                    project.code &&
                    <a
                      href={project?.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                    >
                      <Github size={20} />
                      Code
                    </a>
                  }
                  {
                    project.demo &&

                    <a
                      href={project?.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-lg gradient-bg text-sm font-medium text-primary-foreground transition-all flex items-center justify-center gap-2 hover:opacity-90 cursor-pointer"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  }
                  {
                    !project.code && !project.demo &&
                    <button className="flex-1 py-2 rounded-lg gradient-bg text-sm font-medium text-primary-foreground transition-all flex items-center justify-center gap-2 hover:opacity-90">
                      <Hourglass size={16} />
                      Avaliable in future
                    </button>
                  }

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
