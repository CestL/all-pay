"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const paymentHistory = [
  {
    id: "1",
    payee: "Electric Company",
    amount: "$89.50",
    date: "Jul 15, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "2",
    payee: "Water Services",
    amount: "$45.20",
    date: "Jul 10, 2024",
    status: "Completed",
    method: "Credit Card",
  },
  {
    id: "3",
    payee: "Mobile Provider",
    amount: "$65.00",
    date: "Jul 5, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "4",
    payee: "Internet Service",
    amount: "$79.99",
    date: "Jun 28, 2024",
    status: "Completed",
    method: "Digital Wallet",
  },
  {
    id: "5",
    payee: "Credit Card Payment",
    amount: "$250.00",
    date: "Jun 20, 2024",
    status: "Completed",
    method: "Bank Account",
  },
  {
    id: "6",
    payee: "Rent Payment",
    amount: "$1200.00",
    date: "Jun 1, 2024",
    status: "Completed",
    method: "Bank Account",
  },
]

export function PaymentHistory() {
  const [filter, setFilter] = useState("all")

  const filteredPayments =
    filter === "all"
      ? paymentHistory
      : paymentHistory.filter((payment) => payment.method.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="bank">Bank Account</SelectItem>
            <SelectItem value="credit">Credit Card</SelectItem>
            <SelectItem value="wallet">Digital Wallet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-1">
                <p className="font-medium">{payment.payee}</p>
                <p className="text-xs text-muted-foreground">
                  {payment.date} • {payment.method}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">{payment.amount}</p>
                <Badge variant="outline">{payment.status}</Badge>
              </div>
            </div>
          ))}

          {filteredPayments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No payments found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
