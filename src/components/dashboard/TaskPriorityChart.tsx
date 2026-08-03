import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";

interface TaskPriorityChartProps {
  data: {
    high: number;
    medium: number;
    low: number;
  };
}

const TaskPriorityChart = ({ data }: TaskPriorityChartProps) => {
  const chartData = [
    {
      priority: "High",
      tasks: data.high,
    },
    {
      priority: "Medium",
      tasks: data.medium,
    },
    {
      priority: "Low",
      tasks: data.low,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-navy-900 mb-6 text-[17px] font-semibold tracking-tight">
        Tasks by Priority
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />

            <XAxis
              dataKey="priority"
              tick={{ fill: "#64748b", fontSize: 12.5 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748b", fontSize: 12.5 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px -8px rgba(11,18,32,0.12)",
                fontSize: 13,
              }}
            />

            <Bar dataKey="tasks" fill="#bd8f3c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskPriorityChart;
