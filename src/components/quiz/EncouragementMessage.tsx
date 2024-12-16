import { ENCOURAGEMENTS } from '@/config/quiz.config';
import { cn } from '@/lib/utils';

interface EncouragementMessageProps {
  className?: string;
}

export function EncouragementMessage({ className }: EncouragementMessageProps) {
  const randomMessage =
    ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];

  return (
    <div
      className={cn(
        'text-center text-xl font-medium text-blue-600 dark:text-blue-400',
        'animate-in fade-in slide-in-from-bottom-4 duration-500',
        className
      )}
    >
      {randomMessage}
    </div>
  );
}
