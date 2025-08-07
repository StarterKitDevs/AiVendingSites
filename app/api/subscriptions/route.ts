import { NextRequest, NextResponse } from 'next/server';

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
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get('tier');
    
    if (tier && SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]) {
      return NextResponse.json({
        success: true,
        tier: SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]
      });
    }
    
    return NextResponse.json({
      success: true,
      tiers: SUBSCRIPTION_TIERS
    });
  } catch (error) {
    console.error('Error fetching subscription tiers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription tiers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier, projectId, email, trial = true } = body;
    
    if (!tier || !SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }
    
    const subscriptionTier = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS];
    const amount = trial ? subscriptionTier.trialPrice : subscriptionTier.price;
    
    // Create subscription record
    const subscription = {
      id: `sub_${Math.random().toString(36).substr(2, 9)}`,
      tier,
      projectId,
      email,
      amount,
      trial,
      trialDays: trial ? subscriptionTier.trialDays : 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      trialEndsAt: trial ? new Date(Date.now() + subscriptionTier.trialDays * 24 * 60 * 60 * 1000).toISOString() : null,
      features: subscriptionTier.features
    };
    
    // In a real implementation, you would:
    // 1. Save to database
    // 2. Create Stripe subscription
    // 3. Send confirmation email
    
    console.log('Subscription created:', subscription);
    
    return NextResponse.json({
      success: true,
      subscription,
      message: trial 
        ? `7-day trial started for ${subscriptionTier.name} - $5`
        : `Subscription activated for ${subscriptionTier.name} - $${(subscriptionTier.price / 100).toFixed(2)}/month`
    });
    
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
} 