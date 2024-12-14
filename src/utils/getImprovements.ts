import type { CharacterStats } from '@/types';

interface StatImprovement {
  title: string;
  improvements: string[];
}

const improvementSuggestions: Record<keyof CharacterStats, string[]> = {
  strength: [
    'Start a beginner-friendly strength training routine',
    'Join a local gym or sports team',
    'Practice bodyweight exercises at home',
    'Take up rock climbing or bouldering',
    'Try resistance band workouts'
  ],
  intelligence: [
    'Read books in new subjects',
    'Take online courses in interesting topics',
    'Learn a programming language',
    'Practice puzzle games and brain teasers',
    'Join a book club or discussion group'
  ],
  wisdom: [
    'Start a daily meditation practice',
    'Keep a journal for self-reflection',
    'Learn from experienced mentors',
    'Practice mindfulness in daily life',
    'Study philosophy or psychology'
  ],
  dexterity: [
    'Take up a musical instrument',
    'Practice juggling or hand-eye coordination games',
    'Join a dance class',
    'Try martial arts or yoga',
    'Learn touch typing or speed typing'
  ],
  charisma: [
    'Join public speaking groups',
    'Practice active listening',
    'Volunteer in community events',
    'Take improv or acting classes',
    'Start networking in your field'
  ],
  constitution: [
    'Develop a consistent sleep schedule',
    'Create a balanced meal plan',
    'Start regular cardio exercises',
    'Practice stress management techniques',
    'Schedule regular health check-ups'
  ]
};

export function getImprovements(stats: CharacterStats): StatImprovement[] {
  // Find the lowest stats (might be multiple)
  const minValue = Math.min(...Object.values(stats));
  const lowStats = Object.entries(stats)
    .filter(([_, value]) => value <= minValue + 2) // Include stats that are close to minimum
    .map(([stat]) => stat as keyof CharacterStats);

  // Get random improvements for each low stat
  return lowStats.map(stat => {
    const allSuggestions = improvementSuggestions[stat];
    const selectedSuggestions = allSuggestions
      .sort(() => Math.random() - 0.5) // Shuffle array
      .slice(0, 2); // Take 2 random suggestions

    return {
      title: stat.charAt(0).toUpperCase() + stat.slice(1),
      improvements: selectedSuggestions
    };
  });
}
