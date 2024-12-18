import React from 'react';
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizCardProps {
  question: string;
  options: { text: string; subtitle?: string }[];
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  options,
  progress,
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-4">
        <h1 className="text-3xl font-bold text-center">Build Your Character</h1>
        <p className="text-center text-blue-600">Discover your strengths and find ways to level up!</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{question}</h2>
          <RadioGroup onValueChange={onAnswer} className="space-y-3">
            {options.map((option) => (
              <div key={option.text} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={option.text} id={option.text} />
                <Label htmlFor={option.text} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.text}</div>
                  {option.subtitle && (
                    <div className="text-sm text-gray-500">{option.subtitle}</div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
