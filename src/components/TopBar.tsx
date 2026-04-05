import { Search, Bell, Bookmark, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function TopBar() {
  const { role } = useAppContext();
  const roleLabel = role === "rookie" ? "Rookie" : role === "competitor" ? "Competitor" : role === "judge" ? "Judge" : "Explorer";

  return (
    <header className="h-14 border-b border-border bg-card/40 backdrop-blur-xl flex items-center px-4 lg:px-6 gap-3">
      <div className="flex-1 flex items-center gap-2">
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rules, sections, keywords..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="chip-blue text-xs hidden sm:inline-flex">{roleLabel}</span>
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
          <Bookmark className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 border border-glass-border flex items-center justify-center">
          <User className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </header>
  );
}
