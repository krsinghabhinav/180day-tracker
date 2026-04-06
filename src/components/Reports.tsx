import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { DayData, Category } from '../types';
import { 
  Download, 
  TrendingUp, 
  Calendar, 
  Zap, 
  Flame, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportsProps {
  calendarData: DayData[];
  onExport: () => void;
}

const Reports: React.FC<ReportsProps> = ({ calendarData, onExport }) => {
  // Weekly completion data
  const last7Days = calendarData
    .filter(d => d.completed)
    .slice(-7)
    .map(d => ({
      name: `Day ${d.day}`,
      completion: Math.round(d.tasks.filter(t => t.completed).length / d.tasks.length * 100),
      points: d.points
    }));

  // Category performance
  const cats: Category[] = ['Morning Routine', 'English Learning', 'Trading', 'Coding/DSA', 'Flutter/React', 'Night Review'];
  const catData = cats.map(cat => {
    const tasks = calendarData.flatMap(d => d.tasks).filter(t => t.category === cat);
    const completed = tasks.filter(t => t.completed).length;
    return {
      name: cat.split(' ')[0],
      value: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
      color: cat === 'Morning Routine' ? '#F59E0B' : 
             cat === 'English Learning' ? '#22D3EE' : 
             cat === 'Trading' ? '#10B981' : 
             cat === 'Coding/DSA' ? '#8B5CF6' : 
             cat === 'Flutter/React' ? '#4F8EF7' : '#6366F1'
    };
  });

  const totalPoints = calendarData.reduce((acc, d) => acc + d.points, 0);
  const finishedDays = calendarData.filter(d => d.completed).length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-fade-in relative pb-32">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none -z-10" />

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
         <div className="space-y-3">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Performance Metrics</h2>
            <h1 className="text-4xl font-black text-white italic tracking-tighter">Analytics & Reports</h1>
            <p className="text-slate-500 text-sm font-medium">Review your discipline and category-wise mastery status.</p>
         </div>
         <button 
           onClick={onExport}
           className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all shadow-xl"
         >
           <Download size={16} className="text-blue-500" /> Export Data (JSON)
         </button>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="card-static p-8 space-y-6 bg-blue-600/5 border-blue-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/10 shadow-lg">
                <Zap size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Lifetime Score</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{totalPoints}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
               <span>Next Milestone</span>
               <span>1,000 Pts</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500" style={{ width: `${Math.min(totalPoints/10, 100)}%` }} />
            </div>
         </div>

         <div className="card-static p-8 space-y-6 bg-emerald-600/5 border-emerald-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-500 border border-emerald-500/10 shadow-lg">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Days Committed</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{finishedDays}</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
               <span>Total Challenge</span>
               <span>180 Days</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500" style={{ width: `${(finishedDays/180)*100}%` }} />
            </div>
         </div>

         <div className="card-static p-8 space-y-6 bg-orange-600/5 border-orange-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/20 flex items-center justify-center text-orange-500 border border-orange-500/10 shadow-lg">
                <Flame size={24} className="fill-orange-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Active Streak</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{calendarData[calendarData.length-1]?.streak || 0}</p>
              </div>
            </div>
            <p className="text-[10px] font-black text-orange-500/50 uppercase tracking-widest">Consistency is key to mastery.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Weekly Completion Bar Chart */}
        <div className="card-static p-10 space-y-8 bg-[#020617]/50 border-white/5">
           <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
              <TrendingUp size={16} className="text-blue-500" />
              Recent Weekly Performance
           </h3>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={last7Days}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#475569', fontSize: 10, fontWeight: 700}} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#475569', fontSize: 10, fontWeight: 700}} 
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(59,130,246,0.05)'}}
                      contentStyle={{backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                    />
                    <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
                       {last7Days.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.completion > 80 ? '#10b981' : entry.completion > 50 ? '#3b82f6' : '#f43f5e'} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Category breakdown radar or pie */}
        <div className="card-static p-10 space-y-8 bg-[#020617]/50 border-white/5">
           <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
              <Award size={16} className="text-blue-500" />
              Category Mastery Breakdown
           </h3>
           <div className="space-y-6">
              {catData.map((cat, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">{cat.name} Mastery</span>
                      <span style={{color: cat.color}}>{cat.value}%</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.value}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        style={{ backgroundColor: cat.color }}
                        className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Heatmap Simulation */}
      <div className="card-static p-10 space-y-8 bg-[#020617]/50 border-white/5">
         <h3 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
            <Calendar size={16} className="text-blue-500" />
            90-Day Contribution Heatmap
         </h3>
         <div className="flex flex-wrap gap-2">
            {Array.from({ length: 90 }, (_, i) => {
              const dayNum = i + 1;
              const day = calendarData.find(d => d.day === dayNum);
              let opacity = "bg-white/5";
              if (day && day.completed) {
                const p = day.tasks.filter(t => t.completed).length / day.tasks.length;
                if (p >= 0.9) opacity = "bg-emerald-500";
                else if (p >= 0.5) opacity = "bg-blue-600/60";
                else if (p > 0) opacity = "bg-blue-600/30";
              }
              return (
                <div 
                  key={i} 
                  title={`Day ${dayNum}`}
                  className={`heatmap-cell ${opacity} cursor-help`}
                />
              );
            })}
         </div>
         <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-widest text-slate-600">
            <span>Less</span>
            <div className="flex gap-1.5 align-center">
               <div className="w-2 h-2 bg-white/5 rounded-[1px]" />
               <div className="w-2 h-2 bg-blue-600/30 rounded-[1px]" />
               <div className="w-2 h-2 bg-blue-600/60 rounded-[1px]" />
               <div className="w-2 h-2 bg-emerald-500 rounded-[1px]" />
            </div>
            <span>More</span>
         </div>
      </div>
    </div>
  );
};

export default Reports;
