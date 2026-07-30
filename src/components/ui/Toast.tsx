import { X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const colors = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500",
  info: "bg-blue-600",
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-4
        rounded-lg
        px-4
        py-3
        text-white
        shadow-lg
        ${colors[type]}
      `}
    >
      <p>{message}</p>

      <button onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;