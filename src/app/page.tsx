'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { questions } from '@/src/data/questions';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const hasNextQuestion = currentQuestionIndex < questions.length - 1;

  const handleSelect = (value: string) => {
    setSelections(prev => {
      const current = prev[currentQuestionIndex] || [];
      if (currentQuestion.type === 'multiple') {
        return {
          ...prev,
          [currentQuestionIndex]: current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value],
        };
      }
      return {
        ...prev,
        [currentQuestionIndex]: [value],
      };
    });
  };

  const handleNext = () => {
    if (hasNextQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Build Your Character</h1>
        <p className="text-center text-blue-600 mb-8">Discover your strengths and find ways to level up!</p>
        
        <QuizQuestion
          question={currentQuestion}
          selections={selections[currentQuestionIndex] || []}
          onSelect={handleSelect}
          onNext={hasNextQuestion ? handleNext : undefined}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>
    </main>
  );
}