'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminAuthGuard } from '@/components/admin/admin-auth-guard';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check admin authentication
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        console.log('Admin layout - checking auth, token:', token ? 'exists' : 'none');
        
        // If we're on login page and have a token, redirect to dashboard
        if (pathname === '/admin/login' && token) {
          console.log('On login page with token, verifying...');
          const response = await fetch('/api/admin/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            console.log('Token verified, redirecting to dashboard');
            setIsAuthenticated(true);
            router.push('/admin/dashboard');
            return;
          } else {
            console.log('Token invalid, removing from storage');
            localStorage.removeItem('admin_token');
          }
        }
        
        // If we're not on login page and don't have a token, redirect to login
        if (!token && pathname !== '/admin/login') {
          console.log('No token, redirecting to login');
          router.push('/admin/login');
          return;
        }
        
        // If we have a token and we're not on login page, verify it
        if (token && pathname !== '/admin/login') {
          console.log('Verifying token for protected route...');
          const response = await fetch('/api/admin/verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            console.log('Token verified successfully');
            setIsAuthenticated(true);
          } else {
            console.log('Token verification failed, redirecting to login');
            localStorage.removeItem('admin_token');
            router.push('/admin/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {pathname === '/admin/login' ? (
        <>
          {children}
          <Toaster />
        </>
      ) : (
        <AdminAuthGuard isAuthenticated={isAuthenticated}>
          <>
            <div className="min-h-screen bg-background flex">
              <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
                <AdminHeader 
                  isSidebarOpen={isSidebarOpen} 
                  setIsSidebarOpen={setIsSidebarOpen}
                />
                <main className="p-6 min-h-[calc(100vh-4rem)]">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </>
        </AdminAuthGuard>
      )}
    </ThemeProvider>
  );
} 