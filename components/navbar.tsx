'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, Settings } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-xl font-bold text-white">AI Web Agency</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
              Pricing
            </a>
            <a href="/bolt-diy" className="text-gray-300 hover:text-white transition-colors text-sm">
              Bolt DIY
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">
              Contact
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button - Always visible on mobile */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
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
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md">
          <div className="pt-20 px-4">
            <div className="space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white hover:text-blue-400 text-xl font-medium transition-colors py-3 border-b border-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile additional links */}
              <div className="pt-6 space-y-4">
                <a 
                  href="#features" 
                  className="block text-gray-300 hover:text-white text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  className="block text-gray-300 hover:text-white text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </a>
                <a 
                  href="/bolt-diy" 
                  className="block text-gray-300 hover:text-white text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Bolt DIY
                </a>
                <a 
                  href="#contact" 
                  className="block text-gray-300 hover:text-white text-lg transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
              
              {/* Mobile admin access and theme toggle */}
              <div className="pt-6 flex flex-col space-y-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-300 hover:text-white"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Access
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 