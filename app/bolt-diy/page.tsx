'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Header } from '@/components/ui/header';
import { 
  Globe, 
  Palette, 
  Code, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Play,
  Settings,
  Eye,
  Download,
  Share2,
  Plus,
  X,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { showSuccess, showError } from '@/lib/toast';
import Link from 'next/link';

interface WebsiteTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  price: number;
  image: string;
  popular?: boolean;
}

const websiteTemplates: WebsiteTemplate[] = [
  // SaaS & Tech Startup Templates
  {
    id: 'saas-dashboard',
    name: 'SaaS Dashboard',
    category: 'SaaS & Tech Startup',
    description: 'Modern SaaS application with user management and analytics',
    features: ['User Authentication', 'Dashboard', 'API Integration', 'Analytics', 'AI Personalization'],
    price: 397,
    image: '/templates/saas.jpg',
    popular: true
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup Landing',
    category: 'SaaS & Tech Startup',
    description: 'High-converting landing page for tech startups',
    features: ['Lead Generation', 'Product Showcase', 'Testimonials', 'Pricing Tables'],
    price: 297,
    image: '/templates/tech-startup.jpg'
  },
  {
    id: 'app-landing',
    name: 'App Landing Page',
    category: 'SaaS & Tech Startup',
    description: 'Mobile app landing page with download integration',
    features: ['App Store Integration', 'Feature Showcase', 'User Reviews', 'Download Tracking'],
    price: 297,
    image: '/templates/app-landing.jpg'
  },
  
  // E-commerce Store Templates
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    category: 'E-commerce Store',
    description: 'Full-featured online store with payment integration',
    features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Inventory Management', 'PWA Support'],
    price: 597,
    image: '/templates/ecommerce.jpg',
    popular: true
  },
  {
    id: 'fashion-store',
    name: 'Fashion Store',
    category: 'E-commerce Store',
    description: 'Elegant fashion and clothing store',
    features: ['Product Filtering', 'Size Guide', 'Wishlist', 'Social Shopping'],
    price: 497,
    image: '/templates/fashion-store.jpg'
  },
  {
    id: 'electronics-store',
    name: 'Electronics Store',
    category: 'E-commerce Store',
    description: 'Modern electronics and gadgets store',
    features: ['Product Comparison', 'Tech Specs', 'Reviews System', 'Warranty Info'],
    price: 497,
    image: '/templates/electronics-store.jpg'
  },
  
  // Professional Services Templates
  {
    id: 'law-firm',
    name: 'Law Firm',
    category: 'Professional Services',
    description: 'Professional law firm website with case management',
    features: ['Case Studies', 'Attorney Profiles', 'Consultation Booking', 'Legal Blog'],
    price: 397,
    image: '/templates/law-firm.jpg'
  },
  {
    id: 'consulting',
    name: 'Consulting Agency',
    category: 'Professional Services',
    description: 'Professional consulting and advisory services',
    features: ['Service Portfolio', 'Client Testimonials', 'Case Studies', 'Booking System'],
    price: 397,
    image: '/templates/consulting.jpg'
  },
  {
    id: 'accounting',
    name: 'Accounting Firm',
    category: 'Professional Services',
    description: 'Modern accounting and financial services',
    features: ['Service Calculator', 'Tax Resources', 'Client Portal', 'Appointment Booking'],
    price: 397,
    image: '/templates/accounting.jpg'
  },
  
  // Creative Portfolio Templates
  {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    category: 'Creative Portfolio',
    description: 'Professional portfolio to showcase your work',
    features: ['Project Gallery', 'About Section', 'Contact Form', 'Social Links', 'Beautiful Shadows'],
    price: 297,
    image: '/templates/portfolio.jpg'
  },
  {
    id: 'photography',
    name: 'Photography Portfolio',
    category: 'Creative Portfolio',
    description: 'Stunning photography portfolio with gallery',
    features: ['Image Gallery', 'Lightbox View', 'Client Albums', 'Booking System'],
    price: 297,
    image: '/templates/photography.jpg'
  },
  {
    id: 'design-studio',
    name: 'Design Studio',
    category: 'Creative Portfolio',
    description: 'Creative design studio portfolio',
    features: ['Project Showcase', 'Team Profiles', 'Process Timeline', 'Client Testimonials'],
    price: 297,
    image: '/templates/design-studio.jpg'
  },
  
  // Restaurant & Local Business Templates
  {
    id: 'restaurant',
    name: 'Restaurant',
    category: 'Restaurant & Local Business',
    description: 'Modern restaurant website with online ordering',
    features: ['Menu Display', 'Online Ordering', 'Reservation System', 'Location Map'],
    price: 397,
    image: '/templates/restaurant.jpg'
  },
  {
    id: 'coffee-shop',
    name: 'Coffee Shop',
    category: 'Restaurant & Local Business',
    description: 'Cozy coffee shop website',
    features: ['Menu Items', 'Order Online', 'Loyalty Program', 'Events Calendar'],
    price: 297,
    image: '/templates/coffee-shop.jpg'
  },
  {
    id: 'local-business',
    name: 'Local Business',
    category: 'Restaurant & Local Business',
    description: 'Local business website with local SEO',
    features: ['Local SEO', 'Service Areas', 'Customer Reviews', 'Contact Forms'],
    price: 297,
    image: '/templates/local-business.jpg'
  },
  
  // Blog & Content Publishing Templates
  {
    id: 'blog-platform',
    name: 'Blog Platform',
    category: 'Blog & Content Publishing',
    description: 'Content-focused blog with rich features',
    features: ['Rich Editor', 'Categories', 'Comments', 'Newsletter', 'SEO Optimized'],
    price: 297,
    image: '/templates/blog.jpg'
  },
  {
    id: 'news-site',
    name: 'News Site',
    category: 'Blog & Content Publishing',
    description: 'Professional news and media website',
    features: ['Article Management', 'Breaking News', 'Author Profiles', 'Social Sharing'],
    price: 297,
    image: '/templates/news-site.jpg'
  },
  {
    id: 'magazine',
    name: 'Digital Magazine',
    category: 'Blog & Content Publishing',
    description: 'Digital magazine with subscription system',
    features: ['Issue Management', 'Subscription System', 'Reader Comments', 'Digital Downloads'],
    price: 397,
    image: '/templates/magazine.jpg'
  }
];

const designStyles = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
  { id: 'modern', name: 'Modern', description: 'Contemporary with bold elements' },
  { id: 'classic', name: 'Classic', description: 'Timeless and professional' },
  { id: 'creative', name: 'Creative', description: 'Artistic and unique' },
  { id: 'corporate', name: 'Corporate', description: 'Professional and trustworthy' }
];

const layoutOptions = [
  { id: 'single-page', name: 'Single Page', description: 'All content on one page' },
  { id: 'multi-page', name: 'Multi Page', description: 'Multiple pages with navigation' },
  { id: 'landing-funnel', name: 'Landing Funnel', description: 'Conversion-focused flow' },
  { id: 'dashboard', name: 'Dashboard', description: 'Admin panel style' },
  { id: 'portfolio-grid', name: 'Portfolio Grid', description: 'Showcase items in grid' }
];

const pageSections = [
  'Hero Section',
  'About Us',
  'Services/Products',
  'Portfolio/Gallery',
  'Team Members',
  'Testimonials',
  'Contact Form',
  'Blog/News',
  'FAQ Section',
  'Pricing Tables',
  'Features List',
  'Call-to-Action',
  'Footer'
];

const advancedFeatures = [
  'Custom Animations',
  'Interactive Elements',
  'Advanced Forms',
  'Payment Integration',
  'User Authentication',
  'Content Management',
  'E-commerce Features',
  'Booking System',
  'Live Chat',
  'Analytics Dashboard',
  'SEO Optimization',
  'Performance Optimization',
  'Mobile App Integration',
  'API Integration',
  'Third-party Services'
];

const colorSchemes = [
  { id: 'blue', name: 'Ocean Blue', color: '#3B82F6' },
  { id: 'green', name: 'Forest Green', color: '#10B981' },
  { id: 'purple', name: 'Royal Purple', color: '#8B5CF6' },
  { id: 'orange', name: 'Sunset Orange', color: '#F59E0B' },
  { id: 'pink', name: 'Rose Pink', color: '#EC4899' },
  { id: 'gray', name: 'Modern Gray', color: '#6B7280' }
];

export default function BoltDIY() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null);
  const [websiteName, setWebsiteName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState([500]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  // Freestyle-specific state
  const [selectedLayout, setSelectedLayout] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedAdvancedFeatures, setSelectedAdvancedFeatures] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [additionalInput, setAdditionalInput] = useState('');

  const handleTemplateSelect = (template: WebsiteTemplate) => {
    setSelectedTemplate(template);
    
    if (template.id === 'freestyle') {
      // Initialize Freestyle with default sections
      setSelectedSections(['Hero Section', 'About Us', 'Contact Form']);
      setSelectedLayout('single-page');
      setSelectedFeatures(['Complete Customization', 'Unique Design', 'Flexible Layout', 'Custom Features']);
    } else {
      setSelectedFeatures(template.features);
      // Reset Freestyle-specific options
      setSelectedSections([]);
      setSelectedLayout('');
      setSelectedAdvancedFeatures([]);
      setCustomRequirements('');
    }
    
    setStep(2);
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSectionToggle = (section: string) => {
    setSelectedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleAdvancedFeatureToggle = (feature: string) => {
    setSelectedAdvancedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const calculatePrice = () => {
    if (!selectedTemplate) return 0;
    
    let basePrice = selectedTemplate.price;
    
    if (selectedTemplate.id === 'freestyle') {
      // Freestyle pricing: base + sections + advanced features
      const sectionPrice = selectedSections.length * 25;
      const advancedFeaturePrice = selectedAdvancedFeatures.length * 50;
      return basePrice + sectionPrice + advancedFeaturePrice;
    } else {
      // Standard template pricing
      const additionalFeatures = selectedFeatures.length - selectedTemplate.features.length;
      return basePrice + (additionalFeatures * 50);
    }
  };

  const handleGenerate = async () => {
    if (!selectedTemplate || !websiteName) {
      showError('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Call the API to start generation
      const response = await fetch('/api/bolt-diy/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: selectedTemplate,
          websiteName,
          businessDescription,
          designStyle: selectedStyle,
          colorScheme: selectedColor,
          features: selectedFeatures,
          budget: budget[0],
          // Freestyle-specific data
          layout: selectedLayout,
          sections: selectedSections,
          advancedFeatures: selectedAdvancedFeatures,
          customRequirements: customRequirements,
          additionalInput: additionalInput // Include additional input
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start generation');
      }

      const data = await response.json();
      
      if (data.success) {
        // Simulate generation progress with real steps
        const steps = data.generationSteps || [
          'Analyzing requirements...',
          'Designing layout...',
          'Building components...',
          'Optimizing performance...',
          'Finalizing website...'
        ];

        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setGenerationProgress(((i + 1) / steps.length) * 100);
        }

        showSuccess('Website Generated!', `Your ${selectedTemplate.name} is ready for launch!`);
        setStep(4);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Generation error:', error);
      showError('Generation Failed', 'There was an error generating your website. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    showSuccess('Download Started', 'Your website files are being prepared...');
  };

  const handleDeploy = () => {
    showSuccess('Deployment Started', 'Your website is being deployed to production...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header 
        title="Starter Kit" 
        showSettings={true} 
        showPreview={true}
        onSettingsClick={() => console.log('Settings clicked')}
        onPreviewClick={() => console.log('Preview clicked')}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Badge className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 shadow-lg">
                🎨 DIY Web Development
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional Templates with{" "}
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI-Assisted Customization
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              70% less cost than custom development • Agency-quality results • Full creative control
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                variant="gradient"
                size="xl" 
                onClick={() => setStep(1)}
                className="group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
              >
                Start Building Now
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link href="/">
                <Button 
                  variant="outlineGradient" 
                  size="xl"
                  className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
                >
                  Try AI Agent Service
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">70% Less</div>
                  <div className="text-sm text-gray-300">Than Custom Dev</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">40+</div>
                  <div className="text-sm text-gray-300">Professional Templates</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">AI-Assisted</div>
                  <div className="text-sm text-gray-300">Customization</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">Full Control</div>
                  <div className="text-sm text-gray-300">Creative Freedom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-muted-foreground'}>
              Choose Template
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-muted-foreground'}>
              Customize
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-muted-foreground'}>
              Generate
            </span>
            <span className={step >= 4 ? 'text-blue-600 font-medium' : 'text-muted-foreground'}>
              Launch
            </span>
          </div>
        </div>

        {/* Step 1: Template Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Choose Your Website Template
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select from our curated collection of professional templates, 
                each designed to convert and engage your audience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websiteTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.popular && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                          <Star className="mr-1 h-3 w-3" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-32 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-foreground">
                          ${template.price}
                        </span>
                        <Button size="sm">
                          <ArrowRight className="mr-1 h-4 w-4" />
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Customization */}
        {step === 2 && selectedTemplate && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Customize Your Website
              </h1>
              <p className="text-muted-foreground">
                Personalize your {selectedTemplate.name} to match your brand and requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Customization Options */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Website Name
                      </label>
                      <Input
                        placeholder="Enter your website name"
                        value={websiteName}
                        onChange={(e) => setWebsiteName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Business Description
                      </label>
                      <Textarea
                        placeholder="Describe your business and what you do..."
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      Design & Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Design Style
                      </label>
                      <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a design style" />
                        </SelectTrigger>
                        <SelectContent>
                          {designStyles.map((style) => (
                            <SelectItem key={style.id} value={style.id}>
                              <div>
                                <div className="font-medium">{style.name}</div>
                                <div className="text-sm text-muted-foreground">{style.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Color Scheme
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {colorSchemes.map((color) => (
                          <div
                            key={color.id}
                            className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                              selectedColor === color.id ? 'border-blue-500' : 'border-border'
                            }`}
                            onClick={() => setSelectedColor(color.id)}
                          >
                            <div
                              className="w-full h-8 rounded"
                              style={{ backgroundColor: color.color }}
                            />
                            <div className="text-xs text-center mt-1 text-foreground">{color.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5" />
                      Features & Add-ons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Contact Forms',
                        'Newsletter Signup',
                        'Social Media Integration',
                        'Blog Section',
                        'Portfolio Gallery',
                        'Testimonials',
                        'FAQ Section',
                        'Live Chat',
                        'Analytics Dashboard',
                        'SEO Optimization'
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-3">
                          <Checkbox
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => handleFeatureToggle(feature)}
                          />
                          <label htmlFor={feature} className="text-sm font-medium text-foreground">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Freestyle-specific options */}
                {selectedTemplate?.id === 'freestyle' && (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Globe className="mr-2 h-5 w-5" />
                          Layout & Structure
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Website Layout
                          </label>
                          <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your layout" />
                            </SelectTrigger>
                            <SelectContent>
                              {layoutOptions.map((layout) => (
                                <SelectItem key={layout.id} value={layout.id}>
                                  <div>
                                    <div className="font-medium">{layout.name}</div>
                                    <div className="text-sm text-muted-foreground">{layout.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Palette className="mr-2 h-5 w-5" />
                          Page Sections
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {pageSections.map((section) => (
                            <div key={section} className="flex items-center space-x-3">
                              <Checkbox
                                id={section}
                                checked={selectedSections.includes(section)}
                                onCheckedChange={() => handleSectionToggle(section)}
                              />
                              <label htmlFor={section} className="text-sm font-medium text-foreground">
                                {section}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Zap className="mr-2 h-5 w-5" />
                          Advanced Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {advancedFeatures.map((feature) => (
                            <div key={feature} className="flex items-center space-x-3">
                              <Checkbox
                                id={feature}
                                checked={selectedAdvancedFeatures.includes(feature)}
                                onCheckedChange={() => handleAdvancedFeatureToggle(feature)}
                              />
                              <label htmlFor={feature} className="text-sm font-medium text-foreground">
                                {feature}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Sparkles className="mr-2 h-5 w-5" />
                          Custom Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Special Requirements
                          </label>
                          <Textarea
                            placeholder="Describe any special features, integrations, or requirements for your custom website..."
                            value={customRequirements}
                            onChange={(e) => setCustomRequirements(e.target.value)}
                            rows={4}
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            Tell us about any specific functionality, integrations, or unique features you need.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Budget Range
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>${budget[0]}</span>
                        <span>Maximum Budget</span>
                      </div>
                      <Slider
                        value={budget}
                        onValueChange={setBudget}
                        max={2000}
                        min={100}
                        step={50}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Preview & Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Preview will appear here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Template:</span>
                        <span className="font-medium">{selectedTemplate.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Features:</span>
                        <span className="font-medium">{selectedFeatures.length}</span>
                      </div>
                      {selectedTemplate?.id === 'freestyle' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Layout:</span>
                            <span className="font-medium">{selectedLayout || 'Not selected'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sections:</span>
                            <span className="font-medium">{selectedSections.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Advanced Features:</span>
                            <span className="font-medium">{selectedAdvancedFeatures.length}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Style:</span>
                        <span className="font-medium">{selectedStyle || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">${budget[0]}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Price:</span>
                        <span className="text-blue-600">${calculatePrice()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    className="flex-1"
                    disabled={!websiteName}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Generation */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                What do you want to build?
              </h1>
              <p className="text-gray-600">
                Create stunning apps & websites by chatting with AI.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                {isGenerating ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">
                          AI is building your website...
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${generationProgress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {Math.round(generationProgress)}% Complete
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Chat-like interface */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-600">AI</span>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">
                            Hi! I'm ready to help you build your website. Here's what I understand about your project:
                          </p>
                        </div>
                      </div>

                      {selectedTemplate && (
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium text-blue-600">You</span>
                          </div>
                          <div className="flex-1 bg-blue-50 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="font-medium text-gray-900">Project Requirements:</div>
                              
                              <div className="space-y-2 text-sm">
                                <div><strong>Template:</strong> {selectedTemplate.name}</div>
                                <div><strong>Website Name:</strong> {websiteName}</div>
                                {businessDescription && (
                                  <div><strong>Business Description:</strong> {businessDescription}</div>
                                )}
                                {selectedStyle && (
                                  <div><strong>Design Style:</strong> {selectedStyle}</div>
                                )}
                                {selectedColor && (
                                  <div><strong>Color Scheme:</strong> {selectedColor}</div>
                                )}
                                <div><strong>Budget Range:</strong> ${budget[0]}</div>
                                <div><strong>Selected Features:</strong> {selectedFeatures.join(', ')}</div>
                              </div>

                              {selectedTemplate?.id === 'freestyle' && (
                                <div className="space-y-2 text-sm border-t pt-2">
                                  <div className="font-medium text-gray-900">Freestyle Customization:</div>
                                  <div><strong>Layout Type:</strong> {selectedLayout}</div>
                                  <div><strong>Page Sections:</strong> {selectedSections.join(', ')}</div>
                                  <div><strong>Advanced Features:</strong> {selectedAdvancedFeatures.join(', ')}</div>
                                  {customRequirements && (
                                    <div><strong>Custom Requirements:</strong> {customRequirements}</div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-600">AI</span>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">
                            Perfect! I have all the details. Now, please add any additional requirements or specific features you'd like me to include in your website.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Input area */}
                    <div className="border-t pt-4">
                      <div className="flex space-x-3">
                        <div className="flex-1">
                          <Textarea
                            placeholder="Describe what you want to build... (e.g., 'I want a modern restaurant website with online ordering and a menu gallery')"
                            className="resize-none"
                            rows={3}
                            value={additionalInput}
                            onChange={(e) => setAdditionalInput(e.target.value)}
                          />
                        </div>
                        <Button 
                          onClick={handleGenerate}
                          className="px-6"
                          size="lg"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Be specific about features, design preferences, and functionality you need.
                      </p>
                    </div>

                    {/* Quick suggestions */}
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Quick suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Add a contact form",
                          "Include a blog section",
                          "Make it mobile-friendly",
                          "Add animations",
                          "Include a portfolio",
                          "Add payment integration"
                        ].map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              // Add suggestion to textarea
                              const textarea = document.querySelector('textarea');
                              if (textarea) {
                                textarea.value += ` ${suggestion}`;
                              }
                            }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Launch */}
        {step === 4 && (
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Website is Ready!
              </h1>
              <p className="text-gray-600">
                Congratulations! Your custom website has been generated successfully.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Eye className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Preview Website</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      See your website in action
                    </p>
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Download className="h-8 w-8 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Download Files</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get your website source code
                    </p>
                    <Button variant="outline" className="w-full" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Globe className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Deploy Live</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Launch your website online
                    </p>
                    <Button className="w-full" onClick={handleDeploy}>
                      <Globe className="mr-2 h-4 w-4" />
                      Deploy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Create Another
              </Button>
              <Button>
                <Share2 className="mr-2 h-4 w-4" />
                Share Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 