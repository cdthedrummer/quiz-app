import type { Stat } from './types';

export type Archetype = {
  name: string;
  emoji: string;
  description: string;
  primaryStat: keyof Stat;
  secondaryStat: keyof Stat;
  recommendations: string[];
};

export const archetypes: Archetype[] = [
  {
    name: 'Knight',
    emoji: '⚔️',
    description: 'You are a valiant warrior who combines physical prowess with unwavering honor. Your strength serves a noble purpose, and your charisma inspires others to follow your lead.',
    primaryStat: 'strength',
    secondaryStat: 'charisma',
    recommendations: [
      'Join or start a martial arts club',
      'Organize team sports events',
      'Take on leadership roles in community projects',
      'Practice public speaking'
    ]
  },
  {
    name: 'Mystic',
    emoji: '🔮',
    description: 'You possess deep wisdom and an intuitive understanding of the mysteries of life. Your intelligence guides your spiritual journey, while your wisdom helps others find their path.',
    primaryStat: 'intelligence',
    secondaryStat: 'wisdom',
    recommendations: [
      'Start a meditation practice',
      'Lead study groups',
      'Write philosophical essays',
      'Mentor others in their personal growth'
    ]
  },
  {
    name: 'Rogue',
    emoji: '🗡️',
    description: 'Quick-witted and agile, you excel at finding creative solutions to complex problems. Your dexterity keeps you one step ahead, while your intelligence helps you plan the perfect strategy.',
    primaryStat: 'dexterity',
    secondaryStat: 'intelligence',
    recommendations: [
      'Take up parkour or rock climbing',
      'Learn sleight of hand tricks',
      'Study puzzle-solving techniques',
      'Practice improvisation'
    ]
  },
  {
    name: 'Sage',
    emoji: '📚',
    description: 'A seeker of knowledge and truth, you combine deep wisdom with powerful intellect. Your understanding of both facts and human nature makes you an invaluable advisor.',
    primaryStat: 'wisdom',
    secondaryStat: 'intelligence',
    recommendations: [
      'Start a book club',
      'Teach in your area of expertise',
      'Write educational content',
      'Provide counseling or advice'
    ]
  },
  {
    name: 'Diplomat',
    emoji: '🤝',
    description: 'You excel at bringing people together and finding common ground. Your charisma draws others in, while your wisdom helps you understand their deepest motivations.',
    primaryStat: 'charisma',
    secondaryStat: 'wisdom',
    recommendations: [
      'Join debate clubs',
      'Mediate conflicts',
      'Organize community events',
      'Lead team-building activities'
    ]
  }
];