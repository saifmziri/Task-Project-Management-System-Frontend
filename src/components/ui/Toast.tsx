import { X, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

import type { ToastType } from "@/types";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const colors = {
  success: "bg-emerald-600",
  error: "bg-rose-600",
  warning: "bg-amber-500",
  info: "bg-navy-900",
};

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const Icon = icons[type];

  return (
    <div
      className={`
        animate-fade-up
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3.5
        text-[14px]
        text-white
        shadow-lg
        shadow-navy-900/15
        ${colors[type]}
      `}
    >
      <Icon size={18} className="shrink-0" />

      <p className="flex-1">{message}</p>

      <button
        onClick={onClose}
        className="rounded-md p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;