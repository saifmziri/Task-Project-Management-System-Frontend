import { Button } from "@/components/ui";

import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;

  title: string;

  message: string;

  loading?: boolean;

  confirmText?: string;

  cancelText?: string;

  danger?: boolean;

  confirmVariant?: "danger" | "success";

  onConfirm: () => void;

  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  loading = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = true,
  confirmVariant,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const variant = confirmVariant ?? (danger ? "danger" : "default");

  const confirmClassName =
    variant === "danger"
      ? "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-400"
      : variant === "success"
        ? "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-400"
        : "bg-linear-to-b from-navy-800 to-navy-900 text-white hover:from-navy-700 hover:to-navy-800";

  return (
    <Modal open={open} title={title} size="sm" onClose={onCancel}>
      <p className="text-[14.5px] leading-relaxed text-slate-600">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          disabled={loading}
          onClick={onCancel}
          className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        >
          {cancelText}
        </Button>

        <Button
          loading={loading}
          onClick={onConfirm}
          className={confirmClassName}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
