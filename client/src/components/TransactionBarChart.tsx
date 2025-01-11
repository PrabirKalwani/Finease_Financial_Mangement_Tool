'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart'
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

  // Define chartConfig with color attributes for each type
  const chartConfig: ChartConfig = {
    credit: {
      label: 'Credit',
      color: "hsl(var(--chart-green))",
    },
    debit: {
      label: 'Debit',
      color: "hsl(var(--chart-red))",
    },
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[350px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }} 
        >
          <CartesianGrid vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickMargin={10}
            tick={{ fontSize: 12 }} 
            tickLine={false} 
          />
          <YAxis tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar 
            dataKey="total" 
            barSize={50} 
            radius={4}
            fill={chartConfig.credit.color} // Use the color from chartConfig
          />
          {/* <Bar 
            dataKey="total" 
            name={chartConfig.debit.label} // Use the label from chartConfig
            barSize={50} 
            radius={4}
            fill={chartConfig.debit.color} // Use the color from chartConfig
          /> */}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}