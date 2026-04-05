import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, BarChart3, Star, ChevronRight, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Game Rules", "Violations", "Inspection", "Scoring", "Tournament Flow", "Robot Legality"];

const lessons = [
  { id: 1, title: "Autonomous Period Basics", category: "Game Rules", difficulty: "Beginner", time: "5 min", progress: 100, lessons: 4, ref: "G01–G05" },
  { id: 2, title: "Driver-Controlled Period", category: "Game Rules", difficulty: "Beginner", time: "8 min", progress: 75, lessons: 6, ref: "G06–G12" },
  { id: 3, title: "Common Contact Violations", category: "Violations", difficulty: "Intermediate", time: "6 min", progress: 40, lessons: 5, ref: "G12–G18" },
  { id: 4, title: "Robot Size & Weight Limits", category: "Robot Legality", difficulty: "Beginner", time: "4 min", progress: 100, lessons: 3, ref: "R01–R07" },
  { id: 5, title: "Pre-Match Inspection Flow", category: "Inspection", difficulty: "Intermediate", time: "7 min", progress: 0, lessons: 5, ref: "I01–I08" },
  { id: 6, title: "Scoring Calculations", category: "Scoring", difficulty: "Advanced", time: "10 min", progress: 0, lessons: 8, ref: "S01–S12" },
  { id: 7, title: "Tournament Bracket Rules", category: "Tournament Flow", difficulty: "Intermediate", time: "6 min", progress: 20, lessons: 4, ref: "T01–T06" },
  { id: 8, title: "Penalty Escalation Matrix", category: "Violations", difficulty: "Advanced", time: "8 min", progress: 0, lessons: 6, ref: "P01–P08" },
  { id: 9, title: "End Game & Parking", category: "Game Rules", difficulty: "Beginner", time: "5 min", progress: 60, lessons: 4, ref: "G20–G25" },
];

export default function LearnHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const nav = useNavigate();
  const filtered = activeCategory === "All" ? lessons : lessons.filter(l => l.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Learn Hub</h1>
        <p className="text-sm text-muted-foreground">Master FTC rules through structured micro-lessons</p>
      </div>

      {/* Featured Path */}
      <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 border-primary/20">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="chip-lime mb-2">Recommended Path</div>
            <h2 className="font-display text-lg font-bold mb-1">Rookie Quick Start</h2>
            <p className="text-sm text-muted-foreground mb-3">Complete these 5 lessons to get competition-ready in under 30 minutes.</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 28 min total</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 5 lessons</span>
              <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> 60% complete</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border", i <= 3 ? "bg-primary/20 border-primary/40 text-primary" : "bg-muted/50 border-border text-muted-foreground")}>
                {i <= 3 ? <CheckCircle2 className="w-4 h-4" /> : i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={cn(
              "chip whitespace-nowrap transition-all",
              activeCategory === c ? "bg-primary/20 text-primary border-primary/40" : "bg-muted/30 text-muted-foreground border-border hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Lesson Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(l => (
          <button
            key={l.id}
            onClick={() => nav("/app/lesson/" + l.id)}
            className="glass-card p-5 rounded-xl text-left group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={cn("chip text-xs", l.difficulty === "Beginner" ? "chip-lime" : l.difficulty === "Intermediate" ? "chip-blue" : "chip-violet")}>
                {l.difficulty}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {l.time}</span>
            </div>
            <h3 className="font-display text-sm font-bold mb-1 group-hover:text-primary transition-colors">{l.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">
              <span className="chip-blue text-xs mr-1">{l.ref}</span> · {l.lessons} micro-lessons
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${l.progress}%` }} />
              </div>
              <span className="text-xs font-display font-bold text-muted-foreground">{l.progress}%</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
