'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PortfolioAsset } from '@/lib/types'
import { Upload } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PortfolioPage() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([])

  const handleStockFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n')
      const headers = lines[0].split(',')
      
      const parsedAssets: PortfolioAsset[] = lines
        .slice(1) // Skip header row
        .filter(line => line.trim()) // Skip empty lines
        .map((line, index) => {
          const values = line.split(',')
          const type = values[0].toLowerCase()

          if (type === 'stock') {
            return {
              id: `stock-${index}`,
              type: 'stock',
              ticker: values[1],
              quantity: parseFloat(values[2]),
              purchasePrice: parseFloat(values[3]),
              currentPrice: parseFloat(values[4]),
              purchaseDate: new Date(values[5])
            }
          } else {
            return {
              id: `commodity-${index}`,
              type: 'commodity',
              name: values[1].toLowerCase() as 'gold' | 'silver' | 'copper',
              quantity: parseFloat(values[2]),
              purchasePrice: parseFloat(values[3]),
              currentPrice: parseFloat(values[4]),
              purchaseDate: new Date(values[5])
            }
          }
        })

      setAssets(parsedAssets)
    }
    reader.readAsText(file)
  }

  const calculateTotalInvestment = () => {
    return assets.reduce((total, asset) => {
      return total + (asset.purchasePrice * asset.quantity)
    }, 0)
  }

  const calculateCurrentValue = () => {
    return assets.reduce((total, asset) => {
      return total + (asset.currentPrice * asset.quantity)
    }, 0)
  }

  const calculateTotalReturn = () => {
    const investment = calculateTotalInvestment()
    const currentValue = calculateCurrentValue()
    return ((currentValue - investment) / investment) * 100
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Investment Portfolio</h1>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".csv"
              onChange={handleStockFileUpload}
              className="hidden"
              id="portfolio-upload"
            />
            <Button
              onClick={() => document.getElementById('portfolio-upload')?.click()}
              variant="outline"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Portfolio CSV
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Portfolio Summary Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{calculateTotalInvestment().toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{calculateCurrentValue().toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${calculateTotalReturn() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {calculateTotalReturn().toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Tables */}
        <div className="mt-8 grid gap-8">
          {/* Stocks Table */}
          <Card>
            <CardHeader>
              <CardTitle>Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Purchase Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets
                    .filter(asset => asset.type === 'stock')
                    .map(asset => {
                      const stockAsset = asset as Extract<PortfolioAsset, { type: 'stock' }>
                      const totalValue = stockAsset.currentPrice * stockAsset.quantity
                      const returnPercentage = ((stockAsset.currentPrice - stockAsset.purchasePrice) / stockAsset.purchasePrice) * 100

                      return (
                        <TableRow key={asset.id}>
                          <TableCell>{stockAsset.ticker}</TableCell>
                          <TableCell>{stockAsset.quantity}</TableCell>
                          <TableCell>₹{stockAsset.purchasePrice.toLocaleString()}</TableCell>
                          <TableCell>₹{stockAsset.currentPrice.toLocaleString()}</TableCell>
                          <TableCell>₹{totalValue.toLocaleString()}</TableCell>
                          <TableCell className={returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {returnPercentage.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Commodities Table */}
          <Card>
            <CardHeader>
              <CardTitle>Commodities</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity (g)</TableHead>
                    <TableHead>Purchase Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead>Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets
                    .filter(asset => asset.type === 'commodity')
                    .map(asset => {
                      const commodityAsset = asset as Extract<PortfolioAsset, { type: 'commodity' }>
                      const totalValue = commodityAsset.currentPrice * commodityAsset.quantity
                      const returnPercentage = ((commodityAsset.currentPrice - commodityAsset.purchasePrice) / commodityAsset.purchasePrice) * 100

                      return (
                        <TableRow key={asset.id}>
                          <TableCell className="capitalize">{commodityAsset.name}</TableCell>
                          <TableCell>{commodityAsset.quantity}</TableCell>
                          <TableCell>₹{commodityAsset.purchasePrice.toLocaleString()}</TableCell>
                          <TableCell>₹{commodityAsset.currentPrice.toLocaleString()}</TableCell>
                          <TableCell>₹{totalValue.toLocaleString()}</TableCell>
                          <TableCell className={returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {returnPercentage.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 