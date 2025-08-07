import { NextRequest, NextResponse } from 'next/server';

// Use require for Stripe to avoid module resolution issues
const Stripe = require('stripe');

export async function POST(request: NextRequest) {
  try {
    // Check for Stripe secret key at runtime
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY environment variable is not defined. Please set it in your Vercel dashboard under Project → Settings → Environment Variables.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    const body = await request.json();
    
    // Validate payment data
    if (!body.project_id || !body.amount) {
      return NextResponse.json(
        { error: 'Missing project_id or amount' },
        { status: 400 }
      );
    }

    // Validate amount (must be positive and in cents)
    if (body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create a real Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: 'usd',
      metadata: {
        project_id: body.project_id.toString(),
        source: 'ai_web_agency_frontend'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Log payment intent creation
    console.log('Payment intent created:', {
      payment_intent_id: paymentIntent.id,
      project_id: body.project_id,
      amount: paymentIntent.amount,
      amount_usd: (paymentIntent.amount / 100).toFixed(2)
    });

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    // Check if it's a Stripe authentication error
    if (error instanceof Error && error.message && error.message.includes('authentication')) {
      return NextResponse.json(
        { error: 'Stripe authentication failed. Please check your STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 