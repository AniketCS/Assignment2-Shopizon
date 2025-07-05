import { ReactNode } from 'react';

interface PerformanceCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  inverted?: boolean;
}

export default function PerformanceCard({
  title,
  value,
  change,
  icon,
  inverted = false
}: PerformanceCardProps) {
  const isPositiveChange = change >= 0;
  const changeType = isPositiveChange ? 'positive' : 'negative';

  return (
    // DaisyUI: card component with shadow
    <div className="card bg-base-100 shadow-sm border border-gray-300">
      <div className="card-body p-6">
        {/* Icon in top left */}
        <div className="flex justify-start mb-2">
          <div className="text-base-content/60">
            {icon}
          </div>
        </div>

        {/* Metric name - centered */}
        <h3 className="text-center text-sm font-bold text-base-content/60 uppercase tracking-wide">
          {title}
        </h3>

        {/* Main value - centered and large */}
        <div className="text-center text-3xl font-bold text-base-content mb-2">
          {value}
        </div>

        {/* Change indicator - centered */}
        <div className="text-center">
          <span className={`text-sm font-medium ${
            (changeType === 'positive' && !inverted) || (changeType === 'negative' && inverted)
              ? 'text-success'
              : 'text-error'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-base-content/60 ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );
}
