import { CharacterStats } from '../types';

export interface Archetype {
  name: string;
  icon: string;
  description: string;
  primaryStats: Array<keyof CharacterStats>;
  recommendations: {
    activities: string[];
    improvements: Record<string, string[]>;
  };
  threshold: number;
}

const archetypes: Archetype[] = [
  {
    name: "Knight",
    icon: "⚔️",
    description: "You combine physical prowess with inspiring leadership. Your strength serves a noble purpose, and your charisma naturally draws others to your cause.",
    primaryStats: ["strength", "charisma"],
    threshold: 5,
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
    name: "Scholar",
    icon: "📚",
    description: "Your keen intellect and deep wisdom make you a natural problem-solver and teacher. You excel at understanding complex systems and sharing knowledge.",
    primaryStats: ["intelligence", "wisdom"],
    threshold: 5,
    recommendations: {
      activities: [
        "Teach or tutor others",
        "Write educational content",
        "Research new topics",
        "Join discussion groups"
      ],
      improvements: {
        strength: [
          "Try bodyweight exercises",
          "Take up hiking",
          "Practice martial arts"
        ],
        charisma: [
          "Join public speaking clubs",
          "Practice storytelling",
          "Volunteer for presentations"
        ]
      }
    }
  },
  {
    name: "Rogue",
    icon: "🎯",
    description: "Your exceptional agility and quick thinking make you naturally adaptable. You excel at tasks requiring precision and creative problem-solving.",
    primaryStats: ["dexterity", "intelligence"],
    threshold: 5,
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
  },
  {
    name: "Healer",
    icon: "💚",
    description: "Your high constitution and wisdom make you naturally attuned to well-being. You excel at maintaining health and helping others do the same.",
    primaryStats: ["constitution", "wisdom"],
    threshold: 5,
    recommendations: {
      activities: [
        "Study nutrition",
        "Practice holistic wellness",
        "Learn therapeutic techniques",
        "Guide wellness groups"
      ],
      improvements: {
        strength: [
          "Try gentle strength training",
          "Practice tai chi",
          "Learn proper form"
        ],
        charisma: [
          "Develop empathy",
          "Practice active listening",
          "Join support groups"
        ]
      }
    }
  },
  {
    name: "Bard",
    icon: "🎭",
    description: "Your charisma and dexterity make you a natural performer and communicator. You excel at creative expression and social interaction.",
    primaryStats: ["charisma", "dexterity"],
    threshold: 5,
    recommendations: {
      activities: [
        "Take dance classes",
        "Learn an instrument",
        "Join improv groups",
        "Practice public speaking"
      ],
      improvements: {
        intelligence: [
          "Study music theory",
          "Learn new art forms",
          "Read about psychology"
        ],
        constitution: [
          "Build performance stamina",
          "Practice breath control",
          "Maintain vocal health"
        ]
      }
    }
  }
];

export const getArchetype = (stats: CharacterStats): Archetype => {
  let bestMatch = archetypes[0];
  let highestScore = -1;

  archetypes.forEach(archetype => {
    const score = archetype.primaryStats.reduce((sum, stat) => sum + stats[stat], 0);
    if (score > highestScore && score >= archetype.threshold) {
      highestScore = score;
      bestMatch = archetype;
    }
  });

  return bestMatch;
};

export default archetypes;
