import { RegimeTaxResult } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TaxResultComponent({ old, new: newRegime }: RegimeTaxResult) {
  const betterRegime = old.totalTax <= newRegime.totalTax ? "Old" : "New";
  const taxSaved = Math.abs(old.totalTax - newRegime.totalTax);

  return (
    <div className="mt-8 p-8 border rounded-lg bg-white shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Tax Calculation Result</h3>
        <p className="text-sm text-muted-foreground mt-2">
          The {betterRegime} regime is better for you. You can save ₹{taxSaved.toLocaleString()} by choosing the {betterRegime} regime.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parameters</TableHead>
            <TableHead className="text-right">Old Regime</TableHead>
            <TableHead className="text-right">New Regime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total Income</TableCell>
            <TableCell className="text-right">₹{old.totalIncome.toLocaleString()}</TableCell>
            <TableCell className="text-right">₹{newRegime.totalIncome.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Exemptions</TableCell>
            <TableCell className="text-right">-₹{old.totalExemptions.toLocaleString()}</TableCell>
            <TableCell className="text-right">-₹{newRegime.totalExemptions.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Standard Deduction</TableCell>
            <TableCell className="text-right">-₹{old.standardDeduction.toLocaleString()}</TableCell>
            <TableCell className="text-right">-₹{newRegime.standardDeduction.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Deductions</TableCell>
            <TableCell className="text-right">-₹{old.totalDeductions.toLocaleString()}</TableCell>
            <TableCell className="text-right">-₹{newRegime.totalDeductions.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow className="font-medium bg-muted">
            <TableCell>Taxable Income</TableCell>
            <TableCell className="text-right">₹{old.taxableIncome.toLocaleString()}</TableCell>
            <TableCell className="text-right">₹{newRegime.taxableIncome.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell className="text-right">₹{old.tax.toLocaleString()}</TableCell>
            <TableCell className="text-right">₹{newRegime.tax.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rebate</TableCell>
            <TableCell className="text-right">-₹{old.rebate.toLocaleString()}</TableCell>
            <TableCell className="text-right">-₹{newRegime.rebate.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cess (4%)</TableCell>
            <TableCell className="text-right">₹{old.cess.toLocaleString()}</TableCell>
            <TableCell className="text-right">₹{newRegime.cess.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow className="text-lg font-bold">
            <TableCell>Total Tax Payable</TableCell>
            <TableCell 
              className={`text-right ${old.totalTax <= newRegime.totalTax ? 'text-green-600' : ''}`}
            >
              ₹{old.totalTax.toLocaleString()}
            </TableCell>
            <TableCell 
              className={`text-right ${newRegime.totalTax < old.totalTax ? 'text-green-600' : ''}`}
            >
              ₹{newRegime.totalTax.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}