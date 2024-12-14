import { CharacterStats } from '@/types';

export interface Archetype {
  name: string;
  icon: string;
  description: string;
  recommendations: {
    activities: string[];
    improvements: Record<string, string[]>;
  };
}

export const archetypes: Record<string, Archetype> = {
  warrior: {
    name: 'Warrior',
    icon: '⚔️',
    description: 'You thrive on physical challenges and have the strength to overcome any obstacle. Your determination and power make you a natural leader in physical endeavors.',
    recommendations: {
      activities: [
        'Strength training',
        'Combat sports',
        'Team sports',
        'Outdoor adventures'
      ],
      improvements: {
        wisdom: [
          'Practice meditation',
          'Study strategy games'
        ],
        intelligence: [
          'Learn about nutrition',
          'Study training techniques'
        ]
      }
    }
  },
  mage: {
    name: 'Mage',
    icon: '🔮',
    description: 'Your keen intellect and pursuit of knowledge sets you apart. You excel at problem-solving and have a natural curiosity about how things work.',
    recommendations: {
      activities: [
        'Programming',
        'Strategic games',
        'Scientific research',
        'Creative writing'
      ],
      improvements: {
        dexterity: [
          'Try hands-on projects',
          'Practice physical skills'
        ],
        constitution: [
          'Develop exercise routine',
          'Focus on healthy habits'
        ]
      }
    }
  },
  rogue: {
    name: 'Rogue',
    icon: '🗡️',
    description: 'Your agility and precision make you naturally talented at skilled activities. You have excellent hand-eye coordination and adapt quickly to new situations.',
    recommendations: {
      activities: [
        'Martial arts',
        'Dance',
        'Sports',
        'Musical instruments'
      ],
      improvements: {
        strength: [
          'Add strength training',
          'Build core stability'
        ],
        wisdom: [
          'Practice patience',
          'Learn strategy'
        ]
      }
    }
  },
  cleric: {
    name: 'Cleric',
    icon: '✨',
    description: 'You have deep wisdom and strong intuition. Your understanding of people and situations helps you make good decisions and guide others.',
    recommendations: {
      activities: [
        'Meditation',
        'Counseling',
        'Teaching',
        'Nature walks'
      ],
      improvements: {
        strength: [
          'Build physical resilience',
          'Try strength training'
        ],
        dexterity: [
          'Practice coordination',
          'Learn new skills'
        ]
      }
    }
  },
  bard: {
    name: 'Bard',
    icon: '🎭',
    description: 'Your charisma and social skills make you a natural leader. You excel at communication and bringing people together.',
    recommendations: {
      activities: [
        'Public speaking',
        'Performing arts',
        'Team leadership',
        'Social events'
      ],
      improvements: {
        intelligence: [
          'Study communication theory',
          'Learn new subjects'
        ],
        constitution: [
          'Build endurance',
          'Maintain energy levels'
        ]
      }
    }
  },
  ranger: {
    name: 'Ranger',
    icon: '🏹',
    description: 'Your endurance and adaptability help you thrive in any situation. You maintain excellent health and can handle physical challenges well.',
    recommendations: {
      activities: [
        'Hiking',
        'Endurance sports',
        'Nature activities',
        'Survival skills'
      ],
      improvements: {
        charisma: [
          'Join group activities',
          'Lead outdoor events'
        ],
        intelligence: [
          'Study nature',
          'Learn survival skills'
        ]
      }
    }
  }
};

export function determineArchetype(stats: CharacterStats): Archetype {
  // Find the highest stat(s)
  const maxValue = Math.max(...Object.values(stats));
  const highestStats = Object.entries(stats)
    .filter(([_, value]) => value === maxValue)
    .map(([stat]) => stat);

  // Map stats to archetypes
  const archetypeMap: Record<string, string> = {
    strength: 'warrior',
    intelligence: 'mage',
    dexterity: 'rogue',
    wisdom: 'cleric',
    charisma: 'bard',
    constitution: 'ranger'
  };

  // If there's a tie, use secondary stats to break it
  if (highestStats.length > 1) {
    const secondaryStats = { ...stats };
    highestStats.forEach(stat => delete secondaryStats[stat as keyof CharacterStats]);
    const nextHighest = Math.max(...Object.values(secondaryStats));
    const breakingStats = Object.entries(secondaryStats)
      .filter(([_, value]) => value === nextHighest)
      .map(([stat]) => stat);
    
    // If we have a breaking stat, use it
    if (breakingStats.length === 1) {
      return archetypes[archetypeMap[breakingStats[0]]];
    }
  }

  // Default to the first highest stat
  return archetypes[archetypeMap[highestStats[0]]];
}
