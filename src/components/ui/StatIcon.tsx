import { STAT_ICONS, STAT_DESCRIPTIONS } from '@/config/quiz.config';
import { StatType } from '@/types/quiz.types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatIconProps {
  stat: StatType;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl'
};

export function StatIcon({ stat, size = 'md', showTooltip = true }: StatIconProps) {
  const icon = STAT_ICONS[stat];
  const description = STAT_DESCRIPTIONS[stat];
  
  const IconElement = (
    <span className={`${sizeClasses[size]} animate-in fade-in zoom-in duration-300`}>
      {icon}
    </span>
  );

  if (!showTooltip) return IconElement;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {IconElement}
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium capitalize">{stat}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
