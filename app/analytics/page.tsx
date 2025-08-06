'use client'

import { Header } from '@/components/ui/header'
import AnalyticsDashboard from '@/components/analytics-dashboard'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Starter Kit" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
} 