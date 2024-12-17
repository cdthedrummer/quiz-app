import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import type { QuizQuestion as QuestionType } from '@/data/questions';

interface QuizQuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (selectedOption: any) => void;
}

const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  progress,
  onAnswer,
}: QuizQuestionProps) => {
  const handleOptionSelect = (option: string) => {
    onAnswer(option);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-4">
          <Progress value={progress} />
          <p className="text-sm text-gray-500 mt-2">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{question.text}</h2>
          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { QuizQuestion };