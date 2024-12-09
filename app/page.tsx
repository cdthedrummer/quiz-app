'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import './globals.css';

// ... [Keep all interfaces and type definitions the same until archetypes] ...

const archetypes: Archetype[] = [
  {
    name: "Knight",
    description: "A charismatic warrior who leads from the front, combining physical prowess with natural leadership.",
    primaryStat: "strength",
    secondaryStat: "charisma",
    emoji: "⚔️",
    thresholds: { primary: 4, secondary: 3 }
  },
  {
    name: "Sage",
    description: "A wise scholar who combines deep knowledge with intuitive understanding.",
    primaryStat: "intelligence",
    secondaryStat: "wisdom",
    emoji: "📚",
    thresholds: { primary: 4, secondary: 3 }
  },
  {
    name: "Ranger",
    description: "A nimble explorer who combines physical agility with rugged endurance.",
    primaryStat: "dexterity",
    secondaryStat: "constitution",
    emoji: "🏹",
    thresholds: { primary: 4, secondary: 3 }
  }
];

// Add the determineArchetype function
const determineArchetype = (stats: Stat): Archetype => {
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

const questions: Question[] = [
  // ... [Keep all questions the same] ...
];

const statEmojis: Record<keyof Stat, string> = {
  // ... [Keep emojis the same] ...
};

const QuizApp = () => {
  // ... [Keep all the component code the same until RadioGroup] ...

  // Update RadioGroup value types
  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case "single":
        return (
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(val) => handleAnswer(parseInt(val))}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "multiple":
        return question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={`option-${index}`}
              checked={(answers[currentQuestion] as number[] || []).includes(index)}
              onCheckedChange={() => handleAnswer(index)}
            />
            <Label htmlFor={`option-${index}`}>{option.text}</Label>
          </div>
        ));
      case "scale":
        return (
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(val) => handleAnswer(parseInt(val))}
            className="space-y-4"
          >
            {[1, 2, 3].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value.toString()} id={`scale-${value}`} />
                <Label htmlFor={`scale-${value}`}>
                  {value === 1 ? "Not really" : value === 2 ? "Sometimes" : "Absolutely!"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
    }
  };

  // ... [Keep the rest of the component the same] ...
};

export default QuizApp;