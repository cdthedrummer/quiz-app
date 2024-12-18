import React from 'react';
import { Button } from '../common/Button';

type QuizQuestionProps = {
  question: {
    text: string;
    type: 'single' | 'multiple' | 'scale';
    options: Array<{
      value: string;
      label: string;
    }>;
  };
  currentQuestion: number;
  totalQuestions: number;
  selections: string[];
  onSelect: (value: string) => void;
  onNext: () => void;
};

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  selections,
  onSelect,
  onNext,
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-medium mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`block p-4 rounded-lg border-2 cursor-pointer transition-all
              ${selections.includes(option.value)
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white hover:bg-gray-50 border-gray-200'}`}
          >
            <div className="flex items-center">
              <input
                type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                name="quiz-option"
                value={option.value}
                checked={selections.includes(option.value)}
                onChange={() => onSelect(option.value)}
                className="mr-3"
              />
              <span>{option.label}</span>
            </div>
          </label>
        ))}
      </div>

      {(question.type === 'multiple' || selections.length > 0) && (
        <Button
          onClick={onNext}
          className="mt-6"
        >
          Next
        </Button>
      )}
    </div>
  );
}