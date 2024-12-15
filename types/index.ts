export interface Question {
  id: number;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options: {
    text: string;
    description?: string;
    stats?: string[];
  }[];
}

export interface CharacterStats {
  strength: number;
  intelligence: number;
  wisdom: number;
  dexterity: number;
  charisma: number;
  constitution: number;
}

export interface QuestionOption {
  text: string;
  description?: string;
  stats?: string[];
}