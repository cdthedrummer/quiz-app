import React from 'react';
import { QuizOption } from './QuizOption';

interface QuizQuestionProps {
  question: {
    text: string;
    type: 'single' | 'multiple' | 'scale';
    options: { value: string; label: string }[];
  };
  selections: string[];
  onSelect: (value: string) => void;
  onNext?: () => void;
}

export function QuizQuestion({ question, selections, onSelect, onNext }: QuizQuestionProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-medium mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <QuizOption
            key={option.value}
            value={option.value}
            label={option.label}
            selected={selections.includes(option.value)}
            type={question.type}
            onChange={onSelect}
          />
        ))}
      </div>

      {onNext && question.type === 'multiple' && (
        <button
          onClick={onNext}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}