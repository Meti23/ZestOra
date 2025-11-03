import { useState } from 'react';
import { Save, Mail, Shield, Palette, Bell, CreditCard, Users as UsersIcon, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../../hooks/useTheme';
import { mockUsers } from '../../data/mockData';

export function SettingsView() {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex@taskflow.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [slackIntegration, setSlackIntegration] = useState(true);
  const [googleCalendar, setGoogleCalendar] = useState(false);

  const currentUser = mockUsers[0];
  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl">Settings</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage your account preferences and workspace settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-1">
          <TabsTrigger value="account" className="text-xs sm:text-sm">Account</TabsTrigger>
          <TabsTrigger value="workspace" className="text-xs sm:text-sm">Workspace</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="team" className="text-xs sm:text-sm">Team</TabsTrigger>}
          <TabsTrigger value="billing" className="text-xs sm:text-sm">Billing</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="text-base sm:text-lg">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full sm:w-auto">Change Photo</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Light</span>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                  <span className="text-sm">Dark</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#007BFF] hover:bg-[#0056b3]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Change Password</Button>
              <div className="flex items-center justify-between">
                <div>
                  <p>Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Badge variant="secondary">Not Enabled</Badge>
              </div>
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Enable 2FA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workspace Settings */}
        <TabsContent value="workspace" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Preferences</CardTitle>
              <CardDescription>Customize how your workspace behaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Workspace Name</Label>
                <Input defaultValue="TaskFlow Team" />
              </div>

              <div className="space-y-4">
                <Label>Board Columns</Label>
                <div className="space-y-2">
                  {['Backlog', 'To Do', 'In Progress', 'Review', 'Done'].map((column) => (
                    <div key={column} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <span>{column}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Column
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect external tools and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">S</span>
                  </div>
                  <div>
                    <p>Slack</p>
                    <p className="text-sm text-muted-foreground">Get notifications in Slack</p>
                  </div>
                </div>
                <Switch
                  checked={slackIntegration}
                  onCheckedChange={setSlackIntegration}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">G</span>
                  </div>
                  <div>
                    <p>Google Calendar</p>
                    <p className="text-sm text-muted-foreground">Sync due dates with calendar</p>
                  </div>
                </div>
                <Switch
                  checked={googleCalendar}
                  onCheckedChange={setGoogleCalendar}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="space-y-4">
                <Label>Email Notification Types</Label>
                <div className="space-y-2">
                  {[
                    { id: 'assignments', label: 'Task Assignments', enabled: true },
                    { id: 'due-dates', label: 'Due Date Reminders', enabled: true },
                    { id: 'comments', label: 'Comments & Mentions', enabled: false },
                    { id: 'updates', label: 'Project Updates', enabled: true }
                  ].map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <span className="text-sm">{type.label}</span>
                      <Switch defaultChecked={type.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Management (Admin Only) */}
        {isAdmin && (
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage team members and their permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Team members can view and edit tasks</p>
                    <p className="text-sm text-muted-foreground">3 of 10 seats used</p>
                  </div>
                  <Button className="bg-[#007BFF] hover:bg-[#0056b3]">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>

                <div className="space-y-3">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue={user.role}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">Pro Plan</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    $29/month • Next billing: January 15, 2025
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <p>•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Billing Address</Label>
                  <div className="p-3 border border-border rounded-lg">
                    <p>123 Business St</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Update Payment</Button>
                <Button variant="outline">Download Invoice</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}