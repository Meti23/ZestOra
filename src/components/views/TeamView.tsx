import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, MoreHorizontal, MessageCircle, Video, Mail, Users as UsersIcon, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockUsers, mockActivities } from '../../data/mockData';
import { GlowButton, BadgeDisplay } from '../GameEffects';

export function TeamView() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = mockUsers[0];

  const onlineMembers = mockUsers.filter(u => u.isOnline);
  const allMembers = mockUsers;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="flex items-center gap-3">
            <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#854F6C]" />
            <h1 className="text-[#190019] dark:text-[#FBE4DB] text-xl sm:text-2xl">Guild Collaboration</h1>
          </div>
          <p className="text-[#522B5B] dark:text-[#DEB6B2] text-sm sm:text-base mt-1">Connect and collaborate with your fellow warriors</p>
        </motion.div>
        <GlowButton className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Invite Warrior
        </GlowButton>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="bg-[#DEB6B2] dark:bg-[#2B124C]">
          <TabsTrigger value="members" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB]">
            Guild Members
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB]">
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#522B5B] data-[state=active]:to-[#854F6C] data-[state=active]:text-[#FBE4DB]">
            Guild Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search guild members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#DEB6B2] dark:bg-[#2B124C] border-[#854F6C]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Members List */}
            <div className="lg:col-span-2">
              <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
                <CardHeader>
                  <CardTitle className="text-[#190019] dark:text-[#FBE4DB]">Guild Warriors</CardTitle>
                  <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2]">
                    {onlineMembers.length} of {allMembers.length} warriors online
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allMembers.map((member, index) => {
                    const isOnline = member.isOnline;
                    const isCurrentUser = member.id === currentUser.id;
                    
                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-2 border-[#854F6C]/30 rounded-lg bg-[#DEB6B2]/20 dark:bg-[#190019]/30 hover:border-[#854F6C] transition-all gap-3"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div className="relative flex-shrink-0">
                            <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#854F6C]">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="bg-[#854F6C] text-[#FBE4DB]">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full pulse-glow"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1 flex-wrap">
                              <h3 className="text-[#190019] dark:text-[#FBE4DB] text-sm sm:text-base">{member.name}</h3>
                              {isCurrentUser && (
                                <Badge className="text-xs bg-[#854F6C] text-[#FBE4DB] border-none">You</Badge>
                              )}
                              <Badge 
                                className={`text-xs border-none ${
                                  member.role === 'admin' 
                                    ? 'bg-gradient-to-r from-[#2B124C] to-[#522B5B] text-[#FBE4DB]' 
                                    : 'bg-gradient-to-r from-[#854F6C] to-[#DEB6B2] text-[#190019]'
                                }`}
                              >
                                {member.role === 'admin' ? (
                                  <><Shield className="w-3 h-3 mr-1" />{member.role}</>
                                ) : (
                                  member.role
                                )}
                              </Badge>
                            </div>
                            <p className="text-[#522B5B] dark:text-[#DEB6B2] text-xs sm:text-sm truncate">{member.email}</p>
                            <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                              <p className="text-xs text-[#854F6C]">
                                {isOnline ? 'Active now' : 'Offline'}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-[#522B5B] dark:text-[#DEB6B2]">
                                <Zap className="w-3 h-3 text-[#854F6C]" />
                                Level {member.level}
                              </div>
                              <div className="flex gap-1">
                                {member.badges.slice(0, 2).map((badge) => (
                                  <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2 justify-end sm:justify-start">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" className="text-[#854F6C] hover:bg-[#522B5B]/20 h-8 w-8 p-0">
                              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
                            <Button variant="ghost" size="sm" className="text-[#854F6C] hover:bg-[#522B5B]/20 h-8 w-8 p-0">
                              <Video className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
                            <Button variant="ghost" size="sm" className="text-[#854F6C] hover:bg-[#522B5B]/20 h-8 w-8 p-0">
                              <Mail className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" className="text-[#854F6C] hover:bg-[#522B5B]/20 h-8 w-8 p-0">
                              <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
                <CardHeader>
                  <CardTitle className="text-[#190019] dark:text-[#FBE4DB]">Guild Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#522B5B] dark:text-[#DEB6B2]">Total Warriors</span>
                    <span className="text-[#190019] dark:text-[#FBE4DB]">{allMembers.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#522B5B] dark:text-[#DEB6B2]">Online Now</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
                      <span className="text-[#190019] dark:text-[#FBE4DB]">{onlineMembers.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#522B5B] dark:text-[#DEB6B2]">Guild Leaders</span>
                    <span className="text-[#190019] dark:text-[#FBE4DB]">
                      {allMembers.filter(m => m.role === 'admin').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#522B5B] dark:text-[#DEB6B2]">Active Today</span>
                    <span className="text-[#190019] dark:text-[#FBE4DB]">{allMembers.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
                <CardHeader>
                  <CardTitle className="text-[#190019] dark:text-[#FBE4DB]">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <GlowButton variant="secondary" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite New Warrior
                  </GlowButton>
                  <GlowButton variant="secondary" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Start Guild Meeting
                  </GlowButton>
                  <GlowButton variant="secondary" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Guild Announcement
                  </GlowButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C]">
            <CardHeader>
              <CardTitle className="text-[#190019] dark:text-[#FBE4DB]">Guild Activity Feed</CardTitle>
              <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2]">Recent achievements from your fellow warriors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-4"
                >
                  <Avatar className="w-10 h-10 border-2 border-[#854F6C]">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="bg-[#854F6C] text-[#FBE4DB]">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-[#190019] dark:text-[#FBE4DB]">
                      <span className="font-medium">{activity.user.name}</span>
                      {' '}{activity.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#522B5B] dark:text-[#DEB6B2]">{activity.timestamp}</p>
                      {activity.xpGained && (
                        <Badge className="text-xs bg-gradient-to-r from-[#522B5B] to-[#854F6C] text-[#FBE4DB] border-none">
                          <Zap className="w-3 h-3 mr-1" />
                          +{activity.xpGained} XP
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="text-center py-4">
                <GlowButton variant="secondary">Load More Activity</GlowButton>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card className="card-game-style bg-[#FBE4DB] dark:bg-[#2B124C] border-[#854F6C] h-[500px] sm:h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-[#190019] dark:text-[#FBE4DB] text-lg sm:text-xl">Guild Chat</CardTitle>
              <CardDescription className="text-[#522B5B] dark:text-[#DEB6B2] text-sm">Communicate with your guild in real-time</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              {/* Chat Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 border-2 border-[#854F6C]">
                    <AvatarImage src={mockUsers[1].avatar} alt={mockUsers[1].name} />
                    <AvatarFallback className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                      {mockUsers[1].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#190019] dark:text-[#FBE4DB]">{mockUsers[1].name}</span>
                      <span className="text-xs text-[#854F6C]">10:30 AM</span>
                    </div>
                    <div className="mt-1 p-3 bg-[#DEB6B2] dark:bg-[#190019]/50 rounded-lg text-sm text-[#190019] dark:text-[#FBE4DB]">
                      Hey guild! I've just completed the user onboarding quest. Could someone review the results?
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 border-2 border-[#854F6C]">
                    <AvatarImage src={mockUsers[2].avatar} alt={mockUsers[2].name} />
                    <AvatarFallback className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                      {mockUsers[2].name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#190019] dark:text-[#FBE4DB]">{mockUsers[2].name}</span>
                      <span className="text-xs text-[#854F6C]">10:32 AM</span>
                    </div>
                    <div className="mt-1 p-3 bg-[#DEB6B2] dark:bg-[#190019]/50 rounded-lg text-sm text-[#190019] dark:text-[#FBE4DB]">
                      Great work Sarah! I'll review it in the next hour. +50 XP for completing ahead of schedule! ⭐
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <span className="text-xs text-[#854F6C] bg-[#DEB6B2] dark:bg-[#190019]/50 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 border-2 border-[#854F6C]">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="text-xs bg-[#854F6C] text-[#FBE4DB]">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[#190019] dark:text-[#FBE4DB]">You</span>
                      <span className="text-xs text-[#854F6C]">2:15 PM</span>
                    </div>
                    <div className="mt-1 p-3 bg-gradient-to-r from-[#522B5B] to-[#854F6C] text-white rounded-lg text-sm">
                      Thanks everyone for the great collaboration today! Let's keep leveling up together! 🚀
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t-2 border-[#854F6C]/30 pt-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Type a message to your guild..." 
                    className="flex-1 bg-[#DEB6B2] dark:bg-[#190019]/50 border-[#854F6C]"
                  />
                  <GlowButton>
                    Send
                  </GlowButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
