import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  Trophy, 
  Settings, 
  Flame, 
  Zap, 
  Target 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  points: number;
  streak: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, points, streak }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Analytics', icon: BarChart3 },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 glass border-r border-white/5 h-screen sticky top-0 hidden md:flex flex-col p-8 z-50 overflow-hidden shadow-2xl">
      {/* Background orbs for aesthetic glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 px-2 mb-12 relative z-10 transition-transform hover:scale-105 cursor-default">
        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 ring-4 ring-blue-500/10">
          <Flame size={24} className="text-white fill-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-black italic tracking-tighter text-white">180-ONE</h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-blue-500 font-black">Challenge Core</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 relative z-10">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? 'bg-blue-600/10 text-white border border-blue-500/20 shadow-xl' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-2/3 bg-blue-500 rounded-r-full shadow-[0_0_15px_rgba(59,130,246,1)]"
                />
              )}
              <Icon size={20} className={`${isActive ? 'text-blue-500 animate-pulse' : 'group-hover:text-blue-500 transition-colors'}`} />
              <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-6 relative z-10 pt-10 border-t border-white/5">
        <div className="glass-card p-6 bg-[#020617] border border-white/5 relative group overflow-hidden">
          <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-blue-600/5 blur-2xl pointer-events-none group-hover:bg-blue-600/10 transition-all" />
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Points</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-black text-white italic tracking-tighter">{points}</p>
                <Zap size={16} className="text-yellow-500 fill-yellow-500 animate-pulse" />
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-black">Streak</p>
              <div className="flex items-center justify-end gap-2">
                <p className="text-xl font-black text-white">{streak}</p>
                <Flame size={16} className="fill-orange-500 text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
              <span>Next Reward</span>
              <span>{Math.min((streak / 7) * 100, 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden ring-1 ring-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((streak / 7) * 100, 100)}%` }}
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
           <span>Version 2.0.0</span>
           <Target size={12} className="opacity-30" />
        </div>
      </div>
    </aside>
  );
};

// Also define the Mobile Navigation component here for convenience
export const MobileNav: React.FC<{ activeTab: string; setActiveTab: (tab: any) => void }> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'calendar', icon: Calendar },
    { id: 'reports', icon: BarChart3 },
    { id: 'rewards', icon: Trophy },
    { id: 'settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-[#020617]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-4 flex justify-between items-center z-[100]">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-3 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 active:scale-90' : 'text-slate-500'}`}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </nav>
  );
};

export default Sidebar;
