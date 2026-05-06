import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = [
  '#6366f1',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#8b5cf6',
];

const CategoryPieChart = ({
  data = [],
}) => {
  return (
    <div className="w-full h-[350px] min-h-[350px] min-w-0">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {(data || []).map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
            }}
          />

          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;