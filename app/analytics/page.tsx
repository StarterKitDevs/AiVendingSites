'use client'

import { Header } from '@/components/header'
import AnalyticsDashboard from '@/components/analytics-dashboard'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
} 