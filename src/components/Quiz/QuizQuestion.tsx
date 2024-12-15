'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { QuizQuestion as QuestionType } from '@/src/data/questions';

interface QuizQuestionProps {
  question: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  onAnswer: (selectedOption: any) => void;
}

const statIcons = {
  strength: '💪',
  intelligence: '🧠',
  wisdom: '🔮',
  dexterity: '🎾',
  charisma: '🌟',
  constitution: '🛡️'
};

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  progress,
  onAnswer
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-6">{question.text}</h2>
          
          <RadioGroup 
            className="space-y-4"
            onValueChange={(value) => {
              const selectedOption = question.options.find(opt => opt.id === value);
              if (selectedOption) {
                onAnswer(selectedOption);
              }
            }}
          >
            {question.options.map((option) => (
              <div key={option.id} className="relative">
                <Label
                  htmlFor={option.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-accent"
                >
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{option.text}</p>
                    {option.subtext && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.subtext}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(option.stats).map(([stat, value]) => (
                      <span 
                        key={stat} 
                        className="text-xl" 
                        role="img" 
                        aria-label={`${stat} ${value}`}
                      >
                        {statIcons[stat.toLowerCase()]}
                      </span>
                    ))}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}