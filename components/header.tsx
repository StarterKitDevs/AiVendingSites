"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, LogOut, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/auth/login-modal'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  const { user, signOut } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo - Updated to match Starter Kit design */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-foreground">AI Web Agency</span>
            </div>
            <Badge variant="outline" className="text-blue-600">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered
            </Badge>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle variant="ghost" size="icon" />
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-8 w-8"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowLoginModal(true)}>
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false)
          // Optionally redirect to dashboard after login
          // window.location.href = '/dashboard'
        }}
      />
    </>
  )
} 