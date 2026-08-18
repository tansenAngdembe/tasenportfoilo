import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, X, ArrowRight, Bot, Send } from "lucide-react";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Hide button on /chat page to avoid duplication
  if (location.pathname === "/chat" || location.pathname === "/ask") {
    return null;
  }

  const handleLaunchChat = (query?: string) => {
    const q = query || inputQuery;
    if (q && q.trim()) {
      navigate(`/chat?q=${encodeURIComponent(q.trim())}`);
    } else {
      navigate("/chat");
    }
    setIsOpen(false);
    setInputQuery("");
  };

  const quickPrompts = [
    "Tell me about Tansen's work at COSMOTECH",
    "What projects has Tansen built?",
    "How does Tansen implement Spring Boot JWT Auth?",
    "Where did Tansen study his BCA degree?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Prompt Drawer Popup */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-3xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl p-5 animate-scale-in origin-bottom-right text-card-foreground">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/70 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                  <span>Tansen AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <p className="text-[11px] text-muted-foreground">Ask anything about resume & blogs</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close assistant popover"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="space-y-1.5 mb-4">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
              Suggested questions:
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleLaunchChat(prompt)}
                className="w-full text-left p-2.5 rounded-xl text-xs bg-muted/60 hover:bg-primary/10 text-foreground hover:text-primary border border-border/60 transition-all flex items-center justify-between group"
              >
                <span className="line-clamp-1 font-medium">{prompt}</span>
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0 ml-1.5" />
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLaunchChat();
            }}
            className="relative"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about projects, skills, education..."
              className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
              aria-label="Send message"
            >
              <Send size={13} />
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-3 pt-2.5 border-t border-border/60 text-center">
            <button
              onClick={() => handleLaunchChat()}
              className="text-[11px] font-semibold text-primary hover:underline"
            >
              Open Full AI Chat Interface →
            </button>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-card border border-border text-foreground hover:border-primary shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 dark:bg-card dark:text-foreground dark:border-border/80"
        aria-label="Chat with Tansen AI Assistant"
      >
        <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <Bot size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
        </div>
        <span className="font-display font-semibold text-xs sm:text-sm text-foreground tracking-tight hidden sm:inline-block">
          Ask Tansen AI
        </span>
        <Sparkles size={14} className="text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
