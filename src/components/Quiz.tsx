'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { CharacterStats } from '@/types';
import { questions } from '../data/questions';
import { QuizProgress } from './quiz/QuizProgress';
import { QuizQuestion } from './quiz/QuizQuestion';
import { useQuizStats } from '../hooks/useQuizStats';

interface QuizProps {
  onComplete: (stats: CharacterStats) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const { stats, updateStats } = useQuizStats();

  const question = questions[currentQuestion];

  const handleSelect = (value: string) => {
    const isSingleSelect = question.type === 'single' || question.type === 'scale';
    
    setSelections(prev => {
      const currentSelections = prev[currentQuestion] || [];
      let newSelections: string[];

      if (isSingleSelect) {
        // For single select, if same value is selected, unselect it
        newSelections = currentSelections[0] === value ? [] : [value];
      } else {
        // For multi select, toggle the selection
        newSelections = currentSelections.includes(value)
          ? currentSelections.filter(v => v !== value)
          : [...currentSelections, value];
      }

      return {
        ...prev,
        [currentQuestion]: newSelections
      };
    });
  };

  const handleNext = () => {
    const currentSelections = selections[currentQuestion] || [];
    setIsAnimating(true);
    
    setTimeout(() => {
      updateStats(question, currentSelections);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        onComplete(stats);
      }
      setIsAnimating(false);
    }, 300);
  };

  // Auto-advance for single/scale questions when an option is selected
  if (selections[currentQuestion]?.length > 0 && 
      (question.type === 'single' || question.type === 'scale')) {
    handleNext();
  }

  if (!question) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader className="pb-2 px-4 md:px-6">
        <QuizProgress 
          current={currentQuestion} 
          total={questions.length} 
        />
      </CardHeader>
      <CardContent 
        className={`transition-opacity duration-300 px-4 md:px-6
          ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
      >
        <QuizQuestion
          question={question}
          selections={selections[currentQuestion] || []}
          onSelect={handleSelect}
          onNext={question.type === 'multiple' ? handleNext : undefined}
        />
      </CardContent>
    </Card>
  );
}
