"use client";

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { StripeProvider } from '@/components/stripe-provider';
import { StripePaymentForm } from '@/components/stripe-payment-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Star, Shield, Brain } from 'lucide-react';
import React from 'react'; // Added missing import for React

const TEST_TIERS = [
  {
    id: 'essential-care',
    name: 'Essential Care',
    price: 500, // $5.00
    icon: Shield,
    color: 'blue'
  },
  {
    id: 'optimization-pro',
    name: 'Optimization Pro',
    price: 1500, // $15.00
    icon: Zap,
    color: 'green'
  },
  {
    id: 'growth-partner',
    name: 'Growth Partner',
    price: 2500, // $25.00
    icon: Star,
    color: 'purple'
  },
  {
    id: 'co-pilot-addon',
    name: 'Co-Pilot Add-On',
    price: 1000, // $10.00
    icon: Brain,
    color: 'orange'
  }
];

export default function TestStripePage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const handlePaymentSuccess = (paymentIntent: any) => {
    setPaymentResult(paymentIntent);
    console.log('Payment successful:', paymentIntent);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
  };

  const selectedTierData = TEST_TIERS.find(tier => tier.id === selectedTier);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Stripe Testing" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stripe Payment Testing
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Test the subscription payment functionality with Stripe
            </p>
          </div>

          {!selectedTier ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEST_TIERS.map((tier) => {
                const IconComponent = tier.icon;
                return (
                  <Card 
                    key={tier.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r from-${tier.color}-500 to-${tier.color}-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <Badge className="bg-green-500 text-white">
                        ${(tier.price / 100).toFixed(2)} Trial
                      </Badge>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTier(null)}
                  className="mb-4"
                >
                  ← Back to Tiers
                </Button>
                
                {selectedTierData && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <div className={`w-8 h-8 bg-gradient-to-r from-${selectedTierData.color}-500 to-${selectedTierData.color}-600 rounded-lg flex items-center justify-center text-white`}>
                          {React.createElement(selectedTierData.icon, { className: "h-4 w-4" })}
                        </div>
                        <span>{selectedTierData.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Test payment for {selectedTierData.name} trial - ${(selectedTierData.price / 100).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <StripeProvider>
                <StripePaymentForm
                  amount={selectedTierData?.price || 0}
                  tier={selectedTier}
                  tierName={selectedTierData?.name || ''}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </StripeProvider>

              {paymentResult && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Payment Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
                      {JSON.stringify(paymentResult, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 