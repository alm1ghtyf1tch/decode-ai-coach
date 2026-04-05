import { useState } from "react";
import { ArrowLeft, ToggleLeft, ToggleRight, ChevronRight, AlertTriangle, BookOpen, Shield, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  { id: "g01", label: "G01 — Game Overview", category: "Game Rules" },
  { id: "g12", label: "G12 — Robot Contact", category: "Violations" },
  { id: "g15", label: "G15 — Pinning/Trapping", category: "Violations" },
  { id: "r07", label: "R07 — Size Limits", category: "Robot Legality" },
  { id: "i04", label: "I04 — Inspection Criteria", category: "Inspection" },
  { id: "s04", label: "S04 — Scoring Methods", category: "Scoring" },
];

export default function LessonDetail() {
  const nav = useNavigate();
  const [isOfficial, setIsOfficial] = useState(false);
  const [activeSection, setActiveSection] = useState("g12");

  return (
    <div className="max-w-7xl mx-auto animate-slide-up">
      <Button variant="ghost" size="sm" onClick={() => nav(-1)} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Learn
      </Button>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left nav */}
        <div className="glass-panel p-4 rounded-xl lg:col-span-1 space-y-1 h-fit">
          <h3 className="font-display text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Sections</h3>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between",
                activeSection === s.id ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span>{s.label}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="chip-blue">G12</span>
            <span className="chip-amber">⚠ Major Penalty Risk</span>
            <span className="chip-violet">All Match Phases</span>
            <span className="chip-cyan">Drivers & Coaches</span>
          </div>

          {/* Toggle */}
          <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Robot-to-Robot Contact</h2>
            <button
              onClick={() => setIsOfficial(!isOfficial)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isOfficial ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5" />}
              {isOfficial ? "Official" : "Simple"}
            </button>
          </div>

          {/* Content */}
          <div className="glass-card p-6 rounded-xl">
            {!isOfficial ? (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">
                  Robots are <span className="text-primary font-semibold">not allowed to intentionally damage or tip</span> other robots. Contact that is part of normal game play (like bumping while both robots move toward the same game element) is generally okay.
                </p>
                <p className="text-sm leading-relaxed">
                  However, <span className="text-neon-amber font-semibold">aggressive, destructive, or strategically harmful contact</span> will result in penalties. The key distinction is <em>intent and severity</em>.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <Shield className="w-3 h-3 text-neon-lime" />
                  <span>Simple Explanation — See official toggle for exact wording</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 font-mono">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &lt;G12&gt; Robots may not intentionally or recklessly cause damage to other Robots, the Playing Field, or Playing Field Elements. Violations of this rule will result in a Major Penalty and may result in a Yellow Card or Red Card at the discretion of the Head Referee.
                </p>
                <div className="chip-blue text-xs">Official Source: FTC Game Manual Part 2, Section 4.3.2</div>
              </div>
            )}
          </div>

          {/* Scenario */}
          <div className="glass-card p-5 rounded-xl border-secondary/30 bg-gradient-to-r from-secondary/5 to-transparent">
            <h4 className="font-display text-sm font-bold mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-secondary" /> Example Scenario
            </h4>
            <p className="text-sm text-muted-foreground">
              Robot A is placing a game element on a junction. Robot B drives into Robot A at speed, knocking it away from the junction. Robot A's arm is bent. → <span className="text-destructive font-semibold">Major Penalty + possible Yellow Card for Robot B</span>
            </p>
          </div>

          {/* Common Mistake */}
          <div className="glass-card p-5 rounded-xl border-neon-amber/30 bg-gradient-to-r from-neon-amber/5 to-transparent">
            <h4 className="font-display text-sm font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-amber" /> Common Mistake
            </h4>
            <p className="text-sm text-muted-foreground">
              Many teams think incidental contact is always a penalty. It's not — referees distinguish between normal game play contact and intentional/reckless damage.
            </p>
          </div>

          {/* Official source expandable */}
          <details className="glass-panel rounded-xl">
            <summary className="p-4 cursor-pointer text-sm font-display font-bold flex items-center gap-2 hover:text-primary transition-colors">
              <Shield className="w-4 h-4" /> Need the full official wording?
            </summary>
            <div className="px-4 pb-4 text-xs font-mono text-muted-foreground leading-relaxed border-t border-border pt-3">
              &lt;G12&gt; Robots may not intentionally or recklessly cause damage to other Robots, the Playing Field, or Playing Field Elements. Intentional or reckless damage includes, but is not limited to, actions taken by a Drive Team or their Robot designed to cause damage, disable, interfere with, or impede the normal operation of an opposing Alliance's Robot. This includes shooting game elements at an opposing Alliance Robot. Violations of this rule will result in a Major Penalty and may result in a Yellow Card or Red Card at the discretion of the Head Referee. Egregious or repeated offenses may result in disqualification.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
