'use client';

import { motion } from 'framer-motion';
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
  onAnswer: (option: any) => void;
}

const statIcons: Record<string, string> = {
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
    <div className="min-h-[70vh] flex flex-col justify-start items-center w-full max-w-2xl mx-auto px-4">
      {/* Progress section */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="w-full bg-white shadow-lg">
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
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Label
                  htmlFor={option.id}
                  className="flex items-start space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{option.text}</p>
                    {option.subtext && (
                      <p className="text-sm text-gray-500 mt-1">
                        {option.subtext}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {Object.entries(option.stats).map(([stat, value]) => (
                      <span 
                        key={stat} 
                        className="text-xl" 
                        role="img" 
                        aria-label={`${stat} ${value}`}
                        title={`${stat} +${value}`}
                      >
                        {statIcons[stat.toLowerCase()]}
                      </span>
                    ))}
                  </div>
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}