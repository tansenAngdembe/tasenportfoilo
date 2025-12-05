import { Briefcase, Code, CheckCircle } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer",
      icon: Briefcase,
      responsibilities: [
        "REST API development",
        "Secure backend architecture",
        "React frontend API implementations",
        "Token-based authentication",
        "DB schema design",
        "API documentation (Swagger/Postman)",
      ],
    },
    {
      title: "Full-Stack Developer",
      icon: Code,
      responsibilities: [
        "End-to-end feature delivery",
        "UI integration with backend",
        "Query optimization",
        "File upload APIs and image handling",
      ],
    },
  ];

  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Professional Journey
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30" />

            {experiences.map((exp, index) => (
              <div key={exp.title} className="relative pl-20 pb-12 last:pb-0">
                {/* Timeline Dot */}
                <div className="absolute left-4 w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-soft">
                  <exp.icon size={16} className="text-primary-foreground" />
                </div>

                <div className="glass-card-hover p-6 md:p-8">
                  <h3 className="font-display font-bold text-xl mb-6 text-foreground">
                    {exp.title}
                  </h3>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
