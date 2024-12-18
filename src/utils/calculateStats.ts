type Answers = Record<number, string[]>;

type Stats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export function calculateStats(answers: Answers): Stats {
  const stats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  let totalPoints = 0;

  // Calculate raw points
  Object.values(answers).forEach(selections => {
    selections.forEach(selection => {
      selection.split(',').forEach(stat => {
        if (stat in stats) {
          stats[stat as keyof Stats] += 1;
          totalPoints += 1;
        }
      });
    });
  });

  // Convert to percentages
  if (totalPoints > 0) {
    Object.keys(stats).forEach(key => {
      const stat = key as keyof Stats;
      stats[stat] = (stats[stat] / totalPoints) * 100;
    });
  }

  return stats;
}