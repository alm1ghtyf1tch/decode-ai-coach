import { useState } from "react";
import { Map, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const zones = [
  { id: "alliance-red", x: 10, y: 20, w: 35, h: 25, label: "Red Alliance Station", color: "border-destructive/50 bg-destructive/10", rules: [
    { ref: "G06", title: "Alliance Station Rules", summary: "Drive team members must remain in their alliance station during the match." }
  ]},
  { id: "alliance-blue", x: 55, y: 20, w: 35, h: 25, label: "Blue Alliance Station", color: "border-primary/50 bg-primary/10", rules: [
    { ref: "G06", title: "Alliance Station Rules", summary: "Drive team members must remain in their alliance station during the match." }
  ]},
  { id: "scoring-zone", x: 25, y: 50, w: 50, h: 20, label: "Central Scoring Zone", color: "border-neon-amber/50 bg-neon-amber/10", rules: [
    { ref: "S04", title: "Scoring Methods", summary: "Game elements placed in scoring positions earn points based on height and placement." },
    { ref: "G12", title: "Contact Rules", summary: "Defensive play is allowed but intentional damage is penalized." },
  ]},
  { id: "autonomous", x: 10, y: 75, w: 80, h: 15, label: "Autonomous Zones", color: "border-accent/50 bg-accent/10", rules: [
    { ref: "G01", title: "Autonomous Period", summary: "30-second autonomous period at match start. Robots operate without driver input." },
  ]},
];

export default function FieldExplorer() {
  const [selectedZone, setSelectedZone] = useState<typeof zones[0] | null>(null);

  return (
    <div className="max-w-5xl mx-auto animate-slide-up space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <Map className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Field Explorer</h1>
          <p className="text-sm text-muted-foreground">Click zones to see associated rules and scoring info</p>
        </div>
        <span className="chip-violet ml-auto">Demo View</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Field */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 rounded-xl">
            <div className="relative aspect-[4/3] bg-muted/20 rounded-xl border border-border overflow-hidden grid-bg">
              {/* Field decoration */}
              <div className="absolute inset-4 border border-border/50 rounded-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-primary/30 rounded-full" />

              {zones.map(z => (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z)}
                  className={cn(
                    "absolute rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center",
                    z.color,
                    selectedZone?.id === z.id && "ring-2 ring-primary scale-105"
                  )}
                  style={{ left: `${z.x}%`, top: `${z.y}%`, width: `${z.w}%`, height: `${z.h}%` }}
                >
                  <span className="text-xs font-display font-bold text-foreground/70 px-2 text-center leading-tight">{z.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              <Info className="w-3 h-3 inline mr-1" /> Stylized field layout for demonstration. Click any zone to explore rules.
            </p>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-1">
          {selectedZone ? (
            <div className="glass-panel p-5 rounded-xl animate-slide-in-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-bold">{selectedZone.label}</h3>
                <button onClick={() => setSelectedZone(null)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {selectedZone.rules.map(r => (
                  <div key={r.ref} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="chip-blue text-xs">{r.ref}</span>
                    </div>
                    <h4 className="font-display text-xs font-bold mb-1">{r.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[200px]">
              <Map className="w-12 h-12 text-muted-foreground/20 mb-3" />
              <h3 className="font-display text-sm font-bold text-muted-foreground mb-1">Select a Zone</h3>
              <p className="text-xs text-muted-foreground">Click any area on the field to see associated rules.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
