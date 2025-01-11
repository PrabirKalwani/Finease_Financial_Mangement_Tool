export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: Date;
  category: string;
}
