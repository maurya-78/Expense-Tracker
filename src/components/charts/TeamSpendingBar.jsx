import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const TeamSpendingBar = ({
  data = [],
}) => {
  return (
    <div className="w-full h-[300px] min-h-[300px] min-w-0">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.3}
          />

          <XAxis
            dataKey="team"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              fill: 'transparent',
            }}
          />

          <Bar
            dataKey="spent"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamSpendingBar;