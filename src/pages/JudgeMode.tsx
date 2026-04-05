import { useState } from "react";
import { Scale, Send, AlertTriangle, CheckCircle2, Shield, ExternalLink, Gavel, Eye, Wrench, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const quickActions = [
  { icon: AlertTriangle, label: "Common Violations", color: "text-neon-amber" },
  { icon: Wrench, label: "Inspection Issues", color: "text-accent" },
  { icon: Eye, label: "Match Flow", color: "text-primary" },
  { icon: Users, label: "Robot Contact", color: "text-secondary" },
];

const exampleScenarios = [
  "A robot extends beyond 42 inches while placing a game element on a high junction.",
  "Two robots collide while racing to pick up the same cone. One robot tips over.",
  "A team member reaches onto the field to steady their robot during the match.",
];

export default function JudgeMode() {
  const [scenario, setScenario] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (scenario.trim()) setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <Scale className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Judge Mode</h1>
          <p className="text-sm text-muted-foreground">Describe a scenario — find the relevant rules instantly</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {quickActions.map(a => (
          <button key={a.label} className="glass-card p-4 rounded-xl flex items-center gap-3 text-left group">
            <a.icon className={cn("w-5 h-5", a.color, "group-hover:scale-110 transition-transform")} />
            <span className="text-xs font-display font-bold">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-xl">
            <label className="font-display text-sm font-bold mb-3 block">Describe the Case</label>
            <textarea
              value={scenario}
              onChange={e => setScenario(e.target.value)}
              placeholder="Describe what happened on the field in plain language..."
              className="w-full h-40 p-4 rounded-xl bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none transition-all"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground">Or try an example →</p>
              <Button variant="neon" size="sm" onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-1" /> Analyze
              </Button>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl">
            <h3 className="font-display text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Example Scenarios</h3>
            <div className="space-y-2">
              {exampleScenarios.map(s => (
                <button key={s} onClick={() => { setScenario(s); setSubmitted(true); }}
                  className="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2.5 rounded-lg hover:bg-muted/50 transition-all leading-relaxed">
                  "{s}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          {!submitted ? (
            <div className="glass-panel p-12 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <Gavel className="w-16 h-16 text-muted-foreground/20 mb-4" />
              <h3 className="font-display text-base font-bold text-muted-foreground mb-1">Awaiting Scenario</h3>
              <p className="text-xs text-muted-foreground">Describe a case or pick an example to see matched rules.</p>
            </div>
          ) : (
            <>
              <div className="glass-card p-5 rounded-xl border-primary/30 neon-glow-blue">
                <div className="flex items-center justify-between mb-3">
                  <span className="chip-blue flex items-center gap-1"><Shield className="w-3 h-3" /> Top Match</span>
                  <span className="text-xs text-muted-foreground">Relevance: <span className="font-display font-bold text-neon-lime">96%</span></span>
                </div>
                <h3 className="font-display text-base font-bold mb-2">G12 — Robot Contact & Damage</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  Robots may not intentionally or recklessly cause damage to other robots. The described contact appears to involve potential reckless behavior that could trigger this rule.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="chip-amber">⚠ Major Penalty Likely</span>
                  <span className="chip-violet">Driver-Controlled</span>
                  <span className="chip-cyan">Both Alliances</span>
                </div>
                <Button variant="glass" size="sm">
                  <ExternalLink className="w-3 h-3 mr-1" /> View Full Section
                </Button>
              </div>

              <div className="glass-card p-5 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="chip-violet flex items-center gap-1">Also Relevant</span>
                  <span className="text-xs text-muted-foreground">Relevance: <span className="font-display font-bold text-primary">78%</span></span>
                </div>
                <h3 className="font-display text-sm font-bold mb-2">G15 — Pinning & Trapping</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If the scenario involves restricting another robot's movement for more than 5 seconds, this rule may also apply.
                </p>
              </div>

              <div className="glass-card p-5 rounded-xl">
                <h3 className="font-display text-sm font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-lime" /> Quick Summary
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-neon-amber mt-0.5">•</span> Likely a penalty situation based on described contact</li>
                  <li className="flex items-start gap-2"><span className="text-neon-lime mt-0.5">•</span> Head Referee should assess intent and severity</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span> Consider reviewing match footage if available</li>
                </ul>
              </div>

              <div className="glass-panel p-4 rounded-xl border-neon-amber/20">
                <p className="text-xs text-muted-foreground text-center">
                  ⚠ This analysis is an educational aid. Final rulings belong to event officials and the Head Referee.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
