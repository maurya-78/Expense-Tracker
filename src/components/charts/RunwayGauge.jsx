import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const RunwayGauge = ({
  months = 0,
}) => {
  // Max runway visualization
  const value = Math.min(months, 24);

  const data = [
    { value: value },
    { value: 24 - value },
  ];

  // Gauge Color Logic
  const getGaugeColor = (m) => {
    if (m > 12) return '#10b981';

    if (m > 6) return '#f59e0b';

    return '#ef4444';
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[200px] min-h-[200px] min-w-0">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell
              fill={getGaugeColor(months)}
            />

            <Cell fill="#e2e8f0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div className="absolute top-[60%] text-center">
        <span className="text-3xl font-bold">
          {months}
        </span>

        <p className="text-xs text-slate-500 uppercase font-bold">
          Months
        </p>
      </div>
    </div>
  );
};

export default RunwayGauge;