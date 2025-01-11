'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Transaction } from '@/lib/types'

export default function TransactionPieChart({ transactions }: { transactions: Transaction[] }) {
  const data = transactions.reduce((acc, transaction) => {
    const existingCategory = acc.find(item => item.name === transaction.category)
    if (existingCategory) {
      existingCategory.value += transaction.amount
    } else {
      acc.push({ name: transaction.category, value: transaction.amount })
    }
    return acc
  }, [] as { name: string; value: number }[])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <ChartContainer
      config={Object.fromEntries(data.map((entry, index) => [
        entry.name,
        { label: entry.name, color: COLORS[index % COLORS.length] }
      ]))}
      className="h-[400px]" // Adjust height for better spacing with legend
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={(entry) => `${entry.name}: ${entry.value}`} // Custom labels
            outerRadius={100}
            innerRadius={50} // Donut style for better aesthetics
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
