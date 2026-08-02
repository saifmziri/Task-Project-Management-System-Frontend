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
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Modal open={open} title={title} size="sm" onClose={onCancel}>
      <p className="text-sm text-slate-600">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          onClick={onCancel}
          className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        >
          {cancelText}
        </Button>

        <Button
          loading={loading}
          onClick={onConfirm}
          className={
            danger
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
