import { STAT_ICONS } from '@/config/quiz.config';
import { StatType } from '@/types/quiz.types';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { cn } from '@/lib/utils';

interface StatGainIndicatorProps {
  stat: StatType;
  value: number;
  className?: string;
}

export function StatGainIndicator({ stat, value, className }: StatGainIndicatorProps) {
  if (value === 0) return null;

  const isPositive = value > 0;
  const icon = STAT_ICONS[stat];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium',
        'animate-in slide-in-from-bottom-2 duration-300',
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
        className
      )}
    >
      <span>{icon}</span>
      <span>
        {isPositive ? '+' : ''}
        <AnimatedNumber value={value} />
      </span>
    </div>
  );
}
