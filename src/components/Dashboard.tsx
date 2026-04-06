import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Zap, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  Calendar,
  Lock,
  ChevronRight,
  Sun,
  BookOpen,
  Code2,
  LineChart,
  Smartphone,
  Moon
} from 'lucide-react';
import { DayData, Task, Category } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  dayData: DayData;
  toggleTask: (day: number, taskId: string) => void;
  skipTask: (day: number, taskId: string) => void;
  isHistorical: boolean;
  isLocked: boolean;
}

const CAT_ICONS: Record<Category, any> = {
  'Morning Routine': Sun,
  'English Learning': BookOpen,
  'Trading': LineChart,
  'Coding/DSA': Code2,
  'Flutter/React': Smartphone,
  'Night Review': Moon
};

const Dashboard: React.FC<DashboardProps> = ({ 
  dayData, 
  toggleTask, 
  skipTask, 
  isHistorical, 
  isLocked 
}) => {
  const categories: Category[] = [
    'Morning Routine', 
    'English Learning', 
    'Trading', 
    'Coding/DSA', 
    'Flutter/React', 
    'Night Review'
  ];

  const date = new Date(dayData.date);
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const completedCount = dayData.tasks.filter(t => t.completed).length;
  const skippedCount = dayData.tasks.filter(t => t.skipped).length;
  const totalCount = dayData.tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const getStatus = (task: Task) => {
    if (task.completed) return 'COMPLETED';
    if (task.skipped) return 'SKIPPED';
    return 'PENDING';
  };

  const quotes = [
    "Discipline is the bridge between goals and accomplishment.",
    "The secret of getting ahead is getting started.",
    "Great things never come from comfort zones.",
    "Small daily improvements lead to staggering results.",
    "Champions are made in the moments no one is watching.",
    "Don't stop until you're proud.",
    "Consistency is more important than perfection."
  ];
  const quote = quotes[dayData.day % quotes.length];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-fade-in relative">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none -z-10" />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-6xl font-black text-white tracking-tighter shadow-sm">Day {dayData.day}</h1>
            <div className="flex flex-col">
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl ${isWeekend ? 'bg-orange-600/20 text-orange-400 border border-orange-500/20' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20'}`}>
                {isWeekend ? 'Holiday Plan' : 'Weekday Plan'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" />
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            {isHistorical && (
              <p className="flex items-center gap-2 text-orange-500/80">
                <Lock size={14} /> HISTORICAL DATA (READ-ONLY)
              </p>
            )}
            {isLocked && (
              <p className="flex items-center gap-2 text-slate-600">
                <Lock size={14} /> FUTURE DAY (LOCKED)
              </p>
            )}
          </div>
          <p className="max-w-md italic text-slate-500 font-medium text-sm border-l-2 border-blue-500/30 pl-4 py-1">
            "{quote}"
          </p>
        </div>

        <div className="card-static p-6 flex items-center gap-8 bg-white/5 border-white/5">
           <div className="relative w-24 h-24">
              <svg className="progress-ring w-24 h-24">
                <circle className="text-white/5" stroke="currentColor" strokeWidth="6" fill="transparent" r="40" cx="48" cy="48" />
                <motion.circle 
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - progressPercent / 100) }}
                  className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                  stroke="currentColor" strokeWidth="6" 
                  strokeDasharray={`${2 * Math.PI * 40}`} 
                  strokeLinecap="round" fill="transparent" r="40" cx="48" cy="48" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white">{progressPercent}%</span>
                <span className="text-[7px] uppercase font-black text-slate-500 tracking-tighter">Done</span>
              </div>
           </div>
           <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Mission Success</p>
                <p className="text-2xl font-black text-white">{completedCount} <span className="text-sm text-slate-500">/ {totalCount}</span></p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-500 uppercase">Skipped</p>
                  <p className="text-sm font-bold text-orange-500">{skippedCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-500 uppercase">Points</p>
                  <p className="text-sm font-bold text-blue-500">+{dayData.points}</p>
                </div>
              </div>
           </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left column: Tasks checklist */}
        <div className="lg:col-span-3 space-y-12">
          {categories.map((cat, idx) => {
            const catTasks = dayData.tasks.filter(t => t.category === cat);
            if (catTasks.length === 0) return null;
            const Icon = CAT_ICONS[cat];
            
            return (
              <motion.section 
                key={cat} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-black flex items-center gap-3 text-slate-200 tracking-tight uppercase italic underline decoration-blue-500/30 decoration-4 underline-offset-4">
                    <Icon size={18} className="text-blue-500" />
                    {cat}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`glass-card p-6 border-white/5 relative overflow-hidden transition-all group ${
                        task.completed ? 'bg-emerald-600/5 border-emerald-500/10' : 
                        task.skipped ? 'bg-orange-600/5 border-orange-500/10' : ''
                      }`}
                    >
                      {/* Background Status Watermark */}
                      <div className="absolute -right-2 -bottom-2 opacity-[0.03] rotate-12 pointer-events-none">
                        {task.completed ? <CheckCircle2 size={100} className="text-emerald-500" /> : <Zap size={100} className="text-blue-500" />}
                      </div>

                      <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-start gap-4">
                          <p className={`text-sm font-black leading-tight tracking-tight ${task.completed ? 'text-emerald-400/80 strike-through' : task.skipped ? 'text-orange-400/80' : 'text-slate-100'}`}>
                            {task.title}
                          </p>
                          <div className="px-2 py-1 bg-white/5 rounded-lg text-[9px] font-black text-blue-500 uppercase border border-white/5 whitespace-nowrap">
                            +{task.points} Pts
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                          <Clock size={12} className="text-blue-500/50" /> {task.time}
                        </div>

                        {/* Status Label */}
                        <div className={`text-[8px] font-black uppercase tracking-widest inline-block px-2 py-0.5 rounded-md ${
                          getStatus(task) === 'COMPLETED' ? 'bg-emerald-600/20 text-emerald-400' :
                          getStatus(task) === 'SKIPPED' ? 'bg-orange-600/20 text-orange-400' :
                          'bg-slate-600/20 text-slate-400'
                        }`}>
                          {getStatus(task)}
                        </div>

                        {/* Controls: Done / Skip */}
                        {!isHistorical && !isLocked && (
                          <div className="flex gap-2 pt-2">
                             <button 
                               onClick={() => toggleTask(dayData.day, task.id)}
                               className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                 task.completed ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 border-white/5 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400'
                               }`}
                             >
                               <CheckCircle2 size={12} /> Done
                             </button>
                             <button 
                               onClick={() => skipTask(dayData.day, task.id)}
                               className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                 task.skipped ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 border-white/5 text-slate-400 hover:border-orange-500/50 hover:text-orange-400'
                               }`}
                             >
                               <XCircle size={12} /> Skip
                             </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Right column: Timetable & Discipline */}
        <div className="space-y-8">
           <div className="card-static p-8 space-y-8 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent">
             <header className="flex items-center justify-between italic">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Live Timeline</h3>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                </div>
             </header>

             <div className="space-y-8 relative ml-3 border-l-2 border-white/5 pb-2">
                {[
                  { time: '06:00', task: 'Wake & Flow', desc: 'MORNING CORE' },
                  { time: '07:00', task: 'English Mastery', desc: 'ACTIVE LEARNING' },
                  { time: '09:00', task: 'Market Planning', desc: 'TRADING' },
                  { time: '19:00', task: 'Office Analysis', desc: 'TRADING REVIEW' },
                  { time: '21:00', task: 'Logic & DSA', desc: 'CODING CORE' },
                  { time: '21:30', task: 'Stack Build', desc: 'DEVELOPMENT' },
                  { time: '23:30', task: 'Night Lock', desc: 'PLANNING' }
                ].map((item, i) => (
                  <div key={i} className="relative pl-6 group">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-700 group-hover:bg-blue-500 group-hover:border-blue-400 transition-all" />
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{item.time} {item.desc}</p>
                    <p className="text-xs font-black text-slate-200 uppercase tracking-tighter truncate">{item.task}</p>
                  </div>
                ))}
             </div>
           </div>

           <div className="card-static p-8 bg-red-600/5 border-red-500/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500 border border-red-500/10 shadow-lg">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Penalty Protocol</h4>
                  <p className="text-[8px] text-red-400 uppercase font-black tracking-widest">Active Enforcement</p>
                </div>
              </div>
              <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">
                Any missed core session without explicit skip costs <span className="text-red-400 font-black">Points</span>. Discipline is non-negotiable.
              </p>
           </div>
           
           <div className="card-static p-8 bg-blue-600/5 border-blue-500/10 space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-blue-500" />
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Goal Focus</h4>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-black uppercase text-slate-500">
                    <span>Active Streak</span>
                    <span>Level Up Soon</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-2/3" />
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
