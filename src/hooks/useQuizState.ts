import { useState, useCallback } from 'react';
import { QuizState, QuizStats, StatGain } from '../types/quiz.types';
import { INITIAL_STATS } from '../config/quiz.config';

export const useQuizState = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    stats: { ...INITIAL_STATS },
    isComplete: false
  });

  const updateStats = useCallback((gains: StatGain[]) => {
    setState(prev => ({
      ...prev,
      stats: gains.reduce(
        (acc, { stat, value }) => ({
          ...acc,
          [stat]: (acc[stat] || 0) + value
        }),
        { ...prev.stats }
      )
    }));
  }, []);

  const setAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: selectedOptions
      }
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  }, []);

  const completeQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      isComplete: true
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      stats: { ...INITIAL_STATS },
      isComplete: false
    });
  }, []);

  return {
    state,
    updateStats,
    setAnswer,
    nextQuestion,
    completeQuiz,
    resetQuiz
  };
};
