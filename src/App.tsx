import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/views/DashboardView';
import { TasksView } from './components/views/TasksView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { TeamView } from './components/views/TeamView';
import { SettingsView } from './components/views/SettingsView';
import { LeaderboardView } from './components/views/LeaderboardView';
import { TaskDetailModal } from './components/TaskDetailModal';
import { Toaster } from './components/ui/sonner';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Button } from './components/ui/button';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const handleAddTask = (columnId: string) => {
    toast.success(`Add new quest to ${columnId}`, {
      description: 'Quest creation form would open here'
    });
  };

  const handleTaskSave = () => {
    toast.success('Quest updated successfully');
  };

  const handleTaskDelete = () => {
    toast.success('Quest deleted successfully');
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setIsMobileSidebarOpen(false); // Close mobile sidebar when changing views
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView 
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        );
      case 'tasks':
        return (
          <TasksView 
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        );
      case 'analytics':
        return <AnalyticsView />;
      case 'team':
        return <TeamView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <DashboardView 
            onTaskClick={handleTaskClick}
            onAddTask={handleAddTask}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar 
          activeView={activeView} 
          onViewChange={handleViewChange} 
        />
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-sidebar border-b-2 border-sidebar-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gem-badge flex items-center justify-center">
            <span className="text-[#FBE4DB] text-sm">⚡</span>
          </div>
          <span className="text-sidebar-foreground bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] bg-clip-text text-transparent font-medium">
            Zestora
          </span>
        </div>
        
        {/* Mobile Menu Sheet - for Settings and Team */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 w-10 p-0 text-sidebar-foreground hover:bg-sidebar-accent min-h-[44px] min-w-[44px]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-sidebar-border">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate between different sections of Zestora
            </SheetDescription>
            <Sidebar 
              activeView={activeView} 
              onViewChange={handleViewChange}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content - with padding for mobile header and bottom nav */}
      <main className="flex-1 overflow-y-auto pt-[60px] md:pt-0 pb-20 md:pb-0">
        {renderView()}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeView={activeView} onViewChange={handleViewChange} />

      {/* Task Detail Modal */}
      <TaskDetailModal
        taskId={selectedTaskId}
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleTaskSave}
        onDelete={handleTaskDelete}
      />

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        expand={false}
        richColors
        closeButton
      />
    </div>
  );
}
