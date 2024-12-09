import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import archetypes, { CharacterStats, getArchetype } from '../data/archetypes';

interface StatDisplayProps {
  stats: CharacterStats;
}

const StatIcon = ({ stat }: { stat: string }) => {
  const icons: Record<string, string> = {
    strength: "💪",
    intelligence: "🧠",
    wisdom: "🔮",
    dexterity: "🎾",
    charisma: "🌟",
    constitution: "🛡️"
  };
  return <span className="mr-2">{icons[stat]}</span>;
};

const ResultsDisplay: React.FC<StatDisplayProps> = ({ stats }) => {
  const archetype = getArchetype(stats);
  const maxPoints = 10;

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{archetype.icon}</div>
          <CardTitle className="text-2xl">You are a {archetype.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">{archetype.description}</p>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Recommended Activities:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {archetype.recommendations.activities.map((activity, i) => (
                <li key={i} className="text-slate-600">{activity}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Character Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <StatIcon stat={stat} />
                  <span className="capitalize">{stat}</span>
                </div>
                <span className="text-sm text-slate-500">{value} points</span>
              </div>
              <Progress value={(value / maxPoints) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Areas for Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(archetype.recommendations.improvements).map(([stat, improvements]) => (
              <div key={stat} className="space-y-2">
                <h4 className="font-semibold flex items-center">
                  <StatIcon stat={stat} />
                  Improve {stat.charAt(0).toUpperCase() + stat.slice(1)}:
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {improvements.map((improvement, i) => (
                    <li key={i} className="text-slate-600">{improvement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;