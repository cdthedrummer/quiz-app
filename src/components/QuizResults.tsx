type Stats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

type QuizResultsProps = {
  stats: Stats;
};

export function QuizResults({ stats }: QuizResultsProps) {
  const statsInfo = {
    strength: "Physical power and athletic training",
    dexterity: "Agility, balance, and coordination",
    constitution: "Endurance, health, and vitality",
    intelligence: "Mental acuity, knowledge, and problem-solving",
    wisdom: "Awareness, intuition, and insight",
    charisma: "Force of personality and social influence"
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Your Character Stats</h2>
      
      <div className="space-y-6">
        {(Object.entries(stats) as [keyof Stats, number][]).map(([stat, value]) => (
          <div key={stat}>
            <div className="flex justify-between mb-1">
              <span className="font-medium capitalize">{stat}</span>
              <span>{Math.round(value)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${value}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">{statsInfo[stat]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}