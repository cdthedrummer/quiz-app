// Simple types without external dependencies
type StatName = 'strength' | 'intelligence' | 'wisdom' | 'dexterity' | 'charisma' | 'constitution';

export interface Stats {
  [key: string]: number;
}

interface ArchetypeInfo {
  name: string;
  icon: string;
  description: string;
  primaryStat: StatName;
  activities: string[];
  focus: string[];
  growthPaths: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  comparisons: Record<string, string>;
}

export const ARCHETYPES: Record<StatName, ArchetypeInfo> = {
  strength: {
    name: 'Champion',
    icon: '💪',
    primaryStat: 'strength',
    description: 'A natural athlete with exceptional physical power and determination.',
    activities: ['Weightlifting', 'Team Sports', 'Rock Climbing', 'Martial Arts'],
    focus: ['Building raw power', 'Athletic performance', 'Physical leadership'],
    growthPaths: {
      beginner: ['Start basic strength training', 'Join a recreational sports team'],
      intermediate: ['Advanced workout programs', 'Competition preparation'],
      advanced: ['Athletic coaching', 'Professional competition']
    },
    comparisons: {
      dexterity: 'While Champions excel in power, Agile Experts focus on precision',
      wisdom: 'Champions build physical strength, while Sages build mental strength'
    }
  },
  dexterity: {
    name: 'Agile Expert',
    icon: '🎯',
    primaryStat: 'dexterity',
    description: 'Master of precision and coordination, excelling in skilled movements.',
    activities: ['Dance', 'Martial Arts', 'Sports', 'Musical Instruments'],
    focus: ['Precision control', 'Quick reactions', 'Physical artistry'],
    growthPaths: {
      beginner: ['Basic coordination training', 'Introductory dance or martial arts'],
      intermediate: ['Advanced techniques', 'Performance preparation'],
      advanced: ['Teaching movement arts', 'Professional performance']
    },
    comparisons: {
      strength: 'Agile Experts prefer precision over power',
      intelligence: 'Physical precision meets mental acuity'
    }
  },
  intelligence: {
    name: 'Scholar',
    icon: '🧠',
    primaryStat: 'intelligence',
    description: 'A brilliant mind with a deep love for learning and problem-solving.',
    activities: ['Programming', 'Research', 'Strategy Games', 'Creative Writing'],
    focus: ['Knowledge acquisition', 'Problem-solving', 'Innovation'],
    growthPaths: {
      beginner: ['Online courses', 'Reading programs', 'Basic coding'],
      intermediate: ['Specialized studies', 'Research projects'],
      advanced: ['Teaching', 'Innovation leadership', 'Expert consulting']
    },
    comparisons: {
      wisdom: 'Scholars seek knowledge, while Sages seek understanding',
      charisma: 'Deep knowledge meets social influence'
    }
  },
  wisdom: {
    name: 'Sage',
    icon: '🔮',
    primaryStat: 'wisdom',
    description: 'An insightful guide with deep understanding and natural intuition.',
    activities: ['Meditation', 'Counseling', 'Nature Activities', 'Teaching'],
    focus: ['Inner growth', 'Understanding others', 'Natural wisdom'],
    growthPaths: {
      beginner: ['Meditation basics', 'Nature connection', 'Active listening'],
      intermediate: ['Advanced mindfulness', 'Mentoring others'],
      advanced: ['Spiritual leadership', 'Community guidance']
    },
    comparisons: {
      intelligence: 'Sages value insight over information',
      constitution: 'Mental balance meets physical wellness'
    }
  },
  charisma: {
    name: 'Leader',
    icon: '🌟',
    primaryStat: 'charisma',
    description: 'A magnetic personality who inspires and connects with others naturally.',
    activities: ['Public Speaking', 'Performing Arts', 'Team Leadership', 'Social Events'],
    focus: ['Social connection', 'Leadership', 'Inspiration'],
    growthPaths: {
      beginner: ['Communication skills', 'Group activities', 'Basic leadership'],
      intermediate: ['Public speaking', 'Team management'],
      advanced: ['Executive leadership', 'Community building']
    },
    comparisons: {
      intelligence: 'Leaders inspire while Scholars inform',
      wisdom: 'Natural charm meets deep understanding'
    }
  },
  constitution: {
    name: 'Guardian',
    icon: '🛡️',
    primaryStat: 'constitution',
    description: 'A pillar of health and endurance, maintaining perfect balance in life.',
    activities: ['Endurance Sports', 'Hiking', 'Health Education', 'Wellness Practices'],
    focus: ['Health maintenance', 'Endurance building', 'Balanced living'],
    growthPaths: {
      beginner: ['Basic fitness routine', 'Healthy eating habits', 'Sleep improvement'],
      intermediate: ['Advanced nutrition', 'Endurance training'],
      advanced: ['Health coaching', 'Wellness leadership']
    },
    comparisons: {
      strength: 'Guardians focus on endurance over raw power',
      dexterity: 'Steady endurance meets quick precision'
    }
  }
};

export function getArchetype(stats: Stats): ArchetypeInfo {
  // Find highest stat
  let maxStat = Object.entries(stats).reduce((max, [stat, value]) => {
    return value > max.value ? {stat, value} : max;
  }, {stat: 'strength', value: -1});

  return ARCHETYPES[maxStat.stat as StatName];
}

// Get recommended path based on stat value
export function getGrowthLevel(value: number): 'beginner' | 'intermediate' | 'advanced' {
  if (value < 4) return 'beginner';
  if (value < 7) return 'intermediate';
  return 'advanced';
}

// Get complementary archetype recommendations
export function getComplementaryArchetypes(mainStat: StatName): StatName[] {
  const complementaryMap: Record<StatName, StatName[]> = {
    strength: ['dexterity', 'constitution'],
    dexterity: ['strength', 'wisdom'],
    intelligence: ['wisdom', 'charisma'],
    wisdom: ['intelligence', 'constitution'],
    charisma: ['intelligence', 'dexterity'],
    constitution: ['strength', 'wisdom']
  };
  return complementaryMap[mainStat];
}