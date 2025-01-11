'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, LabelList } from 'recharts'
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
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="credit"
            stroke="var(--color-credit)"
            name="Credit"
            isAnimationActive={false}
          >
            <LabelList dataKey="credit" position="top" style={{ fill: 'var(--color-credit)' }} />
          </Line>
          <Line
            type="monotone"
            dataKey="debit"
            stroke="var(--color-debit)"
            name="Debit"
            isAnimationActive={false}
          >
            <LabelList dataKey="debit" position="top" style={{ fill: 'var(--color-debit)' }} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}