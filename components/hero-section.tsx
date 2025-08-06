"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users, CheckCircle, Settings } from 'lucide-react';
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
            AI-Powered Websites Built in
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Minutes, Not Weeks
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional websites with payment → automated creation → live deployment. 
            Get your business online with enterprise-grade features in under an hour.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={handleGetWebsiteNow}
              className="px-10 py-6 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
            >
              Get Your Website Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Link href="/bolt-diy">
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-6 text-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Try Bolt DIY
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

          {/* Stats Grid - Exact Match */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-gray-300">Sites Delivered</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">13 Min</div>
                <div className="text-sm text-gray-300">Average Delivery</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-300">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 