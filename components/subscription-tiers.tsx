"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Star, Shield, Brain, ArrowRight, Clock } from 'lucide-react';
import { StripeProvider } from '@/components/stripe-provider';
import { StripePaymentForm } from '@/components/stripe-payment-form';
import { SUBSCRIPTION_TIERS } from '@/lib/subscriptions';

interface SubscriptionTiersProps {
  projectId?: string;
  email?: string;
  onSubscribe?: (tier: string) => void;
}

export function SubscriptionTiers({ projectId, email, onSubscribe }: SubscriptionTiersProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const handlePaymentSuccess = (paymentIntent: any) => {
    setPaymentResult(paymentIntent);
    onSubscribe?.(selectedTier!);
    console.log('Payment successful:', paymentIntent);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
  };

  const selectedTierData = selectedTier ? SUBSCRIPTION_TIERS[selectedTier as keyof typeof SUBSCRIPTION_TIERS] : null;

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'essential-care':
        return <Shield size={24} />;
      case 'optimization-pro':
        return <Zap size={24} />;
      case 'growth-partner':
        return <Star size={24} />;
      case 'co-pilot-addon':
        return <Brain size={24} />;
      default:
        return <CheckCircle size={24} />;
    }
  };

  if (selectedTier && selectedTierData) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedTier(null);
                  setPaymentResult(null);
                }}
                className="mb-4"
              >
                ← Back to Tiers
              </Button>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                      {getTierIcon(selectedTier)}
                    </div>
                    <span>{selectedTierData.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedTierData.name} trial - ${(selectedTierData.trialPrice / 100).toFixed(2)}
                  </p>
                  <ul className="space-y-2 mt-4">
                    {selectedTierData.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <StripeProvider>
              <StripePaymentForm
                amount={selectedTierData.trialPrice}
                tier={selectedTier}
                tierName={selectedTierData.name}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </StripeProvider>

            {paymentResult && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Payment Successful!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 dark:text-green-400">
                    Your {selectedTierData.name} trial has been activated! You'll receive a confirmation email shortly.
                  </p>
                  <Badge className="mt-2 bg-green-500 text-white">
                    Trial Active - ${(selectedTierData.trialPrice / 100).toFixed(2)}
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-600 text-white border-0">
            🎯 Special Offer
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start Your 7-Day Trial Starting at $5
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get AI-powered website optimization, unlimited revisions, and expert guidance. 
            Try any tier for 7 days starting at just $5, then continue at full price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Object.entries(SUBSCRIPTION_TIERS).map(([tierKey, tier]) => (
            <Card 
              key={tierKey}
              className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() => setSelectedTier(tierKey)}
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {getTierIcon(tierKey)}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {tier.name}
                </CardTitle>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${(tier.price / 100).toFixed(0)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <div className="mt-2">
                  <Badge className="bg-green-500 text-white border-0">
                    <Clock className="h-3 w-3 mr-1" />
                    {tier.trialPrice === 500 ? '7-day trial for $5' : 
                     tier.trialPrice === 1500 ? '7-day trial for $15' :
                     tier.trialPrice === 2500 ? '7-day trial for $25' :
                     tier.trialPrice === 1000 ? '7-day trial for $10' : '7-day trial'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => setSelectedTier(tierKey)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                >
                  Start 7-Day ${(tier.trialPrice / 100).toFixed(0)} Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Subscription Model?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Low-Friction Entry
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Start with just $5 for a 7-day trial. No long-term commitment required.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  AI-Powered Optimization
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get intelligent suggestions and automated improvements for your website.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Expert Support
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Access to dedicated AI agents and Co-Pilot guidance for deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 