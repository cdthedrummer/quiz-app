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
  onAnswer: (selectedOption: any) => void;
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
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full p-4"
    >
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
          
          <RadioGroup onValueChange={(value) => {
            const option = question.options.find(opt => opt.id === value);
            if (option) {
              onAnswer(option);
            }
          }}>
            <div className="space-y-4">
              {question.options.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label
                    htmlFor={option.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex-1">
                      <div className="font-medium">{option.text}</div>
                      {option.subtext && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {option.subtext}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(option.stats).map(([stat, value]) => (
                        <span key={stat} className="text-xl" role="img" aria-label={stat}>
                          {statIcons[stat.toLowerCase()]}
                        </span>
                      ))}
                    </div>
                  </Label>
                </motion.div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
}