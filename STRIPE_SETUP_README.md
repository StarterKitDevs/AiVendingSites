# 🎯 Stripe Subscription Setup Script

This script creates all the necessary Stripe products and prices for the AI Web Agency subscription tiers.

## 📋 Prerequisites

1. **Stripe Account**: You need a Stripe account with API access
2. **Stripe Secret Key**: Your Stripe secret key (test or live)
3. **Node.js**: Make sure Node.js is installed
4. **Stripe Package**: The `stripe` package should be installed

## 🚀 Quick Start

### 1. Set Environment Variable

```bash
# For test mode (recommended for development)
export STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# For live mode (production)
export STRIPE_SECRET_KEY=sk_live_your_secret_key_here
```

### 2. Run the Script

```bash
node setup-stripe-subscriptions.js
```

## 📦 Products Created

The script will create the following subscription products:

### 1. Essential Care Subscription
- **Product**: Essential Care Subscription
- **Description**: AI-powered revision conversations and performance monitoring
- **Trial Price**: $5.00 (one-time)
- **Monthly Price**: $17.00 (recurring)

### 2. Optimization Pro Subscription
- **Product**: Optimization Pro Subscription
- **Description**: Unlimited revisions with AI-driven conversion & UX suggestions
- **Trial Price**: $15.00 (one-time)
- **Monthly Price**: $47.00 (recurring)

### 3. Growth Partner Subscription
- **Product**: Growth Partner Subscription
- **Description**: Everything in Optimization Pro plus dedicated AI optimization agent
- **Trial Price**: $25.00 (one-time)
- **Monthly Price**: $97.00 (recurring)

### 4. Co-Pilot Add-On Subscription
- **Product**: Co-Pilot Add-On Subscription
- **Description**: Personalized Co-Pilot guidance and deployment support
- **Trial Price**: $10.00 (one-time)
- **Monthly Price**: $29.00 (recurring)

## 🔧 Script Features

- ✅ **Automatic ID Assignment**: Stripe automatically assigns product and price IDs
- ✅ **Metadata Support**: Each product and price includes relevant metadata
- ✅ **Error Handling**: Comprehensive error handling with detailed messages
- ✅ **Progress Logging**: Real-time progress updates during creation
- ✅ **Summary Report**: Complete summary of all created products and prices

## 📊 Output Example

```
🚀 Setting up Stripe subscription products and prices...

📦 Creating Essential Care Subscription...
✅ Essential Care: Product prod_ABC123, Trial Price price_XYZ789, Monthly Price price_DEF456

📦 Creating Optimization Pro Subscription...
✅ Optimization Pro: Product prod_GHI789, Trial Price price_JKL012, Monthly Price price_MNO345

📦 Creating Growth Partner Subscription...
✅ Growth Partner: Product prod_PQR678, Trial Price price_STU901, Monthly Price price_VWX234

📦 Creating Co-Pilot Add-On Subscription...
✅ Co-Pilot Add-On: Product prod_YZA567, Trial Price price_BCD890, Monthly Price price_EFG123

🎉 Summary of Created Products and Prices:
==========================================
Essential Care: prod_ABC123
  - Trial: price_XYZ789 ($5.00)
  - Monthly: price_DEF456 ($17.00)

Optimization Pro: prod_GHI789
  - Trial: price_JKL012 ($15.00)
  - Monthly: price_MNO345 ($47.00)

Growth Partner: prod_PQR678
  - Trial: price_STU901 ($25.00)
  - Monthly: price_VWX234 ($97.00)

Co-Pilot Add-On: prod_YZA567
  - Trial: price_BCD890 ($10.00)
  - Monthly: price_EFG123 ($29.00)

✅ All subscription products created successfully!

💡 Next steps:
1. Copy these product and price IDs to your application
2. Update your subscription configuration
3. Test the subscription flow with these new products
```

## 🔄 Integration Steps

After running the script:

1. **Copy Product IDs**: Save the product IDs for each subscription tier
2. **Copy Price IDs**: Save the trial and monthly price IDs
3. **Update Configuration**: Update your application's subscription configuration
4. **Test Integration**: Test the subscription flow with the new products

## 🛠️ Troubleshooting

### Common Issues

1. **Missing STRIPE_SECRET_KEY**
   ```
   ❌ STRIPE_SECRET_KEY environment variable is not set
   ```
   **Solution**: Set the environment variable before running the script

2. **Invalid API Key**
   ```
   ❌ Error setting up subscriptions: Invalid API key provided
   ```
   **Solution**: Check that your Stripe secret key is correct

3. **Network Issues**
   ```
   ❌ Error setting up subscriptions: Network error
   ```
   **Solution**: Check your internet connection and try again

## 🔒 Security Notes

- ⚠️ **Never commit your Stripe secret key** to version control
- ⚠️ **Use test keys** for development and testing
- ⚠️ **Use live keys** only in production
- ⚠️ **Rotate keys** regularly for security

## 📞 Support

If you encounter issues:

1. Check the [Stripe API Documentation](https://stripe.com/docs/api)
2. Verify your Stripe account permissions
3. Ensure your API key has the necessary permissions
4. Check the Stripe Dashboard for any account issues 