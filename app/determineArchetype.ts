export interface Stat {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

export interface Archetype {
  name: string;
  description: string;
  primaryStat: keyof Stat;
  secondaryStat: keyof Stat;
  emoji: string;
  thresholds: {
    primary: number;
    secondary: number;
  };
}

export const archetypes: Archetype[] = [
  {
    name: "Knight",
    description: "A charismatic warrior who leads from the front, combining physical prowess with natural leadership.",
    primaryStat: "strength",
    secondaryStat: "charisma",
    emoji: "⚔️",
    thresholds: { primary: 4, secondary: 3 }
  },
  {
    name: "Sage",
    description: "A wise scholar who combines deep knowledge with intuitive understanding.",
    primaryStat: "intelligence",
    secondaryStat: "wisdom",
    emoji: "📚",
    thresholds: { primary: 4, secondary: 3 }
  },
  {
    name: "Ranger",
    description: "A nimble explorer who combines physical agility with rugged endurance.",
    primaryStat: "dexterity",
    secondaryStat: "constitution",
    emoji: "🏹",
    thresholds: { primary: 4, secondary: 3 }
  }
];

export const determineArchetype = (stats: Stat): Archetype => {
  let bestMatch = archetypes[0];
  let highestScore = -1;

  archetypes.forEach(archetype => {
    const primaryStatValue = stats[archetype.primaryStat];
    const secondaryStatValue = stats[archetype.secondaryStat];
    
    // Calculate a score based on primary and secondary stats
    const score = (primaryStatValue * 2) + secondaryStatValue;
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = archetype;
    }
  });

  return bestMatch;
};