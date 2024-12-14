'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { determineArchetype } from '@/src/data/archetypes';
import type { CharacterStats } from '@/types';
import Quiz from '../src/components/Quiz';

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState<CharacterStats>({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    charisma: 0,
    constitution: 0,
  });

  const handleQuizComplete = (finalStats: CharacterStats) => {
    setStats(finalStats);
    setShowResults(true);
  };

  const handleRetake = () => {
    setShowResults(false);
    setStats({
      strength: 0,
      intelligence: 0,
      wisdom: 0,
      dexterity: 0,
      charisma: 0,
      constitution: 0,
    });
  };

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

  if (!showResults) {
    return (
      <main className="p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Build Your Character</h1>
        <p className="text-center text-slate-600 mb-8">Discover your strengths and find ways to level up!</p>
        <Quiz onComplete={handleQuizComplete} />
      </main>
    );
  }

  const archetype = determineArchetype(stats);
  const maxPoints = 20; // Adjusted based on possible max points from questions

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Your Character Sheet</h1>
      
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{archetype.icon}</div>
            <CardTitle className="text-3xl">The {archetype.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6 text-center text-lg">{archetype.description}</p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 mb-2">Featured Activities</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {archetype.recommendations.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Level Up Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(archetype.recommendations.improvements).map(([stat, improvements]) => (
                    <div key={stat} className="space-y-2">
                      <h4 className="font-semibold flex items-center">
                        <StatIcon stat={stat} />
                        Boost your {stat}:
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

            <div className="flex justify-center pt-6">
              <Button onClick={handleRetake} size="lg" className="px-8">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
