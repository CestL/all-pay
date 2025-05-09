import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MonthlySpending } from '../../types';
import { formatCurrency, formatMonth, getCategoryColor } from '../../utils/formatters';

interface SpendingChartProps {
  data: MonthlySpending[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const chartData = [...data]
    .slice(0, 6) // Show last 6 months
    .reverse(); // Display in chronological order
  
  // Format the data for the chart
  const formattedData = chartData.map(month => ({
    ...month,
    formattedMonth: formatMonth(month.month),
  }));
  
  const categories = [
    { key: 'mobile', name: 'Mobile' },
    { key: 'utility', name: 'Utilities' },
    { key: 'debt', name: 'Debt' },
    { key: 'subscription', name: 'Subscriptions' },
    { key: 'internet', name: 'Internet' },
    { key: 'insurance', name: 'Insurance' },
    { key: 'other', name: 'Other' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-2">
            {payload.map((entry: any, index: number) => (
              <div key={`tooltip-${index}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="mr-2 text-sm">{entry.name}:</span>
                <span className="font-medium text-sm">{formatCurrency(entry.value)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="formattedMonth"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {categories.map((category) => (
            <Bar
              key={category.key}
              dataKey={category.key}
              name={category.name}
              stackId="a"
              fill={getCategoryColor(category.key)}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;