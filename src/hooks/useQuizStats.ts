import { useState, useCallback } from 'react';
import type { CharacterStats } from '@/types';
import type { QuizQuestion } from '@/src/data/questions';

export function useQuizStats() {
  const [stats, setStats] = useState<CharacterStats>({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    charisma: 0,
    constitution: 0,
  });

  const updateStats = useCallback((question: QuizQuestion, selectedOptions: string[]) => {
    selectedOptions.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option?.stats) {
        setStats(prev => {
          const newStats = { ...prev };
          Object.entries(option.stats).forEach(([stat, value]) => {
            newStats[stat as keyof CharacterStats] += value;
          });
          return newStats;
        });
      }
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      strength: 0,
      intelligence: 0,
      wisdom: 0,
      dexterity: 0,
      charisma: 0,
      constitution: 0,
    });
  }, []);

  return { stats, updateStats, resetStats };
}
