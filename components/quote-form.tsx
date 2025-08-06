"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, CreditCard, CheckCircle, Upload, X, Lightbulb, AlertCircle } from 'lucide-react'

// Type definitions
interface WebsiteType {
  value: string;
  label: string;
  price: number;
}

interface Feature {
  id: string;
  label: string;
  price: number;
}

interface DesignStyle {
  value: string;
  title: string;
  description: string;
}

interface FormErrors {
  businessName?: string;
  email?: string;
  websiteType?: string;
}

interface FormFeatures {
  responsive: boolean;
  ssl: boolean;
  analytics: boolean;
  contentManagement: boolean;
  [key: string]: boolean; // Index signature for dynamic access
}

interface FormData {
  businessName: string;
  email: string;
  budget: number;
  websiteType: string;
  designStyle: string;
  projectDescription: string;
  businessGoals: string;
  targetAudience: string;
  competitors: string;
  specialRequirements: string;
  features: FormFeatures;
  images: string[];
}

const websiteTypes: WebsiteType[] = [
  { value: 'business', label: 'Business Website', price: 150 },
  { value: 'portfolio', label: 'Portfolio/Personal', price: 100 },
  { value: 'blog', label: 'Blog/News Site', price: 125 },
  { value: 'ecommerce', label: 'E-commerce Store', price: 200 },
  { value: 'restaurant', label: 'Restaurant', price: 175 },
  { value: 'saas', label: 'SaaS Platform', price: 250 }
]

const features: Feature[] = [
  { id: 'analytics', label: 'Analytics Setup', price: 30 },
  { id: 'responsive', label: 'Mobile Responsive', price: 0 },
  { id: 'ssl', label: 'SSL Security', price: 0 },
  { id: 'contentManagement', label: 'Content Management', price: 75 }
]

const designStyles: DesignStyle[] = [
  { value: 'modern', title: 'Modern', description: 'Clean, minimalist with bold typography' },
  { value: 'classic', title: 'Classic', description: 'Traditional, professional layout' },
  { value: 'minimalist', title: 'Minimalist', description: 'Simple, focused on content' }
]

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    email: '',
    budget: 250,
    websiteType: '',
    designStyle: 'modern',
    projectDescription: '',
    businessGoals: '',
    targetAudience: '',
    competitors: '',
    specialRequirements: '',
    features: {
      responsive: true,
      ssl: true,
      analytics: false,
      contentManagement: false
    },
    images: []
  })

  const [estimate, setEstimate] = useState<number>(250)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitMessage, setSubmitMessage] = useState<string>('')
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)

  // Calculate estimate with proper updates
  const calculateEstimate = useCallback(() => {
    let total = formData.budget
    if (formData.features?.analytics) total += 30
    if (formData.features?.contentManagement) total += 75
    setEstimate(total)
  }, [formData.budget, formData.features])

  useEffect(() => {
    calculateEstimate()
  }, [calculateEstimate])

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required'
    if (!formData.email.trim()) newErrors.email = 'Email address is required'
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email address'
    if (!formData.websiteType) newErrors.websiteType = 'Please select a website type'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle budget slider change
  const handleBudgetChange = (value: number[]) => {
    const newBudget = parseInt(value[0].toString())
    setFormData(prev => ({ ...prev, budget: newBudget }))
  }

  // Handle feature checkbox changes
  const handleFeatureChange = (featureName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: checked
      }
    }))
  }

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    if (formData.images.length >= 4) {
      setSubmitMessage('Maximum 4 images allowed')
      return
    }

    const newImages: string[] = []
    for (let i = 0; i < files.length && formData.images.length + newImages.length < 4; i++) {
      const file = files[i]
      
      if (!file.type.startsWith('image/')) {
        setSubmitMessage('Please upload only image files')
        continue
      }

      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage('Please upload images smaller than 5MB')
        continue
      }

      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string)
          if (newImages.length === Math.min(files.length, 4 - formData.images.length)) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...newImages]
            }))
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitMessage('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: estimate
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitMessage('Quote submitted successfully! We\'ll contact you soon.')
        setPaymentSuccess(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            businessName: '',
            email: '',
            budget: 250,
            websiteType: '',
            designStyle: 'modern',
            projectDescription: '',
            businessGoals: '',
            targetAudience: '',
            competitors: '',
            specialRequirements: '',
            features: {
              responsive: true,
              ssl: true,
              analytics: false,
              contentManagement: false
            },
            images: []
          })
          setPaymentSuccess(false)
          setSubmitMessage('')
        }, 3000)
      } else {
        setSubmitMessage('Error submitting quote. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (paymentSuccess) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Quote Submitted Successfully!</h2>
            <p className="text-lg text-gray-300 mb-8">
              Thank you for your interest! We'll review your project details and contact you within 24 hours with a detailed proposal.
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

          <form onSubmit={handleSubmit}>
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
                          value={formData.businessName}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                          placeholder="Your Business Name"
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        {errors.businessName && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.businessName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Budget Range Slider */}
                    <div>
                      <Label className="text-white">Budget Range: ${formData.budget}</Label>
                      <Slider
                        value={[formData.budget]}
                        onValueChange={handleBudgetChange}
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
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, websiteType: value }))}>
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
                      {errors.websiteType && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.websiteType}
                        </p>
                      )}
                    </div>

                    {/* Design Style Selection */}
                    <div>
                      <Label className="text-white">Design Style *</Label>
                      <div className="grid grid-cols-1 gap-3 mt-2">
                        {designStyles.map((style) => (
                          <div
                            key={style.value}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              formData.designStyle === style.value
                                ? 'border-blue-500 bg-blue-500/20'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, designStyle: style.value }))}
                          >
                            <div className="flex items-start space-x-3">
                              <input
                                type="radio"
                                name="designStyle"
                                value={style.value}
                                checked={formData.designStyle === style.value}
                                onChange={(e) => setFormData(prev => ({ ...prev, designStyle: e.target.value }))}
                                className="mt-1"
                              />
                              <div>
                                <div className="font-medium text-white">{style.title}</div>
                                <div className="text-sm text-gray-300">{style.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <Label htmlFor="projectDescription" className="text-white">Project Description</Label>
                      <Textarea
                        id="projectDescription"
                        value={formData.projectDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                        placeholder="Describe your project..."
                        className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                      />
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        <span>Tips: Include your business goals, target audience, and any specific features you need</span>
                      </div>
                      <div className="text-right text-sm text-gray-400 mt-1">
                        {formData.projectDescription?.length || 0}/2000
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Project Details */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Additional Project Details (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessGoals" className="text-white">Business Goals</Label>
                        <Textarea
                          id="businessGoals"
                          value={formData.businessGoals}
                          onChange={(e) => setFormData(prev => ({ ...prev, businessGoals: e.target.value }))}
                          placeholder="What are your main business objectives?"
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="targetAudience" className="text-white">Target Audience</Label>
                        <Textarea
                          id="targetAudience"
                          value={formData.targetAudience}
                          onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                          placeholder="Describe your ideal customers..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="competitors" className="text-white">Competitors (Optional)</Label>
                        <Textarea
                          id="competitors"
                          value={formData.competitors}
                          onChange={(e) => setFormData(prev => ({ ...prev, competitors: e.target.value }))}
                          placeholder="List competitor websites you like or want to differentiate from..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="specialRequirements" className="text-white">Special Requirements</Label>
                        <Textarea
                          id="specialRequirements"
                          value={formData.specialRequirements}
                          onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                          placeholder="Any specific features, integrations, or requirements..."
                          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                      <Label className="text-white">Project Images (Optional)</Label>
                      <div className="mt-2">
                        <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-colors">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={formData.images.length >= 4}
                          />
                          <label
                            htmlFor="image-upload"
                            className={`cursor-pointer flex flex-col items-center space-y-2 ${
                              formData.images.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <Upload className="h-8 w-8 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                Click to upload images
                              </p>
                              <p className="text-xs text-gray-400">
                                {formData.images.length}/4 images • Max 5MB each
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Image Previews */}
                        {formData.images.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image}
                                  alt={`Project image ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
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
                            checked={formData.features[feature.id as keyof FormFeatures] || false}
                            onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
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
                      <div className="text-4xl font-bold text-white">${estimate}</div>
                      <div className="text-sm text-blue-100">One-time payment</div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Base website</span>
                        <span className="text-white font-semibold">${formData.budget}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Mobile Responsive</span>
                        <span className="text-green-400">Included</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">SSL Security</span>
                        <span className="text-green-400">Included</span>
                      </div>
                      {formData.features?.analytics && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Analytics Setup</span>
                          <span className="text-white font-semibold">+$30</span>
                        </div>
                      )}
                      {formData.features?.contentManagement && (
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

                    {/* Submit Message */}
                    {submitMessage && (
                      <div className={`p-3 rounded-lg text-sm ${
                        submitMessage.includes('success') 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {submitMessage}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Start Project - ${estimate}
                          <CreditCard className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 