'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Transaction } from '@/lib/types'

export default function TransactionLineChart({ transactions }: { transactions: Transaction[] }) {
  const data = transactions.reduce((acc, transaction) => {
    const date = transaction.date.toISOString().split('T')[0]
    const existingEntry = acc.find(entry => entry.date === date)
    if (existingEntry) {
      existingEntry[transaction.type] += transaction.amount
    } else {
      acc.push({ date, credit: 0, debit: 0, [transaction.type]: transaction.amount })
    }
    return acc
  }, [] as { date: string; credit: number; debit: number }[])

  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
      className="h-[350px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="credit"
            stroke="var(--color-credit)"
            name="Credit"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="debit"
            stroke="var(--color-debit)"
            name="Debit"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}