import { Progress } from '@/components/ui/progress';
import { QUIZ_SETTINGS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressIndicator({ current, total, className }: ProgressIndicatorProps) {
  const progress = Math.round((current / total) * 100);
  const isCheckpoint = current % QUIZ_SETTINGS.CHECKPOINT_INTERVAL === 0;

  return (
    <div className={cn('space-y-2', className)}>
      <Progress
        value={progress}
        className={cn(
          'transition-all duration-500',
          isCheckpoint && 'animate-pulse'
        )}
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Question {current} of {total}
        </span>
        <span>{progress}% Complete</span>
      </div>
    </div>
  );
}
