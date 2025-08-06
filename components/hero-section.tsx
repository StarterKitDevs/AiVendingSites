"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users, CheckCircle, Settings, Zap, Star, Shield } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  onGetQuote: () => void;
}

export function HeroSection({ onGetQuote }: HeroSectionProps) {
  const handleGetWebsiteNow = () => {
    // Scroll to the quote form section
    const quoteFormSection = document.getElementById('quote-form-section');
    if (quoteFormSection) {
      quoteFormSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Also trigger the quote form display
    onGetQuote();
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Badge className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
              ⚡ AI-Powered Web Development
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Creates{" "}
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Apple-Level Websites
            </span>
            <span className="block text-4xl md:text-5xl text-white mt-2">
              in 13 Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional design that rivals $10k+ agencies • Analytics work immediately • Zero setup required
          </p>
          
          {/* $100 Portfolio/Landing Special Offer */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-green-400/30 shadow-xl">
            <div className="text-center">
              <Badge className="mb-3 bg-green-500 text-white border-0">
                🎯 Special Offer
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-2">
                Portfolio/Landing Page - Just $100
              </h3>
              <p className="text-gray-300 mb-4">
                Perfect for freelancers, creators, and small businesses • Professional design • Mobile-ready • SEO optimized
              </p>
              <Button 
                variant="gradient"
                size="lg" 
                onClick={handleGetWebsiteNow}
                className="group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 bg-gradient-to-r from-green-500 to-blue-500"
              >
                Get Portfolio/Landing - $100
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              variant="gradient"
              size="xl" 
              onClick={handleGetWebsiteNow}
              className="group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
            >
              Get Your Website Now
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link href="/bolt-diy">
              <Button 
                variant="outlineGradient" 
                size="xl"
                className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
              >
                Try Starter Kit
              </Button>
            </Link>
          </div>

          {/* Admin Access Button - Small and unobtrusive */}
          <div className="flex justify-center mb-12">
            <Link href="/admin/login">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Access
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats Grid with 2025 Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">13 Min</div>
                <div className="text-sm text-gray-300">Creation Time</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Apple-Level</div>
                <div className="text-sm text-gray-300">Design Quality</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Sub-2s</div>
                <div className="text-sm text-gray-300">Loading Speed</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">Zero Setup</div>
                <div className="text-sm text-gray-300">Analytics Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 