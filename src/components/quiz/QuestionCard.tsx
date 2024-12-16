import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatIcon } from '@/components/ui/StatIcon';
import { STAT_ICONS } from '@/config/quiz.config';
import { QuizQuestion, StatType } from '@/types/quiz.types';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptions: string[];
  onSelect: (optionId: string) => void;
  className?: string;
}

export function QuestionCard({
  question,
  selectedOptions,
  onSelect,
  className
}: QuestionCardProps) {
  const isMultiple = question.type === 'multiple';

  return (
    <Card className={cn('w-full max-w-2xl mx-auto transition-all', className)}>
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-center">
          {question.text}
        </CardTitle>
        {question.description && (
          <CardDescription className="text-center">
            {question.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const statIcons = option.statGains.map(gain => (
              <StatIcon key={gain.stat} stat={gain.stat as StatType} size="sm" />
            ));

            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={cn(
                  'relative p-4 rounded-lg border-2 text-left transition-all duration-200',
                  'hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/50',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  isSelected
                    ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/80'
                    : 'border-gray-200 dark:border-gray-800'
                )}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="text-lg">{option.text}</span>
                  <div className="flex gap-1 opacity-60">{statIcons}</div>
                </div>
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-blue-500
                    animate-in zoom-in-95 duration-200"
                  />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
