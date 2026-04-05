import { useState } from "react";
import { Search, Grid3X3, List, Bookmark, BookOpen, Shield, Filter, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const allRules = [
  { ref: "G01", title: "Game Overview", category: "Game Rules", phase: "All", penalty: "None", importance: "High", summary: "Overview of the game structure, objectives, and general play guidelines." },
  { ref: "G12", title: "Robot Contact", category: "Violations", phase: "All", penalty: "Major", importance: "Critical", summary: "Robots may not intentionally damage other robots. Reckless contact leads to penalties." },
  { ref: "G15", title: "Pinning & Trapping", category: "Violations", phase: "Driver-Controlled", penalty: "Minor", importance: "High", summary: "5-second limit on pinning. Referee counts aloud. Must release fully." },
  { ref: "G20", title: "End Game Rules", category: "Game Rules", phase: "End Game", penalty: "None", importance: "High", summary: "Last 30 seconds of the match. Special scoring opportunities begin." },
  { ref: "R07", title: "Robot Size Limits", category: "Robot Legality", phase: "Pre-Match", penalty: "None", importance: "Critical", summary: "Robot must fit within a 42\" cube in starting configuration." },
  { ref: "I04", title: "Inspection Criteria", category: "Inspection", phase: "Pre-Match", penalty: "None", importance: "High", summary: "Battery safety, wiring standards, and mechanical checks required." },
  { ref: "S04", title: "Scoring Methods", category: "Scoring", phase: "All", penalty: "None", importance: "High", summary: "Points awarded for game element placement, ownership, and end game positions." },
  { ref: "T03", title: "Match Scheduling", category: "Tournament Flow", phase: "Pre-Match", penalty: "None", importance: "Medium", summary: "How matches are scheduled and bracket progression works." },
  { ref: "P04", title: "Penalty Escalation", category: "Violations", phase: "All", penalty: "Varies", importance: "Critical", summary: "Minor → Major → Yellow Card → Red Card → Disqualification progression." },
  { ref: "R12", title: "Motor Limits", category: "Robot Legality", phase: "Pre-Match", penalty: "None", importance: "High", summary: "Maximum number and type of motors allowed. Power constraints." },
  { ref: "I08", title: "Re-Inspection", category: "Inspection", phase: "During Event", penalty: "None", importance: "Medium", summary: "When and why re-inspection may be triggered." },
  { ref: "G25", title: "Autonomous Scoring", category: "Scoring", phase: "Autonomous", penalty: "None", importance: "High", summary: "Points scored during the autonomous period. Bonus multipliers." },
];

const categories = ["All", "Game Rules", "Violations", "Inspection", "Scoring", "Tournament Flow", "Robot Legality"];
const penaltyFilters = ["All", "None", "Minor", "Major", "Varies"];

export default function ManualLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set(["G12", "R07"]));

  const filtered = allRules.filter(r => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.ref.toLowerCase().includes(search.toLowerCase()) || r.summary.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || r.category === category;
    return matchSearch && matchCategory;
  });

  const toggleBookmark = (ref: string) => {
    setBookmarked(prev => { const n = new Set(prev); n.has(ref) ? n.delete(ref) : n.add(ref); return n; });
  };

  return (
    <div className="max-w-6xl mx-auto animate-slide-up space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Manual Library</h1>
          <p className="text-sm text-muted-foreground">Browse, search, and bookmark FTC rules</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView("grid")} className={cn("p-2 rounded-lg transition-colors", view === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground")}><Grid3X3 className="w-4 h-4" /></button>
          <button onClick={() => setView("list")} className={cn("p-2 rounded-lg transition-colors", view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground")}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search rules by reference, title, or keyword..."
          className="w-full h-11 pl-11 pr-4 rounded-xl bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={cn("chip whitespace-nowrap transition-all", category === c ? "bg-primary/20 text-primary border-primary/40" : "bg-muted/30 text-muted-foreground border-border hover:text-foreground")}>{c}</button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} rules found</p>

      {/* Rules */}
      <div className={cn(view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3")}>
        {filtered.map(r => (
          <div key={r.ref} className={cn("glass-card rounded-xl transition-all", view === "grid" ? "p-5" : "p-4 flex items-start gap-4")}>
            <div className={cn(view === "list" && "flex-1")}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="chip-blue text-xs">{r.ref}</span>
                  <span className={cn("chip text-xs", r.importance === "Critical" ? "chip-amber" : r.importance === "High" ? "chip-violet" : "chip-cyan")}>{r.importance}</span>
                </div>
                <button onClick={() => toggleBookmark(r.ref)} className="text-muted-foreground hover:text-neon-amber transition-colors">
                  <Star className={cn("w-4 h-4", bookmarked.has(r.ref) && "text-neon-amber fill-neon-amber")} />
                </button>
              </div>
              <h3 className="font-display text-sm font-bold mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{r.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{r.category}</span>
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{r.phase}</span>
                {r.penalty !== "None" && <span className="text-xs text-neon-amber bg-neon-amber/10 px-2 py-0.5 rounded">{r.penalty} Penalty</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
