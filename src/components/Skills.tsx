import { useState } from "react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const skillCategories = {
    Backend: ["Java", "Spring Boot", "Spring Security", "Node.js", "Express.js", "JPA/Hibernate", "REST APIs", "Liquibase"],
    Frontend: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Component-Based UI"],
    Databases: ["MySQL", "MongoDB", "Schema Design"],
    Tools: ["Git", "GitHub", "Postman", "IntelliJ", "VS Code"],
    Other: ["JWT Authentication", "OAuth2", "Automation", "File Upload Handling"],
  };

  const categories = ["All", ...Object.keys(skillCategories)];

  const getSkillsToDisplay = () => {
    if (activeCategory === "All") {
      return Object.entries(skillCategories);
    }
    return [[activeCategory, skillCategories[activeCategory as keyof typeof skillCategories]]];
  };

  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Technologies I Work With
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${activeCategory === category
                  ? "gradient-bg text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {getSkillsToDisplay().map(([category, skills]) => (
            <div key={String(category)} className="glass-card p-6 md:p-8">
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full gradient-bg" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {(skills as string[]).map((skill, index) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
