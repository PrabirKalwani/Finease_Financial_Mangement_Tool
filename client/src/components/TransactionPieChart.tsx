"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Transaction } from "@/lib/types";

export default function TransactionPieChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const data = transactions.reduce((acc, transaction) => {
    const existingCategory = acc.find(
      (item) => item.name === transaction.category
    );
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <ChartContainer
      config={Object.fromEntries(
        data.map((entry, index) => [
          entry.name,
          { label: entry.name, color: COLORS[index % COLORS.length] },
        ])
      )}
      className="h-[400px] w-full" // Increased height to fit legend
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel={false} />}
          />
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            outerRadius={90}
            innerRadius={50}
            dataKey="value"
            strokeWidth={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={10}
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}