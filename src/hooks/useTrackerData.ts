import { useState, useEffect, useCallback } from 'react';
import { Task, DayData, Category, TomorrowPlan } from '../types';

const START_DATE = new Date(2026, 3, 1); // April 1st, 2026

export const useTrackerData = () => {
  const calculateTodayDay = () => {
    const diff = new Date().getTime() - START_DATE.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(180, day));
  };

  const [currentDay, setCurrentDay] = useState<number>(calculateTodayDay());
  const [calendarData, setCalendarData] = useState<DayData[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [viewedDay, setViewedDay] = useState<number>(calculateTodayDay());

  const isHoliday = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const getTasksForDay = useCallback((day: number): Task[] => {
    const date = new Date(START_DATE);
    date.setDate(date.getDate() + (day - 1));
    const holiday = isHoliday(date);

    const tasks: Task[] = [
      { id: `${day}-m1`, category: 'Morning Routine', title: 'Wake up and freshen up', time: '6:00–6:30 AM', completed: false, skipped: false, points: 5 },
      { id: `${day}-m2`, category: 'Morning Routine', title: '10 min meditation + manifestation & gratitude', time: '6:30–6:50 AM', completed: false, skipped: false, points: 5 },
      { id: `${day}-e1`, category: 'English Learning', title: '5 new words + sentences', time: '7:00–8:15 AM', completed: false, skipped: false, points: 3 },
      { id: `${day}-e2`, category: 'English Learning', title: '10 min book reading', time: '7:00–8:15 AM', completed: false, skipped: false, points: 3 },
      { id: `${day}-e3`, category: 'English Learning', title: '1 English YouTube lecture (Complete)', time: '7:00–8:15 AM', completed: false, skipped: false, points: 4 },
    ];

    // Trading
    if (!holiday) {
      tasks.push({ id: `${day}-t1`, category: 'Trading', title: 'Trade planning + 2-3 live trades', time: '9:00–9:40 AM', completed: false, skipped: false, points: 10 });
      tasks.push({ id: `${day}-t2`, category: 'Trading', title: 'Trade analysis/learning', time: '7:00–7:30 PM', completed: false, skipped: false, points: 5 });
    } else {
      tasks.push({ id: `${day}-t1-h`, category: 'Trading', title: '2 full hours of trading practice', time: 'Flexible', completed: false, skipped: false, points: 15 });
    }

    // Coding/DSA
    if (!holiday) {
      tasks.push({ id: `${day}-c1`, category: 'Coding/DSA', title: 'DSA + Flutter (Easy: 2-3 | Hard: 1)', time: '9:00–9:30 PM', completed: false, skipped: false, points: 8 });
    } else {
      tasks.push({ id: `${day}-c1-h`, category: 'Coding/DSA', title: '1 hour DSA (Easy: 3-5 | Hard: 2)', time: 'Flexible', completed: false, skipped: false, points: 12 });
    }

    // Flutter/React Development
    if (day <= 30) {
      const timeStr = holiday ? '10 hours Flutter' : '9:30 PM–1:00 AM (3 hrs) Flutter';
      tasks.push({ id: `${day}-d1`, category: 'Flutter/React', title: 'Flutter Development', time: timeStr, completed: false, skipped: false, points: 10 });
    } else {
      const timeStr = holiday 
        ? (day <= 60 ? '5 hrs Flutter + 5 hrs React' : '4 hrs Flutter + 4 hrs React')
        : '1.5 hrs Flutter + 2 hrs React';
      tasks.push({ id: `${day}-d1`, category: 'Flutter/React', title: 'Flutter & React Development', time: timeStr, completed: false, skipped: false, points: 10 });
    }

    // Night Review
    tasks.push({ id: `${day}-r1`, category: 'Night Review', title: 'Check tasks & Plan next day', time: '9:00 PM+', completed: false, skipped: false, points: 5 });
    tasks.push({ id: `${day}-r2`, category: 'Night Review', title: 'Write short note before sleep', time: 'Flexible', completed: false, skipped: false, points: 5 });

    return tasks;
  }, []);

  // Initialize and load from storage
  useEffect(() => {
    const saved = localStorage.getItem('180dayTracker');
    if (saved) {
      const parsed = JSON.parse(saved);
      setCurrentDay(parsed.currentDay);
      setCalendarData(parsed.calendarData);
      setPoints(parsed.points);
      setStreak(parsed.streak);
      setBadges(parsed.badges);
      setDarkMode(parsed.darkMode ?? true);
      setNotificationsEnabled(parsed.notificationsEnabled ?? false);
      setViewedDay(parsed.currentDay); // Start viewed day at current day
    } else {
      const initialCalendar: DayData[] = Array.from({ length: 180 }, (_, i) => {
        const dayNum = i + 1;
        const d = new Date(START_DATE);
        d.setDate(d.getDate() + i);
        return {
          day: dayNum,
          date: d.toISOString(),
          tasks: getTasksForDay(dayNum),
          points: 0,
          totalPoints: 0,
          streak: 0,
          completed: false,
          grade: 'F',
          note: ''
        };
      });
      setCalendarData(initialCalendar);
    }
  }, [getTasksForDay]);

  // Save to storage
  useEffect(() => {
    if (calendarData.length > 0) {
      const state = { currentDay, calendarData, points, streak, badges, darkMode, notificationsEnabled };
      localStorage.setItem('180dayTracker', JSON.stringify(state));
    }
  }, [currentDay, calendarData, points, streak, badges, darkMode, notificationsEnabled]);

  const toggleTask = (dayNum: number, taskId: string) => {
    // Only current day and future days can be edited (though user mentioned only past should be locked)
    if (dayNum < currentDay) return;

    setCalendarData(prev => prev.map(day => {
      if (day.day !== dayNum) return day;
      const updatedTasks = day.tasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed, skipped: false } : t
      );
      return { ...day, tasks: updatedTasks };
    }));
  };

  const skipTask = (dayNum: number, taskId: string) => {
    if (dayNum < currentDay) return;

    setCalendarData(prev => prev.map(day => {
      if (day.day !== dayNum) return day;
      const updatedTasks = day.tasks.map(t => 
        t.id === taskId ? { ...t, skipped: !t.skipped, completed: false } : t
      );
      return { ...day, tasks: updatedTasks };
    }));
  };

  const calculateGrade = (percentage: number) => {
    if (percentage >= 95) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 30) return 'D';
    return 'F';
  };

  const completeDay = (dayNum: number, note: string, tomorrowPlan?: TomorrowPlan) => {
    setCalendarData(prev => {
      const newCalendar = [...prev];
      const dayIndex = newCalendar.findIndex(d => d.day === dayNum);
      if (dayIndex === -1) return prev;

      const day = newCalendar[dayIndex];
      const completedCount = day.tasks.filter(t => t.completed).length;
      const totalCount = day.tasks.length;
      const percentage = (completedCount / totalCount) * 100;
      
      let dayPoints = 0;
      day.tasks.forEach(t => {
        if (t.completed) dayPoints += t.points;
      });

      // Daily completion bonus
      if (percentage === 100) dayPoints += 20;

      const isAllDone = percentage === 100;
      const newStreak = isAllDone ? streak + 1 : 0;
      setStreak(newStreak);

      // Streak bonuses
      if (newStreak === 7) {
        dayPoints += 50;
        if (!badges.includes('week-warrior')) setBadges([...badges, 'week-warrior']);
      } else if (newStreak === 30) {
        dayPoints += 200;
        if (!badges.includes('month-master')) setBadges([...badges, 'month-master']);
      } else if (dayNum === 180 && isAllDone) {
        dayPoints += 500;
        if (!badges.includes('champion')) setBadges([...badges, 'champion']);
      }

      setPoints(prevPoints => prevPoints + dayPoints);

      newCalendar[dayIndex] = {
        ...day,
        completed: true,
        grade: calculateGrade(percentage),
        note,
        tomorrowPlan,
        points: dayPoints
      };

      if (dayNum < 180 && tomorrowPlan) {
        const nextDayIndex = dayIndex + 1;
        const nextDay = newCalendar[nextDayIndex];
        
        // Custom Plan Injection
        const customCategories = ['english', 'trading', 'dsa', 'dev'] as const;
        const catMap = {
          english: 'English Learning',
          trading: 'Trading',
          dsa: 'Coding/DSA',
          dev: 'Flutter/React'
        } as const;

        let newTasks = nextDay.tasks.filter(t => t.category === 'Morning Routine' || t.category === 'Night Review');
        
        customCategories.forEach(catKey => {
          const catPlan = tomorrowPlan[catKey];
          catPlan.tasks.forEach((taskTitle, i) => {
            if (taskTitle.trim()) {
              newTasks.push({
                id: `custom-${nextDay.day}-${catKey}-${i}`,
                category: catMap[catKey],
                title: taskTitle.trim(),
                time: 'Scheduled',
                completed: false,
                skipped: false,
                points: 10 // AI Assigned points for custom focus
              });
            }
          });
        });

        // Add placeholders if no custom was provided for a category
        if (newTasks.length === (nextDay.tasks.filter(t => t.category === 'Morning Routine' || t.category === 'Night Review').length)) {
           // If no custom tasks at all, keep default list
           newTasks = [...nextDay.tasks];
        }

        newCalendar[nextDayIndex] = { ...nextDay, tasks: newTasks };
      }

      return newCalendar;
    });

    if (dayNum < 180) {
      setCurrentDay(dayNum + 1);
      setViewedDay(dayNum + 1);
    }
  };

  return {
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
    currentDayData: calendarData.find(d => d.day === viewedDay)
  };
};
