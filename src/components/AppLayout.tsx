import { Outlet } from "react-router-dom";
import { AppSidebar, BottomNav } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
