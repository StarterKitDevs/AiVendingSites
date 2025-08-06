"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Star, 
  Shield, 
  CheckCircle, 
  Mic, 
  Smartphone, 
  BarChart3, 
  Palette,
  Brain,
  Globe,
  Lock,
  Eye
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'essential' | 'premium' | 'enterprise';
  included: 'all' | 'professional+' | 'enterprise';
}

const features: Feature[] = [
  // Essential Features (All Tiers)
  {
    id: 'performance',
    title: 'Sub-2-Second Loading',
    description: 'Core Web Vitals optimized for lightning-fast performance',
    icon: <Zap className="h-6 w-6" />,
    category: 'essential',
    included: 'all'
  },
  {
    id: 'mobile-first',
    title: 'Mobile-First Design',
    description: 'Advanced mobile-specific optimizations and responsive design',
    icon: <Smartphone className="h-6 w-6" />,
    category: 'essential',
    included: 'all'
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'SSL, malware protection, and secure hosting included',
    icon: <Shield className="h-6 w-6" />,
    category: 'essential',
    included: 'all'
  },
  {
    id: 'seo',
    title: 'Technical SEO',
    description: 'Meta optimization, sitemap generation, and search engine ready',
    icon: <Eye className="h-6 w-6" />,
    category: 'essential',
    included: 'all'
  },
  {
    id: 'analytics',
    title: 'Real-Time Analytics',
    description: 'User behavior tracking and performance monitoring',
    icon: <BarChart3 className="h-6 w-6" />,
    category: 'essential',
    included: 'all'
  },
  {
    id: 'accessibility',
    title: 'WCAG AA Compliance',
    description: 'Full accessibility compliance guaranteed',
    icon: <CheckCircle className="h-6 w-6" />,
    category: 'essential',
    included: 'all'
  },

  // Premium Features (Professional+ Tiers)
  {
    id: 'ai-personalization',
    title: 'AI Personalization',
    description: 'Dynamic content adaptation based on visitor behavior',
    icon: <Brain className="h-6 w-6" />,
    category: 'premium',
    included: 'professional+'
  },
  {
    id: 'voice-interface',
    title: 'Voice Interface',
    description: 'Voice-activated search and navigation capabilities',
    icon: <Mic className="h-6 w-6" />,
    category: 'premium',
    included: 'professional+'
  },
  {
    id: 'pwa-capabilities',
    title: 'PWA Capabilities',
    description: 'App-like experience with offline functionality',
    icon: <Globe className="h-6 w-6" />,
    category: 'premium',
    included: 'professional+'
  },
  {
    id: 'advanced-analytics',
    title: 'Advanced Analytics',
    description: 'Predictive insights and heat mapping',
    icon: <BarChart3 className="h-6 w-6" />,
    category: 'premium',
    included: 'professional+'
  },
  {
    id: 'beautiful-shadows',
    title: 'Beautiful Shadows',
    description: 'Multi-layer depth effects (not basic CSS shadows)',
    icon: <Palette className="h-6 w-6" />,
    category: 'premium',
    included: 'professional+'
  },
  {
    id: 'professional-typography',
    title: 'Professional Typography',
    description: 'Inter, Geist font pairings with proper hierarchy',
    icon: <Star className="h-6 w-6" />,
    category: 'premium',
    included: 'professional+'
  },

  // Enterprise Features (Top Tier)
  {
    id: 'custom-ai-training',
    title: 'Custom AI Training',
    description: 'Business-specific AI models and training',
    icon: <Brain className="h-6 w-6" />,
    category: 'enterprise',
    included: 'enterprise'
  },
  {
    id: 'advanced-integrations',
    title: 'Advanced Integrations',
    description: 'CRM, marketing automation, and API access',
    icon: <Globe className="h-6 w-6" />,
    category: 'enterprise',
    included: 'enterprise'
  },
  {
    id: 'chatbot-integration',
    title: 'Chatbot Integration',
    description: 'AI-powered customer support and assistance',
    icon: <Mic className="h-6 w-6" />,
    category: 'enterprise',
    included: 'enterprise'
  },
  {
    id: 'monthly-optimization',
    title: 'Monthly Optimization',
    description: 'Ongoing AI-powered improvements and updates',
    icon: <Zap className="h-6 w-6" />,
    category: 'enterprise',
    included: 'enterprise'
  },
  {
    id: 'white-label',
    title: 'White-label Options',
    description: 'Remove branding for agencies and resellers',
    icon: <Lock className="h-6 w-6" />,
    category: 'enterprise',
    included: 'enterprise'
  }
];

interface FeaturesShowcaseProps {
  serviceType: 'ai-agent' | 'diy';
  selectedTier?: 'basic' | 'professional' | 'enterprise';
}

export function FeaturesShowcase({ serviceType, selectedTier = 'basic' }: FeaturesShowcaseProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'premium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'enterprise':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const isFeatureIncluded = (feature: Feature) => {
    if (feature.included === 'all') return true;
    if (feature.included === 'professional+' && (selectedTier === 'professional' || selectedTier === 'enterprise')) return true;
    if (feature.included === 'enterprise' && selectedTier === 'enterprise') return true;
    return false;
  };

  const essentialFeatures = features.filter(f => f.category === 'essential');
  const premiumFeatures = features.filter(f => f.category === 'premium');
  const enterpriseFeatures = features.filter(f => f.category === 'enterprise');

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            2025-Ready Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern capabilities that set your website apart from the competition
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Essential Features */}
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Essential Features</span>
                <Badge className={getCategoryColor('essential')}>All Tiers</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {essentialFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Premium Features */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Premium Features</span>
                <Badge className={getCategoryColor('premium')}>Professional+</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {premiumFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enterprise Features */}
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Enterprise Features</span>
                <Badge className={getCategoryColor('enterprise')}>Enterprise</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enterpriseFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Guarantee */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Performance Guarantee
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <strong>Sub-2-second loading or money back.</strong> We guarantee your website will load faster than 98% of the web.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 