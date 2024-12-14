import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, CheckCircle2 } from 'lucide-react';

// Quiz questions data
const questions = [
  {
    id: 1,
    text: "How do you prefer to learn?",
    type: "select-one",
    options: [
      { text: "Reading or Studying", stats: ["intelligence"] },
      { text: "Watching a Video", stats: ["intelligence", "wisdom"] },
      { text: "Doing it Yourself", stats: ["dexterity"] },
      { text: "Group Setting", stats: ["charisma"] }
    ]
  },
  // More questions would be added here
];

const statsEmojis = {
  strength: "💪",
  intelligence: "🧠",
  wisdom: "🔮",
  dexterity: "🎾",
  charisma: "🌟",
  constitution: "🛡️"
};

const archetypes = {
  scholar: { 
    name: "Scholar",
    primaryStats: ["intelligence", "wisdom"],
    description: "A seeker of knowledge and truth"
  },
  paladin: {
    name: "Paladin",
    primaryStats: ["strength", "constitution"],
    description: "A stalwart defender and champion"
  },
  monk: {
    name: "Monk",
    primaryStats: ["wisdom", "dexterity"],
    description: "A master of mind and body"
  }
};

export default function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [stats, setStats] = useState({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    charisma: 0,
    constitution: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [currentArchetype, setCurrentArchetype] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  // Animation states
  const [slideDirection, setSlideDirection] = useState('right');
  const [showCelebration, setShowCelebration] = useState(false);

  const handleAnswer = (answer) => {
    setIsAnswerSelected(true);
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    
    // Animate selection
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1000);
  };

  const nextQuestion = () => {
    setSlideDirection('right');
    setIsAnswerSelected(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Calculate final stats and determine archetype
    const finalStats = calculateFinalStats(answers);
    setStats(finalStats);
    setCurrentArchetype(determineArchetype(finalStats));
    setShowResults(true);
  };

  // Render question with animations
  const renderQuestion = () => (
    <div className={`transform transition-all duration-500 ${
      slideDirection === 'right' ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].text}</h2>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className={`w-full p-4 border-2 rounded-lg transition-all duration-300
                ${answers[currentQuestion] === option 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'}
                transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Render results with animations
  const renderResults = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <Award className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-bold mb-2">Your Archetype: {currentArchetype?.name}</h2>
        <p className="text-gray-600">{currentArchetype?.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="p-4 border-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{statsEmojis[stat]}</span>
              <span className="capitalize font-medium">{stat}</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 rounded-full h-2 transition-all duration-1000"
                style={{ width: `${(value / 100) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Recommended Activities</h3>
        <div className="grid grid-cols-2 gap-4">
          {currentArchetype?.primaryStats.map(stat => (
            <div key={stat} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2 capitalize">{stat}</h4>
              {/* Add recommended activities based on stats */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!showResults ? (
        <>
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600 text-right">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          {renderQuestion()}

          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
              <CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
            </div>
          )}

          {isAnswerSelected && (
            <button
              onClick={nextQuestion}
              className="mt-6 w-full py-3 px-6 bg-blue-500 text-white rounded-lg
                transform transition hover:bg-blue-600 active:scale-95
                flex items-center justify-center space-x-2"
            >
              <span>{currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </>
      ) : (
        renderResults()
      )}
    </div>
  );
}