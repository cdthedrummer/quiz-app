import { Archetype } from './types';

export const archetypes: Archetype[] = [
  {
    name: "Knight",
    description: "A charismatic warrior who leads from the front, combining physical prowess with natural leadership.",
    primaryStat: "strength",
    secondaryStat: "charisma",
    emoji: "⚔️",
    thresholds: { primary: 4, secondary: 3 },
    recommendations: [
      "Weightlifting/Calisthenics",
      "CrossFit",
      "Rock Climbing"
    ]
  },
  {
    name: "Sage",
    description: "A wise scholar who combines deep knowledge with intuitive understanding.",
    primaryStat: "intelligence",
    secondaryStat: "wisdom",
    emoji: "📚",
    thresholds: { primary: 4, secondary: 3 },
    recommendations: [
      "Language Learning",
      "Programming",
      "Academic Studies"
    ]
  },
  {
    name: "Ranger",
    description: "A nimble explorer who combines physical agility with rugged endurance.",
    primaryStat: "dexterity",
    secondaryStat: "constitution",
    emoji: "🏹",
    thresholds: { primary: 4, secondary: 3 },
    recommendations: [
      "Rock Climbing",
      "Martial Arts",
      "Hiking"
    ]
  },
  {
    name: "Diplomat",
    description: "A natural connector who builds bridges between people and ideas.",
    primaryStat: "charisma",
    secondaryStat: "wisdom",
    emoji: "🤝",
    thresholds: { primary: 4, secondary: 3 },
    recommendations: [
      "Public Speaking",
      "Networking Events",
      "Leadership Workshops"
    ]
  },
  {
    name: "Scholar",
    description: "A dedicated intellectual who seeks to understand the world through study and analysis.",
    primaryStat: "intelligence",
    secondaryStat: "constitution",
    emoji: "🎓",
    thresholds: { primary: 4, secondary: 3 },
    recommendations: [
      "Online Courses",
      "Technical Workshops",
      "Research Projects"
    ]
  },
  {
    name: "Athlete",
    description: "A disciplined performer who pushes the boundaries of physical achievement.",
    primaryStat: "dexterity",
    secondaryStat: "strength",
    emoji: "🏃",
    thresholds: { primary: 4, secondary: 3 },
    recommendations: [
      "Sports Training",
      "Dance Classes",
      "Gymnastics"
    ]
  }
];