import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const statIcons = {
  strength: '💪',
  intelligence: '🧠',
  wisdom: '🔮',
  dexterity: '🎾',
  charisma: '🌟',
  constitution: '🛡️'
};

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
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-medium leading-snug">
        {question.text}
      </h3>
      
      <RadioGroup
        value={selections[0] || ''}
        onValueChange={onSelect}
      >
        {question.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {onNext && (
        <button
          onClick={onNext}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      )}
    </div>
  );
}