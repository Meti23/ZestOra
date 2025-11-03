import { motion } from 'motion/react';
import { Home, Sword, BarChart3, Trophy, User } from 'lucide-react';
import { cn } from './ui/utils';

interface BottomNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'tasks', icon: Sword, label: 'Quests' },
  { id: 'analytics', icon: BarChart3, label: 'Stats' },
  { id: 'leaderboard', icon: Trophy, label: 'Ranks' },
];

export function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t-2 border-sidebar-border pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[56px] min-h-[48px]",
                isActive 
                  ? "text-[#FBE4DB]" 
                  : "text-[#854F6C] hover:text-[#DEB6B2]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#522B5B] to-[#854F6C] rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon className={cn(
                  "w-5 h-5 transition-transform",
                  isActive && "scale-110"
                )} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
              
              {isActive && (
                <motion.div
                  className="absolute -top-1 w-12 h-1 bg-[#DEB6B2] rounded-full"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
