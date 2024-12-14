import { CharacterStats } from '@/types';

export interface QuizOption {
  id: string;
  text: string;
  stats: Partial<CharacterStats>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    text: "How do you learn best?",
    type: "single",
    options: [
      { id: "1a", text: "Reading", stats: { intelligence: 2 } },
      { id: "1b", text: "Watching", stats: { intelligence: 1, wisdom: 1 } },
      { id: "1c", text: "Hands-on", stats: { dexterity: 2 } },
      { id: "1d", text: "With others", stats: { charisma: 2 } }
    ]
  },
  {
    id: 2,
    text: "What's your health focus?",
    type: "multiple",
    options: [
      { id: "2a", text: "Diet", stats: { constitution: 1 } },
      { id: "2b", text: "Exercise", stats: { strength: 1, dexterity: 1 } },
      { id: "2c", text: "Rest", stats: { wisdom: 1 } },
      { id: "2d", text: "Check-ups", stats: { constitution: 1 } }
    ]
  },
  {
    id: 3,
    text: "Favorite way to move?",
    type: "single",
    options: [
      { id: "3a", text: "Outdoor adventures", stats: { constitution: 2 } },
      { id: "3b", text: "Team sports", stats: { charisma: 2 } },
      { id: "3c", text: "Solo workouts", stats: { strength: 2 } },
      { id: "3d", text: "Active hobbies", stats: { dexterity: 2 } }
    ]
  },
  {
    id: 4,
    text: "What energizes you?",
    type: "single",
    options: [
      { id: "4a", text: "Challenges", stats: { strength: 1, dexterity: 1 } },
      { id: "4b", text: "Social time", stats: { charisma: 2 } },
      { id: "4c", text: "Me time", stats: { wisdom: 2 } },
      { id: "4d", text: "Creating", stats: { intelligence: 2 } }
    ]
  },
  {
    id: 5,
    text: "Your problem-solving style?",
    type: "single",
    options: [
      { id: "5a", text: "Plan it out", stats: { intelligence: 2 } },
      { id: "5b", text: "Try things", stats: { dexterity: 2 } },
      { id: "5c", text: "Ask others", stats: { charisma: 2 } },
      { id: "5d", text: "Trust instincts", stats: { wisdom: 2 } }
    ]
  },
  {
    id: 6,
    text: "How do you recharge?",
    type: "multiple",
    options: [
      { id: "6a", text: "Nature", stats: { constitution: 1 } },
      { id: "6b", text: "Games", stats: { intelligence: 1 } },
      { id: "6c", text: "Shows", stats: { charisma: 1 } },
      { id: "6d", text: "Music", stats: { wisdom: 1 } }
    ]
  },
  {
    id: 7,
    text: "Like working out?",
    type: "scale",
    options: [
      { id: "7a", text: "Nope", stats: { strength: 1 } },
      { id: "7b", text: "Sometimes", stats: { strength: 2 } },
      { id: "7c", text: "Love it!", stats: { strength: 3 } }
    ]
  },
  {
    id: 8,
    text: "Meeting new people?",
    type: "scale",
    options: [
      { id: "8a", text: "Rather not", stats: { charisma: 1 } },
      { id: "8b", text: "It's okay", stats: { charisma: 2 } },
      { id: "8c", text: "Yes please!", stats: { charisma: 3 } }
    ]
  },
  {
    id: 9,
    text: "Follow the news?",
    type: "scale",
    options: [
      { id: "9a", text: "Rarely", stats: { wisdom: 1 } },
      { id: "9b", text: "Sometimes", stats: { wisdom: 2 } },
      { id: "9c", text: "Always", stats: { wisdom: 3 } }
    ]
  },
  {
    id: 10,
    text: "Try new things?",
    type: "scale",
    options: [
      { id: "10a", text: "Prefer routine", stats: { intelligence: 1 } },
      { id: "10b", text: "Occasionally", stats: { intelligence: 2 } },
      { id: "10c", text: "All the time!", stats: { intelligence: 3 } }
    ]
  },
  {
    id: 11,
    text: "Sports fan?",
    type: "scale",
    options: [
      { id: "11a", text: "Not really", stats: { dexterity: 1 } },
      { id: "11b", text: "Casual", stats: { dexterity: 2 } },
      { id: "11c", text: "Huge fan!", stats: { dexterity: 3 } }
    ]
  },
  {
    id: 12,
    text: "Health priority?",
    type: "scale",
    options: [
      { id: "12a", text: "When needed", stats: { constitution: 1 } },
      { id: "12b", text: "Sometimes", stats: { constitution: 2 } },
      { id: "12c", text: "Top priority!", stats: { constitution: 3 } }
    ]
  }
];
