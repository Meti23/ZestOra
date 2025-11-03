import { motion } from 'motion/react';
import { Calendar, MessageCircle, Paperclip, Zap, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  isDragging?: boolean;
}

const priorityColors = {
  high: 'bg-gradient-to-r from-red-600 to-red-700 text-white border-none',
  medium: 'bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] text-[#190019] border-none',
  low: 'bg-gradient-to-r from-[#DEB6B2] to-[#FBE4DB] text-[#522B5B] border-none'
};

const labelColors = [
  'bg-[#522B5B] text-[#FBE4DB]',
  'bg-[#854F6C] text-[#FBE4DB]',
  'bg-[#2B124C] text-[#DEB6B2]',
  'bg-[#DEB6B2] text-[#190019]'
];

export function TaskCard({ task, onClick, isDragging = false }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  const isCollaborative = task.mode === 'collaborative';

  return (
    <motion.div
      whileHover={{ scale: isDragging ? 1 : 1.02, y: isDragging ? 0 : -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card 
        className={`card-game-style cursor-pointer bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C] ${
          isDragging ? 'opacity-50 rotate-2 shadow-2xl' : ''
        } ${isOverdue ? 'border-red-500' : ''}`}
        onClick={onClick}
      >
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Priority and Mode */}
          <div className="flex items-center justify-between">
            <Badge 
              className={`text-xs ${priorityColors[task.priority]}`}
            >
              {task.priority.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-2">
              {isCollaborative && (
                <div className="flex items-center gap-1 text-[#854F6C]">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{task.collaborators?.length || 0}</span>
                </div>
              )}
              {isOverdue && (
                <Badge className="text-xs bg-red-600 text-white border-none">
                  OVERDUE
                </Badge>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-[#190019] dark:text-[#FBE4DB] text-sm sm:text-base">{task.title}</h3>
            <p className="text-[#522B5B] dark:text-[#DEB6B2] text-xs sm:text-sm line-clamp-2">{task.description}</p>
          </div>

          {/* Labels */}
          {task.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.labels.map((label, index) => (
                <Badge 
                  key={label} 
                  className={`text-xs ${labelColors[index % labelColors.length]}`}
                >
                  {label}
                </Badge>
              ))}
            </div>
          )}

          {/* XP Reward */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[#522B5B]/20 to-[#854F6C]/20 border border-[#854F6C]/30">
            <Zap className="w-4 h-4 text-[#854F6C]" />
            <span className="text-xs text-[#522B5B] dark:text-[#DEB6B2]">
              +{task.xpReward} XP Reward
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-[#854F6C]/30">
            <div className="flex items-center space-x-2 sm:space-x-3 text-[#522B5B] dark:text-[#DEB6B2]">
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs hidden sm:inline">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <span className="text-xs sm:hidden">
                    {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
              {task.comments.length > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs">{task.comments.length}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center space-x-1">
                  <Paperclip className="w-3 h-3" />
                  <span className="text-xs">{task.attachments}</span>
                </div>
              )}
            </div>

            {isCollaborative && task.collaborators ? (
              <div className="flex -space-x-2">
                {task.collaborators.slice(0, 3).map((collaborator) => (
                  <Avatar key={collaborator.id} className="w-6 h-6 border-2 border-[#854F6C]">
                    <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                    <AvatarFallback className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                      {collaborator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.collaborators.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-[#522B5B] border-2 border-[#854F6C] flex items-center justify-center text-[#FBE4DB] text-xs">
                    +{task.collaborators.length - 3}
                  </div>
                )}
              </div>
            ) : (
              <Avatar className="w-6 h-6 border-2 border-[#854F6C]">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
