import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Swords, ChevronRight, Home as HomeIcon, MapPin, BookOpen, Utensils, Zap } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl z-[1000] px-6 border-b border-sky-100 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative">
        <a href="/index.html" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:rotate-12 transition-transform">
            <Utensils size={20} />
          </div>
          <span className="logo-handwritten text-3xl text-ink font-black italic tracking-tighter">
            吃就對了
          </span>
        </a>
        
        <button 
          id="main-menu-toggle"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMenuClick();
          }}
          className="relative z-[1001] p-4 bg-sky-50 hover:bg-sky-100 text-brand rounded-2xl transition-all duration-300 active:scale-90 border border-sky-100 shadow-sm pointer-events-auto cursor-pointer"
          title="選單"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuItems = [
    { path: "/index.html", label: "探索推薦", icon: HomeIcon },
    { path: "/vibe-check.html", label: "心情探測", icon: Zap },
    { path: "/the-truth.html", label: "美食真相", icon: MapPin },
    { path: "/survival-tips.html", label: "生存指南", icon: BookOpen },
    { path: "/group-fight.html", label: "挑戰轉盤", icon: Swords },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="sidebar-container" className="fixed inset-0 z-[2000]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sky-950/20 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl p-8 border-l border-sky-100 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-black italic text-brand tracking-widest uppercase">Menu</span>
              <button 
                onClick={onClose} 
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400"
              >
                <ChevronRight size={28} />
              </button>
            </div>
            
            <nav className="flex-1 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className="flex items-center gap-5 p-5 rounded-[2rem] hover:bg-sky-50 text-slate-700 hover:text-brand transition-all group border border-transparent hover:border-sky-100"
                >
                  <div className="p-3 bg-white shadow-sm group-hover:bg-brand group-hover:text-white rounded-2xl transition-all">
                    <item.icon size={24} />
                  </div>
                  <span className="text-lg font-extrabold tracking-tight">{item.label}</span>
                </a>
              ))}
            </nav>
            
            <div className="mt-auto p-8 bg-sky-50 rounded-[3rem] border border-sky-100 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand/5 rounded-full -mr-10 -mt-10" />
              <p className="text-xs text-brand font-black mb-2 tracking-[0.2em] uppercase">BiteBuddy</p>
              <p className="text-sm text-slate-600 font-bold leading-relaxed">
                極致簡潔，<br/>決定最美味的選擇。
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const currentPath = window.location.pathname;
  
  const navItems = [
    { path: "/index.html", label: "首頁", icon: HomeIcon },
    { path: "/vibe-check.html", label: "心情", icon: Zap },
    { path: "/the-truth.html", label: "真相", icon: MapPin },
    { path: "/survival-tips.html", label: "指南", icon: BookOpen },
    { path: "/group-fight.html", label: "PK", icon: Swords },
  ];

  return (
    <nav className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-[94%] sm:w-max px-1.5 sm:px-3 md:px-4 py-1.5 sm:py-2.5 bg-white/95 backdrop-blur-2xl rounded-full flex flex-nowrap items-center justify-between sm:justify-center gap-0.5 sm:gap-1.5 md:gap-2 shadow-[0_20px_50px_rgba(14,165,233,0.15)] border border-sky-100 pointer-events-auto">
      {navItems.map((item) => {
        // Simple path matching for MPA (both direct filename and extensionless paths)
        const isActive = 
          currentPath === item.path || 
          currentPath === item.path.replace(".html", "") ||
          (currentPath === "/" && item.path === "/index.html");
        return (
          <a
            key={item.path}
            href={item.path}
            className={`flex items-center justify-center gap-0.5 sm:gap-1.5 px-2 sm:px-3.5 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 flex-1 sm:flex-none sm:shrink-0 min-w-0 ${
              isActive 
                ? "bg-brand text-white shadow-lg shadow-brand/30" 
                : "text-slate-400 hover:text-brand hover:bg-sky-50"
            }`}
          >
            <item.icon size={16} className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] shrink-0" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-tight shrink-0 whitespace-nowrap">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 pb-24 selection:bg-accent selection:text-white">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="relative z-10 pt-4">
        {children}
      </main>
      <Navbar />
    </div>
  );
}
