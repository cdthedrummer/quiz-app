import type { Stat, Archetype } from '../types';
import { archetypes } from '../archetypes';

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