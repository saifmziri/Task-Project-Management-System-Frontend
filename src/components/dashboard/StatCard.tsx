import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconClassName?: string;
}

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  iconClassName = "text-navy-900",
}: DashboardCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-navy-900/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13.5px] font-medium text-slate-500">{title}</p>

          <h2 className="text-navy-900 mt-2 text-[28px] font-semibold tracking-tight">
            {value}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
          <Icon size={24} className={iconClassName} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
