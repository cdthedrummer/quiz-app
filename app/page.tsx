'use client';

// [Previous imports remain the same...]

const QuizApp = () => {
  // [Previous state and other function declarations remain the same...]

  const calculateStats = (finalAnswers: Answers) => {
    const newStats = { ...INITIAL_STATS };
    
    questions.forEach((question, index) => {
      const answer = finalAnswers[index];
      
      if (!answer) return;

      if (question.type === "scale") {
        newStats[question.stat] += answer as number;
      } else if (question.type === "single" && typeof answer === "number") {
        const stats = question.options[answer].stats;
        if (stats) {
          stats.forEach(stat => {
            newStats[stat] += 1;
          });
        }
      } else if (question.type === "multiple" && Array.isArray(answer)) {
        answer.forEach(optionIndex => {
          const option = question.options[optionIndex];
          if (option && option.stats) {
            option.stats.forEach(stat => {
              newStats[stat] += 1;
            });
          }
        });
      }
    });

    setStats(newStats);
    setShowResults(true);
  };

  // [Rest of the component remains the same...]
};

export default QuizApp;