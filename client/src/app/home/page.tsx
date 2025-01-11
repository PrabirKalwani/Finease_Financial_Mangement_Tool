'use client'

import BottomNav from '@/components/BottomNav'
import TransactionDashboard from '../../components/TransactionDashboard'
import { generateMockTransactions } from '@/lib/mockData'

export default function DashboardPage() {
  function getGreeting() {
    const hours = new Date().getHours()
    if (hours < 12) {
      return 'Good Morning'
    } else if (hours < 18) {
      return 'Good Afternoon'
    } else {
      return 'Good Evening'
    }
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const username = 'User'
  const greeting = getGreeting()
  const currentDate = formatDate(new Date())
  const transaction = generateMockTransactions()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-foreground">
        {greeting}, {username}!
      </h1>
      <p className="text-secondary-foreground mb-6">{currentDate}</p>
      <TransactionDashboard transactions={transaction}/>
      <BottomNav />
    </div>
  )
}
