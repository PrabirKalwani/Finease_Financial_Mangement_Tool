'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Clock, Grid, Moon, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'  // Ensure this utility is defined correctly in your project


export function TopNav() {

  return (
    <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-24 shadow'>
        <div></div>
    </div>
  )
}