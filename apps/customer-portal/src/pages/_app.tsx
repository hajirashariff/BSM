import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const publicPages = ['/login', '/', '/help', '/services']
      if (!publicPages.includes(router.pathname)) {
        // Redirect to admin dashboard login
        window.location.href = 'http://localhost:3001/login'
      }
    }
  }, [isAuthenticated, isLoading, router.pathname])

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <Component {...pageProps} />
}

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  )
}
