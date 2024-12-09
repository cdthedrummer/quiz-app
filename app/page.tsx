'use client';

[Previous content with these changes to handleAnswer():

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
    }]