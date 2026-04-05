import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, BookOpen, MessageSquare, Scale, Zap, Library, Flame, Target, TrendingUp, Clock, Star, ArrowRight, Trophy } from "lucide-react";

const actionCards = [
  { icon: BookOpen, label: "Learn", desc: "Structured lessons", to: "/app/learn", gradient: "from-primary/20 to-primary/5" },
  { icon: MessageSquare, label: "Ask AI", desc: "Natural language lookup", to: "/app/ask", gradient: "from-secondary/20 to-secondary/5" },
  { icon: Scale, label: "Judge Mode", desc: "Scenario analyzer", to: "/app/judge", gradient: "from-accent/20 to-accent/5" },
  { icon: Zap, label: "Refresh", desc: "Quick drill", to: "/app/refresh", gradient: "from-neon-amber/20 to-neon-amber/5" },
  { icon: Library, label: "Manual Library", desc: "Browse all rules", to: "/app/library", gradient: "from-neon-lime/20 to-neon-lime/5" },
];

const recentActivity = [
  { time: "2m ago", text: "Completed lesson: Autonomous Period Scoring" },
  { time: "15m ago", text: "Quiz streak: 8 correct in a row" },
  { time: "1h ago", text: "Searched: 'robot contact penalty G12'" },
  { time: "3h ago", text: "Judge Mode: analyzed blocking scenario" },
];

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-slide-up">
      {/* Greeting */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Ready for <span className="text-gradient-primary">DECODE</span>?
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your AI-powered FTC rules companion</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="chip-amber flex items-center gap-1"><Flame className="w-3 h-3" /> 5 day streak</div>
          <div className="chip-blue flex items-center gap-1"><Star className="w-3 h-3" /> Level 7</div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-panel p-4 rounded-2xl">
        <div className="relative">
          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Ask anything about FTC rules... e.g. 'Can I block another robot during autonomous?'"
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            onFocus={() => nav("/app/ask")}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {actionCards.map((c) => (
              <button
                key={c.label}
                onClick={() => nav(c.to)}
                className={`glass-card p-5 rounded-xl text-left bg-gradient-to-br ${c.gradient} group`}
              >
                <c.icon className="w-8 h-8 text-foreground mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-sm font-bold mb-1">{c.label}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </button>
            ))}
          </div>

          {/* Daily Challenge */}
          <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
            <div className="flex items-start justify-between">
              <div>
                <div className="chip-violet mb-2">Daily Challenge</div>
                <h3 className="font-display text-base font-bold mb-1">Violation or Not?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  A robot extends its arm beyond the 42" limit during the driver-controlled period. The extension happens while placing a game element. Is this a violation?
                </p>
                <Button variant="neon" size="sm" onClick={() => nav("/app/quiz")}>
                  Answer Challenge <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <Trophy className="w-12 h-12 text-secondary/40 flex-shrink-0 ml-4" />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-xs text-muted-foreground w-16 flex-shrink-0 pt-0.5">{a.time}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="text-foreground/80">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar widgets */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="font-display text-sm font-bold">Your Stats</h3>
            {[
              { label: "Rules Learned", value: "47 / 120", pct: 39, icon: BookOpen },
              { label: "Accuracy", value: "92%", pct: 92, icon: Target },
              { label: "XP Earned", value: "1,250", pct: 62, icon: TrendingUp },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1"><s.icon className="w-3 h-3" /> {s.label}</span>
                  <span className="font-display font-bold text-foreground">{s.value}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Robot Avatar */}
          <button onClick={() => nav("/app/garage")} className="glass-card p-5 rounded-xl w-full text-left bg-gradient-to-b from-primary/10 to-secondary/10 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-bold">Your Robot</h3>
              <span className="chip-blue text-xs">Lv. 7</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="relative">
                <Bot className="w-20 h-20 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 bg-primary/20 rounded-full blur-sm" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-xs font-bold text-primary">Competition-Ready Bot</p>
              <p className="text-xs text-muted-foreground mt-1">3 upgrades available</p>
            </div>
          </button>

          {/* Bookmarked */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-3">Bookmarked Rules</h3>
            <div className="space-y-2">
              {["G12 — Robot Contact", "R07 — Size Limits", "S04 — Scoring Criteria"].map((r) => (
                <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  <Star className="w-3 h-3 text-neon-amber" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {["Game Rules", "Violations", "Inspection", "Scoring", "Tournament", "Robot"].map((c) => (
                <span key={c} className="chip-blue text-xs cursor-pointer hover:bg-primary/20 transition-colors">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
