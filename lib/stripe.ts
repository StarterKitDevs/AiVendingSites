import { loadStripe } from '@stripe/stripe-js';

// This is your test publishable API key.
// Replace with your actual publishable key in production
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

export default stripePromise; 