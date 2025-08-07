const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function setupSubscriptions() {
  try {
    console.log('🚀 Setting up Stripe subscription products and prices...\n');

    // 1. Essential Care Subscription
    console.log('📦 Creating Essential Care Subscription...');
    const essentialCareProduct = await stripe.products.create({
      name: 'Essential Care Subscription',
      description: 'AI-powered revision conversations and performance monitoring',
      metadata: {
        tier: 'essential-care',
        features: '5 AI-driven revision conversations/month, Automated revision history backups, Performance alerts'
      }
    });

    const essentialCareTrialPrice = await stripe.prices.create({
      product: essentialCareProduct.id,
      unit_amount: 500, // $5.00
      currency: 'usd',
      nickname: 'Essential Care Trial',
      metadata: {
        type: 'trial',
        tier: 'essential-care',
        duration_days: '7'
      }
    });

    const essentialCareMonthlyPrice = await stripe.prices.create({
      product: essentialCareProduct.id,
      unit_amount: 1700, // $17.00
      currency: 'usd',
      recurring: {
        interval: 'month'
      },
      nickname: 'Essential Care Monthly',
      metadata: {
        type: 'recurring',
        tier: 'essential-care',
        interval: 'month'
      }
    });

    console.log(`✅ Essential Care: Product ${essentialCareProduct.id}, Trial Price ${essentialCareTrialPrice.id}, Monthly Price ${essentialCareMonthlyPrice.id}`);

    // 2. Optimization Pro Subscription
    console.log('\n📦 Creating Optimization Pro Subscription...');
    const optimizationProProduct = await stripe.products.create({
      name: 'Optimization Pro Subscription',
      description: 'Unlimited revisions with AI-driven conversion & UX suggestions',
      metadata: {
        tier: 'optimization-pro',
        features: 'Unlimited revisions, AI-driven conversion & UX suggestions, A/B testing support'
      }
    });

    const optimizationProTrialPrice = await stripe.prices.create({
      product: optimizationProProduct.id,
      unit_amount: 1500, // $15.00
      currency: 'usd',
      nickname: 'Optimization Pro Trial',
      metadata: {
        type: 'trial',
        tier: 'optimization-pro',
        duration_days: '7'
      }
    });

    const optimizationProMonthlyPrice = await stripe.prices.create({
      product: optimizationProProduct.id,
      unit_amount: 4700, // $47.00
      currency: 'usd',
      recurring: {
        interval: 'month'
      },
      nickname: 'Optimization Pro Monthly',
      metadata: {
        type: 'recurring',
        tier: 'optimization-pro',
        interval: 'month'
      }
    });

    console.log(`✅ Optimization Pro: Product ${optimizationProProduct.id}, Trial Price ${optimizationProTrialPrice.id}, Monthly Price ${optimizationProMonthlyPrice.id}`);

    // 3. Growth Partner Subscription
    console.log('\n📦 Creating Growth Partner Subscription...');
    const growthPartnerProduct = await stripe.products.create({
      name: 'Growth Partner Subscription',
      description: 'Everything in Optimization Pro plus dedicated AI optimization agent',
      metadata: {
        tier: 'growth-partner',
        features: 'Everything in Optimization Pro, Dedicated AI optimization agent, Weekly performance reports, Priority queue'
      }
    });

    const growthPartnerTrialPrice = await stripe.prices.create({
      product: growthPartnerProduct.id,
      unit_amount: 2500, // $25.00
      currency: 'usd',
      nickname: 'Growth Partner Trial',
      metadata: {
        type: 'trial',
        tier: 'growth-partner',
        duration_days: '7'
      }
    });

    const growthPartnerMonthlyPrice = await stripe.prices.create({
      product: growthPartnerProduct.id,
      unit_amount: 9700, // $97.00
      currency: 'usd',
      recurring: {
        interval: 'month'
      },
      nickname: 'Growth Partner Monthly',
      metadata: {
        type: 'recurring',
        tier: 'growth-partner',
        interval: 'month'
      }
    });

    console.log(`✅ Growth Partner: Product ${growthPartnerProduct.id}, Trial Price ${growthPartnerTrialPrice.id}, Monthly Price ${growthPartnerMonthlyPrice.id}`);

    // 4. Co-Pilot Add-On Subscription
    console.log('\n📦 Creating Co-Pilot Add-On Subscription...');
    const coPilotAddonProduct = await stripe.products.create({
      name: 'Co-Pilot Add-On Subscription',
      description: 'Personalized Co-Pilot guidance and deployment support',
      metadata: {
        tier: 'co-pilot-addon',
        features: 'Personalized Co-Pilot guidance, Deployment methods support, Self-hosting assistance, Rapid prototyping support'
      }
    });

    const coPilotAddonTrialPrice = await stripe.prices.create({
      product: coPilotAddonProduct.id,
      unit_amount: 1000, // $10.00
      currency: 'usd',
      nickname: 'Co-Pilot Add-On Trial',
      metadata: {
        type: 'trial',
        tier: 'co-pilot-addon',
        duration_days: '7'
      }
    });

    const coPilotAddonMonthlyPrice = await stripe.prices.create({
      product: coPilotAddonProduct.id,
      unit_amount: 2900, // $29.00
      currency: 'usd',
      recurring: {
        interval: 'month'
      },
      nickname: 'Co-Pilot Add-On Monthly',
      metadata: {
        type: 'recurring',
        tier: 'co-pilot-addon',
        interval: 'month'
      }
    });

    console.log(`✅ Co-Pilot Add-On: Product ${coPilotAddonProduct.id}, Trial Price ${coPilotAddonTrialPrice.id}, Monthly Price ${coPilotAddonMonthlyPrice.id}`);

    // Summary
    console.log('\n🎉 Summary of Created Products and Prices:');
    console.log('==========================================');
    console.log(`Essential Care: ${essentialCareProduct.id}`);
    console.log(`  - Trial: ${essentialCareTrialPrice.id} ($5.00)`);
    console.log(`  - Monthly: ${essentialCareMonthlyPrice.id} ($17.00)`);
    console.log(`\nOptimization Pro: ${optimizationProProduct.id}`);
    console.log(`  - Trial: ${optimizationProTrialPrice.id} ($15.00)`);
    console.log(`  - Monthly: ${optimizationProMonthlyPrice.id} ($47.00)`);
    console.log(`\nGrowth Partner: ${growthPartnerProduct.id}`);
    console.log(`  - Trial: ${growthPartnerTrialPrice.id} ($25.00)`);
    console.log(`  - Monthly: ${growthPartnerMonthlyPrice.id} ($97.00)`);
    console.log(`\nCo-Pilot Add-On: ${coPilotAddonProduct.id}`);
    console.log(`  - Trial: ${coPilotAddonTrialPrice.id} ($10.00)`);
    console.log(`  - Monthly: ${coPilotAddonMonthlyPrice.id} ($29.00)`);

    console.log('\n✅ All subscription products created successfully!');
    console.log('\n💡 Next steps:');
    console.log('1. Copy these product and price IDs to your application');
    console.log('2. Update your subscription configuration');
    console.log('3. Test the subscription flow with these new products');

  } catch (error) {
    console.error('❌ Error setting up subscriptions:', error.message);
    if (error.type) {
      console.error('Error type:', error.type);
    }
    process.exit(1);
  }
}

// Check if STRIPE_SECRET_KEY is set
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY environment variable is not set');
  console.log('💡 Please set your Stripe secret key:');
  console.log('   export STRIPE_SECRET_KEY=sk_test_your_secret_key_here');
  process.exit(1);
}

// Run the setup
setupSubscriptions(); 