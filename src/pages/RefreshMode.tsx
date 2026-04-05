import { useState } from "react";
import { Zap, Clock, Play, CheckCircle2, XCircle, ChevronRight, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modes = [
  { time: "2 min", label: "Quick Glance", desc: "Top 5 critical rules", color: "from-neon-lime/20 to-neon-lime/5" },
  { time: "5 min", label: "Standard Refresh", desc: "Key violations + inspection", color: "from-primary/20 to-primary/5" },
  { time: "10 min", label: "Deep Review", desc: "Full category sweep", color: "from-secondary/20 to-secondary/5" },
];

const quickCards = [
  { title: "G12 — Robot Contact", summary: "No intentional damage. Major penalty + possible card.", status: "critical" },
  { title: "G15 — Pinning Limit", summary: "5-second limit on pinning/trapping. Count starts on ref signal.", status: "warning" },
  { title: "R07 — Size Constraints", summary: "42\" cube in starting config. Can extend during play.", status: "info" },
  { title: "I04 — Battery Safety", summary: "Battery must be secured. No exposed wires. Check connector.", status: "critical" },
  { title: "S04 — Cone Scoring", summary: "Cones on junctions score 1 point ownership. Verify placement.", status: "info" },
  { title: "G20 — End Game Rules", summary: "Last 30 seconds = end game. Signal scoring begins.", status: "warning" },
];

export default function RefreshMode() {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const toggleCard = (i: number) => {
    setRevealedCards(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto animate-slide-up space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-amber/20 to-primary/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-neon-amber" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Quick Refresh</h1>
          <p className="text-sm text-muted-foreground">Fast revision before matches or judging rounds</p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid sm:grid-cols-3 gap-4">
        {modes.map(m => (
          <button
            key={m.time}
            onClick={() => setActiveMode(m.time)}
            className={cn(
              `glass-card p-5 rounded-xl text-center bg-gradient-to-b ${m.color} group`,
              activeMode === m.time && "border-primary/50 neon-glow-blue"
            )}
          >
            <Clock className="w-8 h-8 mx-auto mb-2 text-foreground group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-2xl font-black mb-1">{m.time}</h3>
            <p className="font-display text-xs font-bold mb-0.5">{m.label}</p>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </button>
        ))}
      </div>

      {/* Timer Bar */}
      {activeMode && (
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="neon" size="sm"><Play className="w-4 h-4 mr-1" /> Start {activeMode} Refresh</Button>
            <span className="text-xs text-muted-foreground">Tap cards to reveal answers</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-neon-amber" />
            <span className="font-display text-sm font-bold">{revealedCards.size}/{quickCards.length}</span>
          </div>
        </div>
      )}

      {/* Quick Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {quickCards.map((c, i) => (
          <button
            key={i}
            onClick={() => toggleCard(i)}
            className={cn(
              "glass-card p-5 rounded-xl text-left transition-all",
              revealedCards.has(i) && "border-primary/30 bg-primary/5"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <span className={cn("chip text-xs",
                c.status === "critical" ? "chip-amber" : c.status === "warning" ? "chip-violet" : "chip-cyan"
              )}>
                {c.status === "critical" ? "⚠ Critical" : c.status === "warning" ? "Important" : "Reference"}
              </span>
              {revealedCards.has(i) ? <CheckCircle2 className="w-4 h-4 text-neon-lime" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            </div>
            <h3 className="font-display text-sm font-bold mb-1">{c.title}</h3>
            <p className={cn("text-xs leading-relaxed transition-all", revealedCards.has(i) ? "text-foreground/80" : "text-muted-foreground blur-sm select-none")}>
              {c.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Performance */}
      {revealedCards.size > 0 && (
        <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-neon-amber" />
            <div>
              <p className="font-display text-sm font-bold">Great progress!</p>
              <p className="text-xs text-muted-foreground">You've reviewed {revealedCards.size} of {quickCards.length} key rules</p>
            </div>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-neon-lime to-primary rounded-full transition-all" style={{ width: `${(revealedCards.size / quickCards.length) * 100}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
