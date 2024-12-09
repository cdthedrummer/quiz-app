[Previous file content with this handleAnswer update:

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
      if (answers[currentQuestion] === numValue) {
        delete newAnswers[currentQuestion];
      } else {
        newAnswers[currentQuestion] = numValue;
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          calculateStats(newAnswers);
        }
      }
      setAnswers(newAnswers);
    }
  };]