# 🚀 Deployment Guide - PRE MVP 2.5 Stripe Integration

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Stripe Account**: Active Stripe account with API access
2. **Vercel Account**: For hosting and deployment
3. **Environment Variables**: Properly configured

## 🔧 Environment Variables Setup

### **Required Environment Variables**

You must set these in your Vercel dashboard under **Project → Settings → Environment Variables**:

#### **For Production:**
```
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here
```

#### **For Development/Preview:**
```
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
```

### **How to Set Environment Variables in Vercel:**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Navigate to Settings → Environment Variables**
4. **Add each variable:**
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: Your Stripe secret key (starts with `sk_test_` or `sk_live_`)
   - **Environment**: Select both "Production" and "Preview"
5. **Repeat for `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`**
6. **Click "Save"**

## 🎯 Deployment Steps

### **1. Push to GitHub**
```bash
git add .
git commit -m "🔧 Fix: Stripe environment variable handling"
git push origin main
```

### **2. Deploy to Vercel**
- Vercel will automatically deploy when you push to main
- Or manually trigger deployment from Vercel dashboard

### **3. Verify Deployment**
1. **Check Environment Variables**: Ensure they're set in Vercel
2. **Test Payment Flow**: Visit your live site and test payments
3. **Monitor Logs**: Check Vercel function logs for any errors

## 🔍 Troubleshooting

### **Common Issues:**

#### **1. "STRIPE_SECRET_KEY not defined" Error**
**Solution**: Set the environment variable in Vercel dashboard
- Go to Project → Settings → Environment Variables
- Add `STRIPE_SECRET_KEY` with your actual key
- Redeploy

#### **2. "Stripe authentication failed" Error**
**Solution**: Check your Stripe key format
- Test keys start with `sk_test_`
- Live keys start with `sk_live_`
- Ensure no extra spaces or characters

#### **3. Payment Intent Creation Fails**
**Solution**: Verify Stripe account status
- Check if your Stripe account is active
- Ensure you have sufficient balance (for live mode)
- Verify webhook endpoints are configured

### **4. Module Not Found Errors**
**Solution**: Ensure all dependencies are installed
```bash
npm install stripe @types/stripe
```

## 🎯 Testing Your Deployment

### **Test Payment Flow:**
1. **Visit your live site**
2. **Go to `/test-stripe` page**
3. **Use test card**: `4242 4242 4242 4242`
4. **Complete payment process**
5. **Verify success message**

### **Test Subscription Tiers:**
1. **Visit `/subscriptions` page**
2. **Select a subscription tier**
3. **Complete payment process**
4. **Verify subscription creation**

## 📊 Monitoring

### **Vercel Function Logs:**
- Check Vercel dashboard → Functions
- Monitor `/api/payments/create-intent` logs
- Look for any error messages

### **Stripe Dashboard:**
- Monitor payments in Stripe dashboard
- Check for failed payment intents
- Verify webhook deliveries

## 🔒 Security Notes

1. **Never commit secret keys** to your repository
2. **Use environment variables** for all sensitive data
3. **Test with test keys** before going live
4. **Monitor for suspicious activity** in Stripe dashboard

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Environment variables are set in Vercel
- ✅ Payment intents are created successfully
- ✅ Test payments process without errors
- ✅ Subscription tiers are functional
- ✅ No build errors in Vercel logs

## 📞 Support

If you encounter issues:
1. **Check Vercel function logs**
2. **Verify environment variables**
3. **Test with Stripe test keys first**
4. **Review this deployment guide**

---

**🎯 Your PRE MVP 2.5 is now ready for production!** 