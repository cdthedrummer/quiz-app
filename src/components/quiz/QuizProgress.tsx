import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm text-gray-600">
        <span>Question {current + 1} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}