import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="alert alert-error">
      <AlertCircle size={24} />
      <div className="flex-1">
        <h3 className="font-bold">Error</h3>
        <div className="text-sm">{message}</div>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm">
          Retry
        </button>
      )}
    </div>
  );
}
