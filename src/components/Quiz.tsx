'use client';

import { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizResults } from './QuizResults';
import { questions } from '@/data/questions';
import { calculateStats } from '@/utils/calculateStats';

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (value: string) => {
    setAnswers(prev => {
      const current = prev[currentQuestion] || [];
      const question = questions[currentQuestion];

      if (question.type === 'multiple') {
        return {
          ...prev,
          [currentQuestion]: current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value]
        };
      }

      return {
        ...prev,
        [currentQuestion]: [value]
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return <QuizResults stats={calculateStats(answers)} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <QuizProgress 
        current={currentQuestion} 
        total={questions.length} 
      />
      <QuizQuestion
        question={questions[currentQuestion]}
        selected={answers[currentQuestion] || []}
        onSelect={handleSelect}
        onNext={handleNext}
      />
    </div>
  );
}