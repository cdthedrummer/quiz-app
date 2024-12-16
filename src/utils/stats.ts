import { QuizStats, StatType } from '@/types/quiz.types';

export const calculateTotalStats = (stats: QuizStats): number => {
  return Object.values(stats).reduce((sum, value) => sum + value, 0);
};

export const getHighestStat = (stats: QuizStats): StatType => {
  return Object.entries(stats).reduce(
    (highest, [stat, value]) => (
      value > highest.value ? { stat: stat as StatType, value } : highest
    ),
    { stat: 'strength' as StatType, value: -Infinity }
  ).stat;
};

export const getStatPercentage = (stats: QuizStats, stat: StatType): number => {
  const total = calculateTotalStats(stats);
  return total === 0 ? 0 : (stats[stat] / total) * 100;
};

export const normalizeStats = (stats: QuizStats): QuizStats => {
  const maxValue = Math.max(...Object.values(stats));
  return Object.entries(stats).reduce(
    (normalized, [stat, value]) => ({
      ...normalized,
      [stat]: maxValue === 0 ? 0 : (value / maxValue) * 100
    }),
    {} as QuizStats
  );
};
