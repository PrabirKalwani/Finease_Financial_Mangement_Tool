export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: Date;
  category: string;
}

export interface StockAsset {
  id: string;
  type: 'stock';
  ticker: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
}

export interface CommodityAsset {
  id: string;
  type: 'commodity';
  name: 'gold' | 'silver' | 'copper';
  quantity: number; // in grams
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
}

export type PortfolioAsset = StockAsset | CommodityAsset;
