import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizQuestionProps {
  question: {
    text: string;
    options: string[];
  };
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (selectedOption: string) => void;
}

const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  progress,
  onAnswer,
}: QuizQuestionProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Question {currentQuestion} of {totalQuestions}
        </p>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{question.text}</h2>
        <div className="space-y-2">
          {question.options.map((option) => (
            <Button
              key={option}
              onClick={() => onAnswer(option)}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { QuizQuestion };