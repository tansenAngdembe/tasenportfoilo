import { Helmet } from "react-helmet-async";

export default function SEO(): JSX.Element {
  return (
    <Helmet>
      {/* Primary SEO */}

      <title>
        Tansen Angdembe | Full Stack Developer | Java | React | Spring Boot
      </title>

      <meta
        name="description"
        content="
        Passionate Full Stack Developer specializing in Java,
        Spring Boot, React, AWS, Docker and modern technologies.
        Explore my featured projects, technical skills,
        professional experience and let's work together.
        "
      />

      <meta
        name="keywords"
        content="
        Full Stack Developer,
        Java Developer,
        React Developer,
        Spring Boot Developer,
        AWS Developer,
        Software Engineer,
        Portfolio,
        Backend Developer,
        Frontend Developer,
        Nepal Developer,
        Developer in Nepal,
        Java,
        React,
        Spring Boot,
        AWS,
        Docker,
        REST APIs,
        Web Development,    
        Tansen Angdembe,
        tansen,
        Tansen,
        angdembe,
        Angdembe,
        Sudip,
        Limboo,
        Limbu,
        "
      />

      <meta name="author" content="Tansen Angdembe" />

      <meta
        name="robots"
        content="index,follow,max-image-preview:large"
      />

      {/* Canonical */}

      <link
        rel="canonical"
        href="https://tansenangdembe.com.np/"
      />

      {/* Open Graph */}

      <meta property="og:type" content="website" />

      <meta
        property="og:title"
        content="Tansen Angdembe | Full Stack Developer"
      />

      <meta
        property="og:description"
        content="
        Building scalable and modern digital experiences
        using Java, Spring Boot, React and AWS.
        "
      />

      <meta
        property="og:url"
        content="https://tansenangdembe.com.np/"
      />

      <meta
        property="og:image"
        content="https://tansenangdembe.com.np/preview.jpg"
      />

      {/* Twitter */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content="Tansen Angdembe | Full Stack Developer"
      />

      <meta
        name="twitter:description"
        content="
        Explore my projects, skills and professional journey.
        "
      />

      <meta
        name="twitter:image"
        content="https://tansenangdembe.com.np/tansenLOg.png"
      />

      {/* Mobile */}

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

    </Helmet>
  );
}