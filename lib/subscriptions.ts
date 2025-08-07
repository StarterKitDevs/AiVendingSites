// Subscription tiers configuration
export const SUBSCRIPTION_TIERS = {
  'essential-care': {
    name: 'Essential Care',
    price: 1700, // $17.00 in cents
    trialPrice: 500, // $5.00 in cents
    trialDays: 7,
    features: [
      '5 AI-driven revision conversations/month',
      'Automated revision history backups',
      'Performance alerts'
    ]
  },
  'optimization-pro': {
    name: 'Optimization Pro',
    price: 4700, // $47.00 in cents
    trialPrice: 1500, // $15.00 in cents
    trialDays: 7,
    features: [
      'Unlimited revisions',
      'AI-driven conversion & UX suggestions',
      'A/B testing support'
    ]
  },
  'growth-partner': {
    name: 'Growth Partner',
    price: 9700, // $97.00 in cents
    trialPrice: 2500, // $25.00 in cents
    trialDays: 7,
    features: [
      'Everything in Optimization Pro',
      'Dedicated AI optimization agent',
      'Weekly performance reports',
      'Priority queue'
    ]
  },
  'co-pilot-addon': {
    name: 'Co-Pilot Add-On',
    price: 2900, // $29.00 in cents
    trialPrice: 1000, // $10.00 in cents
    trialDays: 7,
    features: [
      'Personalized Co-Pilot guidance',
      'Deployment methods support',
      'Self-hosting assistance',
      'Rapid prototyping support'
    ]
  }
} as const;

export type SubscriptionTierKey = keyof typeof SUBSCRIPTION_TIERS;
export type SubscriptionTier = typeof SUBSCRIPTION_TIERS[SubscriptionTierKey]; 