import { Bot, BookOpen, Target, Flame, Trophy, BarChart3, Calendar, ArrowRight, CheckCircle2, Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categoryAccuracy = [
  { name: "Game Rules", accuracy: 95, total: 20 },
  { name: "Violations", accuracy: 88, total: 15 },
  { name: "Inspection", accuracy: 72, total: 8 },
  { name: "Scoring", accuracy: 90, total: 12 },
  { name: "Tournament Flow", accuracy: 65, total: 6 },
  { name: "Robot Legality", accuracy: 85, total: 10 },
];

const heatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: i,
  value: i < 3 ? 0 : i < 7 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 5),
}));

const achievements = [
  { icon: Star, name: "First Lesson", date: "Mar 20" },
  { icon: Flame, name: "5-Day Streak", date: "Mar 25" },
  { icon: Trophy, name: "Perfect Quiz", date: "Apr 1" },
  { icon: CheckCircle2, name: "50 Rules Learned", date: "Apr 3" },
];

export default function Profile() {
  const nav = useNavigate();

  return (
    <div className="max-w-6xl mx-auto animate-slide-up space-y-6">
      {/* Profile Header */}
      <div className="glass-panel p-6 rounded-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
            <Bot className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon-lime rounded-full flex items-center justify-center text-xs font-bold border-2 border-background">7</div>
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="font-display text-xl font-bold">FTC Competitor</h1>
          <p className="text-sm text-muted-foreground">Competition-Ready Bot · Level 7</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
            <span className="chip-blue">Competitor</span>
            <span className="chip-amber flex items-center gap-1"><Flame className="w-3 h-3" /> 5 day streak</span>
          </div>
        </div>
        <Button variant="glass" size="sm" onClick={() => nav("/app/garage")}>
          View Robot <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="font-display text-sm font-bold">Overview</h3>
            {[
              { icon: BookOpen, label: "Lessons Completed", value: "23" },
              { icon: Target, label: "Overall Accuracy", value: "87%" },
              { icon: Clock, label: "Time Spent", value: "4.2 hrs" },
              { icon: Trophy, label: "Quizzes Passed", value: "12" },
              { icon: BarChart3, label: "Scenarios Analyzed", value: "8" },
              { icon: Star, label: "Rules Bookmarked", value: "15" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-muted-foreground"><s.icon className="w-3 h-3" /> {s.label}</span>
                <span className="font-display text-sm font-bold">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-3">Recommended Next</h3>
            <div className="space-y-2">
              {["Complete Inspection lessons", "Try Judge Mode scenarios", "Review Tournament Flow rules"].map(r => (
                <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-2 rounded-lg hover:bg-muted/50">
                  <ArrowRight className="w-3 h-3 text-primary" /> {r}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Activity Heatmap */}
          <div className="glass-panel p-5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /> Activity (Last 4 Weeks)</h3>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {["M","T","W","T","F","S","S"].map(d => (
                <div key={d} className="text-center text-xs text-muted-foreground mb-1">{d}</div>
              ))}
              {heatmapData.map((d, i) => (
                <div key={i} className={`aspect-square rounded-sm ${
                  d.value === 0 ? "bg-muted/30" :
                  d.value <= 1 ? "bg-primary/20" :
                  d.value <= 2 ? "bg-primary/40" :
                  d.value <= 3 ? "bg-primary/60" : "bg-primary/80"
                }`} title={`${d.value} activities`} />
              ))}
            </div>
          </div>

          {/* Accuracy by Category */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-4">Accuracy by Category</h3>
            <div className="space-y-3">
              {categoryAccuracy.map(c => (
                <div key={c.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{c.name} ({c.total} questions)</span>
                    <span className="font-display font-bold" style={{ color: c.accuracy >= 90 ? "hsl(82, 80%, 55%)" : c.accuracy >= 75 ? "hsl(217, 91%, 60%)" : "hsl(38, 92%, 55%)" }}>{c.accuracy}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${c.accuracy}%`,
                      background: c.accuracy >= 90 ? "hsl(82, 80%, 55%)" : c.accuracy >= 75 ? "hsl(217, 91%, 60%)" : "hsl(38, 92%, 55%)"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Timeline */}
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="font-display text-sm font-bold mb-4">Achievement Timeline</h3>
            <div className="space-y-3">
              {achievements.map(a => (
                <div key={a.name} className="flex items-center gap-3">
                  <a.icon className="w-5 h-5 text-neon-amber flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-display font-bold">{a.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
