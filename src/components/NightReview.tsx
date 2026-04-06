import React, { useState } from 'react';
import { 
  Moon, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Star, 
  ArrowRight, 
  MessageSquare,
  Zap,
  Target,
  Award,
  Smartphone,
  LineChart,
  BookOpen,
  Code2,
  Lock,
  MinusCircle,
  Hash
} from 'lucide-react';
import { DayData, TomorrowPlan } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface NightReviewProps {
  dayData: DayData;
  onClose: () => void;
  onComplete: (note: string, plan: TomorrowPlan) => void;
}

const NightReview: React.FC<NightReviewProps> = ({ dayData, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [note, setNote] = useState('');
  
  // Initial plan state with 3 task slots per category
  const [plan, setPlan] = useState<TomorrowPlan>({
    english: { tasks: ['', '', ''] },
    trading: { tasks: ['', '', ''] },
    dsa: { tasks: ['', '', ''] },
    dev: { tasks: ['', '', ''] },
    additionalNote: ''
  });

  const completedCount = dayData.tasks.filter(t => t.completed).length;
  const skippedCount = dayData.tasks.filter(t => t.skipped).length;
  const pendingCount = dayData.tasks.filter(t => !t.completed && !t.skipped).length;
  const totalCount = dayData.tasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const getGrade = (p: number) => {
    if (p >= 95) return { label: 'A+', color: 'text-emerald-500', glow: 'grade-glow-green', desc: 'ELITE DISCIPLINE' };
    if (p >= 85) return { label: 'A', color: 'text-emerald-400', glow: 'grade-glow-green', desc: 'EXCELLENT' };
    if (p >= 70) return { label: 'B', color: 'text-blue-400', glow: 'grade-glow-blue', desc: 'GOOD PROGRESS' };
    if (p >= 50) return { label: 'C', color: 'text-yellow-400', glow: 'grade-glow-blue', desc: 'COULD BE BETTER' };
    if (p >= 30) return { label: 'D', color: 'text-orange-400', glow: 'grade-glow-red', desc: 'STAY FOCUSED' };
    return { label: 'F', color: 'text-red-500', glow: 'grade-glow-red', desc: 'FAILURE IS A LESSON' };
  };

  const grade = getGrade(percentage);

  const handleTaskChange = (cat: keyof TomorrowPlan, index: number, value: string) => {
    setPlan(prev => {
      const category = prev[cat] as any;
      const newTasks = [...category.tasks];
      newTasks[index] = value;
      return { ...prev, [cat]: { tasks: newTasks } };
    });
  };

  const handleFinish = () => {
    if (percentage >= 85) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#ffffff']
      });
    }
    onComplete(note, plan);
  };

  const categories = [
    { id: 'english', label: 'English Mastery', icon: BookOpen, color: 'text-blue-500', glow: 'blue' },
    { id: 'trading', label: 'Trading System', icon: LineChart, color: 'text-emerald-500', glow: 'green' },
    { id: 'dsa', label: 'Logic & DSA', icon: Code2, color: 'text-purple-500', glow: 'purple' },
    { id: 'dev', label: 'Development', icon: Smartphone, color: 'text-cyan-500', glow: 'cyan' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-3xl"
        onClick={onClose}
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="w-full max-w-6xl bg-[#030816] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative z-10 flex flex-col md:flex-row max-h-[95vh]"
      >
        {/* Left Side: Summary & Grade */}
        <div className="w-full md:w-1/3 p-10 md:p-14 bg-gradient-to-b from-blue-600/5 to-transparent border-r border-white/5 space-y-12">
           <header className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Night Protocol</h2>
              <h1 className="text-4xl font-black text-white italic tracking-tighter">Day {dayData.day} Review</h1>
           </header>

           <div className="space-y-2 text-center py-8">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Final Performance Grade</p>
              <div className={`text-9xl font-black ${grade.color} ${grade.glow} italic tracking-tighter tabular-nums`}>
                 {grade.label}
              </div>
              <p className={`text-xs font-black uppercase tracking-[0.3em] ${grade.color}`}>{grade.desc}</p>
           </div>

           <div className="grid grid-cols-3 gap-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Done</p>
                 <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xl font-black text-emerald-400">{completedCount}</span>
                    <CheckCircle2 size={12} className="text-emerald-500" />
                 </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Skip</p>
                 <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xl font-black text-orange-400">{skippedCount}</span>
                    <MinusCircle size={12} className="text-orange-500" />
                 </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Missed</p>
                 <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xl font-black text-red-400">{pendingCount}</span>
                    <XCircle size={12} className="text-red-500" />
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-4 bg-blue-600/10 p-5 rounded-2xl border border-blue-500/20">
              <Zap size={20} className="text-blue-500 fill-blue-500 animate-pulse" />
              <div>
                 <p className="text-[10px] font-black text-white uppercase tracking-widest">Daily Achievement</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-blue-400">+{percentage}</span>
                    <span className="text-[10px] font-bold text-blue-500/60 uppercase">Points</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Step through Planner */}
        <div className="flex-1 flex flex-col p-10 md:p-14 overflow-y-auto scrollbar-none">
           <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 space-y-12"
                >
                   <header className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                           <MessageSquare size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter underline underline-offset-8 decoration-blue-500/30 decoration-4">Daily Reflection</h3>
                      </div>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Every day is a brick in the wall of your future. Be honest with yourself. How did you feel today? Any breakthroughs or struggles?
                      </p>
                   </header>

                   <textarea 
                     value={note}
                     onChange={(e) => setNote(e.target.value)}
                     className="w-full h-64 bg-white/5 border border-white/5 rounded-[2rem] p-8 text-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-medium text-lg placeholder-slate-700"
                     placeholder="Write your short daily note here..."
                   />

                   <div className="flex justify-end pt-8">
                      <button 
                        onClick={() => setStep(2)}
                        className="px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                      >
                         Plan Tomorrow <ArrowRight size={18} />
                      </button>
                   </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 space-y-12 pb-10"
                >
                   <header className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-500">
                           <Target size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter underline underline-offset-8 decoration-orange-500/30 decoration-4">Strategize Tomorrow</h3>
                      </div>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
                        <Hash size={14} className="text-blue-500" /> Defining tomorrow's core mission objective. Execution is Everything.
                      </p>
                   </header>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const planCat = plan[cat.id as keyof TomorrowPlan] as any;
                        return (
                          <div key={cat.id} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-8 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                <Icon size={80} className={cat.color} />
                             </div>
                             
                             <header className="flex justify-between items-center">
                               <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-3">
                                 <div className={`w-2 h-2 rounded-full ${cat.color.replace('text-', 'bg-')} animate-pulse`} />
                                 {cat.label}
                               </h4>
                               <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                  AI Assigned Points
                               </div>
                             </header>

                             <div className="space-y-4">
                                {[1, 2, 3].map((num, i) => (
                                  <div key={i} className="space-y-2">
                                     <label className="text-[7px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 italic">Task {num}</label>
                                     <input 
                                       value={planCat.tasks[i]}
                                       onChange={(e) => handleTaskChange(cat.id as any, i, e.target.value)}
                                       className={`w-full bg-black/20 border border-white/5 focus:border-${cat.glow}-500/50 rounded-2xl px-5 py-4 text-xs font-bold text-white focus:outline-none transition-all placeholder-slate-800`}
                                       placeholder={`Describe Task ${num}...`}
                                     />
                                  </div>
                                ))}
                             </div>
                          </div>
                        );
                      })}
                   </div>

                   <div className="flex justify-between items-center pt-8">
                      <button 
                        onClick={() => setStep(1)}
                        className="text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
                      >
                         Back to reflection
                      </button>
                      <button 
                        onClick={handleFinish}
                        className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 ring-2 ring-white/10"
                      >
                         <Lock size={18} /> Lock & Sleep
                      </button>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NightReview;
