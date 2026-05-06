import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useThemeStore } from '../../store/useThemeStore';

const AreaTrendChart = ({
  data = [],
  dataKey = 'value',
  color = '#6366f1',
}) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="w-full h-[300px] min-h-[300px] min-w-0">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="colorGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={color}
                stopOpacity={0.3}
              />

              <stop
                offset="95%"
                stopColor={color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={
              isDarkMode
                ? '#1e293b'
                : '#e2e8f0'
            }
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#94a3b8',
              fontSize: 12,
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#94a3b8',
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode
                ? '#0f172a'
                : '#fff',

              border: 'none',

              borderRadius: '8px',

              boxShadow:
                '0 10px 15px -3px rgba(0,0,0,0.1)',
            }}
          />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaTrendChart;