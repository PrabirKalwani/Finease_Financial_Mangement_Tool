'use client'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Transaction } from '@/lib/types'

export default function TransactionBarChart({ transactions }: { transactions: Transaction[] }) {
  const data = [
    {
      name: 'Credit',
      total: transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0),
    },
    {
      name: 'Debit',
      total: transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0),
    },
  ]

  return (
    <ChartContainer
      config={{
        credit: {
          label: 'Credit',
          color: 'hsl(var(--chart-1))',
        },
        debit: {
          label: 'Debit',
          color: 'hsl(var(--chart-2))',
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-credit)" name="Credit" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}