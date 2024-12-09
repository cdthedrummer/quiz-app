'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import './globals.css';

interface Stat {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

interface Option {
  text: string;
  stats: Array<keyof Stat>;
}

interface BaseQuestion {
  id: number;
  text: string;
}

interface SingleOrMultipleQuestion extends BaseQuestion {
  type: 'single' | 'multiple';
  options: Option[];
}

interface ScaleQuestion extends BaseQuestion {
  type: 'scale';
  min: number;
  max: number;
  stat: keyof Stat;
}

type Question = SingleOrMultipleQuestion | ScaleQuestion;

type Answers = {
  [key: number]: number | number[];
};

interface Archetype {
  name: string;
  description: string;
  primaryStat: keyof Stat;
  secondaryStat: keyof Stat;
  emoji: string;
  thresholds: {
    primary: number;
    secondary: number;
  };
}

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

const questions: Question[] = [
  {
    id: 1,
    text: "How do you best pick up new skills?",
    type: "single",
    options: [
      { text: "Reading books and articles", stats: ["intelligence"] },
      { text: "Watching tutorials", stats: ["intelligence", "wisdom"] },
      { text: "Hands-on practice", stats: ["dexterity"] },
      { text: "Learning with others", stats: ["charisma"] }
    ]
  },
  {
    id: 2,
    text: "What's your go-to way to stay healthy?",
    type: "multiple",
    options: [
      { text: "Healthy meal planning", stats: ["constitution"] },
      { text: "Regular exercise", stats: ["strength", "dexterity"] },
      { text: "Meditation/mindfulness", stats: ["wisdom"] },
      { text: "Regular health check-ups", stats: ["constitution"] }
    ]
  },
  {
    id: 3,
    text: "What activity energizes you most?",
    type: "single",
    options: [
      { text: "Solo workouts", stats: ["strength"] },
      { text: "Team sports", stats: ["charisma", "dexterity"] },
      { text: "Outdoor adventures", stats: ["constitution"] },
      { text: "Creative projects", stats: ["intelligence"] }
    ]
  },
  {
    id: 4,
    text: "How do you tackle challenges?",
    type: "single",
    options: [
      { text: "Careful planning", stats: ["intelligence", "wisdom"] },
      { text: "Trial and error", stats: ["dexterity", "strength"] },
      { text: "Ask for advice", stats: ["charisma"] },
      { text: "Trust your instincts", stats: ["wisdom"] }
    ]
  },
  {
    id: 5,
    text: "Rate your workout enthusiasm:",
    type: "scale",
    min: 1,
    max: 3,
    stat: "strength"
  },
  {
    id: 6,
    text: "How much do you enjoy meeting new people?",
    type: "scale",
    min: 1,
    max: 3,
    stat: "charisma"
  }
];

const statEmojis: Record<keyof Stat, string> = {
  strength: "💪",
  intelligence: "🧠",
  wisdom: "🔮",
  dexterity: "🎾",
  charisma: "🌟",
  constitution: "🛡️"
};

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [stats, setStats] = useState<Stat>({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    charisma: 0,
    constitution: 0
  });
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAnswer = (value: number | number[]) => {
    const question = questions[currentQuestion];
    let newAnswers = { ...answers };

    if (question.type === "multiple") {
      const currentAnswers = (answers[currentQuestion] as number[]) || [];
      newAnswers[currentQuestion] = Array.isArray(value) 
        ? value 
        : currentAnswers.includes(value as number)
          ? currentAnswers.filter(v => v !== value)
          : [...currentAnswers, value];
    } else {
      newAnswers[currentQuestion] = value;
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
      } else {
        calculateStats(newAnswers);
      }
    }

    setAnswers(newAnswers);
  };

  const calculateStats = (finalAnswers: Answers) => {
    const newStats = { ...stats };
    
    questions.forEach((question, index) => {
      const answer = finalAnswers[index];
      
      if (question.type === "scale") {
        newStats[question.stat] += answer as number;
      } else if (question.type === "single" && typeof answer === "number") {
        question.options[answer].stats.forEach(stat => {
          newStats[stat] += 1;
        });
      } else if (question.type === "multiple" && Array.isArray(answer)) {
        answer.forEach(optionIndex => {
          (question as SingleOrMultipleQuestion).options[optionIndex].stats.forEach(stat => {
            newStats[stat] += 1;
          });
        });
      }
    });

    setStats(newStats);
    setShowResults(true);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case "single":
        return (
          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index} id={`option-${index}`} />
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
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {[1, 2, 3].map((value) => (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem value={value} id={`scale-${value}`} />
                <Label htmlFor={`scale-${value}`}>
                  {value === 1 ? "Not really" : value === 2 ? "Sometimes" : "Absolutely!"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="card">
          <CardHeader className="border-b border-gray-200 pb-6">
            <CardTitle className="card-title">Character Builder Quiz</CardTitle>
            {!showResults && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <Progress 
                  value={(currentQuestion / questions.length) * 100} 
                  className="progress-bar h-2"
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            {!showResults ? (
              <>
                <h2 className="quiz-question mb-6">
                  {questions[currentQuestion].text}
                </h2>
                <div className="space-y-4">
                  {renderQuestion()}
                </div>
                {questions[currentQuestion].type === "multiple" && (
                  <Button 
                    className="button mt-6"
                    onClick={() => {
                      if (currentQuestion === questions.length - 1) {
                        calculateStats(answers);
                      } else {
                        setCurrentQuestion(currentQuestion + 1);
                      }
                    }}
                  >
                    {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                  </Button>
                )}
              </>
            ) : (
              <div className="stats-display">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Character Stats</h2>
                <div className="space-y-4">
                  {Object.entries(stats).map(([stat, value]) => (
                    <div key={stat} className="stat-item">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{statEmojis[stat as keyof typeof statEmojis]}</span>
                        <span className="font-medium capitalize text-gray-700">{stat}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-900">{value} points</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full transition-all duration-300"
                            style={{ width: `${(value / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="button w-full mt-8"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setStats({
                      strength: 0,
                      intelligence: 0,
                      wisdom: 0,
                      dexterity: 0,
                      charisma: 0,
                      constitution: 0
                    });
                    setShowResults(false);
                  }}

>{/* Archetype Display - add this right after your stats mapping */}
{(() => {
  const archetype = determineArchetype(stats);
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{archetype.emoji}</span>
        <h3 className="text-2xl font-bold text-gray-900">
          You are a {archetype.name}!
        </h3>
      </div>
      <p className="text-gray-700 text-lg">
        {archetype.description}
      </p>
      <div className="mt-4 text-gray-600">
        Driven by {statEmojis[archetype.primaryStat as keyof typeof statEmojis]} {archetype.primaryStat} 
        and supported by {statEmojis[archetype.secondaryStat as keyof typeof statEmojis]} {archetype.secondaryStat}
      </div>
    </div>
  );
})()}

                  Take Quiz Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizApp;