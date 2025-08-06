'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Bell, 
  Menu, 
  User, 
  Settings,
  ChevronDown,
  Zap,
  Sparkles,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function AdminHeader({ isSidebarOpen, setIsSidebarOpen }: AdminHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Updated to match Starter Kit design */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="h-8 w-8 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            {/* Home Button */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            
            {/* Logo - Updated to match Starter Kit design */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-foreground">Starter Kit</span>
              </div>
              <Badge variant="outline" className="text-blue-600">
                <Sparkles className="mr-1 h-3 w-3" />
                AI-Powered
              </Badge>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, agents, or settings..."
                className="pl-10 w-80 bg-background border-border"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle variant="ghost" size="icon" />

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 relative"
            >
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 h-8 px-3"
              >
                <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border py-1 z-50">
                  <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                    <div className="font-medium text-foreground">Admin User</div>
                    <div className="text-muted-foreground">admin@starterkit.com</div>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 