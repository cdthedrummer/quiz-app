'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import type { CharacterStats } from '@/types';

// Move questions to a separate file later for better organization
const questions = [
  {
    id: 1,
    text: "How do you learn best?",
    type: "single",
    options: [
      { id: "1a", text: "Reading", stats: { intelligence: 2 } },
      { id: "1b", text: "Watching", stats: { intelligence: 1, wisdom: 1 } },
      { id: "1c", text: "Hands-on", stats: { dexterity: 2 } },
      { id: "1d", text: "With others", stats: { charisma: 2 } }
    ]
  },
  // ... rest of the questions (temporarily shortened for this update)
];

interface QuizProps {
  onComplete: (stats: CharacterStats) => void;
  onRetake?: () => void;
}

export default function Quiz({ onComplete, onRetake }: QuizProps) {
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

  useEffect(() => {
    // Auto-progress when a selection is made for single/scale questions
    if (selections[currentQuestion]?.length > 0 && 
        (question.type === 'single' || question.type === 'scale')) {
      handleNext();
    }
  }, [selections]);

  const handleSingleSelect = (value: string) => {
    const currentSelection = selections[currentQuestion]?.[0];
    
    // If clicking the same option, unselect it
    if (currentSelection === value) {
      setSelections(prev => {
        const newSelections = { ...prev };
        delete newSelections[currentQuestion];
        return newSelections;
      });
    } else {
      // Select the new option
      setSelections(prev => ({
        ...prev,
        [currentQuestion]: [value]
      }));
    }
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
        
        {question.type === 'single' || question.type === 'scale' ? (
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
                    handleMultiSelect(option.id);
                  }}
                />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleNext}
                disabled={!selections[currentQuestion]?.length}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
