import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const statIcons = {
  strength: '💪',
  intelligence: '🧠',
  wisdom: '🔮',
  dexterity: '🎾',
  charisma: '🌟',
  constitution: '🛡️'
};

const QuizQuestion = ({ 
  question, 
  options, 
  currentQuestion, 
  totalQuestions, 
  progress, 
  onSelect 
}: {
  question: string;
  options: Array<{
    text: string;
    description?: string;
    stats?: string[];
  }>;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  onSelect: (option: any) => void;
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <Progress value={progress} className="mb-8" />

      <Card className="w-full">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-6">{question}</h2>
          
          <div className="space-y-4">
            {options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <button
                  onClick={() => onSelect(option)}
                  className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {option.stats?.map(stat => (
                      <span key={stat} className="text-xl" role="img" aria-label={stat}>
                        {statIcons[stat.toLowerCase()]}
                      </span>
                    ))}
                    <div>
                      <div className="font-medium">{option.text}</div>
                      {option.description && (
                        <div className="text-sm text-gray-500 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizQuestion;