'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import type { CharacterStats } from '@/types';

const questions = [
  {
    id: 1,
    text: "How do you prefer to learn?",
    type: "single",
    options: [
      { id: "1a", text: "Reading or Studying", stats: { intelligence: 2 } },
      { id: "1b", text: "Watching a Video", stats: { intelligence: 1, wisdom: 1 } },
      { id: "1c", text: "Doing it Yourself", stats: { dexterity: 2 } },
      { id: "1d", text: "Group Setting", stats: { charisma: 2 } }
    ]
  },
  // Add more questions here based on your data
];

interface QuizProps {
  onComplete: (stats: CharacterStats) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});
  const [stats, setStats] = useState<CharacterStats>({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    charisma: 0,
    constitution: 0,
  });

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSingleSelect = (value: string) => {
    // If the same option is selected, unselect it
    if (selections[currentQuestion]?.[0] === value) {
      setSelections(prev => ({
        ...prev,
        [currentQuestion]: []
      }));
      return;
    }

    setSelections(prev => ({
      ...prev,
      [currentQuestion]: [value]
    }));
  };

  const handleMultiSelect = (value: string) => {
    setSelections(prev => {
      const currentSelections = prev[currentQuestion] || [];
      const newSelections = currentSelections.includes(value)
        ? currentSelections.filter(v => v !== value)
        : [...currentSelections, value];
      
      return {
        ...prev,
        [currentQuestion]: newSelections
      };
    });
  };

  const updateStats = (selectedOptions: string[]) => {
    const newStats = { ...stats };
    selectedOptions.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option?.stats) {
        Object.entries(option.stats).forEach(([stat, value]) => {
          newStats[stat as keyof CharacterStats] += value;
        });
      }
    });
    setStats(newStats);
  };

  const handleNext = () => {
    const currentSelections = selections[currentQuestion] || [];
    updateStats(currentSelections);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(stats);
    }
  };

  if (!question) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-medium">{question.text}</h3>
        
        {question.type === 'single' ? (
          <RadioGroup
            value={selections[currentQuestion]?.[0] || ''}
            onValueChange={handleSingleSelect}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <Checkbox
                  id={option.id}
                  checked={selections[currentQuestion]?.includes(option.id)}
                  onCheckedChange={(checked) => {
                    if (checked) handleMultiSelect(option.id);
                  }}
                />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={!selections[currentQuestion]?.length}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Complete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
