import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Bot, Users, Trophy, Scale, BookOpen, Search, Zap, Brain, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "role" | "goal" | "level" | "ready";

const roles = [
  { id: "rookie" as const, icon: Users, label: "Rookie", desc: "I'm new to FTC and want to learn from scratch." },
  { id: "competitor" as const, icon: Trophy, label: "Competitor", desc: "I compete and need fast rule access." },
  { id: "judge" as const, icon: Scale, label: "Judge", desc: "I judge/referee and need scenario analysis." },
];

const goals = [
  { id: "learn", icon: BookOpen, label: "Learn basics" },
  { id: "refresh", icon: Zap, label: "Refresh before match" },
  { id: "analyze", icon: Brain, label: "Analyze scenarios" },
  { id: "search", icon: Search, label: "Search rules" },
];

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function Onboarding() {
  const nav = useNavigate();
  const { setRole, setOnboarded } = useAppContext();
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const finish = () => {
    setRole(selectedRole as any);
    setOnboarded(true);
    nav("/app");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />

      <div className="relative w-full max-w-2xl animate-slide-up">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["role", "goal", "level", "ready"] as Step[]).map((s, i) => (
            <div key={s} className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i <= ["role", "goal", "level", "ready"].indexOf(step) ? "w-12 bg-primary" : "w-8 bg-muted"
            )} />
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
            <Bot className="w-7 h-7 text-foreground" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">
            {step === "role" && "Welcome to DECODE AI"}
            {step === "goal" && "What's your goal?"}
            {step === "level" && "Experience level?"}
            {step === "ready" && "You're all set!"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {step === "role" && "Choose your role to personalize your experience."}
            {step === "goal" && "We'll tailor your dashboard accordingly."}
            {step === "level" && "This helps us calibrate content difficulty."}
            {step === "ready" && "Your personalized DECODE experience is ready."}
          </p>
        </div>

        {step === "role" && (
          <div className="grid gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => { setSelectedRole(r.id); setStep("goal"); }}
                className={cn(
                  "glass-card p-5 rounded-xl flex items-center gap-4 text-left transition-all group",
                  selectedRole === r.id && "border-primary/50 bg-primary/5"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold">{r.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        )}

        {step === "goal" && (
          <div className="grid grid-cols-2 gap-4">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => { setSelectedGoal(g.id); setStep("level"); }}
                className={cn(
                  "glass-card p-5 rounded-xl flex flex-col items-center gap-3 text-center transition-all group",
                  selectedGoal === g.id && "border-primary/50 bg-primary/5"
                )}
              >
                <g.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-display text-xs font-bold">{g.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === "level" && (
          <div className="grid grid-cols-2 gap-4">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => { setSelectedLevel(l); setStep("ready"); }}
                className={cn(
                  "glass-card p-5 rounded-xl text-center transition-all group",
                  selectedLevel === l && "border-primary/50 bg-primary/5"
                )}
              >
                <span className="font-display text-sm font-bold group-hover:text-primary transition-colors">{l}</span>
              </button>
            ))}
          </div>
        )}

        {step === "ready" && (
          <div className="text-center">
            <div className="glass-panel p-8 rounded-2xl mb-6 neon-glow-blue">
              <div className="flex items-center justify-center gap-6 mb-4">
                {[
                  { label: "Role", value: selectedRole },
                  { label: "Goal", value: selectedGoal },
                  { label: "Level", value: selectedLevel },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-display text-sm font-bold text-primary capitalize">{item.value}</p>
                  </div>
                ))}
              </div>
              <Check className="w-10 h-10 text-neon-lime mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Your experience is personalized and ready.</p>
            </div>
            <Button variant="hero" size="xl" onClick={finish}>
              Launch DECODE AI <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}

        {step !== "role" && step !== "ready" && (
          <div className="text-center mt-6">
            <Button variant="ghost" size="sm" onClick={() => {
              const steps: Step[] = ["role", "goal", "level", "ready"];
              setStep(steps[steps.indexOf(step) - 1]);
            }}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
