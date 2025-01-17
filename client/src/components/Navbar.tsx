'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ModeToggle'
import { User, LogOut } from 'lucide-react'
import { logout } from '@/app/actions'
import toast from 'react-hot-toast'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/signup')

  if (isAuthPage) {
    return null
  }

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result.success) {
        // Clear all cookies on client side
        document.cookie.split(';').forEach(cookie => {
          document.cookie = cookie
            .replace(/^ +/, '')
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
        })
        router.push('/login')
      } else {
        toast.error('Failed to logout')
      }
    } catch {
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/dashboard" className="text-2xl font-bold">
            ACE
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
} 