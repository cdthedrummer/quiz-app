'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { QuizOption } from './QuizOption';
import { Card, CardContent } from '@/components/ui/card';
import type { QuizQuestion as QuestionType } from '@/src/data/questions';

interface QuizQuestionProps {
  question: QuestionType;
  selections: string[];
  onSelect: (value: string) => void;
  onNext?: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizQuestion({ 
  question, 
  selections, 
  onSelect, 
  onNext,
  currentQuestion,
  totalQuestions
}: QuizQuestionProps) {
  const isMultipleChoice = question.type === 'multiple';
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6 leading-relaxed">
          {question.text}
        </h3>

        {!isMultipleChoice ? (
          <RadioGroup
            value={selections[0] || ''}
            onValueChange={onSelect}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <QuizOption
                key={option.id}
                id={option.id}
                text={option.text}
                subtext={option.subtext}
                type={question.type}
                isSelected={selections[0] === option.id}
                onSelect={onSelect}
              />
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            {question.options.map((option) => (
              <QuizOption
                key={option.id}
                id={option.id}
                text={option.text}
                subtext={option.subtext}
                type={question.type}
                isSelected={selections.includes(option.id)}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}

        {onNext && (
          <div className="mt-8 flex justify-end">
            <Button
              onClick={onNext}
              disabled={!selections.length}
              className="w-full md:w-auto transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
            >
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}