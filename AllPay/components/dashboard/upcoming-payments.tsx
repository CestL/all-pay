"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, Home, Phone, Zap } from "lucide-react"

const upcomingPayments = [
  {
    id: "1",
    name: "Electricity Bill",
    amount: "$95.20",
    dueDate: "Jul 25, 2024",
    icon: <Zap className="h-4 w-4 text-yellow-500" />,
  },
  {
    id: "2",
    name: "Water Bill",
    amount: "$42.50",
    dueDate: "Jul 28, 2024",
    icon: <Home className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "3",
    name: "Mobile Service",
    amount: "$65.00",
    dueDate: "Aug 1, 2024",
    icon: <Phone className="h-4 w-4 text-green-500" />,
  },
  {
    id: "4",
    name: "Credit Card",
    amount: "$250.00",
    dueDate: "Aug 5, 2024",
    icon: <CreditCard className="h-4 w-4 text-red-500" />,
  },
]

export function UpcomingPayments() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">{payment.icon}</div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{payment.name}</p>
                <p className="text-xs text-muted-foreground">Due {payment.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{payment.amount}</p>
              <Button size="sm" variant="outline">
                Pay
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
