'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TransactionBarChart from '@/components/TransactionBarChart'
import TransactionLineChart from '@/components/TransactionLineChart'
import TransactionPieChart from '@/components/TransactionPieChart'
import TransactionSummary from '@/components/TransactionSummary'
import { generateMockTransactions } from '@/lib/mockData'

export default function TransactionDashboard() {
  const [transactions] = useState(generateMockTransactions())

  return (
    <div className="space-y-4">
      <TransactionSummary transactions={transactions} />

      {/* Tabs for medium screens */}
      <div className="md:hidden">
        <Tabs defaultValue="bar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
            <Card>
              <CardHeader>
                <CardTitle>Credit vs Debit Transactions</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <TransactionBarChart transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="line">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Trends</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <TransactionLineChart transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pie">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Categories</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <TransactionPieChart transactions={transactions} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* All charts side by side for large screens */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="">
          <CardHeader>
            <CardTitle>Credit vs Debit Transactions</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <TransactionBarChart transactions={transactions} />
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Transaction Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <TransactionLineChart transactions={transactions} />
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Transaction Categories</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <TransactionPieChart transactions={transactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}