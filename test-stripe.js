/**
 * Stripe Functionality Test Script
 * 
 * This script tests the Stripe integration for subscription payments.
 * Run with: node test-stripe.js
 */

const https = require('https');

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  testCards: {
    success: '4242424242424242',
    decline: '4000000000000002',
    insufficient: '4000000000009995'
  }
};

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, TEST_CONFIG.baseUrl);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test functions
async function testSubscriptionTiers() {
  console.log('\n🧪 Testing Subscription Tiers...');
  
  try {
    const response = await makeRequest('/api/subscriptions');
    console.log('✅ Subscription tiers fetched successfully');
    console.log('Tiers:', Object.keys(response.data.tiers));
    return response.data.tiers;
  } catch (error) {
    console.error('❌ Failed to fetch subscription tiers:', error.message);
    return null;
  }
}

async function testCreateSubscription(tier = 'essential-care') {
  console.log(`\n🧪 Testing Subscription Creation for ${tier}...`);
  
  const subscriptionData = {
    tier,
    projectId: 'test-project-123',
    email: 'test@example.com',
    trial: true
  };

  try {
    const response = await makeRequest('/api/subscriptions', 'POST', subscriptionData);
    if (response.status === 200 && response.data.success) {
      console.log('✅ Subscription created successfully');
      console.log('Subscription ID:', response.data.subscription.id);
      return response.data.subscription;
    } else {
      console.error('❌ Failed to create subscription:', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error creating subscription:', error.message);
    return null;
  }
}

async function testPaymentIntent(amount = 500) {
  console.log(`\n🧪 Testing Payment Intent Creation ($${(amount/100).toFixed(2)})...`);
  
  const paymentData = {
    amount,
    project_id: 'test-project-123'
  };

  try {
    const response = await makeRequest('/api/payments/create-intent', 'POST', paymentData);
    if (response.status === 200 && response.data.client_secret) {
      console.log('✅ Payment intent created successfully');
      console.log('Payment Intent ID:', response.data.payment_intent_id);
      return response.data;
    } else {
      console.error('❌ Failed to create payment intent:', response.data);
      return null;
    }
  } catch (error) {
    console.error('❌ Error creating payment intent:', error.message);
    return null;
  }
}

async function testStripeIntegration() {
  console.log('\n🚀 Starting Stripe Integration Tests...\n');
  
  // Test 1: Fetch subscription tiers
  const tiers = await testSubscriptionTiers();
  if (!tiers) {
    console.log('❌ Cannot continue without subscription tiers');
    return;
  }

  // Test 2: Create subscription for each tier
  for (const tierKey of Object.keys(tiers)) {
    await testCreateSubscription(tierKey);
  }

  // Test 3: Test payment intents for different amounts
  const testAmounts = [500, 1500, 2500, 1000]; // $5, $15, $25, $10
  for (const amount of testAmounts) {
    await testPaymentIntent(amount);
  }

  console.log('\n✅ All Stripe tests completed!');
}

// Run tests if this script is executed directly
if (require.main === module) {
  testStripeIntegration().catch(console.error);
}

module.exports = {
  testSubscriptionTiers,
  testCreateSubscription,
  testPaymentIntent,
  testStripeIntegration
}; 