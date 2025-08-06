'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  LineChart, 
  TrendingUp, 
  Users, 
  Eye, 
  Target,
  Globe,
  Smartphone,
  Monitor,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyticsData {
  google_analytics_config?: {
    property_id: string
    tracking_id: string
    measurement_id: string
    enhanced_ecommerce: boolean
    custom_dimensions: string[]
    goals_configured: string[]
    audiences_created: string[]
  }
  conversion_tracking?: {
    conversion_events: Array<{
      name: string
      description: string
      value: number
    }>
    ecommerce_tracking: boolean
    custom_conversions: number
    attribution_model: string
    conversion_window: string
  }
  performance_monitoring?: {
    core_web_vitals: {
      largest_contentful_paint: string
      first_input_delay: string
      cumulative_layout_shift: string
    }
    performance_alerts: string[]
    monitoring_tools: string[]
    uptime_monitoring: boolean
    error_tracking: boolean
    performance_budget: {
      total_page_size: string
      javascript_bundle: string
      css_bundle: string
      images_optimized: boolean
    }
  }
  seo_tracking?: {
    search_console_configured: boolean
    keyword_tracking: string[]
    ranking_monitoring: boolean
    backlink_tracking: boolean
    technical_seo_monitoring: string[]
    content_performance: boolean
    local_seo: boolean
  }
  social_tracking?: {
    social_platforms: string[]
    social_sharing_tracking: boolean
    utm_parameters: Record<string, string>
    social_conversion_tracking: boolean
    engagement_metrics: string[]
  }
  analytics_strategy?: {
    analytics_tools: string[]
    key_metrics: string[]
    conversion_goals: string[]
    reporting_schedule: Record<string, string>
    optimization_recommendations: string[]
  }
  tracking_codes_installed?: boolean
  analytics_dashboard_url?: string
  analytics_completed?: boolean
  analytics_timestamp?: string
}

interface AnalyticsDashboardProps {
  projectId?: number
  analyticsData?: AnalyticsData
  className?: string
}

export default function AnalyticsDashboard({ 
  projectId = 1, 
  analyticsData,
  className 
}: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(analyticsData || null)
  const [isLoading, setIsLoading] = useState(!analyticsData)
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data for demonstration
  const mockAnalyticsData: AnalyticsData = {
    google_analytics_config: {
      property_id: "G-123456789",
      tracking_id: "GA4-123-20241201",
      measurement_id: "G-123ABC456",
      enhanced_ecommerce: true,
      custom_dimensions: ["User Type", "Traffic Source", "Device Category", "Geographic Location"],
      goals_configured: ["Contact Form Submission", "Newsletter Signup", "Page Views > 3", "Session Duration > 2min"],
      audiences_created: ["Returning Visitors", "High-Value Users", "Mobile Users", "Engaged Users"]
    },
    conversion_tracking: {
      conversion_events: [
        { name: "form_submission", description: "Contact form submitted", value: 10.00 },
        { name: "newsletter_signup", description: "Newsletter subscription", value: 5.00 },
        { name: "phone_call", description: "Phone number clicked", value: 15.00 },
        { name: "email_click", description: "Email address clicked", value: 8.00 }
      ],
      ecommerce_tracking: true,
      custom_conversions: 4,
      attribution_model: "data_driven",
      conversion_window: "30_days"
    },
    performance_monitoring: {
      core_web_vitals: {
        largest_contentful_paint: "< 2.5s",
        first_input_delay: "< 100ms",
        cumulative_layout_shift: "< 0.1"
      },
      performance_alerts: [
        "Page load time > 3 seconds",
        "Error rate > 1%",
        "Bounce rate > 70%",
        "Server response time > 500ms"
      ],
      monitoring_tools: [
        "Google PageSpeed Insights",
        "Google Search Console",
        "Lighthouse CI",
        "Real User Monitoring (RUM)"
      ],
      uptime_monitoring: true,
      error_tracking: true,
      performance_budget: {
        total_page_size: "< 3MB",
        javascript_bundle: "< 500KB",
        css_bundle: "< 100KB",
        images_optimized: true
      }
    },
    seo_tracking: {
      search_console_configured: true,
      keyword_tracking: ["AI Web Agency", "Website Development", "Digital Marketing", "SEO Services"],
      ranking_monitoring: true,
      backlink_tracking: true,
      technical_seo_monitoring: ["XML sitemap", "Robots.txt", "Meta tags", "Schema markup", "Page speed", "Mobile-friendliness"],
      content_performance: true,
      local_seo: true
    },
    social_tracking: {
      social_platforms: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
      social_sharing_tracking: true,
      utm_parameters: {
        facebook: "utm_source=facebook&utm_medium=social&utm_campaign=website",
        instagram: "utm_source=instagram&utm_medium=social&utm_campaign=website",
        twitter: "utm_source=twitter&utm_medium=social&utm_campaign=website",
        linkedin: "utm_source=linkedin&utm_medium=social&utm_campaign=website"
      },
      social_conversion_tracking: true,
      engagement_metrics: ["Social shares", "Social comments", "Social referral traffic", "Social conversion rate"]
    },
    analytics_strategy: {
      analytics_tools: ["Google Analytics 4", "Google Search Console", "Hotjar", "Google Tag Manager", "Facebook Pixel"],
      key_metrics: ["Sessions", "Users", "Page Views", "Bounce Rate", "Conversion Rate", "Average Session Duration"],
      conversion_goals: ["Contact Form Submissions", "Newsletter Signups", "Phone Calls", "Email Clicks", "Service Inquiries"],
      reporting_schedule: {
        daily: "Performance monitoring alerts",
        weekly: "Traffic and engagement summary",
        monthly: "Comprehensive analytics report",
        quarterly: "Business growth analysis and recommendations"
      },
      optimization_recommendations: [
        "Optimize high-traffic pages for better conversion",
        "Improve page load speed for mobile users",
        "Create content for top-performing keywords",
        "A/B test call-to-action buttons",
        "Enhance user experience on high-bounce pages"
      ]
    },
    tracking_codes_installed: true,
    analytics_dashboard_url: "https://analytics.google.com/analytics/web/#/p123456789",
    analytics_completed: true,
    analytics_timestamp: new Date().toISOString()
  }

  useEffect(() => {
    if (!data) {
      // Simulate loading analytics data
      setTimeout(() => {
        setData(mockAnalyticsData)
        setIsLoading(false)
      }, 1000)
    }
  }, [data])

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    )
  }

  const getMetricCard = (title: string, value: string | number, icon: React.ReactNode, trend?: string) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {timeRange}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {data?.analytics_dashboard_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={data.analytics_dashboard_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View GA
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getMetricCard("Total Sessions", "12,847", <BarChart3 className="h-4 w-4" />, "+12.5% from last week")}
        {getMetricCard("Active Users", "8,234", <Users className="h-4 w-4" />, "+8.2% from last week")}
        {getMetricCard("Page Views", "45,123", <Eye className="h-4 w-4" />, "+15.3% from last week")}
        {getMetricCard("Conversion Rate", "3.2%", <Target className="h-4 w-4" />, "+0.8% from last week")}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { source: "Organic Search", percentage: 45, color: "bg-blue-500" },
                    { source: "Direct", percentage: 25, color: "bg-green-500" },
                    { source: "Social Media", percentage: 20, color: "bg-purple-500" },
                    { source: "Referral", percentage: 10, color: "bg-orange-500" }
                  ].map((item) => (
                    <div key={item.source} className="flex items-center justify-between">
                      <span className="text-sm">{item.source}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={cn("h-2 rounded-full", item.color)} 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Device Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { device: "Desktop", percentage: 55 },
                    { device: "Mobile", percentage: 40 },
                    { device: "Tablet", percentage: 5 }
                  ].map((item) => (
                    <div key={item.device} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.device === "Desktop" && <Monitor className="h-4 w-4" />}
                        {item.device === "Mobile" && <Smartphone className="h-4 w-4" />}
                        {item.device === "Tablet" && <Monitor className="h-4 w-4" />}
                        <span className="text-sm">{item.device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Status */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics Configuration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.google_analytics_config && (
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.tracking_codes_installed || false)}
                    <span>Google Analytics</span>
                    <Badge variant="outline">{data.google_analytics_config.property_id}</Badge>
                  </div>
                )}
                {data?.conversion_tracking && (
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.conversion_tracking.custom_conversions > 0)}
                    <span>Conversion Tracking</span>
                    <Badge variant="outline">{data.conversion_tracking.custom_conversions} events</Badge>
                  </div>
                )}
                {data?.performance_monitoring && (
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.performance_monitoring.uptime_monitoring)}
                    <span>Performance Monitoring</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                )}
                {data?.seo_tracking && (
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.seo_tracking.search_console_configured)}
                    <span>SEO Tracking</span>
                    <Badge variant="outline">Configured</Badge>
                  </div>
                )}
                {data?.social_tracking && (
                  <div className="flex items-center gap-2">
                    {getStatusIcon(data.social_tracking.social_sharing_tracking)}
                    <span>Social Tracking</span>
                    <Badge variant="outline">{data.social_tracking.social_platforms.length} platforms</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Traffic trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { page: "/", views: 5420, change: "+12%" },
                    { page: "/services", views: 3240, change: "+8%" },
                    { page: "/about", views: 2150, change: "+15%" },
                    { page: "/contact", views: 1890, change: "+5%" }
                  ].map((item) => (
                    <div key={item.page} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.page}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.views.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversions Tab */}
        <TabsContent value="conversions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.conversion_tracking?.conversion_events.map((event) => (
                    <div key={event.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.description}</p>
                        <p className="text-sm text-muted-foreground">{event.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${event.value.toFixed(2)}</p>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Page Views", count: 45123, percentage: 100 },
                    { stage: "Engagement", count: 22561, percentage: 50 },
                    { stage: "Interest", count: 11280, percentage: 25 },
                    { stage: "Conversion", count: 1444, percentage: 3.2 }
                  ].map((item) => (
                    <div key={item.stage} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.stage}</span>
                        <span>{item.count.toLocaleString()} ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.performance_monitoring?.core_web_vitals && Object.entries(data.performance_monitoring.core_web_vitals).map(([metric, value]) => (
                    <div key={metric} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data?.performance_monitoring?.performance_alerts.map((alert) => (
                    <div key={alert} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{alert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data?.seo_tracking?.keyword_tracking.map((keyword) => (
                    <div key={keyword} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{keyword}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">#12</Badge>
                        <span className="text-xs text-green-600">↑ +2</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical SEO Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data?.seo_tracking?.technical_seo_monitoring.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Social Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data?.social_tracking?.social_platforms.map((platform) => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{platform}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">1,234</span>
                        <Badge variant="outline">+15%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data?.social_tracking?.engagement_metrics.map((metric) => (
                    <div key={metric} className="flex items-center justify-between">
                      <span className="text-sm">{metric}</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 