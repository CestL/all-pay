"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function TransactionFilters() {
  const [dateRange, setDateRange] = useState("30")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="mobile">Mobile Services</SelectItem>
              <SelectItem value="debt">Debt Payment</SelectItem>
              <SelectItem value="rent">Rent/Mortgage</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Input placeholder="Search transactions..." />
        </div>
      </div>

      {dateRange === "custom" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Input type="date" placeholder="Start date" />
          </div>
          <div>
            <Input type="date" placeholder="End date" />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset Filters</Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  )
}
