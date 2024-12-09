'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { determineArchetype } from './utils/determineArchetype';
import type { Answers, Stat } from './types';
import { questions } from './questions';
import { statEmojis, INITIAL_STATS } from './constants';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [stats, setStats] = useState<Stat>(INITIAL_STATS);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAnswer = (value: string | number) => {
    const question = questions[currentQuestion];
    let newAnswers = { ...answers };

    if (question.type === "multiple") {
      const currentAnswers = (answers[currentQuestion] as number[]) || [];
      const numValue = typeof value === 'string' ? parseInt(value) : value;
      const newValue = currentAnswers.includes(numValue)
        ? currentAnswers.filter(v => v !== numValue)
        : [...currentAnswers, numValue];
      newAnswers[currentQuestion] = newValue;
      setAnswers(newAnswers);
    } else {
      const numValue = typeof value === 'string' ? parseInt(value) : value;
      newAnswers[currentQuestion] = numValue;
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        calculateStats(newAnswers);
      }
    }
  };

  const calculateStats = (finalAnswers: Answers) => {
    const newStats = { ...INITIAL_STATS };
    
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
          question.options[optionIndex].stats.forEach(stat => {
            newStats[stat] += 1;
          });
        });
      }
    });

    setStats(newStats);
    setShowResults(true);
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      // Clear the next question's answers
      setAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[currentQuestion + 1];
        return newAnswers;
      });
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateStats(answers);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case "single":
        return (
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswer}
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
              onCheckedChange={(checked) => handleAnswer(checked ? index : -1)}
            />
            <Label htmlFor={`option-${index}`}>{option.text}</Label>
          </div>
        ));
      case "scale":
        return (
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswer}
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

  const archetype = showResults ? determineArchetype(stats) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="card shadow-lg">
          <CardHeader className="border-b border-gray-200 pb-6">
            <CardTitle className="text-2xl font-bold text-center">Character Builder Quiz</CardTitle>
            {!showResults && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2 flex justify-between">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-blue-600 font-medium">
                    {Math.round((currentQuestion / questions.length) * 100)}% Complete
                  </span>
                </div>
                <Progress 
                  value={(currentQuestion / questions.length) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            {!showResults ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {questions[currentQuestion].text}
                </h2>
                <div className="space-y-4">
                  {renderQuestion()}
                </div>
                {questions[currentQuestion].type === "multiple" && (
                  <Button 
                    className="w-full mt-6"
                    onClick={moveToNextQuestion}
                  >
                    {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
                  </Button>
                )}
              </>
            ) : (
              <div className="space-y-8">
                {archetype && (
                  <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{archetype.emoji}</span>
                      <h3 className="text-2xl font-bold text-gray-900">
                        You are a {archetype.name}!
                      </h3>
                    </div>
                    <p className="text-gray-700 text-lg mb-4">
                      {archetype.description}
                    </p>
                    <div className="text-gray-600 mb-4">
                      Driven by {statEmojis[archetype.primaryStat]} strength and supported by {statEmojis[archetype.secondaryStat]} {archetype.secondaryStat}
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Recommended Activities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {archetype.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Character Stats</h2>
                  <div className="space-y-4">
                    {Object.entries(stats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
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
                </div>

                <Button
                  className="w-full mt-8"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setStats(INITIAL_STATS);
                    setShowResults(false);
                  }}
                >
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