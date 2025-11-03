import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, SortAsc, Sword } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { KanbanColumn } from '../KanbanColumn';
import { mockColumns } from '../../data/mockData';
import { GlowButton } from '../GameEffects';

interface TasksViewProps {
  onTaskClick: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
}

export function TasksView({ onTaskClick, onAddTask }: TasksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'personal' | 'collaborative'>('collaborative');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b-2 border-[#854F6C] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Sword className="w-5 h-5 sm:w-6 sm:h-6 text-[#854F6C]" />
                <h1 className="text-[#190019] dark:text-[#FBE4DB] text-xl sm:text-2xl">Quest Board</h1>
              </div>
              <p className="text-[#522B5B] dark:text-[#DEB6B2] text-sm sm:text-base mt-1">
                Manage your quests with drag-and-drop mission control
              </p>
            </div>
            <GlowButton onClick={() => onAddTask('todo')} className="w-full sm:w-auto min-h-[48px]">
              <Plus className="w-5 h-5 mr-2" />
              New Quest
            </GlowButton>
          </motion.div>

          {/* Mode Toggle */}
          <div className="mb-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'personal' | 'collaborative')}>
              <TabsList className="bg-[#DEB6B2] dark:bg-[#2B124C]">
                <TabsTrigger 
                  value="personal" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB]"
                >
                  Personal Quests
                </TabsTrigger>
                <TabsTrigger 
                  value="collaborative" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB]"
                >
                  Team Quests
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search quests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#DEB6B2] dark:bg-[#2B124C] border-[#854F6C]"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32 bg-[#DEB6B2] dark:bg-[#2B124C] border-[#854F6C]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-[#FBE4DB] dark:bg-[#2B124C]">
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-32 bg-[#DEB6B2] dark:bg-[#2B124C] border-[#854F6C]">
                  <SelectValue placeholder="Assignee" />
                </SelectTrigger>
                <SelectContent className="bg-[#FBE4DB] dark:bg-[#2B124C]">
                  <SelectItem value="all">All Warriors</SelectItem>
                  <SelectItem value="alex">Alex Johnson</SelectItem>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                </SelectContent>
              </Select>

              <GlowButton variant="secondary" className="px-3 min-h-[44px] min-w-[44px]">
                <Filter className="w-5 h-5" />
              </GlowButton>

              <GlowButton variant="secondary" className="px-3 min-h-[44px] min-w-[44px]">
                <SortAsc className="w-5 h-5" />
              </GlowButton>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4 sm:p-6 h-full">
          <div className="max-w-7xl mx-auto h-full">
            {/* Mobile: Vertical Stack with Swipe Indicator */}
            <div className="md:hidden">
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {mockColumns.map((column) => (
                  <button
                    key={column.id}
                    className="px-3 py-2 rounded-lg bg-[#DEB6B2] dark:bg-[#2B124C] text-[#190019] dark:text-[#FBE4DB] text-xs whitespace-nowrap snap-start border-2 border-[#854F6C]/30 min-h-[44px]"
                  >
                    {column.title} ({column.tasks.length})
                  </button>
                ))}
              </div>
              <div className="space-y-3 pb-4">
                {mockColumns.map((column, index) => (
                  <motion.div
                    key={column.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <KanbanColumn
                      column={column}
                      onTaskClick={onTaskClick}
                      onAddTask={onAddTask}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tablet/Desktop: Horizontal Scroll */}
            <div className="hidden md:flex gap-4 lg:gap-6 h-full overflow-x-auto pb-6 snap-x snap-mandatory">
              {mockColumns.map((column, index) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 snap-start"
                >
                  <KanbanColumn
                    column={column}
                    onTaskClick={onTaskClick}
                    onAddTask={onAddTask}
                  />
                </motion.div>
              ))}
              
              {/* Add Column */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex-shrink-0 w-80 snap-start"
              >
                <div className="h-24 border-2 border-dashed border-[#854F6C] hover:border-[#522B5B] hover:bg-[#522B5B]/5 rounded-xl flex items-center justify-center cursor-pointer transition-all p-4 min-h-[52px]">
                  <Plus className="w-6 h-6 mr-2 text-[#854F6C]" />
                  <span className="text-[#522B5B] dark:text-[#DEB6B2]">Add Column</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
