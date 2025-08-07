"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Zap, 
  Star, 
  Shield, 
  Brain,
  Calendar,
  BarChart3
} from 'lucide-react';

interface Subscription {
  id: string;
  tier: string;
  status: 'active' | 'trial' | 'cancelled' | 'expired';
  trialEndsAt?: string;
  createdAt: string;
  features: string[];
  usage?: {
    revisionsUsed: number;
    revisionsLimit: number;
    daysRemaining: number;
  };
}

interface SubscriptionDashboardProps {
  projectId?: string;
  email?: string;
}

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub_123',
    tier: 'essential-care',
    status: 'trial',
    trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    features: [
      '5 AI-driven revision conversations/month',
      'Automated revision history backups',
      'Performance alerts'
    ],
    usage: {
      revisionsUsed: 2,
      revisionsLimit: 5,
      daysRemaining: 3
    }
  }
];

export function SubscriptionDashboard({ projectId, email }: SubscriptionDashboardProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [isLoading, setIsLoading] = useState(false);

  const getTierInfo = (tier: string) => {
    const tierInfo = {
      'essential-care': { name: 'Essential Care', icon: Shield, color: 'blue' },
      'optimization-pro': { name: 'Optimization Pro', icon: Zap, color: 'green' },
      'growth-partner': { name: 'Growth Partner', icon: Star, color: 'purple' },
      'co-pilot-addon': { name: 'Co-Pilot Add-On', icon: Brain, color: 'orange' }
    };
    return tierInfo[tier as keyof typeof tierInfo] || { name: tier, icon: CheckCircle, color: 'gray' };
  };

  const getStatusBadge = (subscription: Subscription) => {
    if (subscription.status === 'trial') {
      const daysRemaining = subscription.usage?.daysRemaining || 0;
      return (
        <Badge className="bg-yellow-500 text-white border-0">
          <Clock className="h-3 w-3 mr-1" />
          Trial - {daysRemaining} days left
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-green-500 text-white border-0">
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </Badge>
    );
  };

  const handleUpgrade = async (subscriptionId: string, newTier: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would call the upgrade API
      console.log('Upgrading subscription:', subscriptionId, 'to tier:', newTier);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setSubscriptions(prev => prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, tier: newTier, status: 'active' as const }
          : sub
      ));
    } catch (error) {
      console.error('Error upgrading subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (subscriptionId: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would call the cancel API
      console.log('Cancelling subscription:', subscriptionId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setSubscriptions(prev => prev.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: 'cancelled' as const }
          : sub
      ));
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Active Subscriptions
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Start a 7-day trial for just $5 to get AI-powered website optimization.
        </p>
        <Button 
          onClick={() => window.location.href = '/subscriptions'}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          View Subscription Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Subscriptions
        </h2>
        <Button 
          onClick={() => window.location.href = '/subscriptions'}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ArrowUpRight className="h-4 w-4" />
          <span>View All Plans</span>
        </Button>
      </div>

      {subscriptions.map((subscription) => {
        const tierInfo = getTierInfo(subscription.tier);
        const IconComponent = tierInfo.icon;
        
        return (
          <Card key={subscription.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${tierInfo.color}-500 to-${tierInfo.color}-600 rounded-xl flex items-center justify-center text-white`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {tierInfo.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {subscription.status === 'trial' ? 'Trial Subscription' : 'Active Subscription'}
                    </p>
                  </div>
                </div>
                {getStatusBadge(subscription)}
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Usage Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Usage This Month
                  </h4>
                  {subscription.usage && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Revisions Used</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {subscription.usage.revisionsUsed}/{subscription.usage.revisionsLimit}
                          </span>
                        </div>
                        <Progress 
                          value={(subscription.usage.revisionsUsed / subscription.usage.revisionsLimit) * 100} 
                          className="h-2"
                        />
                      </div>
                      {subscription.status === 'trial' && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Trial Days Left</span>
                          <span className="font-semibold text-yellow-600">
                            {subscription.usage.daysRemaining} days
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Included Features</h4>
                  <ul className="space-y-2">
                    {subscription.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Actions</h4>
                  <div className="space-y-3">
                    {subscription.status === 'trial' && (
                      <Button 
                        onClick={() => handleUpgrade(subscription.id, 'optimization-pro')}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        {isLoading ? 'Processing...' : 'Upgrade to Pro'}
                      </Button>
                    )}
                    
                    {subscription.status === 'active' && (
                      <Button 
                        onClick={() => handleUpgrade(subscription.id, 'growth-partner')}
                        disabled={isLoading}
                        variant="outline"
                        className="w-full"
                      >
                        {isLoading ? 'Processing...' : 'Upgrade to Growth Partner'}
                      </Button>
                    )}
                    
                    <Button 
                      onClick={() => handleCancel(subscription.id)}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      {isLoading ? 'Processing...' : 'Cancel Subscription'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 