import { StatType } from '../types/quiz.types';

export const STAT_ICONS: Record<StatType, string> = {
  strength: '💪',
  intelligence: '🧠',
  wisdom: '🔮',
  dexterity: '🎾',
  charisma: '🌟',
  constitution: '🛡️'
};

export const STAT_DESCRIPTIONS: Record<StatType, string> = {
  strength: 'Raw physical power and muscle capacity',
  intelligence: 'Mental acuity and problem-solving ability',
  wisdom: 'Insight, intuition, and life experience',
  dexterity: 'Agility, reflexes, and hand-eye coordination',
  charisma: 'Personal magnetism and social influence',
  constitution: 'Health, stamina, and vital force'
};

export const ENCOURAGEMENTS = [
  "You're doing great! 🌟",
  "Excellent choice! 🎯",
  "Keep going! 💪",
  "You're making progress! 🚀",
  "Outstanding! ⭐"
];

export const CHECKPOINT_INTERVAL = 5;

export const INITIAL_STATS = {
  strength: 0,
  intelligence: 0,
  wisdom: 0,
  dexterity: 0,
  charisma: 0,
  constitution: 0
};
