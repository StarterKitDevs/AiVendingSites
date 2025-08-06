'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  Activity,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  MessageSquare,
  Terminal,
  Palette,
  Code,
  Rocket,
  Bell,
  Search,
  Shield,
  TrendingUp
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  currentTask: string;
  performance: number;
  uptime: string;
  lastActivity: string;
  queueLength: number;
  errorCount: number;
  icon: React.ReactNode;
}

export default function AdminAgents() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Agent Orchestrator',
      description: 'Supervisor class that orchestrates all agents using LangChain/LangGraph integration',
      status: 'online',
      currentTask: 'Managing project workflow coordination',
      performance: 98,
      uptime: '99.9%',
      lastActivity: '1 minute ago',
      queueLength: 0,
      errorCount: 0,
      icon: <Zap />
    },
    {
      id: '2',
      name: 'Design Agent',
      description: 'Converts project requirements to design mockups and visual assets',
      status: 'online',
      currentTask: 'Creating UI/UX designs for new projects',
      performance: 95,
      uptime: '98.5%',
      lastActivity: '3 minutes ago',
      queueLength: 1,
      errorCount: 0,
      icon: <Palette />
    },
    {
      id: '3',
      name: 'Development Agent',
      description: 'Generates functional code and sets up deployment configuration',
      status: 'busy',
      currentTask: 'Building website functionality and code structure',
      performance: 92,
      uptime: '99.2%',
      lastActivity: '2 minutes ago',
      queueLength: 2,
      errorCount: 1,
      icon: <Code />
    },
    {
      id: '4',
      name: 'Deploy Agent',
      description: 'Publishes to Vercel and updates status + URL in database',
      status: 'online',
      currentTask: 'Handling deployment and hosting setup',
      performance: 100,
      uptime: '99.9%',
      lastActivity: '5 minutes ago',
      queueLength: 0,
      errorCount: 0,
      icon: <Rocket />
    },
    {
      id: '5',
      name: 'QA Agent',
      description: 'Quality assurance testing and validation of website functionality',
      status: 'online',
      currentTask: 'Testing and validating completed projects',
      performance: 97,
      uptime: '99.5%',
      lastActivity: '30 seconds ago',
      queueLength: 1,
      errorCount: 0,
      icon: <Shield />
    },
    {
      id: '6',
      name: 'Analytics Agent',
      description: '100% Autonomous Analytics System - Zero client setup required',
      status: 'online',
      currentTask: 'Setting up autonomous tracking and analytics',
      performance: 99,
      uptime: '99.8%',
      lastActivity: '1 minute ago',
      queueLength: 0,
      errorCount: 0,
      icon: <TrendingUp />
    },
    {
      id: '7',
      name: 'Notify Agent',
      description: 'Sends client updates and triggers dashboard push notifications',
      status: 'online',
      currentTask: 'Managing client communications and notifications',
      performance: 96,
      uptime: '99.3%',
      lastActivity: '2 minutes ago',
      queueLength: 1,
      errorCount: 0,
      icon: <Bell />
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle />;
      case 'busy':
        return <Activity />;
      case 'offline':
        return <Pause />;
      case 'error':
        return <AlertCircle />;
      default:
        return <Clock />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'offline':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleAgentAction = (agentId: string, action: 'start' | 'stop' | 'restart') => {
    setAgents(prevAgents => 
      prevAgents.map(agent => {
        if (agent.id === agentId) {
          let newStatus = agent.status;
          switch (action) {
            case 'start':
              newStatus = 'online';
              break;
            case 'stop':
              newStatus = 'offline';
              break;
            case 'restart':
              newStatus = 'online';
              break;
          }
          return { ...agent, status: newStatus as 'online' | 'offline' | 'busy' | 'error' };
        }
        return agent;
      })
    );
  };

  const handleConfigureAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowConfigModal(true);
  };

  const handleViewLogs = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowLogsModal(true);
  };

  const sendChatMessage = () => {
    // Implementation for sending chat message
    console.log('Sending chat message...');
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Agents Management</h1>
            <p className="text-muted-foreground">Monitor and control your AI agent workforce.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Pause className="mr-2 h-4 w-4" />
              Pause All
            </Button>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Start All
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects, agents, or settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
            <option value="error">Error</option>
          </select>
        </div>

        {/* Agents Grid - Improved symmetrical layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-all duration-300 border border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <div className="h-6 w-6 text-blue-600 dark:text-blue-400">
                        {agent.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        {getStatusIcon(agent.status)}
                        <Badge className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
                
                {/* Performance Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Performance:</span>
                    <span className="text-foreground font-medium">{agent.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        agent.performance >= 90 ? 'bg-green-500' : 
                        agent.performance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${agent.performance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Agent Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="text-foreground font-medium">{agent.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queue:</span>
                    <span className="text-foreground font-medium">{agent.queueLength} tasks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="text-foreground font-medium">{agent.lastActivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Errors:</span>
                    <span className="text-foreground font-medium">{agent.errorCount}</span>
                  </div>
                </div>

                {/* Current Task */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Current Task:</span>
                    <p className="text-foreground font-medium mt-1">{agent.currentTask}</p>
                  </div>
                </div>

                {/* Action Buttons - Improved layout */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  {/* Primary Actions */}
                  <div className="flex gap-2 flex-1">
                    {agent.status === 'offline' && (
                      <Button size="sm" className="flex-1" onClick={() => handleAgentAction(agent.id, 'start')}>
                        <Play className="mr-1 h-3 w-3" />
                        Start
                      </Button>
                    )}
                    {agent.status === 'online' && (
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleAgentAction(agent.id, 'stop')}>
                        <Pause className="mr-1 h-3 w-3" />
                        Stop
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleAgentAction(agent.id, 'restart')}>
                      <Terminal className="mr-1 h-3 w-3" />
                      Restart
                    </Button>
                  </div>
                  
                  {/* Secondary Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleConfigureAgent(agent)}>
                      <Settings className="mr-1 h-3 w-3" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewLogs(agent)}>
                      <BarChart3 className="mr-1 h-3 w-3" />
                      Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Online</p>
                  <p className="text-2xl font-bold text-foreground">
                    {agents.filter(a => a.status === 'online').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Busy</p>
                  <p className="text-2xl font-bold text-foreground">
                    {agents.filter(a => a.status === 'busy').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Errors</p>
                  <p className="text-2xl font-bold text-foreground">
                    {agents.reduce((sum, a) => sum + a.errorCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold text-foreground">
                    {agents.reduce((sum, a) => sum + a.queueLength, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Configure Modal */}
      {showConfigModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Configure {selectedAgent.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfigModal(false)}
              >
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Agent Name</label>
                <Input value={selectedAgent.name} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  rows={3}
                  value={selectedAgent.description}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  value={selectedAgent.status}
                  onChange={(e) => {
                    setAgents(prev => prev.map(agent => 
                      agent.id === selectedAgent.id 
                        ? { ...agent, status: e.target.value as 'online' | 'offline' | 'busy' | 'error' }
                        : agent
                    ));
                  }}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="busy">Busy</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowConfigModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowConfigModal(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {showLogsModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedAgent.name} Logs</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogsModal(false)}
              >
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="text-foreground">{selectedAgent.lastActivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Task:</span>
                    <span className="text-foreground">{selectedAgent.currentTask}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Performance:</span>
                    <span className="text-foreground">{selectedAgent.performance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queue Length:</span>
                    <span className="text-foreground">{selectedAgent.queueLength} tasks</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2">System Logs</h4>
                <div className="space-y-1 text-sm font-mono">
                  <div className="text-green-600">[INFO] Agent {selectedAgent.name} is running normally</div>
                  <div className="text-blue-600">[DEBUG] Processing task: {selectedAgent.currentTask}</div>
                  <div className="text-yellow-600">[WARN] Queue length: {selectedAgent.queueLength}</div>
                  {selectedAgent.errorCount > 0 && (
                    <div className="text-red-600">[ERROR] {selectedAgent.errorCount} errors detected</div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowLogsModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 