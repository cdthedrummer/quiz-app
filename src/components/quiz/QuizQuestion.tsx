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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-medium mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`block p-4 rounded border-2 cursor-pointer transition-all
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

      {onNext && question.type === 'multiple' && (
        <button
          onClick={onNext}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}