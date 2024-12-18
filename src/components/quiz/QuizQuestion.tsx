import React from 'react';

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
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
      
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-3 rounded-md cursor-pointer transition-colors
              ${selections.includes(option.value) 
                ? 'bg-blue-100 border-blue-500' 
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}
              border-2`}
          >
            <input
              type={question.type === 'multiple' ? 'checkbox' : 'radio'}
              name="quiz-option"
              value={option.value}
              checked={selections.includes(option.value)}
              onChange={() => onSelect(option.value)}
              className="mr-3"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {onNext && question.type === 'multiple' && (
        <button
          onClick={onNext}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}