'use client';

import { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { questions } from '@/src/data/questions';
import type { CharacterStats } from '@/types';

interface QuizProps {
  onComplete: (stats: CharacterStats) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stats, setStats] = useState<CharacterStats>({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    charisma: 0,
    constitution: 0,
  });

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (selectedOption: any) => {
    // Update stats based on the selected option's stats
    const newStats = { ...stats };
    Object.entries(selectedOption.stats).forEach(([stat, value]) => {
      newStats[stat as keyof CharacterStats] += value as number;
    });
    setStats(newStats);

    // Move to next question or complete quiz
    setTimeout(() => {
      if (currentQuestion >= questions.length - 1) {
        onComplete(newStats);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }, 500);
  };

  return (
    <div className="w-full px-4 py-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-4xl font-bold text-center mb-2">
        Build Your Character
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Discover your strengths and find ways to level up!
      </p>

      <QuizQuestion
        question={questions[currentQuestion]}
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
        progress={progress}
        onAnswer={handleAnswer}
      />
    </div>
  );
}