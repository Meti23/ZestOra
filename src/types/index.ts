export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member';
  xp: number;
  level: number;
  streak: number;
  tasksCompleted: number;
  badges: Badge[];
  rank: number;
  isOnline?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee: User;
  dueDate: string;
  labels: string[];
  comments: Comment[];
  attachments: number;
  createdAt: string;
  updatedAt: string;
  xpReward: number;
  mode: 'personal' | 'collaborative';
  collaborators?: User[];
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Analytics {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  teamProductivity: number;
  completionRate: number;
  averageCompletionTime: number;
  weeklyProgress: { day: string; tasks: number }[];
  tasksByPriority: { priority: string; count: number }[];
  tasksByMember: { name: string; tasks: number }[];
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_completed' | 'task_assigned' | 'badge_earned' | 'level_up';
  user: User;
  description: string;
  timestamp: string;
  xpGained?: number;
  badge?: Badge;
}

export interface LeaderboardEntry {
  user: User;
  rank: number;
  tasksCompleted: number;
  streak: number;
  xp: number;
  badges: Badge[];
  change: number; // Position change from last week
}
