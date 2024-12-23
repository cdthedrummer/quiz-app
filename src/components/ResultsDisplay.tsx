import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ARCHETYPES, getArchetype, getGrowthLevel, getComplementaryArchetypes } from '../data/archetypes';

interface Props {
  stats: Record<string, number>;
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

const ResultsDisplay: React.FC<Props> = ({ stats }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const archetype = getArchetype(stats);
  const maxPoints = 10;
  
  // Get growth level for primary stat
  const growthLevel = getGrowthLevel(stats[archetype.primaryStat]);
  
  // Get complementary archetypes
  const complementary = getComplementaryArchetypes(archetype.primaryStat);

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4 animate-bounce">{archetype.icon}</div>
          <CardTitle className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            You are a {archetype.name}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 text-lg text-center mb-6">{archetype.description}</p>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="growth">Growth Path</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Your Strengths</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {archetype.activities.map((activity, i) => (
                      <div key={i} className="flex items-center space-x-2 text-slate-700">
                        <span>•</span>
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Focus Areas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {archetype.focus.map((focus, i) => (
                      <div key={i} className="flex items-center space-x-2 text-slate-700">
                        <span>•</span>
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="growth">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Your Current Level: {growthLevel}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recommended Next Steps:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {archetype.growthPaths[growthLevel].map((step, i) => (
                          <li key={i} className="text-slate-700">{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="compare">
              <div className="space-y-4">
                {complementary.map(statName => (
                  <div key={statName} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <StatIcon stat={statName} />
                      <span className="font-medium">{ARCHETYPES[statName].name}</span>
                    </div>
                    <p className="text-slate-600">{archetype.comparisons[statName]}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
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
                <span className="text-sm text-slate-500">{value} / {maxPoints}</span>
              </div>
              <Progress 
                value={(value / maxPoints) * 100} 
                className="h-2 bg-slate-100"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;