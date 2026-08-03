import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface TaskStatusChartProps {
  data: {
    completed: number;
    in_progress: number;
    canceled: number;
  };
}

const COLORS = [
  "#10b981", // completed — emerald
  "#bd8f3c", // in progress — brass
  "#e11d48", // canceled — rose
];

const TaskStatusChart = ({ data }: TaskStatusChartProps) => {
  const chartData = [
    {
      name: "Completed",
      value: data.completed,
    },
    {
      name: "In Progress",
      value: data.in_progress,
    },
    {
      name: "Canceled",
      value: data.canceled,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-navy-900 mb-6 text-[17px] font-semibold tracking-tight">
        Tasks by Status
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={90}
              paddingAngle={2}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px -8px rgba(11,18,32,0.12)",
                fontSize: 13,
              }}
            />

            <Legend
              wrapperStyle={{ fontSize: 13, color: "#475569" }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskStatusChart;
