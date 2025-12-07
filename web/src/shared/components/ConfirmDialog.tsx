import { X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "info" | "warning" | "error";
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  type = "info",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const alertClass =
    type === "error"
      ? "alert-error"
      : type === "warning"
      ? "alert-warning"
      : "alert-info";

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          onClick={onCancel}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X size={20} />
        </button>

        <h3 className="font-bold text-xl mb-4">{title}</h3>

        <div className={`alert ${alertClass} mb-6`}>
          <span>{message}</span>
        </div>

        <div className="modal-action">
          <button onClick={onCancel} className="btn btn-ghost">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="btn btn-primary">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
