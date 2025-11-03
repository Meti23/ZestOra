import { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Paperclip, 
  MessageCircle, 
  Save,
  Trash2,
  Clock,
  Tag
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockTasks, mockUsers } from '../data/mockData';
import { Task } from '../types';

interface TaskDetailModalProps {
  taskId: string | null;
  open: boolean;
  onClose: () => void;
  onSave?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskDetailModal({ taskId, open, onClose, onSave, onDelete }: TaskDetailModalProps) {
  const task = taskId ? mockTasks.find(t => t.id === taskId) : null;
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [assigneeId, setAssigneeId] = useState(task?.assignee.id || mockUsers[0].id);
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  if (!task) return null;

  const handleSave = () => {
    const assignee = mockUsers.find(u => u.id === assigneeId) || mockUsers[0];
    const updatedTask: Task = {
      ...task,
      title,
      description,
      status: status as Task['status'],
      priority: priority as Task['priority'],
      assignee,
      dueDate,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSave?.(updatedTask);
    onClose();
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Task Details</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => { onDelete?.(task.id); onClose(); }}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title..."
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="min-h-[100px]"
              />
            </div>

            {/* Tabs for additional content */}
            <Tabs defaultValue="comments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="comments">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comments ({task.comments.length})
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attachments ({task.attachments})
                </TabsTrigger>
                <TabsTrigger value="history">
                  <Clock className="w-4 h-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments" className="space-y-4">
                <div className="space-y-4">
                  {task.comments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No comments yet</p>
                      <p className="text-sm">Start the conversation</p>
                    </div>
                  ) : (
                    task.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback className="text-xs">
                            {comment.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                  
                  <div className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockUsers[0].avatar} alt={mockUsers[0].name} />
                      <AvatarFallback className="text-xs">
                        {mockUsers[0].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        className="min-h-[80px]"
                      />
                      <Button size="sm" className="bg-[#007BFF] hover:bg-[#0056b3]">
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Paperclip className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No attachments yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Add Attachment
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p><span className="font-medium">Alex Johnson</span> created this task</p>
                      <p className="text-xs text-muted-foreground">{task.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div className="flex-1">
                      <p><span className="font-medium">Sarah Wilson</span> was assigned to this task</p>
                      <p className="text-xs text-muted-foreground">{task.updatedAt}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs">
                    OVERDUE
                  </Badge>
                )}
              </div>
            </div>

            {/* Assignee */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignee</label>
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Labels */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Labels</label>
              <div className="flex flex-wrap gap-1">
                {task.labels.map((label, index) => (
                  <Badge key={label} variant="secondary" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {label}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6 text-xs">
                  + Add Label
                </Button>
              </div>
            </div>

            {/* Task Info */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="text-sm">
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2">{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Updated:</span>
                <span className="ml-2">{new Date(task.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">ID:</span>
                <span className="ml-2 font-mono text-xs">{task.id}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}