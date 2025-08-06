'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Key, 
  Users, 
  Shield, 
  Database, 
  Bell,
  Globe,
  Save,
  Eye,
  EyeOff,
  Copy,
  RefreshCw
} from 'lucide-react';

interface ApiKey {
  name: string;
  key: string;
  status: 'active' | 'inactive';
  lastUsed: string;
  permissions: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'operator';
  status: 'active' | 'inactive';
  lastLogin: string;
}

export default function AdminSettings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      name: 'Perplexity AI API',
      key: 'pplx-1234567890abcdef1234567890abcdef',
      status: 'active',
      lastUsed: '2 hours ago',
      permissions: ['read', 'write', 'chat', 'search']
    },
    {
      name: 'Supabase Database API',
      key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXJ0ZXJraXQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMzY5MjQwMCwiZXhwIjoyMDU5MjY4NDAwfQ.fake_supabase_key_1234567890',
      status: 'active',
      lastUsed: '1 hour ago',
      permissions: ['read', 'write', 'admin', 'auth']
    },
    {
      name: 'Stripe Payment API',
      key: 'sk_test_51NxYzAbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdef',
      status: 'active',
      lastUsed: '30 minutes ago',
      permissions: ['read', 'write', 'payments']
    },
    {
      name: 'OpenAI GPT-4 API',
      key: 'sk-proj-1234567890abcdef1234567890abcdef1234567890abcdef',
      status: 'active',
      lastUsed: '45 minutes ago',
      permissions: ['read', 'write', 'chat', 'completions']
    },
    {
      name: 'Vercel Deployment API',
      key: 'vercel_1234567890abcdef1234567890abcdef1234567890abcdef',
      status: 'active',
      lastUsed: '15 minutes ago',
      permissions: ['read', 'write', 'deploy']
    },
    {
      name: 'Google Analytics API',
      key: 'AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz',
      status: 'active',
      lastUsed: '1 day ago',
      permissions: ['read', 'analytics']
    },
    {
      name: 'SendGrid Email API',
      key: 'SG.1234567890abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz1234567890',
      status: 'active',
      lastUsed: '2 hours ago',
      permissions: ['read', 'write', 'email']
    },
    {
      name: 'AWS S3 Storage API',
      key: 'AKIA1234567890ABCDEF',
      status: 'active',
      lastUsed: '3 hours ago',
      permissions: ['read', 'write', 'storage']
    },
    {
      name: 'Cloudflare CDN API',
      key: '1234567890abcdef1234567890abcdef1234567890',
      status: 'inactive',
      lastUsed: '1 week ago',
      permissions: ['read', 'write', 'cdn']
    },
    {
      name: 'GitHub Integration API',
      key: 'ghp_1234567890abcdef1234567890abcdef1234567890',
      status: 'active',
      lastUsed: '6 hours ago',
      permissions: ['read', 'write', 'repo']
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@starterkit.com',
      role: 'super-admin',
      status: 'active',
      lastLogin: '2 minutes ago'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john@webai.studio',
      role: 'admin',
      status: 'active',
      lastLogin: '1 hour ago'
    },
    {
      id: '3',
      name: 'Jane Smith',
      email: 'jane@webai.studio',
      role: 'operator',
      status: 'inactive',
      lastLogin: '2 days ago'
    }
  ]);

  const [showApiKeys, setShowApiKeys] = useState(false);
  const [systemSettings, setSystemSettings] = useState({
    autoDeploy: true,
    emailNotifications: true,
    backupEnabled: true,
    maintenanceMode: false,
    debugMode: false
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateApiKey = (index: number) => {
    const newKey = `key_${Math.random().toString(36).substr(2, 9)}`;
    setApiKeys(prev => prev.map((key, i) => 
      i === index ? { ...key, key: newKey } : key
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your AI-powered website agency platform
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Key className="mr-2 h-5 w-5" />
              API Keys Management
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKeys(!showApiKeys)}
              >
                {showApiKeys ? <EyeOff className="mr-1 h-3 w-3" /> : <Eye className="mr-1 h-3 w-3" />}
                {showApiKeys ? 'Hide' : 'Show'} Keys
              </Button>
              <Button variant="outline" size="sm">
                <Key className="mr-1 h-3 w-3" />
                Add New API Key
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground">{apiKey.name}</h4>
                      <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                        {apiKey.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {apiKey.permissions.length} permissions
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                        {showApiKeys ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKeys(!showApiKeys)}
                      >
                        {showApiKeys ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last used: {apiKey.lastUsed}</span>
                      <div className="flex space-x-1">
                        {apiKey.permissions.map((permission, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateApiKey(index)}
                    >
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setApiKeys(prev => prev.map((key, i) => 
                          i === index ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' } : key
                        ));
                      }}
                    >
                      {apiKey.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* API Usage Statistics */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium mb-4">API Usage Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Total API Calls (24h)</div>
                <div className="text-2xl font-bold">12,847</div>
                <div className="text-xs text-green-600">+15% from yesterday</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Active API Keys</div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-blue-600">2 inactive</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Error Rate</div>
                <div className="text-2xl font-bold">0.2%</div>
                <div className="text-xs text-green-600">-0.1% from yesterday</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Rate Limiting</h4>
              <div className="space-y-3">
                <div>
                  <Label>Perplexity AI Rate Limit</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input type="number" defaultValue="100" className="w-20" />
                    <span className="text-sm text-muted-foreground">requests per minute</span>
                  </div>
                </div>
                <div>
                  <Label>OpenAI Rate Limit</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input type="number" defaultValue="50" className="w-20" />
                    <span className="text-sm text-muted-foreground">requests per minute</span>
                  </div>
                </div>
                <div>
                  <Label>Stripe Rate Limit</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input type="number" defaultValue="200" className="w-20" />
                    <span className="text-sm text-muted-foreground">requests per minute</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">API Endpoints</h4>
              <div className="space-y-3">
                <div>
                  <Label>Base URL</Label>
                  <Input defaultValue="https://api.starterkit.com/v1" />
                </div>
                <div>
                  <Label>Webhook URL</Label>
                  <Input defaultValue="https://webhooks.starterkit.com/api" />
                </div>
                <div>
                  <Label>Health Check Endpoint</Label>
                  <Input defaultValue="https://api.starterkit.com/health" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium mb-4">API Monitoring</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Perplexity AI</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Response time: 245ms</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Supabase</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Response time: 89ms</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Stripe</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Response time: 156ms</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">OpenAI</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Response time: 1.2s</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Deploy</Label>
                  <p className="text-sm text-gray-500">Automatically deploy completed projects</p>
                </div>
                <Switch
                  checked={systemSettings.autoDeploy}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoDeploy: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications for important events</p>
                </div>
                <Switch
                  checked={systemSettings.emailNotifications}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Backup Enabled</Label>
                  <p className="text-sm text-gray-500">Automatically backup project data</p>
                </div>
                <Switch
                  checked={systemSettings.backupEnabled}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, backupEnabled: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put system in maintenance mode</p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-gray-500">Enable debug logging</p>
                </div>
                <Switch
                  checked={systemSettings.debugMode}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, debugMode: checked }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{user.name}</h4>
                      <Badge 
                        variant={user.role === 'super-admin' ? 'destructive' : user.role === 'admin' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">Last login: {user.lastLogin}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Backup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Session Timeout (minutes)</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch />
                  <span className="text-sm text-gray-500">Require 2FA for all users</span>
                </div>
              </div>
              
              <div>
                <Label>Password Policy</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">Minimum 8 characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">Require uppercase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">Require numbers</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Backup & Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Backup Schedule</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Retention Period</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Create Manual Backup
                </Button>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restore from Backup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <span className="text-sm">Project completion</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <span className="text-sm">Payment received</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <span className="text-sm">System errors</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <span className="text-sm">Agent status changes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch />
                <span className="text-sm">Marketing updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <span className="text-sm">Security alerts</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation & Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            API Documentation & Testing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">API Documentation</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">REST API Docs</div>
                    <div className="text-sm text-muted-foreground">Complete API reference</div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Docs
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">Webhook Documentation</div>
                    <div className="text-sm text-muted-foreground">Event notifications guide</div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Docs
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">SDK Downloads</div>
                    <div className="text-sm text-muted-foreground">Client libraries</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">API Testing</h4>
              <div className="space-y-3">
                <div>
                  <Label>Test Environment</Label>
                  <Select defaultValue="sandbox">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandbox">Sandbox</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Test API Key</Label>
                  <Input defaultValue="test_key_1234567890abcdef" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Test Connection
                  </Button>
                  <Button variant="outline" className="w-full">
                    Run Health Check
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium mb-4">Recent API Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">POST /api/projects - 200 OK</span>
                </div>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">GET /api/analytics - 200 OK</span>
                </div>
                <span className="text-xs text-muted-foreground">5 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">POST /api/webhooks - 429 Rate Limited</span>
                </div>
                <span className="text-xs text-muted-foreground">8 minutes ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 