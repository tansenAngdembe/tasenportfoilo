import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Bot,
  User,
  Send,
  Sparkles,
  ArrowLeft,
  BookOpen,
  FileText,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Code2,
  Check,
  Copy,
  Brain,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { queryRagEngine, RagResponse } from "@/data/ragEngine";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  isStreaming?: boolean;
  thinkingSteps?: string[];
  sources?: { title: string; category: string; link?: string }[];
  suggestedQuestions?: string[];
  timestamp: string;
}

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<string>("");
  const [expandedThinking, setExpandedThinking] = useState<Record<string, boolean>>({});

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  // Initialize with greeting
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      sender: "assistant",
      text: `### 👋 Hello! I'm Tansen's AI Knowledge Assistant\n\nI have indexed Tansen Angdembe's **entire resume**, professional journey at **COSMOTECH International**, **education at KCMIT/TU**, **projects**, and **all 179 developer blog tutorials**.\n\nAsk me anything about:\n- 💼 Work experience & backend architecture\n- 🎓 Academic qualifications & background\n- 🚀 Featured projects (Lions System, Hamro Awaz, Futsal Booking, etc.)\n- 📚 Tutorials & How-to guides on Spring Boot, Docker, Redis, AWS & MySQL`,
      sources: [
        { title: "Tansen Resume & Profile", category: "personal", link: "/#about" },
        { title: "Knowledge Base Markdown", category: "personal", link: "/knowledge_base.md" }
      ],
      suggestedQuestions: [
        "What did Tansen build at COSMOTECH International?",
        "Tell me about his Lions International Management project",
        "How does Tansen implement Spring Boot JWT authentication?",
        "Where did Tansen study his BCA degree?"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([welcomeMessage]);

    if (initialQuery.trim()) {
      handleSendMessage(initialQuery.trim());
    }
  }, []);

  const streamAssistantResponse = async (botMsgId: string, fullText: string, sources?: any[], suggestedQuestions?: any[], thinkingSteps?: string[]) => {
    const words = fullText.split(" ");
    let currentText = "";
    
    // Add initial streaming placeholder
    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: "assistant",
        text: "",
        isStreaming: true,
        thinkingSteps,
        sources,
        suggestedQuestions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);

    // Stream word by word
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      const snapshot = currentText;

      setMessages((prev) =>
        prev.map((msg) => (msg.id === botMsgId ? { ...msg, text: snapshot } : msg))
      );

      // Natural scroll during streaming
      if (i % 3 === 0) {
        scrollToBottom("smooth");
      }

      // Dynamic typing pace (faster on punctuation, fluid speed)
      const delay = words[i].includes("\n") ? 35 : 18;
      await new Promise((r) => setTimeout(r, delay));
    }

    // Mark as finished streaming
    setMessages((prev) =>
      prev.map((msg) => (msg.id === botMsgId ? { ...msg, isStreaming: false } : msg))
    );
    scrollToBottom("smooth");
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsProcessing(true);
    setTimeout(() => scrollToBottom("smooth"), 50);

    const botMsgId = `bot-${Date.now()}`;
    const steps: string[] = [];

    try {
      // Step 1: Query analysis
      setThinkingStep("🧠 Analyzing inquiry & extracting semantic entities...");
      steps.push("Analyzed natural language intent and extracted keywords.");
      await new Promise((r) => setTimeout(r, 400));

      // Step 2: Knowledge Graph search
      setThinkingStep("🔍 Scanning verified resume, project records & blog graph...");
      steps.push("Matched relevant knowledge chunks from Tansen's verified dataset.");
      await new Promise((r) => setTimeout(r, 450));

      // Step 3: Fetch RAG result
      setThinkingStep("✨ Synthesizing grounded response with source citations...");
      const response: RagResponse = await queryRagEngine(query);
      steps.push("Synthesized formatted markdown response with verifiable citations.");
      await new Promise((r) => setTimeout(r, 300));

      setThinkingStep("");
      setIsProcessing(false);

      // Stream response naturally
      await streamAssistantResponse(
        botMsgId,
        response.answer,
        response.sources,
        response.suggestedQuestions,
        steps
      );
    } catch (err) {
      console.error("RAG Query Failed", err);
      setIsProcessing(false);
      setThinkingStep("");
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text: "I encountered an issue retrieving that information. Please try asking again or email Tansen directly at tansena54ang@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      scrollToBottom("smooth");
    }
  };

  const toggleThinking = (msgId: string) => {
    setExpandedThinking((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "assistant",
        text: "Chat cleared. What else would you like to know about Tansen's technical experience, projects, or blog tutorials?",
        suggestedQuestions: [
          "What is Tansen's experience with Spring Boot & Redis?",
          "What are his featured projects?",
          "How can I contact Tansen?"
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
  };

  return (
    <>
      <Helmet>
        <title>Tansen AI Knowledge Assistant | RAG Chat</title>
        <meta
          name="description"
          content="Interact with Tansen Angdembe's AI assistant to inquire about his resume, full-stack Java projects, work experience at COSMOTECH, and engineering tutorials."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col justify-between text-foreground">
        <Header />

        <main className="pt-28 pb-12 flex-1 flex flex-col container-custom px-4 max-w-4xl">
          {/* Top Title & Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-md">
                <Bot size={22} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground flex items-center gap-2">
                  <span>Tansen AI Assistant</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    RAG Knowledge Engine
                  </span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  Grounded in Tansen's verified resume, projects, and 179 technical articles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/knowledge_base.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-card hover:bg-muted border border-border text-foreground hover:text-primary transition-colors shadow-sm"
                title="View master Markdown file"
              >
                <FileText size={14} className="text-primary" />
                <span>Raw Knowledge Base (.md)</span>
              </a>
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl text-xs font-semibold bg-card hover:bg-muted border border-border text-foreground hover:text-destructive transition-colors shadow-sm flex items-center gap-1"
                title="Clear Chat"
                aria-label="Clear chat messages"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Chat Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto space-y-6 pb-6 min-h-[440px] max-h-[620px] pr-2 scrollbar-thin scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary border border-primary/30 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[90%] sm:max-w-[82%] rounded-3xl p-5 shadow-md transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm ml-8"
                      : "bg-card border border-border text-card-foreground rounded-tl-sm"
                  }`}
                >
                  {/* Optional Collapsible Thinking Process */}
                  {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                    <div className="mb-3.5 pb-3 border-b border-border/60">
                      <button
                        onClick={() => toggleThinking(msg.id)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-medium transition-colors"
                      >
                        <Brain size={13} className="text-primary animate-pulse" />
                        <span>View Retrieval & Thought Process</span>
                        {expandedThinking[msg.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>

                      {expandedThinking[msg.id] && (
                        <div className="mt-2.5 p-3 rounded-xl bg-muted/60 border border-border/70 text-xs space-y-1.5 animate-fade-in">
                          {msg.thinkingSteps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-foreground">
                              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="text-sm md:text-base leading-relaxed space-y-3 whitespace-pre-line font-normal">
                    {msg.text}
                    {msg.isStreaming && (
                      <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse align-middle" />
                    )}
                  </div>

                  {/* Sources / Citations (Shown once stream is complete) */}
                  {!msg.isStreaming && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/50 text-xs animate-fade-in">
                      <span className="font-semibold text-muted-foreground uppercase tracking-wider block mb-2 text-[10px]">
                        Indexed Knowledge Sources:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, idx) => {
                          if (src.link) {
                            return (
                              <Link
                                key={idx}
                                to={src.link}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-primary/15 text-foreground hover:text-primary border border-border/70 transition-colors font-medium text-xs shadow-sm"
                              >
                                <span>{src.title}</span>
                                <ExternalLink size={11} className="text-primary" />
                              </Link>
                            );
                          }
                          return (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border/70 text-xs font-medium"
                            >
                              {src.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Suggested Follow-up Prompts */}
                  {!msg.isStreaming && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/50 text-xs animate-fade-in">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Follow-up suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="px-3 py-1.5 rounded-lg bg-muted hover:bg-primary/15 text-foreground hover:text-primary text-xs font-medium border border-border/60 transition-colors text-left shadow-sm"
                          >
                            + {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div
                    className={`mt-2 text-[10px] text-right ${
                      msg.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm font-semibold">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {/* Dynamic Live Thinking State Animation */}
            {isProcessing && (
              <div className="flex gap-3.5 justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary border border-primary/30 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Brain size={16} className="text-primary animate-pulse" />
                </div>
                <div className="rounded-3xl rounded-tl-sm p-4 px-5 bg-card border border-primary/30 shadow-md flex items-center gap-3 text-card-foreground">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-foreground tracking-wide">
                    {thinkingStep || "Thinking..."}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Query Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative pt-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about projects, experience at COSMOTECH, BCA education, or blog tutorials..."
              className="w-full pl-5 pr-14 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground outline-none shadow-card text-sm"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 mt-1 p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center"
              aria-label="Submit message"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 text-xs text-muted-foreground scrollbar-none">
            <span className="font-semibold text-foreground text-xs whitespace-nowrap">Try:</span>
            {[
              "Experience at COSMOTECH",
              "Lions Management System",
              "BCA Degree at KCMIT",
              "Spring Boot JWT Tutorial",
              "Docker Compose MySQL",
              "Redis Caching Strategy",
              "Contact Information"
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => handleSendMessage(tag)}
                className="px-3 py-1.5 rounded-full bg-card hover:bg-primary/15 text-foreground hover:text-primary border border-border text-xs font-medium whitespace-nowrap shadow-sm transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
