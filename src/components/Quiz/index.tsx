'use client';
import { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { QuizCheckpoint } from './QuizCheckpoint';
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
  const showCheckpoint = (currentQuestion + 1) % 4 === 0;

  const handleAnswer = (selectedStats: string[]) => {
    // Update stats based on answer
    const newStats = { ...stats };
    selectedStats.forEach(stat => {
      newStats[stat.toLowerCase() as keyof CharacterStats] += 1;
    });
    setStats(newStats);

    // Show checkpoint or move to next question
    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        onComplete(newStats);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }, 500);
  };

  const handleContinue = () => {
    if (currentQuestion === questions.length - 1) {
      onComplete(stats);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showCheckpoint ? (
        <QuizCheckpoint
          currentStats={stats}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onContinue={handleContinue}
        />
      ) : (
        <QuizQuestion
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion + 1}
          totalQuestions={questions.length}
          progress={progress}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}