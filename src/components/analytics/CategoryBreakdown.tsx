import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryTotal } from '../../types';
import { formatCurrency, getCategoryColor, getCategoryDisplayName } from '../../utils/formatters';

interface CategoryBreakdownProps {
  data: CategoryTotal[];
}

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ data }) => {
  const chartData = data.map(category => ({
    name: getCategoryDisplayName(category.category),
    value: category.total,
    category: category.category,
    percentage: category.percentage,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-sm text-neutral-500">{data.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center mt-4 gap-3">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBreakdown;