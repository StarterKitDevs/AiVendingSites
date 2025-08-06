#!/bin/bash

echo "🚀 Executing PreMVP 0.7 Push to GitHub"
echo "======================================"
echo "Repository: https://github.com/StarterKitDevs/AiVendingSites"
echo ""

# Add all files
echo "📦 Adding all files to git..."
git add .

# Commit with PreMVP 0.7 message
echo "💾 Committing PreMVP 0.7..."
git commit -m "🎉 PreMVP 0.7 - Complete AI Web Agency with exact design match

✨ Features:
- ⚡ Lightning bolt branding throughout
- 🎨 Dark gradient hero section with animated background
- 📊 Real-time pricing in quote form sidebar
- 🏗️ Glass morphism design with backdrop blur effects
- 📈 Stats: 200+ Sites, 13 Min Delivery, 99.9% Uptime
- 🎯 Exact design match from reference site
- 🔧 Integrated with FastAPI backend and Supabase
- 🤖 AI agent orchestration system
- 💳 Stripe payment integration
- 📱 Responsive design with modern UI/UX"

# Create PreMVP 0.7 tag
echo "🏷️  Creating PreMVP 0.7 tag..."
git tag -a PreMVP-0.7 -m "PreMVP 0.7 - Complete AI Web Agency with exact design match"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main
git push --tags

echo ""
echo "🎉 PreMVP 0.7 successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/StarterKitDevs/AiVendingSites"
echo "🏷️  Tag: PreMVP-0.7"
echo "📊 Version: 0.7.0" 