interface ProgressBarProps {
  current: number;
  target: number;
  currency?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({
  current,
  target,
  currency = "NGN",
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>
          {currency} {current.toLocaleString()}
        </span>
        <span className="text-base-content/60">
          {currency} {target.toLocaleString()}
        </span>
      </div>
      <div className="relative">
        <progress
          className="flex progress progress-primary w-full h-3"
          value={percentage}
          max="100"
        />
        {showPercentage && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white drop-shadow-lg">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
}
