import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionFilters } from "@/components/dashboard/transaction-filters"
import { TransactionList } from "@/components/dashboard/transaction-list"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your payment transactions.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 mt-2 sm:mt-0">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A complete record of all your payment activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionFilters />
          <TransactionList />
        </CardContent>
      </Card>
    </div>
  )
}
