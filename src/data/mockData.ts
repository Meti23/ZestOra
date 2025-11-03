import { User, Task, Column, Analytics, Badge, Activity, LeaderboardEntry } from '../types';

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: 'Task Master',
    description: 'Complete 50 tasks',
    icon: '💎',
    rarity: 'legendary',
    earnedAt: '2025-01-01'
  },
  {
    id: 'b2',
    name: 'Speed Demon',
    description: 'Complete 10 tasks in one day',
    icon: '⚡',
    rarity: 'epic',
    earnedAt: '2025-01-05'
  },
  {
    id: 'b3',
    name: 'Team Player',
    description: 'Collaborate on 20 tasks',
    icon: '🤝',
    rarity: 'rare',
    earnedAt: '2024-12-20'
  },
  {
    id: 'b4',
    name: 'Streak Champion',
    description: 'Maintain a 30-day streak',
    icon: '🔥',
    rarity: 'epic',
    earnedAt: '2025-01-10'
  },
  {
    id: 'b5',
    name: 'Early Bird',
    description: 'Complete tasks before 8 AM',
    icon: '🌅',
    rarity: 'common',
    earnedAt: '2025-01-08'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@zestora.com',
    avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGF2YXRhcnxlbnwxfHx8fDE3NTczOTkxNTF8MA&ixlib=rb-4.1.0&q=80&w=200',
    role: 'admin',
    xp: 8750,
    level: 12,
    streak: 45,
    tasksCompleted: 127,
    badges: [mockBadges[0], mockBadges[1], mockBadges[3]],
    rank: 1,
    isOnline: true
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@zestora.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGF2YXRhcnxlbnwxfHx8fDE3NTczOTkxNTF8MA&ixlib=rb-4.1.0&q=80&w=200',
    role: 'member',
    xp: 7250,
    level: 10,
    streak: 32,
    tasksCompleted: 98,
    badges: [mockBadges[2], mockBadges[4]],
    rank: 2,
    isOnline: true
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@zestora.com',
    avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBhdmF0YXJ8ZW58MXx8fHwxNzU3Mzk5MTUxfDA&ixlib=rb-4.1.0&q=80&w=200',
    role: 'member',
    xp: 6100,
    level: 9,
    streak: 18,
    tasksCompleted: 76,
    badges: [mockBadges[2]],
    rank: 3,
    isOnline: false
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma@zestora.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTczOTkxNTF8MA&ixlib=rb-4.1.0&q=80&w=200',
    role: 'member',
    xp: 5420,
    level: 8,
    streak: 25,
    tasksCompleted: 64,
    badges: [mockBadges[4]],
    rank: 4,
    isOnline: true
  },
  {
    id: '5',
    name: 'James Taylor',
    email: 'james@zestora.com',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzU3Mzk5MTUxfDA&ixlib=rb-4.1.0&q=80&w=200',
    role: 'member',
    xp: 4890,
    level: 7,
    streak: 12,
    tasksCompleted: 52,
    badges: [],
    rank: 5,
    isOnline: false
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design user onboarding flow',
    description: 'Create wireframes and mockups for the new user onboarding process',
    status: 'todo',
    priority: 'high',
    assignee: mockUsers[1],
    dueDate: '2025-10-18',
    labels: ['Design', 'UX'],
    comments: [],
    attachments: 2,
    createdAt: '2025-10-10',
    updatedAt: '2025-10-14',
    xpReward: 150,
    mode: 'collaborative',
    collaborators: [mockUsers[1], mockUsers[3]]
  },
  {
    id: '2',
    title: 'Implement authentication system',
    description: 'Set up user authentication with email/password and OAuth',
    status: 'inprogress',
    priority: 'high',
    assignee: mockUsers[2],
    dueDate: '2025-10-17',
    labels: ['Backend', 'Security'],
    comments: [],
    attachments: 1,
    createdAt: '2025-10-08',
    updatedAt: '2025-10-15',
    xpReward: 200,
    mode: 'collaborative',
    collaborators: [mockUsers[2], mockUsers[0]]
  },
  {
    id: '3',
    title: 'Update project documentation',
    description: 'Review and update all project documentation for Q1',
    status: 'review',
    priority: 'medium',
    assignee: mockUsers[0],
    dueDate: '2025-10-22',
    labels: ['Documentation'],
    comments: [],
    attachments: 0,
    createdAt: '2025-10-09',
    updatedAt: '2025-10-13',
    xpReward: 100,
    mode: 'personal'
  },
  {
    id: '4',
    title: 'Fix mobile responsive issues',
    description: 'Address layout issues on mobile devices across the application',
    status: 'done',
    priority: 'medium',
    assignee: mockUsers[1],
    dueDate: '2025-10-12',
    labels: ['Frontend', 'Bug'],
    comments: [],
    attachments: 3,
    createdAt: '2025-10-05',
    updatedAt: '2025-10-12',
    xpReward: 120,
    mode: 'collaborative',
    collaborators: [mockUsers[1], mockUsers[2]]
  },
  {
    id: '5',
    title: 'Performance optimization',
    description: 'Optimize application performance and reduce load times',
    status: 'backlog',
    priority: 'low',
    assignee: mockUsers[2],
    dueDate: '2025-10-28',
    labels: ['Performance'],
    comments: [],
    attachments: 0,
    createdAt: '2025-10-10',
    updatedAt: '2025-10-10',
    xpReward: 80,
    mode: 'personal'
  },
  {
    id: '6',
    title: 'Create marketing campaign',
    description: 'Design and launch Q4 marketing campaign',
    status: 'inprogress',
    priority: 'high',
    assignee: mockUsers[3],
    dueDate: '2025-10-19',
    labels: ['Marketing'],
    comments: [],
    attachments: 5,
    createdAt: '2025-10-11',
    updatedAt: '2025-10-15',
    xpReward: 180,
    mode: 'collaborative',
    collaborators: [mockUsers[3], mockUsers[1]]
  }
];

export const mockColumns: Column[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    tasks: mockTasks.filter(task => task.status === 'backlog')
  },
  {
    id: 'todo',
    title: 'To Do',
    tasks: mockTasks.filter(task => task.status === 'todo')
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: mockTasks.filter(task => task.status === 'inprogress')
  },
  {
    id: 'review',
    title: 'Review',
    tasks: mockTasks.filter(task => task.status === 'review')
  },
  {
    id: 'done',
    title: 'Done',
    tasks: mockTasks.filter(task => task.status === 'done')
  }
];

export const mockAnalytics: Analytics = {
  totalTasks: 100,
  completedTasks: 45,
  overdueTasks: 5,
  teamProductivity: 85,
  completionRate: 84.4,
  averageCompletionTime: 2.5,
  weeklyProgress: [
    { day: 'Mon', tasks: 8 },
    { day: 'Tue', tasks: 12 },
    { day: 'Wed', tasks: 7 },
    { day: 'Thu', tasks: 10 },
    { day: 'Fri', tasks: 15 },
    { day: 'Sat', tasks: 5 },
    { day: 'Sun', tasks: 3 }
  ],
  tasksByPriority: [
    { priority: 'High', count: 25 },
    { priority: 'Medium', count: 45 },
    { priority: 'Low', count: 30 }
  ],
  tasksByMember: [
    { name: 'Alex', tasks: 35 },
    { name: 'Sarah', tasks: 28 },
    { name: 'Mike', tasks: 22 },
    { name: 'Emma', tasks: 18 },
    { name: 'James', tasks: 12 }
  ]
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_completed',
    user: mockUsers[1],
    description: 'completed "Fix mobile responsive issues"',
    timestamp: '2 hours ago',
    xpGained: 120
  },
  {
    id: '2',
    type: 'badge_earned',
    user: mockUsers[0],
    description: 'earned the "Task Master" badge',
    timestamp: '4 hours ago',
    badge: mockBadges[0]
  },
  {
    id: '3',
    type: 'task_assigned',
    user: mockUsers[2],
    description: 'was assigned "Implement authentication system"',
    timestamp: '5 hours ago'
  },
  {
    id: '4',
    type: 'level_up',
    user: mockUsers[0],
    description: 'leveled up to Level 12',
    timestamp: '6 hours ago',
    xpGained: 250
  },
  {
    id: '5',
    type: 'task_created',
    user: mockUsers[3],
    description: 'created "Create marketing campaign"',
    timestamp: '8 hours ago'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    user: mockUsers[0],
    rank: 1,
    tasksCompleted: 127,
    streak: 45,
    xp: 8750,
    badges: mockUsers[0].badges,
    change: 0
  },
  {
    user: mockUsers[1],
    rank: 2,
    tasksCompleted: 98,
    streak: 32,
    xp: 7250,
    badges: mockUsers[1].badges,
    change: 1
  },
  {
    user: mockUsers[2],
    rank: 3,
    tasksCompleted: 76,
    streak: 18,
    xp: 6100,
    badges: mockUsers[2].badges,
    change: -1
  },
  {
    user: mockUsers[3],
    rank: 4,
    tasksCompleted: 64,
    streak: 25,
    xp: 5420,
    badges: mockUsers[3].badges,
    change: 0
  },
  {
    user: mockUsers[4],
    rank: 5,
    tasksCompleted: 52,
    streak: 12,
    xp: 4890,
    badges: mockUsers[4].badges,
    change: 0
  }
];
