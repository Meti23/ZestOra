import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Calendar, Users, TrendingUp, BarChart, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '../ui/chart';
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { mockAnalytics } from '../../data/mockData';
import { GlowButton } from '../GameEffects';

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "#522B5B",
  },
  completed: {
    label: "Completed",
    color: "#854F6C",
  },
  inProgress: {
    label: "In Progress",
    color: "#DEB6B2",
  }
};

export function AnalyticsView() {
  const [dateRange, setDateRange] = useState('30d');
  const [teamFilter, setTeamFilter] = useState('all');

  const statusDistribution = [
    { name: 'Completed', value: 45, color: '#522B5B' },
    { name: 'In Progress', value: 25, color: '#854F6C' },
    { name: 'To Do', value: 15, color: '#DEB6B2' },
    { name: 'Review', value: 10, color: '#2B124C' },
    { name: 'Backlog', value: 5, color: '#FBE4DB' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[#854F6C]" />
            <h1 className="text-[#190019] dark:text-[#FBE4DB] text-xl sm:text-2xl">Analytics & Insights</h1>
          </div>
          <p className="text-[#522B5B] dark:text-[#DEB6B2] text-sm sm:text-base">Track guild performance and quest progress</p>
        </motion.div>
        <div className="flex gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32 bg-[#DEB6B2] dark:bg-[#2B124C] border-[#854F6C]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#FBE4DB] dark:bg-[#2B124C]">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-32 bg-[#DEB6B2] dark:bg-[#2B124C] border-[#854F6C]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#FBE4DB] dark:bg-[#2B124C]">
              <SelectItem value="all">All Guild</SelectItem>
              <SelectItem value="alex">Alex Johnson</SelectItem>
              <SelectItem value="sarah">Sarah Wilson</SelectItem>
              <SelectItem value="mike">Mike Chen</SelectItem>
            </SelectContent>
          </Select>
          <GlowButton variant="secondary" className="min-h-[44px]">
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </GlowButton>
        </div>
      </div>

      {/* Key Metrics */}
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
                  <p className="text-xs md:text-sm text-[#522B5B] dark:text-[#DEB6B2]">Avg Quest Time</p>
                  <span className="text-xl md:text-2xl text-[#190019] dark:text-[#FBE4DB]">{mockAnalytics.averageCompletionTime}d</span>
                </div>
                <div className="gem-badge w-10 h-10 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#FBE4DB]" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3">-0.3d from last month</p>
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
                  <p className="text-xs md:text-sm text-[#522B5B] dark:text-[#DEB6B2]">Guild Velocity</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl text-[#190019] dark:text-[#FBE4DB]">42</span>
                    <span className="text-xs md:text-sm text-[#854F6C]">quests/wk</span>
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#522B5B] to-[#854F6C] flex items-center justify-center pulse-glow flex-shrink-0">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#FBE4DB]" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3">+15% this week</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#522B5B] dark:text-[#DEB6B2]">Active Warriors</p>
                  <span className="text-2xl text-[#190019] dark:text-[#FBE4DB]">5</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#854F6C] to-[#DEB6B2] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#190019]" />
                </div>
              </div>
              <p className="text-xs text-[#854F6C] mt-3">All members online</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#522B5B] dark:text-[#DEB6B2]">Success Rate</p>
                  <span className="text-2xl text-[#190019] dark:text-[#FBE4DB]">{mockAnalytics.completionRate}%</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2B124C] to-[#522B5B] flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-[#DEB6B2]" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-3">+2.1% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <Tabs defaultValue="team-performance" className="space-y-6">
        <TabsList className="bg-[#DEB6B2] dark:bg-[#2B124C] w-full grid grid-cols-3 gap-1">
          <TabsTrigger value="team-performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB] text-xs sm:text-sm">
            <span className="hidden sm:inline">Guild Performance</span>
            <span className="sm:hidden">Guild</span>
          </TabsTrigger>
          <TabsTrigger value="productivity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB] text-xs sm:text-sm">
            <span className="hidden sm:inline">Progress Trends</span>
            <span className="sm:hidden">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB] text-xs sm:text-sm">
            <span className="hidden sm:inline">Quest Distribution</span>
            <span className="sm:hidden">Quests</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team-performance" className="space-y-4">
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardHeader>
              <CardTitle className="text-[#190019] dark:text-[#FBE4DB] text-lg sm:text-xl">Guild Performance</CardTitle>
              <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2] text-sm">Quests completed by warrior</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={mockAnalytics.tasksByMember}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#854F6C" opacity={0.3} />
                    <XAxis dataKey="name" stroke="#522B5B" />
                    <YAxis stroke="#522B5B" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="tasks" fill="#522B5B" radius={[8, 8, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardHeader>
              <CardTitle className="text-[#190019] dark:text-[#FBE4DB] text-lg sm:text-xl">Progress Over Time</CardTitle>
              <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2] text-sm">Quests completed per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAnalytics.weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#854F6C" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#522B5B" />
                    <YAxis stroke="#522B5B" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="tasks" 
                      stroke="#854F6C" 
                      strokeWidth={3}
                      dot={{ fill: '#522B5B', r: 6 }}
                      activeDot={{ r: 8, fill: '#854F6C' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardHeader>
              <CardTitle className="text-[#190019] dark:text-[#FBE4DB] text-lg sm:text-xl">Quest Status Distribution</CardTitle>
              <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2] text-sm">Current status breakdown of all quests</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights Section */}
      <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#190019] dark:text-[#FBE4DB]">
            <Zap className="w-5 h-5 text-[#854F6C]" />
            Quest Insights
          </CardTitle>
          <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2]">
            AI-powered insights based on your guild's performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 sm:p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border-2 border-green-500"
            >
              <h4 className="text-green-700 dark:text-green-400 text-sm sm:text-base">📈 Power Level Rising</h4>
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-300 mt-1">
                Guild productivity increased by 15% this week. The team is on fire! 🔥
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 sm:p-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border-2 border-orange-500"
            >
              <h4 className="text-orange-700 dark:text-orange-400 text-sm sm:text-base">⚠️ Quest Bottleneck</h4>
              <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-300 mt-1">
                Review column needs attention. Consider assigning more warriors to clear the backlog.
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
