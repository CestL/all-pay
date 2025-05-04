"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, Landmark, Wallet } from "lucide-react"

const accounts = [
  {
    id: "1",
    name: "Main Bank Account",
    type: "Checking",
    balance: "$3,245.50",
    icon: <Landmark className="h-4 w-4" />,
    color: "bg-blue-100",
  },
  {
    id: "2",
    name: "Savings Account",
    type: "Savings",
    balance: "$12,456.78",
    icon: <Wallet className="h-4 w-4" />,
    color: "bg-green-100",
  },
  {
    id: "3",
    name: "Credit Card",
    type: "Credit",
    balance: "$1,245.89",
    icon: <CreditCard className="h-4 w-4" />,
    color: "bg-red-100",
  },
]

export function AccountSummary() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="flex items-center gap-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${account.color}`}>
              {account.icon}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{account.name}</p>
              <p className="text-xs text-muted-foreground">{account.type}</p>
            </div>
            <div className="text-sm font-medium">{account.balance}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
