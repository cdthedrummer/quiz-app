import React from 'react';

interface QuizResultsProps {
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

export function QuizResults({ stats }: QuizResultsProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Your Character Stats</h2>
      
      {Object.entries(stats).map(([stat, value]) => (
        <div key={stat} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="capitalize">{stat}</span>
            <span>{Math.round(value)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}