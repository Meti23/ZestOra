import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, TrendingDown, Minus, Flame, Zap, Send } from 'lucide-react';
import { mockLeaderboard } from '../../data/mockData';
import { LeaderboardEntry } from '../../types';
import { BadgeDisplay, GlowButton } from '../GameEffects';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

type FilterType = 'weekly' | 'monthly' | 'alltime';

export const LeaderboardView: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('weekly');
  const [leaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);

  const handleNudge = (userName: string) => {
    toast.success(`Sent encouragement to ${userName}! 🎉`);
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-[#2B124C] via-[#522B5B] to-[#854F6C]';
      case 2:
        return 'from-[#522B5B] to-[#854F6C]';
      case 3:
        return 'from-[#854F6C] to-[#DEB6B2]';
      default:
        return 'from-[#2B124C] to-[#522B5B]';
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '👑', name: 'Quest Champion', rarity: 'legendary' as const };
    if (rank === 2) return { icon: '🥈', name: 'Task Titan', rarity: 'epic' as const };
    if (rank === 3) return { icon: '🥉', name: 'Mission Master', rarity: 'rare' as const };
    return { icon: '⭐', name: 'Quest Warrior', rarity: 'common' as const };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#854F6C]" />
          <h1 className="text-[#522B5B] dark:text-[#FBE4DB] text-xl sm:text-2xl">Leaderboard</h1>
        </div>
        <p className="text-[#522B5B] dark:text-[#DEB6B2] text-sm sm:text-base">
          Top questers conquering chaos and leveling up their productivity!
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <Tabs defaultValue="weekly" className="w-full" onValueChange={(v) => setFilter(v as FilterType)}>
        <TabsList className="bg-[#DEB6B2] dark:bg-[#2B124C]">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-[#522B5B] data-[state=active]:text-[#FBE4DB]">
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-[#522B5B] data-[state=active]:text-[#FBE4DB]">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="alltime" className="data-[state=active]:bg-[#522B5B] data-[state=active]:text-[#FBE4DB]">
            All-Time
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4 mt-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${index === 0 ? 'sm:order-2' : index === 1 ? 'sm:order-1' : 'sm:order-3'}`}
              >
                <Card className={`
                  card-game-style p-4 sm:p-6 text-center
                  bg-gradient-to-br ${getRankColor(entry.rank)}
                  border-2 border-[#854F6C]
                  ${index === 0 ? 'sm:scale-110' : ''}
                `}>
                  <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                    <div className="relative">
                      <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-3 sm:border-4 border-[#FBE4DB]">
                        <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                        <AvatarFallback className="bg-[#854F6C] text-[#FBE4DB]">
                          {entry.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2">
                        <BadgeDisplay badge={getRankBadge(entry.rank)} size="sm" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[#FBE4DB] text-sm sm:text-base">{entry.user.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <Badge className="bg-[#FBE4DB]/20 text-[#FBE4DB]">
                          <Trophy className="w-3 h-3 mr-1" />
                          #{entry.rank}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full text-[#FBE4DB]">
                      <div>
                        <div className="text-xs opacity-80">Tasks</div>
                        <div className="text-sm sm:text-base">{entry.tasksCompleted}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-80">Streak</div>
                        <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                          <Flame className="w-3 h-3 text-[#DEB6B2]" />
                          {entry.streak}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-80">XP</div>
                        <div className="flex items-center justify-center gap-1 text-sm sm:text-base">
                          <Zap className="w-3 h-3 text-[#DEB6B2]" />
                          {entry.xp}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                      {entry.badges.slice(0, 3).map((badge) => (
                        <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-3">
            {leaderboard.slice(3).map((entry, index) => (
              <motion.div
                key={entry.user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="card-game-style p-3 sm:p-4 bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      {/* Rank */}
                      <div className="flex items-center gap-2">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br ${getRankColor(entry.rank)}
                          text-[#FBE4DB]
                        `}>
                          {entry.rank}
                        </div>
                        <div className="flex flex-col items-center">
                          {entry.change > 0 && (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          )}
                          {entry.change < 0 && (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          {entry.change === 0 && (
                            <Minus className="w-4 h-4 text-[#854F6C]" />
                          )}
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#854F6C] flex-shrink-0">
                          <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                          <AvatarFallback className="bg-[#854F6C] text-[#FBE4DB] text-xs sm:text-sm">
                            {entry.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-[#190019] dark:text-[#FBE4DB] text-sm sm:text-base truncate">{entry.user.name}</h4>
                            {entry.user.isOnline && (
                              <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#522B5B] dark:text-[#DEB6B2] flex-wrap">
                            <span className="whitespace-nowrap">{entry.tasksCompleted} tasks</span>
                            <span className="flex items-center gap-1 whitespace-nowrap">
                              <Flame className="w-3 h-3 flex-shrink-0" />
                              {entry.streak}d
                            </span>
                            <span className="hidden sm:flex items-center gap-1 whitespace-nowrap">
                              <Zap className="w-3 h-3 flex-shrink-0" />
                              {entry.xp} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="hidden md:flex gap-2">
                        {entry.badges.slice(0, 3).map((badge) => (
                          <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                        ))}
                        {entry.badges.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-[#522B5B] flex items-center justify-center text-[#FBE4DB] text-xs">
                            +{entry.badges.length - 3}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Nudge Button */}
                    <GlowButton
                      variant="secondary"
                      onClick={() => handleNudge(entry.user.name)}
                      className="px-3 sm:px-4 py-2 text-xs sm:text-sm flex-shrink-0"
                    >
                      <Send className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Nudge</span>
                    </GlowButton>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {leaderboard.length === 0 && (
            <Card className="card-game-style p-12 text-center bg-[#FBE4DB] dark:bg-[#2B124C]">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-[#854F6C]" />
              <h3 className="mb-2 text-[#190019] dark:text-[#FBE4DB]">Complete tasks to rank!</h3>
              <p className="text-[#522B5B] dark:text-[#DEB6B2] mb-6">
                Start completing tasks to appear on the leaderboard and earn your place among the top questers.
              </p>
              <GlowButton>
                Start Your Quest
              </GlowButton>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
