import React from 'react';
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface QuizCardProps {
  question: string;
  options: { text: string; subtitle?: string }[];
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  progress,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onNext,
}) => {
  const [selected, setSelected] = React.useState<string>("");

  const handleChange = (value: string) => {
    setSelected(value);
    onAnswer(value);
  };

  return (
    <Card className="w-full bg-white rounded-lg shadow-md">
      <CardHeader className="space-y-4 pb-6">
        <h1 className="text-3xl font-bold text-center">Build Your Character</h1>
        <p className="text-center text-blue-600">Discover your strengths and find ways to level up!</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestion} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold">{question}</h2>
        <RadioGroup onValueChange={handleChange} className="space-y-3">
          {options.map((option) => (
            <div key={option.text} 
              className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <RadioGroupItem value={option.text} id={option.text} className="mt-1" />
              <Label htmlFor={option.text} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.text}</div>
                {option.subtitle && (
                  <div className="text-sm text-gray-500 mt-1">{option.subtitle}</div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {selected && (
          <Button 
            onClick={onNext} 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next Question
          </Button>
        )}
      </CardContent>
    </Card>
  );
};