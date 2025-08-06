#!/bin/bash

echo "🚀 AI Web Agency - PreMVP 0.7 Git Setup"
echo "========================================"

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
if [ -d ".git" ]; then
    echo "✅ Git repository already exists"
    echo "📊 Current git status:"
    git status --short
else
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

# Check if remote exists
if git remote -v | grep -q "origin"; then
    echo "🌐 Remote origin already exists"
    echo "📤 Pushing to remote repository..."
    git push origin main
    git push --tags
    echo "✅ Successfully pushed to remote repository"
else
    echo "🌐 No remote repository configured"
    echo ""
    echo "📋 To complete the setup, you need to:"
    echo "1. Create a new repository on GitHub/GitLab"
    echo "2. Add the remote origin:"
    echo "   git remote add origin <your-repo-url>"
    echo "3. Push the code:"
    echo "   git push -u origin main"
    echo "   git push --tags"
    echo ""
    echo "🔗 Or run these commands:"
    echo "git remote add origin <your-repo-url>"
    echo "git push -u origin main"
    echo "git push --tags"
fi

echo ""
echo "🎉 PreMVP 0.7 setup complete!"
echo "📊 Version: 0.7.0"
echo "🏷️  Tag: PreMVP-0.7"
echo ""
echo "🚀 Next steps:"
echo "1. Create a GitHub repository"
echo "2. Add remote origin and push"
echo "3. Deploy to Vercel/Railway"
echo "4. Set up environment variables"
echo ""
echo "📝 For deployment instructions, see:"
echo "- DEPLOYMENT-GUIDE.md"
echo "- SUPER-EASY-DEPLOYMENT.md" 