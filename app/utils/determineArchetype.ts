export function determineArchetype(stats: Stat) {
  // Find the two highest stats
  let highestStat: keyof Stat = 'strength';
  let secondHighestStat: keyof Stat = 'charisma';
  let highestValue = -1;
  let secondHighestValue = -2;

  Object.entries(stats).forEach(([stat, value]) => {
    if (value > highestValue) {
      secondHighestValue = highestValue;
      secondHighestStat = highestStat;
      highestValue = value;
      highestStat = stat as keyof Stat;
    } else if (value > secondHighestValue) {
      secondHighestValue = value;
      secondHighestStat = stat as keyof Stat;
    }
  });

  // Find matching archetype
  return archetypes.find(
    archetype => 
      archetype.primaryStat === highestStat && 
      archetype.secondaryStat === secondHighestStat
  ) || archetypes[0]; // Default to Knight if no match
}
