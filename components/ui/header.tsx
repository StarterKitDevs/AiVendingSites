'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { Zap, Sparkles, Settings, Play, Home, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  showSettings?: boolean;
  showPreview?: boolean;
  onSettingsClick?: () => void;
  onPreviewClick?: () => void;
  className?: string;
}

export function Header({ 
  title = "AI Web Agency", 
  showSettings = false, 
  showPreview = false,
  onSettingsClick,
  onPreviewClick,
  className = ""
}: HeaderProps) {
  return (
    <div className={`bg-background border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <Link href="/">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-foreground">{title}</span>
            </div>
            <Badge variant="outline" className="text-blue-600">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            {/* Subscriptions Link */}
            <Link href="/subscriptions">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <CreditCard className="mr-2 h-4 w-4" />
                Subscriptions
              </Button>
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle variant="ghost" size="icon" />
            {showSettings && (
              <Button variant="outline" size="sm" onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            )}
            {showPreview && (
              <Button size="sm" onClick={onPreviewClick}>
                <Play className="mr-2 h-4 w-4" />
                Preview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 