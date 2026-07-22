export default function Schema(): JSX.Element {
  const schema = {
    "@context": "https://schema.org",

    "@type": "Person",

    name: "Tansen Angdembe",

    url: "https://tansenangdembe.com.np",

    jobTitle: "Full Stack Developer",

    description:
      "Passionate Full Stack Developer specializing in Java, Spring Boot, React, AWS and modern web technologies.",

    image:
      "https://tansenangdembe.com.np/preview.jpg",

    sameAs: [
      "https://github.com/tansenAngdembe",
      "https://www.linkedin.com/in/tansen-angdembe-a7851a311/",
    ],

    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "AWS",
      "Docker",
      "MySQL",
      "Redis",
      "Flutter",
      "CI/CD",
      "Software Architecture",
      "REST APIs",
      "Microservices",
      "System Design",
      "JavaScript",
      "Html5",
      "Tailwind css",
      "CSS"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}