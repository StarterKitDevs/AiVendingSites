'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/hero-section';
import QuoteForm from '@/components/quote-form';
import { ProcessTimeline } from '@/components/process-timeline';
import { SocialProof } from '@/components/social-proof';
import { ChatBot } from '@/components/chat-bot';
import { FeaturesShowcase } from '@/components/features-showcase';
import { SubscriptionTiers } from '@/components/subscription-tiers';

export default function Home() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header title="Starter Kit" />
      <main>
        <HeroSection onGetQuote={() => setShowQuoteForm(true)} />
        <FeaturesShowcase serviceType="ai-agent" />
        <SubscriptionTiers />
        <QuoteForm />
        <ProcessTimeline />
        <SocialProof />
      </main>
      <ChatBot />
    </div>
  );
} 