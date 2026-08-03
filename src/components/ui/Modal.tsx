import { X } from "lucide-react";
import { type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;

  onClose: () => void;

  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

const Modal = ({ open, title, children, onClose, size = "md" }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-4 backdrop-blur-sm">
      <div
        className={`animate-modal-in w-full rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-navy-900/20 ${sizes[size]}`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="text-navy-900 text-lg font-semibold tracking-tight">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;