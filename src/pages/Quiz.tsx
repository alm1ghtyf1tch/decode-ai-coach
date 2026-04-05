import { useState } from "react";
import { CheckCircle2, XCircle, Zap, Trophy, ArrowRight, RotateCcw, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const questions = [
  {
    question: "A robot extends its arm beyond 42 inches during the driver-controlled period to place a game element. Is this a violation?",
    options: ["Always a violation", "Only if it damages another robot", "Not a violation — extensions are allowed during play", "Only during autonomous"],
    correct: 2,
    explanation: "Robots may extend beyond starting configuration during gameplay. The 42\" limit applies to starting configuration only (R07).",
    ref: "R07",
  },
  {
    question: "Robot A pins Robot B against the field wall. After 4 seconds, the referee begins counting. How many seconds does Robot A have to release?",
    options: ["Immediately", "3 seconds", "5 seconds", "10 seconds"],
    correct: 2,
    explanation: "Once a referee starts counting, the pinning robot has 5 seconds to release. Total pin time before count starts is at the referee's discretion (G15).",
    ref: "G15",
  },
  {
    question: "During autonomous, a robot from the Red Alliance crosses into Blue Alliance territory. Is this allowed?",
    options: ["Never allowed", "Allowed if no contact is made", "Depends on the game-specific rules", "Always allowed"],
    correct: 2,
    explanation: "Autonomous territory restrictions are game-specific and vary by season. Always check the current season's game manual for specific autonomous rules.",
    ref: "G01–G05",
  },
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0); setSelected(null); setScore(0); setStreak(0); setFinished(false);
  };

  if (finished) {
    return (
      <div className="max-w-xl mx-auto animate-slide-up flex flex-col items-center text-center py-12">
        <Trophy className="w-20 h-20 text-neon-amber mb-4" />
        <h1 className="font-display text-3xl font-black mb-2">Quiz Complete!</h1>
        <p className="text-muted-foreground mb-6">You scored {score} out of {questions.length}</p>
        <div className="glass-panel p-6 rounded-xl w-full mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div><p className="font-display text-2xl font-black text-primary">{score}/{questions.length}</p><p className="text-xs text-muted-foreground">Correct</p></div>
            <div><p className="font-display text-2xl font-black text-neon-lime">{Math.round((score/questions.length)*100)}%</p><p className="text-xs text-muted-foreground">Accuracy</p></div>
            <div><p className="font-display text-2xl font-black text-neon-amber">+{score * 50}</p><p className="text-xs text-muted-foreground">XP Earned</p></div>
          </div>
        </div>
        <Button variant="neon" size="lg" onClick={restart}><RotateCcw className="w-4 h-4 mr-1" /> Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-slide-up space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Quiz Challenge</h1>
          <p className="text-sm text-muted-foreground">Violation or Not? Test your knowledge.</p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && <span className="chip-amber flex items-center gap-1"><Flame className="w-3 h-3" /> {streak}x</span>}
          <span className="chip-blue">{currentQ + 1} / {questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="glass-panel p-6 rounded-xl">
        <div className="chip-violet mb-3">Question {currentQ + 1}</div>
        <h2 className="text-base font-semibold leading-relaxed mb-6">{q.question}</h2>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all text-sm",
                selected === null ? "glass-card hover:border-primary/40 cursor-pointer" :
                i === q.correct ? "border-neon-lime/50 bg-neon-lime/10" :
                i === selected ? "border-destructive/50 bg-destructive/10" : "glass-card opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border",
                  selected !== null && i === q.correct ? "bg-neon-lime/20 border-neon-lime/40 text-neon-lime" :
                  selected === i && i !== q.correct ? "bg-destructive/20 border-destructive/40 text-destructive" :
                  "bg-muted border-border text-muted-foreground"
                )}>
                  {selected !== null && i === q.correct ? <CheckCircle2 className="w-4 h-4" /> :
                   selected === i && i !== q.correct ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {selected !== null && (
        <div className={cn("glass-card p-5 rounded-xl", selected === q.correct ? "border-neon-lime/30 bg-neon-lime/5" : "border-destructive/30 bg-destructive/5")}>
          <div className="flex items-start gap-3">
            {selected === q.correct ? <CheckCircle2 className="w-5 h-5 text-neon-lime flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />}
            <div>
              <p className="font-display text-sm font-bold mb-1">{selected === q.correct ? "Correct! +50 XP" : "Not quite."}</p>
              <p className="text-sm text-muted-foreground">{q.explanation}</p>
              <span className="chip-blue text-xs mt-2 inline-block">Reference: {q.ref}</span>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Button variant="neon" size="sm" onClick={next}>
              {currentQ < questions.length - 1 ? <>Next <ArrowRight className="w-4 h-4 ml-1" /></> : "See Results"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
