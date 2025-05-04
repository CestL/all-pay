"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto">
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
            <div className="font-medium">Payment Successful</div>
            <div className="text-xs text-muted-foreground">Your electricity bill payment was successful.</div>
            <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
            <div className="font-medium">Upcoming Bill</div>
            <div className="text-xs text-muted-foreground">Your water bill is due in 3 days.</div>
            <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start">
            <div className="font-medium">Account Update</div>
            <div className="text-xs text-muted-foreground">Your account details have been updated.</div>
            <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center text-primary">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
