import { Bot, Cpu, Eye, Shield, Brain, Wrench, Star, Flame, Trophy, Lock, CheckCircle2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { name: "Basic Bot", level: "1–3", unlocked: true, current: false },
  { name: "Upgraded Bot", level: "4–6", unlocked: true, current: false },
  { name: "Competition-Ready", level: "7–9", unlocked: true, current: true },
  { name: "Elite Judge Unit", level: "10+", unlocked: false, current: false },
];

const modules = [
  { icon: Eye, name: "Vision Core", desc: "Pattern recognition for violations", status: "equipped", color: "text-accent" },
  { icon: Brain, name: "Logic Module", desc: "Advanced rule interpretation", status: "equipped", color: "text-secondary" },
  { icon: Shield, name: "Stability Frame", desc: "Consistent accuracy under pressure", status: "available", color: "text-primary" },
  { icon: Cpu, name: "Rule Engine", desc: "Complete manual knowledge base", status: "locked", color: "text-muted-foreground" },
  { icon: Wrench, name: "Strategy Shell", desc: "Tactical decision making", status: "locked", color: "text-muted-foreground" },
];

const achievements = [
  { icon: Star, name: "First Lesson", desc: "Complete your first lesson", unlocked: true },
  { icon: Flame, name: "5-Day Streak", desc: "Learn for 5 days in a row", unlocked: true },
  { icon: Trophy, name: "Perfect Quiz", desc: "Score 100% on any quiz", unlocked: true },
  { icon: Zap, name: "Speed Learner", desc: "Complete 3 lessons in one day", unlocked: false },
  { icon: Shield, name: "Rule Master", desc: "Learn all rules in a category", unlocked: false },
  { icon: Bot, name: "Judge Ready", desc: "Analyze 10 scenarios", unlocked: false },
];

export default function Garage() {
  return (
    <div className="max-w-6xl mx-auto animate-slide-up space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Robot Garage</h1>
          <p className="text-sm text-muted-foreground">Evolve your robot as you master the rules</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Robot Display */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-b from-primary/10 via-secondary/5 to-accent/10 neon-glow-blue text-center">
            <div className="relative inline-block mb-4">
              <Bot className="w-32 h-32 text-primary animate-float" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 bg-primary/20 rounded-full blur-md" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-neon-lime rounded-full animate-pulse-glow" />
            </div>
            <h2 className="font-display text-lg font-black text-gradient-primary mb-1">Competition-Ready</h2>
            <p className="text-xs text-muted-foreground mb-4">Level 7 · 1,250 XP</p>
            
            {/* XP Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">XP to next level</span>
                <span className="font-display font-bold text-primary">1,250 / 2,000</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full" style={{ width: "62%" }} />
              </div>
            </div>

            <div className="flex justify-center gap-4 text-center">
              <div><p className="font-display text-lg font-black text-foreground">5</p><p className="text-xs text-muted-foreground">Streak</p></div>
              <div><p className="font-display text-lg font-black text-foreground">47</p><p className="text-xs text-muted-foreground">Rules</p></div>
              <div><p className="font-display text-lg font-black text-foreground">92%</p><p className="text-xs text-muted-foreground">Accuracy</p></div>
            </div>
          </div>

          {/* Evolution Path */}
          <div className="glass-panel p-5 rounded-xl mt-4">
            <h3 className="font-display text-sm font-bold mb-3">Evolution Path</h3>
            <div className="space-y-2">
              {stages.map(s => (
                <div key={s.name} className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all",
                  s.current ? "bg-primary/15 border border-primary/30 text-primary" :
                  s.unlocked ? "text-foreground/70" : "text-muted-foreground opacity-50"
                )}>
                  {s.unlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  <div className="flex-1">
                    <span className="font-display font-bold">{s.name}</span>
                    <span className="text-muted-foreground ml-2">Lv. {s.level}</span>
                  </div>
                  {s.current && <span className="chip-blue text-xs">Current</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modules & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upgrade Modules */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-4">Upgrade Modules</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {modules.map(m => (
                <div key={m.name} className={cn(
                  "glass-card p-4 rounded-xl flex items-start gap-3",
                  m.status === "locked" && "opacity-50"
                )}>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    m.status === "equipped" ? "bg-primary/20" : m.status === "available" ? "bg-muted" : "bg-muted/50"
                  )}>
                    <m.icon className={cn("w-5 h-5", m.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-display text-xs font-bold">{m.name}</h4>
                      <span className={cn("chip text-xs",
                        m.status === "equipped" ? "chip-lime" : m.status === "available" ? "chip-blue" : "chip-amber"
                      )}>
                        {m.status === "equipped" ? "Equipped" : m.status === "available" ? "Available" : "🔒 Locked"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-4">Achievements</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {achievements.map(a => (
                <div key={a.name} className={cn(
                  "glass-card p-4 rounded-xl text-center",
                  !a.unlocked && "opacity-40"
                )}>
                  <a.icon className={cn("w-8 h-8 mx-auto mb-2", a.unlocked ? "text-neon-amber" : "text-muted-foreground")} />
                  <h4 className="font-display text-xs font-bold mb-0.5">{a.name}</h4>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Missions */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-4">Active Missions</h3>
            <div className="space-y-3">
              {[
                { name: "Complete 3 Violation Lessons", progress: 67, xp: 150 },
                { name: "Pass an Inspection Quiz", progress: 0, xp: 100 },
                { name: "Analyze 2 Judge Scenarios", progress: 50, xp: 200 },
              ].map(m => (
                <div key={m.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-display font-bold">{m.name}</span>
                      <span className="text-primary font-display">+{m.xp} XP</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
