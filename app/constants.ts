import type { Stat } from './types';

export const statEmojis: Record<keyof Stat, string> = {
  strength: "💪",
  intelligence: "🧠",
  wisdom: "🔮",
  dexterity: "🎾",
  charisma: "🌟",
  constitution: "🛡️"
};

export const INITIAL_STATS: Stat = {
  strength: 0,
  intelligence: 0,
  wisdom: 0,
  dexterity: 0,
  charisma: 0,
  constitution: 0
};
