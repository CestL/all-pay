"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    Utilities: 2400,
    Mobile: 1200,
    Debt: 800,
    Other: 500,
  },
  {
    name: "Feb",
    Utilities: 2100,
    Mobile: 1300,
    Debt: 900,
    Other: 400,
  },
  {
    name: "Mar",
    Utilities: 2200,
    Mobile: 1100,
    Debt: 700,
    Other: 600,
  },
  {
    name: "Apr",
    Utilities: 2800,
    Mobile: 1400,
    Debt: 800,
    Other: 700,
  },
  {
    name: "May",
    Utilities: 2600,
    Mobile: 1200,
    Debt: 900,
    Other: 500,
  },
  {
    name: "Jun",
    Utilities: 2900,
    Mobile: 1300,
    Debt: 800,
    Other: 600,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Utilities" fill="#8884d8" />
        <Bar dataKey="Mobile" fill="#82ca9d" />
        <Bar dataKey="Debt" fill="#ffc658" />
        <Bar dataKey="Other" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  )
}
