'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, Settings, Zap, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Updated to match Starter Kit design */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-foreground">AI Web Agency</span>
            </div>
            <Badge variant="outline" className="text-blue-600">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Pricing
            </a>
            <a href="/bolt-diy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Starter Kit
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Contact
            </a>
            {/* Theme Toggle - Desktop */}
            <ThemeToggle 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle - Mobile */}
            <ThemeToggle 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full screen overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
          <div className="pt-20 px-4">
            <div className="space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-foreground hover:text-primary text-xl font-medium transition-colors py-3 border-b border-border"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile additional links */}
              <div className="pt-6 space-y-4">
                <a 
                  href="#features" 
                  className="block text-muted-foreground hover:text-foreground text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="block text-muted-foreground hover:text-foreground text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="/bolt-diy" 
                  className="block text-muted-foreground hover:text-foreground text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Starter Kit
                </a>
                <a 
                  href="#contact" 
                  className="block text-muted-foreground hover:text-foreground text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
              
              {/* Mobile admin access */}
              <div className="pt-6 flex flex-col space-y-4 border-t border-border">
                <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Access
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 