import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users,
  Calendar,
  Plus,
  Zap,
  Flame,
  Trophy,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { KanbanColumn } from '../KanbanColumn';
import { mockAnalytics, mockColumns, mockActivities, mockUsers } from '../../data/mockData';
import { XPBar, BadgeDisplay, Confetti, GlowButton } from '../GameEffects';

interface DashboardViewProps {
  onTaskClick: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
}

export function DashboardView({ onTaskClick, onAddTask }: DashboardViewProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const previewColumns = mockColumns.slice(1, 4);
  const currentUser = mockUsers[0]; // Alex Johnson - admin user

  const handleTaskComplete = () => {
    setShowConfetti(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Slogan Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#522B5B] via-[#854F6C] to-[#2B124C] p-4 md:p-6 rounded-xl border-2 border-[#854F6C] text-center parchment-texture relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#DEB6B2]" />
          <h2 className="text-[#FBE4DB] text-sm md:text-base">Quest Through Chaos: Level Up Your Tasks with Zestora!</h2>
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#DEB6B2]" />
        </div>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h1 className="text-[#190019] dark:text-[#FBE4DB]">Welcome back, {currentUser.name}!</h1>
          <p className="text-[#522B5B] dark:text-[#DEB6B2]">Continue your quest and conquer today's missions.</p>
          
          {/* XP Progress */}
          <div className="mt-3 md:mt-4">
            <XPBar current={750} max={1000} level={currentUser.level} />
          </div>
        </div>
        
        {/* Badges and CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="flex gap-2 justify-center sm:justify-start">
            {currentUser.badges.slice(0, 3).map((badge) => (
              <BadgeDisplay key={badge.id} badge={badge} size="sm" />
            ))}
          </div>
          <GlowButton 
            onClick={() => onAddTask('todo')} 
            className="w-full sm:w-auto min-h-[48px] sm:ml-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Quest
          </GlowButton>
        </div>
      </div>

      {/* Metrics Cards - Game-styled */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-[#522B5B] dark:text-[#DEB6B2]">Tasks Completed</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl md:text-2xl text-[#190019] dark:text-[#FBE4DB]">{mockAnalytics.completedTasks}</span>
                    <span className="text-sm md:text-base text-[#854F6C]">/{mockAnalytics.totalTasks}</span>
                  </div>
                </div>
                <div className="gem-badge w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="w-4 h-4 md:w-5 md:h-5 text-[#FBE4DB]" />
                </div>
              </div>
              <div className="xp-bar mt-3">
                <motion.div
                  className="xp-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(mockAnalytics.completedTasks / mockAnalytics.totalTasks) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-[#522B5B] dark:text-[#DEB6B2]">Overdue</p>
                  <span className="text-xl md:text-2xl text-red-600 dark:text-red-400">{mockAnalytics.overdueTasks}</span>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-[#854F6C] mt-3">Need immediate attention</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-[#522B5B] dark:text-[#DEB6B2]">Productivity</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl md:text-2xl text-[#190019] dark:text-[#FBE4DB]">{mockAnalytics.teamProductivity}%</span>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#522B5B] to-[#854F6C] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#FBE4DB]" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3">+12% XP boost active!</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-[#522B5B] dark:text-[#DEB6B2]">Current Streak</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl md:text-2xl text-[#190019] dark:text-[#FBE4DB]">{currentUser.streak}</span>
                    <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center pulse-glow flex-shrink-0">
                  <Flame className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>
              <p className="text-xs text-[#854F6C] mt-3">Keep the fire burning!</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Quick Task View */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-[#190019] dark:text-[#FBE4DB]">
                <Trophy className="w-5 h-5 text-[#854F6C]" />
                Active Quests
              </CardTitle>
              <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2] text-xs md:text-sm">
                Swipe to view quest columns
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
                {previewColumns.map((column) => (
                  <div key={column.id} className="snap-center">
                    <KanbanColumn
                      column={column}
                      onTaskClick={onTaskClick}
                      onAddTask={onAddTask}
                    />
                  </div>
                ))}
              </div>
              <GlowButton
                variant="secondary"
                onClick={() => window.location.href = '#tasks'}
                className="w-full mt-4 min-h-[48px]"
              >
                View All Quests
              </GlowButton>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
          {/* Recent Activity */}
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-[#190019] dark:text-[#FBE4DB]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              {mockActivities.slice(0, 4).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <Avatar className="w-8 h-8 border-2 border-[#854F6C]">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#190019] dark:text-[#FBE4DB]">
                      <span className="font-medium">{activity.user.name}</span>
                      {' '}{activity.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#522B5B] dark:text-[#DEB6B2]">{activity.timestamp}</p>
                      {activity.xpGained && (
                        <Badge className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                          <Zap className="w-3 h-3 mr-1" />
                          +{activity.xpGained} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar Widget */}
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C] parchment-texture">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center text-[#190019] dark:text-[#FBE4DB]">
                <Calendar className="w-4 h-4 mr-2 text-[#854F6C]" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3 p-4 md:p-6 pt-0">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#DEB6B2]/30 dark:bg-[#190019]/30">
                <div>
                  <p className="text-sm text-[#190019] dark:text-[#FBE4DB]">Design user onboarding flow</p>
                  <p className="text-xs text-[#522B5B] dark:text-[#DEB6B2]">Due Oct 18, 2025</p>
                </div>
                <Badge className="text-xs bg-gradient-to-r from-red-600 to-red-700 text-white">
                  High
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#DEB6B2]/30 dark:bg-[#190019]/30">
                <div>
                  <p className="text-sm text-[#190019] dark:text-[#FBE4DB]">Implement authentication</p>
                  <p className="text-xs text-[#522B5B] dark:text-[#DEB6B2]">Due Oct 17, 2025</p>
                </div>
                <Badge className="text-xs bg-gradient-to-r from-red-600 to-red-700 text-white">
                  High
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#DEB6B2]/30 dark:bg-[#190019]/30">
                <div>
                  <p className="text-sm text-[#190019] dark:text-[#FBE4DB]">Update documentation</p>
                  <p className="text-xs text-[#522B5B] dark:text-[#DEB6B2]">Due Oct 22, 2025</p>
                </div>
                <Badge className="text-xs bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] text-[#190019]">
                  Medium
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
