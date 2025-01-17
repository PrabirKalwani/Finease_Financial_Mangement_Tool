'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ModeToggle'
import { User } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/signup')

  if (isAuthPage) {
    return null
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
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
} 