import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Users, 
  Search,
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Trophy,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useTheme } from '../hooks/useTheme';
import { mockUsers } from '../data/mockData';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'tasks', name: 'Quests', icon: CheckSquare },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'team', name: 'Team', icon: Users },
  { id: 'leaderboard', name: 'Leaderboard', icon: Trophy },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const currentUser = mockUsers[0]; // Alex Johnson as current user

  return (
    <div className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} h-screen flex flex-col relative z-50 ${isCollapsed ? 'md:relative' : 'md:relative fixed md:static inset-y-0 left-0'}`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-8 h-8 gem-badge flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FBE4DB]" />
              </div>
              <span className="text-sidebar-foreground bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] bg-clip-text text-transparent">
                Zestora
              </span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search quests..."
              className="w-full pl-10 pr-4 py-2 bg-sidebar-accent border-2 border-[#522B5B]/30 rounded-lg text-sidebar-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#854F6C] focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-10 transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#522B5B] to-[#854F6C] text-sidebar-primary-foreground hover:opacity-90 glow-effect' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  } ${isCollapsed ? 'px-2' : 'px-3'}`}
                  onClick={() => onViewChange(item.id)}
                >
                  <div className={`${isActive ? 'gem-badge w-6 h-6 flex items-center justify-center mr-3' : isCollapsed ? '' : 'mr-3'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#FBE4DB]' : ''}`} />
                  </div>
                  {!isCollapsed && item.name}
                </Button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Theme Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <motion.div 
            className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[#522B5B]/20 to-[#854F6C]/20 border-2 border-[#854F6C]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-sidebar-foreground">Level {currentUser.level}</span>
              <span className="text-[#854F6C]">XP: 750/1000</span>
            </div>
            <div className="xp-bar h-2">
              <div className="xp-bar-fill" style={{ width: '75%' }} />
            </div>
          </motion.div>
        )}
        
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-8 h-8 border-2 border-[#854F6C]">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-[#854F6C] text-[#FBE4DB]">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#2B124C] to-[#522B5B] rounded-full flex items-center justify-center border border-[#854F6C]">
                  <Trophy className="w-2 h-2 text-[#FBE4DB]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sidebar-foreground truncate text-sm">{currentUser.name}</p>
                <div className="flex items-center space-x-1">
                  <Badge className="text-xs bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] text-[#190019] border-none">
                    {currentUser.role}
                  </Badge>
                  <div className="relative">
                    <Bell className="w-3 h-3 text-[#854F6C]" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full pulse-glow" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {isCollapsed && (
            <Avatar className="w-8 h-8 border-2 border-[#854F6C] mx-auto">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-[#854F6C] text-[#FBE4DB]">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent hover:scale-110 transition-transform"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#DEB6B2]" />
            ) : (
              <Moon className="w-4 h-4 text-[#522B5B]" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
