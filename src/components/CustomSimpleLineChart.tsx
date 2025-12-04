import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type LineDataItem = {
  day: string;
  income: number;
  [key: string]: string | number;
};

interface CustomSimpleLineChartProps {
  data: LineDataItem[];
  lineKeys?: string[];
  colors?: string[];
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  isAnimationActive?: boolean;
  style?: React.CSSProperties;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

const CustomSimpleLineChart: React.FC<CustomSimpleLineChartProps> = ({
  data,
  lineKeys = ['income'],
  colors = ['#8884d8', '#82ca9d', '#ff7300', '#ffc658'],
  margin = { top: 20 },
  isAnimationActive = true,
  style,
  showGrid = true,
  showTooltip = true,
}) => {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={margin}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.6} />
          )}
          <XAxis dataKey="day" />
          <YAxis />
          {showTooltip && <Tooltip />}
          {lineKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              isAnimationActive={isAnimationActive}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomSimpleLineChart;
