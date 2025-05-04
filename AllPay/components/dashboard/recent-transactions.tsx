"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const transactions = [
  {
    id: "1",
    name: "Electric Company",
    amount: "$89.50",
    status: "Completed",
    date: "Today, 2:30 PM",
    logo: "EC",
    logoColor: "bg-blue-500",
  },
  {
    id: "2",
    name: "Water Services",
    amount: "$45.20",
    status: "Completed",
    date: "Yesterday, 4:15 PM",
    logo: "WS",
    logoColor: "bg-cyan-500",
  },
  {
    id: "3",
    name: "Mobile Provider",
    amount: "$65.00",
    status: "Completed",
    date: "Jul 20, 10:30 AM",
    logo: "MP",
    logoColor: "bg-green-500",
  },
  {
    id: "4",
    name: "Internet Service",
    amount: "$79.99",
    status: "Pending",
    date: "Jul 19, 9:00 AM",
    logo: "IS",
    logoColor: "bg-purple-500",
  },
  {
    id: "5",
    name: "Credit Card Payment",
    amount: "$250.00",
    status: "Completed",
    date: "Jul 18, 3:45 PM",
    logo: "CC",
    logoColor: "bg-red-500",
  },
]

export function RecentTransactions() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-4">
            <Avatar className={`h-9 w-9 ${transaction.logoColor}`}>
              <AvatarFallback>{transaction.logo}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{transaction.name}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-sm font-medium">{transaction.amount}</p>
              <Badge variant={transaction.status === "Completed" ? "outline" : "secondary"} className="text-xs">
                {transaction.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
