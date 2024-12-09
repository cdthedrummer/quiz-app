export interface Stat {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

export interface Archetype {
  name: string;
  description: string;
  primaryStat: keyof Stat;
  secondaryStat: keyof Stat;
  emoji: string;
  thresholds: {
    primary: number;
    secondary: number;
  };
  recommendations: string[];
}

export interface Option {
  text: string;
  stats: Array<keyof Stat>;
}

export interface BaseQuestion {
  id: number;
  text: string;
}

export interface SingleOrMultipleQuestion extends BaseQuestion {
  type: 'single' | 'multiple';
  options: Option[];
}

export interface ScaleQuestion extends BaseQuestion {
  type: 'scale';
  min: number;
  max: number;
  stat: keyof Stat;
}

export type Question = SingleOrMultipleQuestion | ScaleQuestion;

export type Answers = {
  [key: number]: number | number[];
};