import { CharacterStats } from '@/types';

export interface Archetype {
  name: string;
  icon: string;
  description: string;
  primaryStat: keyof CharacterStats;
  secondaryStat: keyof CharacterStats;
  recommendations: {
    activities: string[];
    improvements: Record<string, string[]>;
  };
}

const archetypes: Archetype[] = [
  {
    name: "Knight",
    icon: "⚔️",
    description: "You combine physical prowess with inspiring leadership. Your strength serves a noble purpose, and your charisma naturally draws others to your cause.",
    primaryStat: "strength",
    secondaryStat: "charisma",
    recommendations: {
      activities: [
        "Lead group fitness activities",
        "Coach team sports",
        "Organize community events",
        "Train others in physical skills"
      ],
      improvements: {
        intelligence: [
          "Join a book club",
          "Take online courses",
          "Learn a new language"
        ],
        wisdom: [
          "Practice meditation",
          "Mentor others",
          "Study philosophy"
        ],
        dexterity: [
          "Try yoga or dance",
          "Learn juggling",
          "Practice precision sports"
        ]
      }
    }
  },
  {
    name: "Rogue",
    icon: "🎯",
    description: "Your exceptional agility and quick thinking make you naturally adaptable. You excel at tasks requiring precision and creative problem-solving.",
    primaryStat: "dexterity",
    secondaryStat: "intelligence",
    recommendations: {
      activities: [
        "Learn parkour",
        "Practice martial arts",
        "Take up rock climbing",
        "Study sleight of hand"
      ],
      improvements: {
        strength: [
          "Add resistance training",
          "Try climbing",
          "Practice calisthenics"
        ],
        constitution: [
          "Build endurance with cardio",
          "Improve flexibility",
          "Focus on nutrition"
        ]
      }
    }
  }
];

export default archetypes;
