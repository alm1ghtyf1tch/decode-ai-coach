import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, MessageSquare, Scale, Zap, Library, Bot, BarChart3, Map, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Home", to: "/app", icon: Home },
  { label: "Learn", to: "/app/learn", icon: BookOpen },
  { label: "Ask AI", to: "/app/ask", icon: MessageSquare },
  { label: "Judge Mode", to: "/app/judge", icon: Scale },
  { label: "Refresh", to: "/app/refresh", icon: Zap },
  { label: "Library", to: "/app/library", icon: Library },
  { label: "Garage", to: "/app/garage", icon: Bot },
  { label: "Progress", to: "/app/progress", icon: BarChart3 },
  { label: "Field", to: "/app/field", icon: Map },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border p-4 gap-1">
      <div className="flex items-center gap-2 px-3 py-4 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Bot className="w-5 h-5 text-foreground" />
        </div>
        <span className="font-display text-lg font-bold tracking-wider text-foreground">DECODE AI</span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== "/app" && location.pathname.startsWith(item.to));
          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20 shadow-sm shadow-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </RouterNavLink>
          );
        })}
      </nav>
      <div className="mt-auto px-3 py-3 glass-card rounded-xl">
        <p className="text-xs text-muted-foreground">Educational aid only.</p>
        <p className="text-xs text-muted-foreground mt-1">Official FTC manual remains the final authority.</p>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const location = useLocation();
  const mainItems = navItems.slice(0, 5);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border px-2 py-1 flex justify-around">
      {mainItems.map((item) => {
        const isActive = location.pathname === item.to || (item.to !== "/app" && location.pathname.startsWith(item.to));
        return (
          <RouterNavLink
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs transition-all",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_6px_hsl(217,91%,60%)]")} />
            <span>{item.label}</span>
          </RouterNavLink>
        );
      })}
    </nav>
  );
}
