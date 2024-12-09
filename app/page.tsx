'use client';

[Previous content with these key changes:

1. In handleAnswer:
```typescript
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
    // Allow radio button deselection
    if (answers[currentQuestion] === numValue) {
      delete newAnswers[currentQuestion];
      setAnswers(newAnswers);
    } else {
      // Clear next question's answer before proceeding
      if (currentQuestion < questions.length - 1) {
        delete newAnswers[currentQuestion + 1];
      }
      newAnswers[currentQuestion] = numValue;
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
      } else {
        calculateStats(newAnswers);
      }
    }
  }
};
```

2. Add improvement tips section in results:
```tsx
{archetype && (
  <div className="mt-8 space-y-6">
    <h4 className="font-semibold text-gray-800 mb-2">Want to improve other stats? Try these:</h4>
    {Object.entries(archetype.improvementTips || {}).map(([stat, tips]) => (
      <div key={stat} className="ml-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{statEmojis[stat as keyof typeof statEmojis]}</span>
          <span className="font-medium capitalize text-gray-700">Improve {stat}:</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-6">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}
```
]