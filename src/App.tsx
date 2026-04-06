import React, { useState, useEffect } from 'react';
import { useTrackerData } from './hooks/useTrackerData';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import Reports from './components/Reports';
import RewardsPanel from './components/RewardsPanel';
import NightReview from './components/NightReview';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Moon, Sun, Shield, Info, Download, Zap } from 'lucide-react';

const App: React.FC = () => {
  const {
    currentDay,
    viewedDay,
    setViewedDay,
    calendarData,
    points,
    streak,
    badges,
    darkMode,
    setDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    toggleTask,
    skipTask,
    completeDay,
    currentDayData
  } = useTrackerData();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'calendar' | 'reports' | 'rewards' | 'settings'>('dashboard');
  const [showNightReview, setShowNightReview] = useState(false);

  // Auto-switch to dashboard when viewedDay changes if not on dashboard
  useEffect(() => {
    setActiveTab('dashboard');
  }, [viewedDay]);

  const getPhase = (day: number) => {
    if (day <= 30) return { name: 'Phase 1', desc: 'Flutter Focus', color: 'from-blue-600 to-cyan-400' };
    if (day <= 60) return { name: 'Phase 2', desc: 'Flutter + React Intro', color: 'from-indigo-600 to-purple-400' };
    return { name: 'Phase 3', desc: 'Full Stack Mastery', color: 'from-purple-600 to-pink-400' };
  };

  const phase = getPhase(currentDay);
  const totalCompletedDays = calendarData.filter(d => d.completed).length;
  const progressPercent = Math.round((currentDay / 180) * 100);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(calendarData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `180day_tracker_backup.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return currentDayData ? (
          <Dashboard 
            dayData={currentDayData} 
            toggleTask={toggleTask} 
            skipTask={skipTask}
            isHistorical={currentDayData.day < currentDay}
            isLocked={currentDayData.day > currentDay}
          />
        ) : null;
      case 'calendar':
        return <CalendarView 
          calendarData={calendarData} 
          currentDay={currentDay} 
          onSelectDay={(day) => setViewedDay(day)} 
        />;
      case 'reports':
        return <Reports calendarData={calendarData} onExport={handleExport} />;
      case 'rewards':
        return <RewardsPanel points={points} streak={streak} unlockedBadges={badges} />;
      case 'settings':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-10 animate-fade-in">
            <header className="space-y-2">
              <h2 className="text-xs font-black tracking-[0.3em] text-blue-500 uppercase">System Config</h2>
              <h1 className="text-4xl font-black text-white">App Settings</h1>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-static p-8 space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Shield size={20} className="text-blue-500" /> Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-sm font-bold text-white">Visual Theme</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Light / Dark</p>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 flex items-center justify-center bg-blue-600/10 text-blue-400 rounded-xl hover:scale-105 transition-transform">
                      {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                      <p className="text-sm font-bold text-white">Smart Notifications</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">6AM, 9PM, 11PM</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (!notificationsEnabled) {
                          Notification.requestPermission().then(res => {
                            if (res === 'granted') setNotificationsEnabled(true);
                          });
                        } else {
                          setNotificationsEnabled(false);
                        }
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${notificationsEnabled ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-500'}`}
                    >
                      <Bell size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-static p-8 space-y-6 border-red-500/10">
                <h3 className="text-lg font-bold flex items-center gap-2 text-red-100">
                  <Info size={20} className="text-red-500" /> Maintenance
                </h3>
                <div className="space-y-4">
                  <button 
                    onClick={handleExport}
                    className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm font-bold text-white">Backup Progress</span>
                    <Download size={18} className="text-blue-500" />
                  </button>
                  <button 
                    onClick={() => {
                      if(confirm("DANGER: Wiping all 180 days of progress? This CANNOT be undone.")) {
                        localStorage.removeItem('180dayTracker');
                        window.location.reload();
                      }
                    }}
                    className="w-full py-4 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-600/20 transition-all"
                  >
                    Hard Reset All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-[#020617] text-slate-200' : 'bg-slate-50 text-slate-900'} transition-colors duration-500`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        points={points}
        streak={streak}
      />
      
      <main className="flex-1 overflow-y-auto h-screen relative scrollbar-thin">
        {/* Top Progress Bar */}
        <div className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  <span className="text-blue-500">Challenge Progress</span> • Day {currentDay} / 180
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white">{progressPercent}%</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className={`h-full bg-gradient-to-r ${phase.color} shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                />
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-4 py-2">
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${phase.color} text-white`}>
                {phase.name}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {phase.desc}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + viewedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Floating Actions */}
        {currentDayData && currentDayData.day === currentDay && !currentDayData.completed && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-8 right-8 z-[60]"
          >
            <button 
              onClick={() => setShowNightReview(true)}
              className="group px-8 py-5 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center gap-4 border border-white/20"
            >
              <Moon size={20} className="group-hover:rotate-12 transition-transform" /> 
              Submit Night Review
            </button>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showNightReview && currentDayData && (
          <NightReview 
            dayData={currentDayData}
            onClose={() => setShowNightReview(false)}
            onComplete={(note, plan) => {
              completeDay(currentDay, note, plan);
              setShowNightReview(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
