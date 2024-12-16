export type StatType = 'strength' | 'intelligence' | 'wisdom' | 'dexterity' | 'charisma' | 'constitution';

export type QuestionType = 'single' | 'multiple' | 'scale';

export interface StatGain {
  stat: StatType;
  value: number;
}

export interface QuizOption {
  id: string;
  text: string;
  statGains: StatGain[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options: QuizOption[];
}

export interface QuizStats {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  stats: QuizStats;
  isComplete: boolean;
}
