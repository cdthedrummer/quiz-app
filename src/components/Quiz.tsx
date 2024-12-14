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
  {
    id: 2,
    text: "Where's your focus when it comes to trying to be healthy?",
    type: "multiple",
    options: [
      { id: "2a", text: "Eating Well", stats: { constitution: 1 } },
      { id: "2b", text: "Being Active", stats: { strength: 1, dexterity: 1 } },
      { id: "2c", text: "Relaxing and Taking it Easy", stats: { wisdom: 1 } },
      { id: "2d", text: "Getting Regular Check-ups", stats: { constitution: 1 } }
    ]
  },
  {
    id: 3,
    text: "What kind of physical activity makes you the most happy?",
    type: "single",
    options: [
      { id: "3a", text: "Outdoor Sports and Adventures", stats: { constitution: 2 } },
      { id: "3b", text: "Playing Team Sports", stats: { charisma: 2 } },
      { id: "3c", text: "Working Out Alone", stats: { strength: 2 } },
      { id: "3d", text: "Doing Fun Activities", stats: { dexterity: 2 } }
    ]
  },
  {
    id: 4,
    text: "What makes you feel the most energized?",
    type: "single",
    options: [
      { id: "4a", text: "Challenging Yourself", stats: { strength: 1, dexterity: 1 } },
      { id: "4b", text: "Hanging out with Friends", stats: { charisma: 2 } },
      { id: "4c", text: "Quiet Time", stats: { wisdom: 2 } },
      { id: "4d", text: "Creating or Making Things", stats: { intelligence: 2 } }
    ]
  },
  {
    id: 5,
    text: "How do you like to solve tough problems?",
    type: "single",
    options: [
      { id: "5a", text: "Thinking and Planning", stats: { intelligence: 2 } },
      { id: "5b", text: "Testing or Trying Things Out", stats: { dexterity: 2 } },
      { id: "5c", text: "Asking Advice or Teamwork", stats: { charisma: 2 } },
      { id: "5d", text: "Trusting Yourself", stats: { wisdom: 2 } }
    ]
  },
  {
    id: 6,
    text: "How do you like to recharge?",
    type: "multiple",
    options: [
      { id: "6a", text: "Enjoying Nature", stats: { constitution: 1 } },
      { id: "6b", text: "Playing Games or Puzzles", stats: { intelligence: 1 } },
      { id: "6c", text: "Watching Movies or TV Shows", stats: { charisma: 1 } },
      { id: "6d", text: "Listening to Music or Podcasts", stats: { wisdom: 1 } }
    ]
  },
  {
    id: 7,
    text: "Do you enjoy working out?",
    type: "scale",
    options: [
      { id: "7a", text: "Not much", stats: { strength: 1 } },
      { id: "7b", text: "Sometimes", stats: { strength: 2 } },
      { id: "7c", text: "I love it", stats: { strength: 3 } }
    ]
  },
  {
    id: 8,
    text: "Do you like meeting new people?",
    type: "scale",
    options: [
      { id: "8a", text: "Not much", stats: { charisma: 1 } },
      { id: "8b", text: "Sometimes", stats: { charisma: 2 } },
      { id: "8c", text: "I love it", stats: { charisma: 3 } }
    ]
  },
  {
    id: 9,
    text: "Do you keep up with the news?",
    type: "scale",
    options: [
      { id: "9a", text: "Rarely", stats: { wisdom: 1 } },
      { id: "9b", text: "Sometimes", stats: { wisdom: 2 } },
      { id: "9c", text: "All the time", stats: { wisdom: 3 } }
    ]
  },
  {
    id: 10,
    text: "Do you seek out new experiences?",
    type: "scale",
    options: [
      { id: "10a", text: "Not really", stats: { intelligence: 1 } },
      { id: "10b", text: "Sometimes", stats: { intelligence: 2 } },
      { id: "10c", text: "All the time", stats: { intelligence: 3 } }
    ]
  },
  {
    id: 11,
    text: "Do you enjoy playing sports?",
    type: "scale",
    options: [
      { id: "11a", text: "Not really", stats: { dexterity: 1 } },
      { id: "11b", text: "Sometimes", stats: { dexterity: 2 } },
      { id: "11c", text: "I love it", stats: { dexterity: 3 } }
    ]
  },
  {
    id: 12,
    text: "How often do you prioritize your health?",
    type: "scale",
    options: [
      { id: "12a", text: "Rarely", stats: { constitution: 1 } },
      { id: "12b", text: "Sometimes", stats: { constitution: 2 } },
      { id: "12c", text: "All the time", stats: { constitution: 3 } }
    ]
  }
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
