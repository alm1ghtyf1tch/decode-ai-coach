import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Brain, Scale, BookOpen, Zap, ArrowRight, Shield, Users, Trophy } from "lucide-react";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Bot className="w-5 h-5 text-foreground" />
            </div>
            <span className="font-display text-lg font-bold tracking-wider">DECODE AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => nav("/onboarding")}>Get Started</Button>
            <Button variant="neon" size="sm" onClick={() => nav("/onboarding")}>Open Demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="chip-blue mb-6 mx-auto">FTC Competition Intelligence</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
            From <span className="text-gradient-primary">184 pages</span><br />
            to one clear decision.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn, check, and judge FTC rules with an AI-powered companion that turns the competition manual into an intuitive, beautiful experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" onClick={() => nav("/onboarding")}>
              Open Demo <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="glass" size="xl" onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Explore Features
            </Button>
          </div>
        </div>

        {/* Mock floating UI */}
        <div className="relative max-w-4xl mx-auto mt-16">
          <div className="glass-panel p-6 rounded-2xl neon-glow-blue animate-float">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-neon-amber/80" />
              <div className="w-3 h-3 rounded-full bg-neon-lime/80" />
              <span className="text-xs text-muted-foreground ml-2 font-display">DECODE AI — Dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Rules Mastered", value: "47", color: "from-primary to-secondary" },
                { label: "Accuracy", value: "92%", color: "from-accent to-primary" },
                { label: "Robot Level", value: "Elite", color: "from-secondary to-accent" },
              ].map((s) => (
                <div key={s.label} className="glass-card p-4 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className={`text-2xl font-display font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
            Everything you need to <span className="neon-text-blue">master the rules</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            From first-time learner to seasoned judge, DECODE AI adapts to your needs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Learn from Zero", desc: "Structured micro-lessons break down every rule into digestible concepts.", color: "text-primary" },
              { icon: Brain, title: "Ask AI", desc: "Natural language rule lookup with official references and simple explanations.", color: "text-secondary" },
              { icon: Scale, title: "Judge Mode", desc: "Describe a scenario, get matched to the most relevant manual sections instantly.", color: "text-accent" },
              { icon: Zap, title: "Quick Refresh", desc: "2, 5, or 10-minute drill sessions before matches or judging rounds.", color: "text-neon-amber" },
              { icon: Shield, title: "Official Sources", desc: "Every answer links back to the official manual section. No guesswork.", color: "text-neon-lime" },
              { icon: Trophy, title: "Robot Evolution", desc: "Your robot avatar evolves as you learn. Unlock upgrades and achievements.", color: "text-primary" },
            ].map((f) => (
              <div key={f.title} className="glass-card p-6 rounded-xl group cursor-pointer">
                <f.icon className={`w-10 h-10 ${f.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-display text-base font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Built for <span className="text-gradient-cyan">every role</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Users, role: "Rookies", desc: "Start from scratch with guided learning paths and friendly explanations.", gradient: "from-primary/20 to-primary/5" },
              { icon: Trophy, role: "Competitors", desc: "Instant rule lookups and pre-match refreshers to stay sharp.", gradient: "from-secondary/20 to-secondary/5" },
              { icon: Scale, role: "Judges", desc: "Scenario analysis, quick reference, and confidence in every ruling.", gradient: "from-accent/20 to-accent/5" },
            ].map((a) => (
              <div key={a.role} className={`glass-card p-8 rounded-2xl bg-gradient-to-b ${a.gradient} text-center`}>
                <a.icon className="w-12 h-12 mx-auto mb-4 text-foreground" />
                <h3 className="font-display text-xl font-bold mb-2">{a.role}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to decode?</h2>
          <p className="text-muted-foreground mb-8">Jump into the demo and explore how DECODE AI transforms the FTC experience.</p>
          <Button variant="hero" size="xl" onClick={() => nav("/onboarding")}>
            Start Now <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          DECODE AI is an educational aid and prototype. The official FTC Game Manual remains the final authority for all rulings. © 2026 DECODE AI
        </p>
      </footer>
    </div>
  );
}
