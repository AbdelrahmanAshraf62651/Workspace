import React from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import type { SectorProps } from 'recharts';
import type { TooltipIndex } from 'recharts/types/state/tooltipSlice';

type PieDataItem = {
  name: string;
  value: number;
  color?: string; 
};

type PieSectorDataItem = SectorProps & {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload?: PieDataItem;
  percent?: number;
  value?: number;
  midAngle?: number;
};

interface CustomActiveShapePieChartProps {
  data: PieDataItem[];
  colors?: string[]; // fallback colors if slice doesn't have color
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  innerRadius?: number | string;
  outerRadius?: number | string;
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
  style?: React.CSSProperties; // for custom width/height/padding
}

const renderActiveShape = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  startAngle = 0,
  endAngle = 0,
  fill = '#8884d8',
  payload,
  percent = 1,
  value = 0,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontWeight="bold"
      >
        {payload?.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`Value ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CustomActiveShapePieChart: React.FC<CustomActiveShapePieChartProps> = ({
  data,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'],
  innerRadius = 60,
  outerRadius = 80,
  isAnimationActive = true,
  defaultIndex,
  style,
}) => {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={() => null} defaultIndex={defaultIndex} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomActiveShapePieChart;
