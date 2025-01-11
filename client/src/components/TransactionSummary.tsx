"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Transaction } from "@/lib/types";

export default function TransactionSummary({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [hoveredCategory, setHoveredCategory] = useState<
    "credit" | "debit" | null
  >(null);
  const [clientTransactions, setClientTransactions] = useState<Transaction[]>(
    []
  );

  // Ensure transactions are only processed on the client
  useEffect(() => {
    setClientTransactions(
      transactions.map((t) => ({
        ...t,
        date: new Date(t.date), // Ensure date is properly parsed
      }))
    );
  }, [transactions]);

  const totalCredit = clientTransactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = clientTransactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalCredit - totalDebit;

  const data = clientTransactions
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .reduce((acc, transaction) => {
      const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const newBalance =
        transaction.type === "credit"
          ? lastBalance + transaction.amount
          : lastBalance - transaction.amount;
      acc.push({
        date: transaction.date.toLocaleDateString(), // Use local date formatting
        balance: newBalance,
      });
      return acc;
    }, [] as { date: string; balance: number }[]);

  // Filter transactions once for better performance
  const categorizedTransactions = {
    credit: clientTransactions.filter((t) => t.type === "credit"),
    debit: clientTransactions.filter((t) => t.type === "debit"),
  };

  const transactionRows = (type: "credit" | "debit") =>
    categorizedTransactions[type].map((t) => (
      <TableRow
        key={`${t.date.toLocaleDateString()}-${t.amount}-${t.category}`}
      >
        <TableCell>{t.date.toLocaleDateString()}</TableCell>
        <TableCell>₹{t.amount.toFixed(2)}</TableCell>
        <TableCell>{t.category}</TableCell>
      </TableRow>
    ));

  const cardData: { title: string; value: number; type: "credit" | "debit" }[] =
    [
      { title: "Total Credit", value: totalCredit, type: "credit" },
      { title: "Total Debit", value: totalDebit, type: "debit" },
    ];

  if (!clientTransactions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card) => (
          <Card
            key={card.type}
            onClick={() => setHoveredCategory(card.type)} // This will now correctly accept "credit" or "debit"
            className={cn(
              "transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            )}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{card.value.toFixed(2)}</div>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{balance.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientTransactions.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cumulative Balance Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Cumulative Account Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ fontSize: "0.85rem", marginBottom: 10 }}
                />
                <Area
                  dataKey="balance"
                  type="natural"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                  stroke="hsl(var(--primary))"
                  name="Cumulative Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List Dialog */}
      <Dialog
        open={!!hoveredCategory}
        onOpenChange={() => setHoveredCategory(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {hoveredCategory === "credit"
                ? "Credit Transactions"
                : "Debit Transactions"}
            </DialogTitle>
            <DialogDescription>
              Below are the transactions for the selected category:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hoveredCategory && transactionRows(hoveredCategory)}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
