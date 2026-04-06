export type Category = 'Morning Routine' | 'English Learning' | 'Trading' | 'Coding/DSA' | 'Flutter/React' | 'Night Review';

export interface Task {
  id: string;
  category: Category;
  title: string;
  time: string;
  completed: boolean;
  skipped: boolean;
  points: number;
}

export interface CategoryPlan {
  tasks: string[];
}

export interface TomorrowPlan {
  english: CategoryPlan;
  trading: CategoryPlan;
  dsa: CategoryPlan;
  dev: CategoryPlan;
  additionalNote?: string;
}

export interface DayData {
  day: number;
  date: string;
  tasks: Task[];
  points: number;
  totalPoints: number;
  streak: number;
  completed: boolean;
  grade: string;
  note: string;
  tomorrowPlan?: TomorrowPlan;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface AppState {
  currentDay: number;
  calendarData: DayData[];
  points: number;
  streak: number;
  badges: string[];
  darkMode: boolean;
  notificationsEnabled: boolean;
}
