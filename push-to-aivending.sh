#!/bin/bash

echo "🚀 Pushing AI Web Agency PreMVP 0.7 to GitHub"
echo "============================================="
echo "Repository: https://github.com/StarterKitDevs/AiVendingSites"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the ai-web-agency-master directory"
    exit 1
fi

# Check if git is already initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
echo "📦 Adding all files to git..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "💾 Committing changes..."
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
    echo "✅ Changes committed"
fi

# Create the PreMVP 0.7 tag
echo "🏷️  Creating PreMVP 0.7 tag..."
if git tag -l | grep -q "PreMVP-0.7"; then
    echo "⚠️  Tag PreMVP-0.7 already exists. Removing old tag..."
    git tag -d PreMVP-0.7
fi

git tag -a PreMVP-0.7 -m "PreMVP 0.7 - Complete AI Web Agency with exact design match

🎯 Key Features:
- ⚡ Lightning bolt branding and modern design
- 🎨 Dark gradient hero with animated background blobs
- 📊 Real-time pricing calculator in quote form
- 🏗️ Glass morphism UI with backdrop blur effects
- 📈 Professional stats display (200+ Sites, 13 Min, 99.9% Uptime)
- 🔧 Full integration with FastAPI backend and Supabase
- 🤖 AI agent orchestration system
- 💳 Stripe payment processing
- 📱 Responsive design with modern UI/UX
- 🎨 Exact design match from reference site

🚀 Ready for production deployment!"

echo "✅ PreMVP 0.7 tag created"

# Add remote origin if it doesn't exist
if ! git remote -v | grep -q "origin"; then
    echo "🌐 Adding remote origin..."
    git remote add origin https://github.com/StarterKitDevs/AiVendingSites.git
    echo "✅ Remote origin added"
else
    echo "🌐 Remote origin already exists"
    # Update the remote URL in case it's different
    git remote set-url origin https://github.com/StarterKitDevs/AiVendingSites.git
    echo "✅ Remote origin updated"
fi

# Push to remote repository
echo "📤 Pushing to GitHub repository..."
echo "Repository: https://github.com/StarterKitDevs/AiVendingSites"

# Try to push to main branch first, if it fails, try master
if git push -u origin main; then
    echo "✅ Successfully pushed to main branch"
elif git push -u origin master; then
    echo "✅ Successfully pushed to master branch"
else
    echo "⚠️  Could not push to main/master. Trying to push to current branch..."
    git push -u origin HEAD
fi

# Push tags
echo "📤 Pushing tags..."
git push --tags

echo ""
echo "🎉 PreMVP 0.7 successfully pushed to GitHub!"
echo "📊 Version: 0.7.0"
echo "🏷️  Tag: PreMVP-0.7"
echo "🔗 Repository: https://github.com/StarterKitDevs/AiVendingSites"
echo ""
echo "🚀 Next steps:"
echo "1. Visit: https://github.com/StarterKitDevs/AiVendingSites"
echo "2. Deploy to Vercel/Railway"
echo "3. Set up environment variables"
echo "4. Go live with your AI Web Agency!"
echo ""
echo "📝 For deployment instructions, see:"
echo "- DEPLOYMENT-GUIDE.md"
echo "- SUPER-EASY-DEPLOYMENT.md" 