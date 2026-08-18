import { getAllPosts, BlogPost } from "./blogData";

export interface KnowledgeChunk {
  id: string;
  category: "personal" | "experience" | "education" | "project" | "skills" | "blog" | "contact" | "identity" | "problem-solving" | "teamwork";
  title: string;
  content: string;
  keywords: string[];
  link?: string;
  linkText?: string;
}

export interface RagResponse {
  answer: string;
  sources: { title: string; category: string; link?: string }[];
  suggestedQuestions: string[];
}

// Structured knowledge base derived from tansen_ai_personal_rag_knowledge_base.md and resume
const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // AI Identity
  {
    id: "ai-identity",
    category: "identity",
    title: "Tansen AI Identity",
    content: "My name is **Tansen AI**. I am a personal AI assistant for **Tansen Angdembe**. I can answer questions about his professional background, education, projects, technical skills, and development experience based on his verified knowledge base.",
    keywords: ["who are you", "what is your name", "who created you", "who made you", "identity", "what can you do", "who trained you", "are you an ai", "what do you know about tansen", "tell me about yourself"],
    link: "/#about",
    linkText: "About Tansen"
  },
  {
    id: "ai-training",
    category: "identity",
    title: "AI Grounding & Architecture",
    content: "I am not a separately trained foundation model. I am an AI assistant using a Retrieval-Augmented Generation (RAG) knowledge base about Tansen Angdembe. All my answers about Tansen are strictly grounded in his verified resume, projects, and technical knowledge base.",
    keywords: ["who trained you", "how were you trained", "model", "llm", "rag", "foundation model"],
    link: "/knowledge_base.md",
    linkText: "View Master Knowledge Base"
  },

  // Personal Info
  {
    id: "personal-bio",
    category: "personal",
    title: "About Tansen Angdembe",
    content: "Tansen Angdembe is a Java-focused full-stack developer based in Kathmandu, Nepal (originally from Ilam, Nepal). His primary backend technologies include Java, Spring Boot, Spring Security, JPA, JWT, Redis, REST APIs, and SQL. He also works with React-based frontends.",
    keywords: ["who is tansen", "who is tansen angdembe", "about tansen", "bio", "background", "location", "nepal", "kathmandu", "ilam", "sudip limbu", "sudip limboo", "introduction", "what is tansen's profession", "what does tansen specialize in", "where is tansen based"],
    link: "/#about",
    linkText: "View About Section"
  },
  {
    id: "contact-info",
    category: "contact",
    title: "Contact Information & Socials",
    content: "You can reach Tansen Angdembe directly via email at tansena54ang@gmail.com, explore his official website at https://tansenangdembe.com.np, or view his code on GitHub at https://github.com/tansenAngdembe and LinkedIn at https://www.linkedin.com/in/tansen-angdembe-a7851a311/.",
    keywords: ["contact", "email", "phone", "hire", "social", "github", "linkedin", "website", "reach", "message", "address", "portfolio", "get in touch"],
    link: "/#contact",
    linkText: "Get in Touch"
  },

  // Professional Experience
  {
    id: "experience-cosmotech",
    category: "experience",
    title: "Work Experience at COSMOTECH International Pvt. Ltd.",
    content: "Tansen worked at **COSMOTECH International Pvt. Ltd.** as a Full Stack Developer from **November 2024 to April 2026** (approximately 1 year and 5 months).\n\nHis responsibilities included:\n- Developing Java backend services using Spring Boot\n- Implementing JWT-based authentication and authorization\n- Designing REST APIs\n- Integrating REST APIs with React frontend applications\n- Working with JPA, MySQL, and Redis for data persistence and caching",
    keywords: ["experience", "work", "job", "company", "cosmotech", "cosmotech international", "years of experience", "career", "employment", "full stack developer", "where has tansen worked", "how much professional experience does tansen have", "what backend work has tansen done", "has tansen worked with authentication", "has tansen worked with react"],
    link: "/#experience",
    linkText: "View Work Experience"
  },

  // Education
  {
    id: "education-kcmit",
    category: "education",
    title: "Education: BCA at KCMIT (Tribhuvan University)",
    content: "Tansen studied **Bachelor of Computer Applications (BCA)** at Kantipur College of Management and Information Technology (KCMIT), affiliated with Tribhuvan University (TU) in Kathmandu, Nepal (January 2022 – January 2026).\n\nHis academic focus included Java programming, databases, web technologies, software engineering, and system design.\n\nBefore university, he completed his +2 Higher Secondary Education in Management with a Computer Science specialization in Ilam, Nepal (January 2018 – January 2020).",
    keywords: ["education", "college", "university", "kcmit", "bca", "degree", "tribhuvan university", "study", "bachelor", "academic", "where did tansen study", "what did tansen study", "high school", "+2", "plus two", "ilam", "tu"],
    link: "/#about",
    linkText: "View Academic Background"
  },

  // Projects
  {
    id: "project-lions",
    category: "project",
    title: "Project: Lions International Management System",
    content: "The **Lions International Management System** is a web-based system for managing Lions Club social welfare activities.\n\nTechnologies and features include:\n- Spring Boot backend\n- JPA & MySQL database persistence\n- Role-based access control (RBAC) using JWT\n- React frontend integration",
    keywords: ["lions", "lions international", "lions club", "social welfare", "management system project", "what is the lions international management system", "what security feature was implemented in lions", "projects"],
    link: "/#projects",
    linkText: "Explore Projects"
  },
  {
    id: "project-hamro-awaz",
    category: "project",
    title: "Project: Hamro Awaz – Complaints Issue Management System",
    content: "**Hamro Awaz** is a complaints issue management platform with web and mobile application support.\n\nDocumented technologies and architecture include:\n- Spring Boot backend\n- SQL database\n- Redis for caching complaint data\n- MVC architecture\n- Admin dashboard for monitoring and resolving issues",
    keywords: ["hamro awaz", "complaint", "issue management", "grievance", "what is hamro awaz", "how is redis used in hamro awaz", "does hamro awaz have an admin dashboard", "redis cache project", "projects"],
    link: "/#projects",
    linkText: "Explore Projects"
  },
  {
    id: "project-hospital",
    category: "project",
    title: "Project: Hospital Management System (Console Application)",
    content: "The **Hospital Management System** is a Java console-based application that manages doctor records, patient records, and appointments. The project strictly enforces Object-Oriented Programming (OOP) principles including inheritance, encapsulation, and polymorphism.",
    keywords: ["hospital", "hospital management", "console application", "oop project", "java console", "doctor", "patient records", "projects"],
    link: "/#projects",
    linkText: "Explore Projects"
  },
  {
    id: "project-futsal",
    category: "project",
    title: "Project: Futsal Booking System",
    content: "The **Futsal Booking System** is a web and mobile application for booking futsal ground schedules and time slots.\n\nKey features include:\n- Spring Boot backend\n- MySQL database\n- User authentication and booking workflows\n- Time-slot availability and conflict handling",
    keywords: ["futsal", "futsal booking", "ground booking", "reservation system", "schedule", "projects"],
    link: "/#projects",
    linkText: "Explore Projects"
  },

  // Technical Skills
  {
    id: "skills-backend",
    category: "skills",
    title: "Backend Development Skills",
    content: "Tansen's documented backend skills include:\n- **Java** (Primary documented programming language)\n- **Spring Boot** (Primary backend framework)\n- **Spring Security** (Security filter chains & configurations)\n- **JPA & Hibernate** (ORM & database access)\n- **JWT** (JSON Web Tokens authentication & authorization)\n- **Redis** (In-memory caching)\n- **REST APIs** (Designing scalable endpoints)",
    keywords: ["backend", "java", "spring boot", "spring security", "jpa", "hibernate", "jwt", "redis", "rest api", "apis", "skills", "tech stack", "does tansen know java", "does tansen know spring boot", "does tansen know spring security", "does tansen know jwt", "does tansen know redis", "is tansen a java developer", "what is tansen's main backend stack"],
    link: "/#skills",
    linkText: "View Skills"
  },
  {
    id: "skills-frontend",
    category: "skills",
    title: "Frontend Development Skills",
    content: "Tansen's documented frontend skills include:\n- **React** (React.js UI library)\n- **JavaScript** (ES6+)\n- **HTML5 & CSS3**\n- **Tailwind CSS**\n\nHe has experience integrating Spring Boot REST APIs with React frontends.",
    keywords: ["frontend", "react", "javascript", "html", "css", "tailwind", "tailwind css", "does tansen know react", "does tansen know frontend development", "ui"],
    link: "/#skills",
    linkText: "View Skills"
  },
  {
    id: "skills-database-tools",
    category: "skills",
    title: "Databases, Tools & DevOps Skills",
    content: "Tansen's documented database and tooling skills include:\n- **Databases:** MySQL, SQL\n- **Tools & Practices:** Git, GitHub, Postman (API Testing), Docker\n- **Cloud (Blogs):** AWS (ECS, EC2, ECR), Linux (Ubuntu, Systemd, Nginx)",
    keywords: ["database", "databases", "mysql", "sql", "git", "github", "postman", "docker", "tools", "does tansen know mysql", "does tansen know docker", "does tansen know git", "what technologies does tansen know"],
    link: "/#skills",
    linkText: "View Skills"
  },

  // Problem Solving & Teamwork
  {
    id: "problem-solving",
    category: "problem-solving",
    title: "Problem Solving Approach",
    content: "Tansen's documented problem-solving approach focuses on:\n- Breaking down complex requirements into manageable backend and frontend tasks using MVC architecture.\n- Continuously researching and applying better approaches to improve code quality and system scalability.",
    keywords: ["problem solving", "problem solver", "is tansen a problem solver", "how does tansen approach complex requirements", "does tansen research better solutions", "architecture", "scalability"],
    link: "/#about",
    linkText: "View Profile"
  },
  {
    id: "teamwork",
    category: "teamwork",
    title: "Teamwork & Collaboration",
    content: "Tansen is comfortable working in teams, sharing ideas, and contributing to group success. He supports a positive team environment by being reliable, open to feedback, and solution-focused.",
    keywords: ["teamwork", "team", "can tansen work in a team", "is tansen open to feedback", "collaboration", "communication"],
    link: "/#about",
    linkText: "View Profile"
  }
];

// Natural greetings & conversational matches
const NATURAL_CONVERSATIONS: Record<string, string> = {
  "hello": "Hello! I'm Tansen AI. How can I help you?",
  "hi": "Hi! I'm Tansen AI. What would you like to know about Tansen?",
  "hey": "Hey! I'm Tansen AI. Feel free to ask me about Tansen's skills, projects, experience, or education.",
  "hi tansen ai": "Hi! I'm Tansen AI. What would you like to know?",
  "hello tansen ai": "Hello! I'm Tansen AI. How can I assist you today?",
  "how are you": "I'm doing well, thank you! I'm ready to answer questions about Tansen Angdembe.",
  "how are you doing": "I'm doing great and ready to help. What would you like to know about Tansen?",
  "good morning": "Good morning! I'm Tansen AI. How can I help you today?",
  "good afternoon": "Good afternoon! I'm Tansen AI. What would you like to know?",
  "good evening": "Good evening! I'm Tansen AI. How can I assist you?",
  "thank you": "You're welcome! I'm happy to help. Feel free to ask more questions about Tansen.",
  "thanks": "You're welcome!",
  "bye": "Goodbye! Feel free to come back if you want to know more about Tansen.",
  "goodbye": "Goodbye! Have a wonderful day.",
  "see you later": "See you later! Have a great day.",
  "nice to meet you": "Nice to meet you too! I'm Tansen AI."
};

// Tokenize and clean query
function tokenize(text: string): string[] {
  const stopwords = new Set([
    "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "is", "are", "was", "were", "and", "or", "what", "how", "why", "where", "who", "when", "can", "you", "tell", "me", "about", "please", "i", "want", "know", "does", "he", "his"
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopwords.has(w));
}

export async function queryRagEngine(userQuery: string): Promise<RagResponse> {
  const cleanedQuery = userQuery.toLowerCase().trim().replace(/[?!.,;]/g, "");

  // 1. Natural conversation check (Greetings, Gratitude, Farewells)
  if (NATURAL_CONVERSATIONS[cleanedQuery]) {
    return {
      answer: NATURAL_CONVERSATIONS[cleanedQuery],
      sources: [{ title: "Tansen AI Assistant", category: "identity", link: "/#about" }],
      suggestedQuestions: [
        "Who is Tansen Angdembe?",
        "What is Tansen's work experience at COSMOTECH?",
        "What projects has Tansen built?",
        "What are Tansen's technical skills?"
      ]
    };
  }

  // 2. Direct Identity Q&A check
  if (
    cleanedQuery === "what is your name" ||
    cleanedQuery === "who are you" ||
    cleanedQuery === "tell me about yourself"
  ) {
    return {
      answer: "I'm **Tansen AI**, a personal AI assistant for Tansen Angdembe. I can tell you about his development experience, projects, education, technical skills, and engineering blog tutorials.",
      sources: [{ title: "Tansen AI Knowledge Base", category: "identity", link: "/#about" }],
      suggestedQuestions: [
        "Who is Tansen?",
        "Where did Tansen work?",
        "What projects has he built?",
        "What technologies does he know?"
      ]
    };
  }

  if (cleanedQuery.includes("who created you") || cleanedQuery.includes("who made you")) {
    return {
      answer: "I was created as a personal AI assistant for **Tansen Angdembe** to provide grounded information about his professional background, projects, and engineering guides.",
      sources: [{ title: "Tansen AI Knowledge Base", category: "identity", link: "/#about" }],
      suggestedQuestions: ["Who is Tansen?", "What is his work experience?", "What projects has he built?"]
    };
  }

  if (cleanedQuery.includes("who trained you") || cleanedQuery.includes("how were you trained")) {
    return {
      answer: "I am not a separately trained foundation model. I am an AI assistant using a Retrieval-Augmented Generation (RAG) knowledge base about Tansen Angdembe. My answers about Tansen are strictly grounded in his verified resume, projects, and technical knowledge base.",
      sources: [{ title: "RAG Knowledge Base", category: "identity", link: "/knowledge_base.md" }],
      suggestedQuestions: ["What do you know about Tansen?", "What technologies does he use?", "Tell me about his projects."]
    };
  }

  const queryTokens = tokenize(userQuery);
  const allBlogPosts = getAllPosts();

  // Combine static chunks with dynamic blog post summaries
  const dynamicChunks: KnowledgeChunk[] = [
    ...KNOWLEDGE_CHUNKS,
    ...allBlogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      category: "blog" as const,
      title: post.title,
      content: `${post.title}. Category: ${post.category}. ${post.summary} Keywords: ${post.keywords.join(", ")}. Content overview: ${post.sections.map(s => s.title + ": " + s.content).join(" ")}`,
      keywords: [
        ...post.tags.map(t => t.toLowerCase()),
        ...post.keywords.map(k => k.toLowerCase()),
        post.category.toLowerCase(),
        post.contentType.toLowerCase(),
        "blog",
        "tutorial",
        "guide",
        "article"
      ],
      link: `/blog/${post.slug}`,
      linkText: `Read Guide: ${post.title}`
    }))
  ];

  // Scoring algorithm (BM25-style frequency + keyword matching)
  const scoredChunks = dynamicChunks.map((chunk) => {
    let score = 0;
    const chunkText = `${chunk.title} ${chunk.content} ${chunk.keywords.join(" ")}`.toLowerCase();

    // Exact phrase match
    if (chunkText.includes(cleanedQuery) && cleanedQuery.length > 3) {
      score += 20;
    }

    // Specific keyword boosts from query
    queryTokens.forEach((token) => {
      if (chunk.title.toLowerCase().includes(token)) score += 8;
      if (chunk.keywords.some((k) => k.toLowerCase().includes(token))) score += 6;
      
      const regex = new RegExp(`\\b${token}\\b`, "gi");
      const occurrences = (chunkText.match(regex) || []).length;
      score += Math.min(occurrences * 1.5, 6);
    });

    return { chunk, score };
  });

  // Sort and pick top results
  scoredChunks.sort((a, b) => b.score - a.score);
  const topMatches = scoredChunks.filter((s) => s.score > 2).slice(0, 3);

  // If match found, generate grounded response
  if (topMatches.length > 0) {
    const primary = topMatches[0].chunk;
    const secondary = topMatches[1]?.chunk;

    let synthesizedAnswer = "";

    if (primary.category === "personal") {
      synthesizedAnswer = `### 👋 About Tansen Angdembe\n\n${primary.content}\n\n- **Role:** Java & Spring Boot Developer | Full-Stack (React)\n- **Location:** Kathmandu, Nepal\n- **Documented Experience:** Around one year of professional experience working on Java enterprise applications, REST APIs, JPA, MySQL, and Redis.`;
    } else if (primary.category === "experience") {
      synthesizedAnswer = `### 💼 Professional Experience\n\n${primary.content}\n\n**Documented Highlights at COSMOTECH:**\n- Developed Java backend services using Spring Boot\n- Implemented JWT-based authentication and authorization\n- Designed REST APIs and integrated them with React frontends\n- Managed JPA, MySQL, and Redis for persistence and caching`;
    } else if (primary.category === "education") {
      synthesizedAnswer = `### 🎓 Education\n\n${primary.content}`;
    } else if (primary.category === "project") {
      synthesizedAnswer = `### 🚀 Project: ${primary.title.replace("Project: ", "")}\n\n${primary.content}\n\n${secondary && secondary.category === "project" ? `**Another Documented Project:**\n${secondary.content}` : ""}`;
    } else if (primary.category === "skills") {
      synthesizedAnswer = `### 🛠️ Technical Skills\n\n${primary.content}\n\n${secondary && secondary.category === "skills" ? `${secondary.content}\n\n` : ""}`;
    } else if (primary.category === "problem-solving" || primary.category === "teamwork") {
      synthesizedAnswer = `### 💡 ${primary.title}\n\n${primary.content}`;
    } else if (primary.category === "blog") {
      synthesizedAnswer = `### 📚 Engineering Guide: ${primary.title}\n\n${primary.content.split("Content overview:")[0]}\n\n> **Looking for the code tutorial?** You can read the full step-by-step article on the blog.`;
    } else if (primary.category === "contact") {
      synthesizedAnswer = `### 📬 Contact Information\n\n${primary.content}\n\n- 📧 **Email:** [tansena54ang@gmail.com](mailto:tansena54ang@gmail.com)\n- 💻 **GitHub:** [github.com/tansenAngdembe](https://github.com/tansenAngdembe)\n- 🌐 **Portfolio:** [tansenangdembe.com.np](https://tansenangdembe.com.np)`;
    } else {
      synthesizedAnswer = `${primary.content}\n\n${secondary ? secondary.content : ""}`;
    }

    const sources = topMatches.map((m) => ({
      title: m.chunk.title,
      category: m.chunk.category,
      link: m.chunk.link,
    }));

    return {
      answer: synthesizedAnswer,
      sources,
      suggestedQuestions: getDynamicSuggestions(primary.category)
    };
  }

  // Grounded Unknown Response Rule (as defined in tansen_ai_personal_rag_knowledge_base.md)
  return {
    answer: `I don't have enough verified information about that specific topic in my current knowledge base.\n\nI can tell you about Tansen's documented **skills**, **projects** (Lions System, Hamro Awaz, Hospital System, Futsal Booking), **education** (BCA at KCMIT/TU), **experience at COSMOTECH**, and **179 blog tutorials**.\n\nWhat would you like to explore?`,
    sources: [
      { title: "Tansen Angdembe Knowledge Base", category: "personal", link: "/#about" },
      { title: "Engineering Blog Hub", category: "blog", link: "/blog" }
    ],
    suggestedQuestions: [
      "What is Tansen's work experience at COSMOTECH?",
      "Tell me about the Lions International Management System",
      "What technologies does Tansen know?",
      "Where did Tansen study his BCA degree?",
      "How to implement Spring Boot JWT Authentication?"
    ]
  };
}

function getDynamicSuggestions(category: string): string[] {
  switch (category) {
    case "experience":
      return [
        "What projects did Tansen build at COSMOTECH?",
        "Has Tansen worked with authentication?",
        "Where did Tansen complete his BCA degree?"
      ];
    case "project":
      return [
        "Tell me about Hamro Awaz",
        "What security feature was implemented in the Lions project?",
        "What is Tansen's main backend stack?"
      ];
    case "blog":
      return [
        "How to deploy Spring Boot Docker on AWS ECS?",
        "How to fix Spring Security 401 & 403 JWT errors?",
        "Show me MySQL indexing best practices"
      ];
    case "education":
      return [
        "What is Tansen's professional work experience?",
        "What are Tansen's featured projects?",
        "How can I contact Tansen for a job opportunity?"
      ];
    case "identity":
      return [
        "Who is Tansen Angdembe?",
        "What technologies does Tansen know?",
        "What projects has Tansen built?"
      ];
    default:
      return [
        "Tell me about Tansen's work experience at COSMOTECH",
        "What projects has Tansen built?",
        "Show me his Spring Boot JWT guide"
      ];
  }
}
