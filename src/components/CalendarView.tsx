import React from 'react';
import { DayData } from '../types';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Target, Award, ArrowRight, Zap, Flame } from 'lucide-react';

interface CalendarViewProps {
  calendarData: DayData[];
  currentDay: number;
  onSelectDay: (day: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ calendarData, currentDay, onSelectDay }) => {
  const getCellColor = (day: DayData) => {
    if (day.day > currentDay) return 'bg-white/5 border-white/5 opacity-40 hover:opacity-100 hover:border-white/10';
    if (day.day === currentDay) return 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse';
    
    // Completed past days
    if (!day.completed) return 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all';
    if (day.grade === 'A+' || day.grade === 'A') return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
    if (day.grade === 'B' || day.grade === 'C') return 'bg-blue-500/15 border-blue-500/25 text-blue-400';
    return 'bg-orange-500/15 border-orange-500/25 text-orange-400';
  };

  const perfectDays = calendarData.filter(d => d.completed && (d.grade === 'A+' || d.grade === 'A')).length;
  const avgCompletion = Math.round(calendarData.filter(d => d.completed).reduce((acc, d) => {
    const total = d.tasks.length;
    const done = d.tasks.filter(t => t.completed).length;
    return acc + (done / total);
  }, 0) / (calendarData.filter(d => d.completed).length || 1) * 100);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-fade-in relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none -z-10" />

      <header className="space-y-3">
         <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Visual Progress</h2>
         <h1 className="text-4xl font-black text-white italic tracking-tighter">180-Day Grid</h1>
         <p className="text-slate-500 text-sm font-medium">Click any day to inspect its tasks and notes.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
         <div className="space-y-1 border-r border-white/5 pr-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Days Launched</p>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-black text-emerald-500">{currentDay - 1}</span>
               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">of 180 total</span>
            </div>
         </div>
         <div className="space-y-1 border-r border-white/5 pr-4 pl-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Perfect Days</p>
            <div className="flex items-center gap-2 text-white">
               <span className="text-2xl font-black text-blue-400">{perfectDays}</span>
               <Award size={16} className="text-blue-500" />
            </div>
         </div>
         <div className="space-y-1 border-r border-white/5 pr-4 pl-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Completion</p>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-black text-purple-500">{avgCompletion}%</span>
               <TrendingUp size={16} className="text-purple-500 opacity-50" />
            </div>
         </div>
         <div className="space-y-1 pl-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Days Remaining</p>
            <div className="flex items-center gap-2 text-white">
               <span className="text-2xl font-black text-orange-400">{180 - currentDay + 1}</span>
               <Zap size={16} className="text-orange-500 fill-orange-500" />
            </div>
         </div>
      </div>

      <div className="card-static p-10 space-y-8 bg-[#020617]/50 border-white/5">
         <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
               <CalendarIcon size={16} className="text-blue-500" />
               All 180 Days
            </h3>
            <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500/40 border border-emerald-500/50" /> Perfect</span>
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500/40 border border-blue-500/50" /> Good</span>
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500/40 border border-orange-500/50" /> Partial</span>
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/40 border border-red-500/50" /> Missed</span>
               <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,1)]" /> Today</span>
            </div>
         </div>

         <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 pb-8">
            {calendarData.map((day) => (
              <motion.button
                key={day.day}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                onClick={() => onSelectDay(day.day)}
                className={`aspect-square flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-black border transition-all ${getCellColor(day)}`}
              >
                <span className="opacity-40 text-[7px] uppercase tracking-tighter">D</span>
                <span className="text-xs">{day.day}</span>
              </motion.button>
            ))}
         </div>
      </div>
    </div>
  );
};

const TrendingUp = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default CalendarView;
