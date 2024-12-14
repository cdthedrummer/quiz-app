'use client';

import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-sm text-slate-600">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress 
        value={progress} 
        className="h-1.5 transition-all duration-300 ease-in-out" 
      />
    </div>
  );
}
