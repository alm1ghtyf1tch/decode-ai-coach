import { useState } from "react";
import { Send, Bot, User, Bookmark, Clock, ExternalLink, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const starters = [
  "Can I block another robot during autonomous?",
  "What triggers a re-inspection?",
  "Is this a penalty for pinning?",
  "What are the robot size limits?",
  "How is the endgame scored?",
  "What's the difference between minor and major penalty?",
];

interface Message {
  role: "user" | "ai";
  content: string;
  source?: string;
  confidence?: number;
}

const mockConversation: Message[] = [
  { role: "user", content: "Can a robot block another robot from scoring during the driver-controlled period?" },
  {
    role: "ai",
    content: "Yes, defensive play is generally allowed during the driver-controlled period. However, there are important limits:\n\n• **Pinning/Trapping** is limited to 5 seconds (rule G15)\n• You cannot **intentionally damage** the other robot (rule G12)\n• **Blocking access** to game elements in a shared area is legal\n• **Pushing** another robot is allowed as part of normal game play\n\nThe key is that defensive strategies must not cross into reckless or damaging behavior. Referees will assess intent and severity.",
    source: "G12, G15 — FTC Game Manual Part 2, Sections 4.3.2–4.3.5",
    confidence: 94,
  },
];

export default function AskAI() {
  const [messages, setMessages] = useState<Message[]>(mockConversation);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input },
      { role: "ai", content: "Based on my analysis of the FTC Game Manual, here's what I found:\n\nThis scenario relates to **rule G12** regarding robot contact. The key consideration is whether the contact was incidental or intentional.\n\n• If incidental during normal gameplay → **No penalty**\n• If intentional/reckless → **Major Penalty**\n• If damage occurs → **Yellow/Red Card possible**\n\nRemember: the Head Referee makes the final determination based on what they observe.", source: "G12 — FTC Game Manual Part 2, Section 4.3.2", confidence: 88 }
    ]);
    setInput("");
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex gap-4 animate-slide-up">
      {/* Main chat */}
      <div className="flex-1 flex flex-col glass-panel rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-foreground" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold">DECODE AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Ask any FTC rule question</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="w-16 h-16 text-primary/30 mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">Ask me anything about FTC rules</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                I'll find the relevant manual sections and give you a clear, simple answer with official references.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {starters.map(s => (
                  <button key={s} onClick={() => { setInput(s); }} className="chip-blue text-xs hover:bg-primary/20 transition-colors cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-foreground" />
                </div>
              )}
              <div className={cn(
                "max-w-[80%] rounded-xl p-4 text-sm",
                m.role === "user"
                  ? "bg-primary/20 border border-primary/30"
                  : "glass-card"
              )}>
                <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{
                  __html: m.content.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-semibold">$1</span>')
                }} />
                {m.source && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="chip-blue text-xs flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> {m.source}
                      </span>
                    </div>
                    {m.confidence && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Relevance:</span>
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-neon-lime rounded-full" style={{ width: `${m.confidence}%` }} />
                        </div>
                        <span className="font-display font-bold text-neon-lime">{m.confidence}%</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      <ExternalLink className="w-3 h-3 mr-1" /> Open source section
                    </Button>
                  </div>
                )}
              </div>
              {m.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask a rule question..."
              className="flex-1 h-11 px-4 rounded-xl bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
            />
            <Button variant="neon" size="icon" className="h-11 w-11" onClick={sendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Answers are educational aids. Official FTC manual remains the final authority.
          </p>
        </div>
      </div>

      {/* Side panel */}
      <div className="hidden xl:flex flex-col w-72 space-y-4">
        <div className="glass-panel p-4 rounded-xl">
          <h3 className="font-display text-xs font-bold mb-3 flex items-center gap-2">
            <Clock className="w-3 h-3" /> Recent Searches
          </h3>
          <div className="space-y-2">
            {["Robot contact rules", "Pinning duration limit", "Autonomous scoring", "Size limit exceptions"].map(s => (
              <button key={s} className="w-full text-left text-xs text-muted-foreground hover:text-foreground py-1.5 px-2 rounded hover:bg-muted/50 transition-all flex items-center justify-between">
                {s} <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <h3 className="font-display text-xs font-bold mb-3 flex items-center gap-2">
            <Bookmark className="w-3 h-3" /> Saved Answers
          </h3>
          <div className="space-y-2">
            {["G12 contact explanation", "Inspection checklist summary"].map(s => (
              <button key={s} className="w-full text-left text-xs text-muted-foreground hover:text-foreground py-1.5 px-2 rounded hover:bg-muted/50 transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
