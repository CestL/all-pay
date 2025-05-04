"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Download, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const transactions = [
  {
    id: "TR-1234",
    payee: "Electric Company",
    category: "Utilities",
    amount: "$89.50",
    date: "Jul 15, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "TR-1235",
    payee: "Water Services",
    category: "Utilities",
    amount: "$45.20",
    date: "Jul 10, 2024",
    status: "Completed",
    method: "Credit Card",
  },
  {
    id: "TR-1236",
    payee: "Mobile Provider",
    category: "Mobile",
    amount: "$65.00",
    date: "Jul 5, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "TR-1237",
    payee: "Internet Service",
    category: "Utilities",
    amount: "$79.99",
    date: "Jun 28, 2024",
    status: "Pending",
    method: "Digital Wallet",
  },
  {
    id: "TR-1238",
    payee: "Credit Card Payment",
    category: "Debt",
    amount: "$250.00",
    date: "Jun 20, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "TR-1239",
    payee: "Rent Payment",
    category: "Rent",
    amount: "$1200.00",
    date: "Jun 1, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "TR-1240",
    payee: "Phone Bill",
    category: "Mobile",
    amount: "$55.00",
    date: "May 25, 2024",
    status: "Failed",
    method: "Credit Card",
  },
  {
    id: "TR-1241",
    payee: "Gas Bill",
    category: "Utilities",
    amount: "$120.00",
    date: "May 20, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "TR-1242",
    payee: "Car Loan",
    category: "Debt",
    amount: "$350.00",
    date: "May 15, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "TR-1243",
    payee: "Internet Service",
    category: "Utilities",
    amount: "$79.99",
    date: "May 10, 2024",
    status: "Completed",
    method: "Digital Wallet",
  },
]

export function TransactionList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Payee</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.payee}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.status === "Completed"
                      ? "outline"
                      : transaction.status === "Pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>{transaction.method}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" /> Download receipt
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute transaction</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
