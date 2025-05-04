"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, Home, Phone, Zap } from "lucide-react"
import { useState } from "react"

const savedPayees = [
  {
    id: "1",
    name: "Electric Company",
    accountNumber: "****5678",
    category: "Utilities",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-yellow-100",
  },
  {
    id: "2",
    name: "Water Services",
    accountNumber: "****1234",
    category: "Utilities",
    icon: <Home className="h-4 w-4" />,
    color: "bg-blue-100",
  },
  {
    id: "3",
    name: "Mobile Provider",
    accountNumber: "****9876",
    category: "Mobile",
    icon: <Phone className="h-4 w-4" />,
    color: "bg-green-100",
  },
  {
    id: "4",
    name: "Internet Service",
    accountNumber: "****4321",
    category: "Utilities",
    icon: <Home className="h-4 w-4" />,
    color: "bg-purple-100",
  },
  {
    id: "5",
    name: "Credit Card Company",
    accountNumber: "****7890",
    category: "Debt",
    icon: <CreditCard className="h-4 w-4" />,
    color: "bg-red-100",
  },
]

export function SavedPayees() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPayees = savedPayees.filter(
    (payee) =>
      payee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payee.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search payees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {filteredPayees.map((payee) => (
            <div key={payee.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${payee.color}`}>
                  {payee.icon}
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{payee.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Account: {payee.accountNumber} • {payee.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">Pay</Button>
              </div>
            </div>
          ))}

          {filteredPayees.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground">No payees found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
