import { CharacterStats } from '@/types';
import archetypes from '@/data/archetypes';

export const determineArchetype = (stats: CharacterStats) => {
  const highestStat = Object.entries(stats).reduce((a, b) => 
    stats[a] > stats[b[0]] ? a : b[0]
  );

  return archetypes.find(archetype =>
    archetype.primaryStats.includes(highestStat)
  ) || archetypes[0];
};
