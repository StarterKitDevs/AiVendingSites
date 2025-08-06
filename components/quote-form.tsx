"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, CreditCard, CheckCircle, Calculator, Upload, X, Image as ImageIcon, Download, Mail, Share2, Lightbulb } from 'lucide-react'
import { showError, showSuccess } from '@/lib/toast'
import { cn } from '@/lib/utils'
import React from 'react'

const formSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  email: z.string().email('Valid email is required'),
  websiteType: z.enum(['business', 'portfolio', 'blog', 'ecommerce', 'restaurant', 'saas']),
  features: z.array(z.string()),
  designStyle: z.enum(['modern', 'classic', 'minimalist']),
  budget: z.number().min(150).max(500),
  projectDescription: z.string().optional(),
  images: z.array(z.string()).max(4, 'Maximum 4 images allowed')
})

type FormData = z.infer<typeof formSchema>

const websiteTypes = [
  { value: 'business', label: 'Business Website', price: 150 },
  { value: 'portfolio', label: 'Portfolio/Personal', price: 100 },
  { value: 'blog', label: 'Blog/News Site', price: 125 },
  { value: 'ecommerce', label: 'E-commerce Store', price: 200 },
  { value: 'restaurant', label: 'Restaurant', price: 175 },
  { value: 'saas', label: 'SaaS Platform', price: 250 }
]

const features = [
  { id: 'analytics', label: 'Analytics Setup', price: 30 },
  { id: 'responsive', label: 'Mobile Responsive', price: 0 },
  { id: 'ssl', label: 'SSL Security', price: 0 },
  { id: 'cms', label: 'Content Management', price: 75 }
]

const designStyles = [
  { value: 'modern', label: 'Modern', description: 'Clean, minimalist with bold typography' },
  { value: 'classic', label: 'Classic', description: 'Traditional, professional layout' },
  { value: 'minimalist', label: 'Minimalist', description: 'Simple, focused on content' }
]

export default function QuoteForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(250)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [generationStep, setGenerationStep] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  
  // State for additional text boxes
  const [businessGoals, setBusinessGoals] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [competitors, setCompetitors] = useState('')
  const [specialRequirements, setSpecialRequirements] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 250,
      features: ['responsive', 'ssl'],
      images: []
    }
  })

  const watchedFeatures = watch('features')
  const watchedBudget = watch('budget')
  const watchedWebsiteType = watch('websiteType')
  const watchedDesignStyle = watch('designStyle')
  const watchedBusinessName = watch('businessName')
  const watchedEmail = watch('email')
  const watchedProjectDescription = watch('projectDescription')

  // Calculate estimated price based on selections
  const calculatePrice = () => {
    let totalPrice = watchedBudget || 250

    // Add feature prices
    watchedFeatures?.forEach(featureId => {
      const feature = features.find(f => f.id === featureId)
      if (feature) {
        totalPrice += feature.price
      }
    })

    setEstimatedPrice(totalPrice)
  }

  // Update price when selections change
  useEffect(() => {
    calculatePrice()
  }, [watchedBudget, watchedFeatures])

  const handleFeatureToggle = (featureId: string) => {
    const currentFeatures = watchedFeatures || []
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(id => id !== featureId)
      : [...currentFeatures, featureId]
    
    setValue('features', newFeatures)
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setShowPaymentModal(true)
    
    try {
      // Step 1: Create project with comprehensive data
      setGenerationStep('Creating your project...')
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_name: data.businessName,
          email: data.email,
          website_type: data.websiteType,
          features: data.features,
          design_style: data.designStyle,
          budget: data.budget,
          estimated_price: estimatedPrice,
          project_description: data.projectDescription,
          business_goals: businessGoals,
          target_audience: targetAudience,
          competitors: competitors,
          special_requirements: specialRequirements,
          images: uploadedImages
        }),
      })

      if (!projectResponse.ok) {
        throw new Error('Failed to create project')
      }

      const projectData = await projectResponse.json()
      showSuccess('Project Created! 🎉', 'Your project has been created successfully.')

      // Step 2: Redirect to payment or dashboard
      if (projectData.payment_url) {
        window.location.href = projectData.payment_url
      } else {
        setPaymentSuccess(true)
        setTimeout(() => {
          window.location.href = `/dashboard/${projectData.id}`
        }, 3000)
      }

    } catch (error) {
      console.error('Project creation error:', error)
      showError('Project Creation Failed', 'Failed to create project. Please try again.')
    } finally {
      setIsLoading(false)
      setShowPaymentModal(false)
    }
  }

  if (paymentSuccess) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-lg text-gray-300 mb-8">
              Your project has been created and is being processed. You'll be redirected to your dashboard shortly.
            </p>
            <div className="animate-pulse">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form-section" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get Your Custom Quote</h2>
            <p className="text-xl text-gray-300">
              Tell us about your project and get an instant price estimate
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form - Left 2/3 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Details Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="businessName" className="text-white">Business Name *</Label>
                      <Input
                        id="businessName"
                        {...register('businessName')}
                        placeholder="Your Business Name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.businessName && (
                        <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your@email.com"
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Range Slider */}
                  <div>
                    <Label className="text-white">Budget Range: ${watchedBudget}</Label>
                    <Slider
                      value={[watchedBudget || 250]}
                      onValueChange={(value) => setValue('budget', value[0])}
                      max={500}
                      min={150}
                      step={50}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-300 mt-1">
                      <span>$150</span>
                      <span>$500</span>
                    </div>
                  </div>

                  {/* Website Type */}
                  <div>
                    <Label htmlFor="websiteType" className="text-white">Website Type *</Label>
                    <Select onValueChange={(value) => setValue('websiteType', value as any)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white">
                        <SelectValue placeholder="Select website type" />
                      </SelectTrigger>
                      <SelectContent>
                        {websiteTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{type.label}</span>
                              <Badge variant="secondary" className="ml-2">${type.price}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <Label htmlFor="projectDescription" className="text-white">Project Description</Label>
                    <Textarea
                      id="projectDescription"
                      {...register('projectDescription')}
                      placeholder="Describe your project..."
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                    />
                    <div className="flex items-center mt-2 text-sm text-gray-400">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      <span>Tips: Include your business goals, target audience, and any specific features you need</span>
                    </div>
                    <div className="text-right text-sm text-gray-400 mt-1">
                      {watchedProjectDescription?.length || 0}/2000
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features & Add-ons Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Features & Add-ons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={feature.id}
                          checked={watchedFeatures?.includes(feature.id) || false}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                          className="rounded"
                        />
                        <Label htmlFor={feature.id} className="text-white cursor-pointer">
                          {feature.label}
                        </Label>
                      </div>
                      <Badge variant={feature.price === 0 ? "secondary" : "default"} className="ml-2">
                        {feature.price === 0 ? 'Included' : `+$${feature.price}`}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Estimate Sidebar - Right 1/3 */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">Project Estimate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Total Price */}
                  <div className="text-center p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <div className="text-4xl font-bold text-white">${estimatedPrice}</div>
                    <div className="text-sm text-blue-100">One-time payment</div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Base website</span>
                      <span className="text-white font-semibold">${watchedBudget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Mobile Responsive</span>
                      <span className="text-green-400">Included</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">SSL Security</span>
                      <span className="text-green-400">Included</span>
                    </div>
                    {watchedFeatures?.includes('analytics') && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Analytics Setup</span>
                        <span className="text-white font-semibold">+$30</span>
                      </div>
                    )}
                    {watchedFeatures?.includes('cms') && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Content Management</span>
                        <span className="text-white font-semibold">+$75</span>
                      </div>
                    )}
                  </div>

                  {/* What's Included */}
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="font-semibold text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        Professional Design
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        Responsive Layout
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        SEO Optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        Hosting & SSL
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        1 Year Support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        Image Processing
                      </li>
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Start Project - ${estimatedPrice}
                        <CreditCard className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 