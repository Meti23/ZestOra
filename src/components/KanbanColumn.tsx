import { motion } from 'motion/react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TaskCard } from './TaskCard';
import { Column } from '../types';

interface KanbanColumnProps {
  column: Column;
  onTaskClick: (taskId: string) => void;
  onAddTask: (columnId: string) => void;
}

const columnColors = {
  backlog: 'from-[#DEB6B2] to-[#FBE4DB]',
  todo: 'from-[#522B5B] to-[#854F6C]',
  inprogress: 'from-[#854F6C] to-[#DEB6B2]',
  review: 'from-[#2B124C] to-[#522B5B]',
  done: 'from-[#522B5B] via-[#854F6C] to-[#DEB6B2]'
};

export function KanbanColumn({ column, onTaskClick, onAddTask }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-80 bg-[#DEB6B2]/30 dark:bg-[#190019]/30 rounded-lg p-3 sm:p-4 h-fit border-2 border-[#854F6C]/30">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b ${columnColors[column.id as keyof typeof columnColors] || columnColors.backlog}`} />
          <h3 className="text-[#190019] dark:text-[#FBE4DB] text-sm sm:text-base">{column.title}</h3>
          <Badge className="text-xs bg-gradient-to-r from-[#522B5B] to-[#854F6C] text-[#FBE4DB] border-none">
            {column.tasks.length}
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddTask(column.id)}
              className="h-10 w-10 p-0 hover:bg-[#522B5B]/20 text-[#854F6C] min-h-[44px] min-w-[44px]"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 hover:bg-[#522B5B]/20 text-[#854F6C] min-h-[44px] min-w-[44px]"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2 sm:space-y-3 min-h-[100px]">
        {column.tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TaskCard
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          </motion.div>
        ))}
        
        {column.tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-dashed border-[#854F6C] rounded-lg p-4 sm:p-6 text-center text-[#522B5B] dark:text-[#DEB6B2]"
          >
            <p className="text-xs sm:text-sm">No quests here yet</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddTask(column.id)}
              className="mt-2 text-[#854F6C] hover:bg-[#522B5B]/20 min-h-[44px]"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Quest
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
