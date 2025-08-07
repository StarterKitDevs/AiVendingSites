# 🧪 Stripe Functionality Testing Guide

## Overview

This guide covers how to test the Stripe integration for subscription payments in the AI Vending Sites platform.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Start the Development Server

```bash
npm run dev
```

## 🧪 Testing Methods

### Method 1: Web Interface Testing

1. **Navigate to Test Page**
   - Go to: `http://localhost:3000/test-stripe`
   - This page provides a visual interface for testing payments

2. **Select a Subscription Tier**
   - Choose from Essential Care ($5), Optimization Pro ($15), Growth Partner ($25), or Co-Pilot Add-On ($10)

3. **Test Payment**
   - Use test card number: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

### Method 2: API Testing

#### Test Subscription Tiers

```bash
curl -X GET http://localhost:3000/api/subscriptions
```

Expected response:
```json
{
  "success": true,
  "tiers": {
    "essential-care": {
      "name": "Essential Care",
      "price": 1700,
      "trialPrice": 500,
      "trialDays": 7,
      "features": [...]
    },
    ...
  }
}
```

#### Test Subscription Creation

```bash
curl -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "tier": "essential-care",
    "projectId": "test-project-123",
    "email": "test@example.com",
    "trial": true
  }'
```

#### Test Payment Intent Creation

```bash
curl -X POST http://localhost:3000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "project_id": "test-project-123"
  }'
```

### Method 3: Automated Testing

Run the automated test script:

```bash
node test-stripe.js
```

This script will:
- Test subscription tier fetching
- Test subscription creation for all tiers
- Test payment intent creation for different amounts

## 🎯 Test Scenarios

### 1. Successful Payment

**Test Card**: `4242 4242 4242 4242`
- **Expected Result**: Payment succeeds, subscription activated
- **Use Case**: Normal customer payment

### 2. Declined Payment

**Test Card**: `4000 0000 0000 0002`
- **Expected Result**: Payment declined with error message
- **Use Case**: Invalid card or insufficient funds

### 3. Insufficient Funds

**Test Card**: `4000 0000 0000 9995`
- **Expected Result**: Payment fails due to insufficient funds
- **Use Case**: Customer with limited funds

### 4. Invalid Card

**Test Card**: `4000 0000 0000 0002`
- **Expected Result**: Payment fails with validation error
- **Use Case**: Customer enters wrong card details

## 🔧 Configuration

### Stripe Keys

1. **Test Keys** (for development)
   - Publishable Key: `pk_test_...`
   - Secret Key: `sk_test_...`
   - Webhook Secret: `whsec_...`

2. **Live Keys** (for production)
   - Publishable Key: `pk_live_...`
   - Secret Key: `sk_live_...`
   - Webhook Secret: `whsec_...`

### Environment Variables

```env
# Development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📊 Test Data

### Subscription Tiers

| Tier | Monthly Price | Trial Price | Trial Days |
|------|---------------|-------------|------------|
| Essential Care | $17 | $5 | 7 |
| Optimization Pro | $47 | $15 | 7 |
| Growth Partner | $97 | $25 | 7 |
| Co-Pilot Add-On | $29 | $10 | 7 |

### Test Cards

| Card Number | Description | Expected Result |
|-------------|-------------|-----------------|
| `4242 4242 4242 4242` | Visa (success) | ✅ Payment succeeds |
| `4000 0000 0000 0002` | Visa (declined) | ❌ Payment declined |
| `4000 0000 0000 9995` | Visa (insufficient) | ❌ Insufficient funds |
| `4000 0000 0000 9987` | Visa (expired) | ❌ Card expired |

## 🐛 Troubleshooting

### Common Issues

1. **"Stripe is not defined"**
   - Ensure Stripe is properly installed: `npm install @stripe/stripe-js`
   - Check that the Stripe provider is wrapping your components

2. **"Invalid publishable key"**
   - Verify your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
   - Ensure you're using test keys for development

3. **"Payment intent not found"**
   - Check that the payment intent was created successfully
   - Verify the client secret is being passed correctly

4. **"Webhook signature verification failed"**
   - Ensure your webhook secret is correct
   - Check that the webhook endpoint is properly configured

### Debug Mode

Enable debug logging by adding to your `.env.local`:

```env
DEBUG=stripe:*
```

### Network Issues

If you're having network issues:

1. **Check CORS settings**
2. **Verify API endpoints are accessible**
3. **Check firewall settings**
4. **Ensure HTTPS is properly configured (for production)**

## 📈 Monitoring

### Stripe Dashboard

1. **Test Mode**: https://dashboard.stripe.com/test/payments
2. **Live Mode**: https://dashboard.stripe.com/payments

### Logs

Check the following for debugging:
- Browser console (F12)
- Network tab for API calls
- Server logs for backend errors

## 🔒 Security

### Best Practices

1. **Never expose secret keys in frontend code**
2. **Always use HTTPS in production**
3. **Validate all input data**
4. **Implement proper error handling**
5. **Use webhooks for payment confirmation**

### PCI Compliance

- Stripe handles PCI compliance for you
- Never store card data directly
- Use Stripe Elements for secure card input

## 🚀 Production Deployment

### Checklist

- [ ] Switch to live Stripe keys
- [ ] Configure webhook endpoints
- [ ] Set up proper error monitoring
- [ ] Test with real payment methods
- [ ] Implement proper logging
- [ ] Set up backup payment methods

### Environment Variables

```env
# Production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📞 Support

### Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Support](https://support.stripe.com)

### Contact

For issues specific to this implementation:
1. Check the troubleshooting section above
2. Review the logs and error messages
3. Test with the provided test cards
4. Contact the development team

---

**Note**: This testing guide is for development purposes only. Always use proper security measures and follow Stripe's best practices in production. 