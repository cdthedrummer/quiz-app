import type { Stat } from './types';

export type Archetype = {
  name: string;
  emoji: string;
  description: string;
  primaryStat: keyof Stat;
  secondaryStat: keyof Stat;
  recommendations: string[];
  improvementTips: {
    [key in keyof Stat]?: string[];
  };
};

export const archetypes: Archetype[] = [
  {
    name: 'Knight',
    emoji: '⚔️',
    description: 'You combine physical prowess with inspiring leadership. Your strength serves a noble purpose, and your charisma naturally draws others to your cause.',
    primaryStat: 'strength',
    secondaryStat: 'charisma',
    recommendations: [
      'Lead group fitness activities',
      'Coach team sports',
      'Organize community events',
      'Train others in physical skills'
    ],
    improvementTips: {
      intelligence: ['Join a book club', 'Take online courses', 'Learn a new language'],
      wisdom: ['Practice meditation', 'Mentor others', 'Study philosophy'],
      dexterity: ['Try yoga or dance', 'Learn juggling', 'Practice precision sports']
    }
  },
  {
    name: 'Mystic',
    emoji: '🔮',
    description: 'Your intelligence and wisdom give you deep insight into both knowledge and human nature. You excel at understanding complex systems and guiding others.',
    primaryStat: 'intelligence',
    secondaryStat: 'wisdom',
    recommendations: [
      'Lead study groups',
      'Write educational content',
      'Teach complex topics',
      'Provide thoughtful advice'
    ],
    improvementTips: {
      strength: ['Start with bodyweight exercises', 'Try progressive resistance training', 'Join guided fitness classes'],
      charisma: ['Join Toastmasters', 'Practice active listening', 'Engage in group activities'],
      dexterity: ['Take up painting', 'Practice typing skills', 'Try coordination exercises']
    }
  },
  {
    name: 'Rogue',
    emoji: '🗡️',
    description: 'Your quick wit matches your quick movements. You excel at finding creative solutions and adapting rapidly to new situations.',
    primaryStat: 'dexterity',
    secondaryStat: 'intelligence',
    recommendations: [
      'Take up parkour or climbing',
      'Learn sleight of hand',
      'Master quick problem-solving',
      'Practice speed skills'
    ],
    improvementTips: {
      strength: ['Start calisthenics', 'Try rock climbing', 'Practice bodyweight exercises'],
      wisdom: ['Keep a reflection journal', 'Study decision-making', 'Practice mindfulness'],
      charisma: ['Join improv classes', 'Practice storytelling', 'Engage in team sports']
    }
  },
  {
    name: 'Sage',
    emoji: '📚',
    description: 'You combine deep wisdom with keen intellect. Your understanding of both facts and human nature makes you an invaluable advisor and teacher.',
    primaryStat: 'wisdom',
    secondaryStat: 'intelligence',
    recommendations: [
      'Mentor others',
      'Lead discussion groups',
      'Write advice columns',
      'Teach life skills'
    ],
    improvementTips: {
      strength: ['Start gentle exercise routines', 'Try tai chi', 'Practice yoga'],
      dexterity: ['Learn calligraphy', 'Practice fine motor skills', 'Try balance exercises'],
      charisma: ['Join discussion groups', 'Practice public speaking', 'Lead small workshops']
    }
  },
  {
    name: 'Diplomat',
    emoji: '🤝',
    description: 'Your charisma and wisdom make you a natural mediator. You excel at bringing people together and finding peaceful solutions to conflicts.',
    primaryStat: 'charisma',
    secondaryStat: 'wisdom',
    recommendations: [
      'Lead negotiations',
      'Organize social events',
      'Mediate conflicts',
      'Build community connections'
    ],
    improvementTips: {
      strength: ['Join group fitness classes', 'Try team sports', 'Practice partner exercises'],
      intelligence: ['Read current events', 'Study psychology', 'Learn about different cultures'],
      dexterity: ['Take dance classes', 'Try social sports', 'Practice public speaking gestures']
    }
  }
];