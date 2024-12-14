'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { QuizOption } from './QuizOption';
import type { QuizQuestion as QuestionType } from '@/src/data/questions';

interface QuizQuestionProps {
  question: QuestionType;
  selections: string[];
  onSelect: (value: string) => void;
  onNext?: () => void;
}

export function QuizQuestion({ question, selections, onSelect, onNext }: QuizQuestionProps) {
  const isMultipleChoice = question.type === 'multiple';

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">{question.text}</h3>

      {!isMultipleChoice ? (
        <RadioGroup
          value={selections[0] || ''}
          onValueChange={onSelect}
          className="space-y-2"
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
        <div className="space-y-2">
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
          {onNext && (
            <div className="flex justify-end pt-4">
              <Button
                onClick={onNext}
                disabled={!selections.length}
                className="transition-all duration-200 hover:scale-105"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
