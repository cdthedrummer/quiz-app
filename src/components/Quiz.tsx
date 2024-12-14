'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import type { CharacterStats } from '@/types';
import { questions } from '../data/questions';

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
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // Auto-progress when a selection is made for single/scale questions
    if (selections[currentQuestion]?.length > 0 && 
        (question.type === 'single' || question.type === 'scale')) {
      handleNext();
    }
  }, [selections, currentQuestion, question.type]);

  const handleSingleSelect = (value: string) => {
    const currentSelection = selections[currentQuestion]?.[0];
    
    if (currentSelection === value) {
      setSelections(prev => {
        const newSelections = { ...prev };
        delete newSelections[currentQuestion];
        return newSelections;
      });
    } else {
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
    selectedOptions.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option?.stats) {
        setStats(prev => {
          const newStats = { ...prev };
          Object.entries(option.stats).forEach(([stat, value]) => {
            newStats[stat as keyof CharacterStats] += value;
          });
          return newStats;
        });
      }
    });
  };

  const handleNext = () => {
    const currentSelections = selections[currentQuestion] || [];
    setIsAnimating(true);
    
    setTimeout(() => {
      updateStats(currentSelections);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        onComplete(stats);
      }
      setIsAnimating(false);
    }, 300);
  };

  if (!question) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
        <Progress 
          value={progress} 
          className="h-2 transition-all duration-300 ease-in-out" 
        />
      </CardHeader>
      <CardContent className={`space-y-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-lg font-medium">{question.text}</h3>
        
        {question.type === 'single' || question.type === 'scale' ? (
          <RadioGroup
            value={selections[currentQuestion]?.[0] || ''}
            onValueChange={handleSingleSelect}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option.id} 
                className="relative p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="font-medium cursor-pointer">
                    {option.text}
                  </Label>
                </div>
                {option.subtext && (
                  <p className="mt-1 ml-7 text-sm text-gray-500">
                    {option.subtext}
                  </p>
                )}
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            {question.options.map((option) => (
              <div key={option.id} 
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={selections[currentQuestion]?.includes(option.id)}
                    onCheckedChange={() => handleMultiSelect(option.id)}
                  />
                  <Label htmlFor={option.id} className="font-medium cursor-pointer">
                    {option.text}
                  </Label>
                </div>
                {option.subtext && (
                  <p className="mt-1 ml-7 text-sm text-gray-500">
                    {option.subtext}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleNext}
                disabled={!selections[currentQuestion]?.length}
                className="transition-all duration-200 hover:scale-105"
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
