import { CharacterStats } from '@/types';

export interface QuizOption {
  id: string;
  text: string;
  subtext?: string;
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
      { 
        id: "1a", 
        text: "Reading", 
        subtext: "Books, manuals, forums",
        stats: { intelligence: 2 } 
      },
      { 
        id: "1b", 
        text: "Watching", 
        subtext: "YouTube, how-to videos, tutorials",
        stats: { intelligence: 1, wisdom: 1 } 
      },
      { 
        id: "1c", 
        text: "Hands-on", 
        subtext: "Practice and experimentation",
        stats: { dexterity: 2 } 
      },
      { 
        id: "1d", 
        text: "With others", 
        subtext: "Classes, study groups, mentoring",
        stats: { charisma: 2 } 
      }
    ]
  },
  {
    id: 2,
    text: "What's your health focus?",
    type: "multiple",
    options: [
      { 
        id: "2a", 
        text: "Diet", 
        subtext: "Nutrition and meal planning",
        stats: { constitution: 1 } 
      },
      { 
        id: "2b", 
        text: "Exercise", 
        subtext: "Regular physical activity",
        stats: { strength: 1, dexterity: 1 } 
      },
      { 
        id: "2c", 
        text: "Rest", 
        subtext: "Sleep and recovery",
        stats: { wisdom: 1 } 
      },
      { 
        id: "2d", 
        text: "Check-ups", 
        subtext: "Regular health monitoring",
        stats: { constitution: 1 } 
      }
    ]
  },
  {
    id: 3,
    text: "Favorite way to move?",
    type: "single",
    options: [
      { 
        id: "3a", 
        text: "Outdoor adventures", 
        subtext: "Hiking, climbing, exploring",
        stats: { constitution: 2 } 
      },
      { 
        id: "3b", 
        text: "Team sports", 
        subtext: "Basketball, soccer, volleyball",
        stats: { charisma: 2 } 
      },
      { 
        id: "3c", 
        text: "Solo workouts", 
        subtext: "Gym, running, swimming",
        stats: { strength: 2 } 
      },
      { 
        id: "3d", 
        text: "Active hobbies", 
        subtext: "Dancing, martial arts, skating",
        stats: { dexterity: 2 } 
      }
    ]
  },
  {
    id: 4,
    text: "What energizes you?",
    type: "single",
    options: [
      { 
        id: "4a", 
        text: "Challenges", 
        subtext: "Pushing your limits",
        stats: { strength: 1, dexterity: 1 } 
      },
      { 
        id: "4b", 
        text: "Social time", 
        subtext: "Friends and connections",
        stats: { charisma: 2 } 
      },
      { 
        id: "4c", 
        text: "Me time", 
        subtext: "Reflection and recharging",
        stats: { wisdom: 2 } 
      },
      { 
        id: "4d", 
        text: "Creating", 
        subtext: "Making and learning",
        stats: { intelligence: 2 } 
      }
    ]
  },
  {
    id: 5,
    text: "Your problem-solving style?",
    type: "single",
    options: [
      { 
        id: "5a", 
        text: "Plan it out", 
        subtext: "Research and analyze",
        stats: { intelligence: 2 } 
      },
      { 
        id: "5b", 
        text: "Try things", 
        subtext: "Learn through doing",
        stats: { dexterity: 2 } 
      },
      { 
        id: "5c", 
        text: "Ask others", 
        subtext: "Gather different perspectives",
        stats: { charisma: 2 } 
      },
      { 
        id: "5d", 
        text: "Trust instincts", 
        subtext: "Follow your intuition",
        stats: { wisdom: 2 } 
      }
    ]
  },
  {
    id: 6,
    text: "How do you recharge?",
    type: "multiple",
    options: [
      { 
        id: "6a", 
        text: "Nature", 
        subtext: "Outdoors and fresh air",
        stats: { constitution: 1 } 
      },
      { 
        id: "6b", 
        text: "Games", 
        subtext: "Puzzles and challenges",
        stats: { intelligence: 1 } 
      },
      { 
        id: "6c", 
        text: "Shows", 
        subtext: "Movies and entertainment",
        stats: { charisma: 1 } 
      },
      { 
        id: "6d", 
        text: "Music", 
        subtext: "Songs and podcasts",
        stats: { wisdom: 1 } 
      }
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
