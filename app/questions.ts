import type { Question } from './types';

export const questions: Question[] = [
  {
    text: "What's your ideal way to spend a weekend?",
    type: "single",
    options: [
      {
        text: "Physical activities and sports",
        stats: ["strength", "dexterity"]
      },
      {
        text: "Reading and learning new things",
        stats: ["intelligence", "wisdom"]
      },
      {
        text: "Socializing with friends",
        stats: ["charisma", "wisdom"]
      },
      {
        text: "Strategic games and puzzles",
        stats: ["intelligence", "dexterity"]
      }
    ]
  },
  {
    text: "When faced with a challenge, you prefer to...",
    type: "single",
    options: [
      {
        text: "Take charge and lead",
        stats: ["strength", "charisma"]
      },
      {
        text: "Analyze and plan",
        stats: ["intelligence", "wisdom"]
      },
      {
        text: "Find creative solutions",
        stats: ["dexterity", "intelligence"]
      },
      {
        text: "Seek advice and collaborate",
        stats: ["wisdom", "charisma"]
      }
    ]
  },
  {
    text: "Which activities interest you? (Select all that apply)",
    type: "multiple",
    options: [
      {
        text: "Martial arts or combat sports",
        stats: ["strength", "dexterity"]
      },
      {
        text: "Public speaking or performance",
        stats: ["charisma", "wisdom"]
      },
      {
        text: "Research and study",
        stats: ["intelligence", "wisdom"]
      },
      {
        text: "Acrobatics or dance",
        stats: ["dexterity", "charisma"]
      }
    ]
  },
  {
    text: "How much do you value physical training?",
    type: "scale",
    stat: "strength"
  },
  {
    text: "How comfortable are you with complex problem-solving?",
    type: "scale",
    stat: "intelligence"
  },
  {
    text: "How naturally do social situations come to you?",
    type: "scale",
    stat: "charisma"
  },
  {
    text: "How well do you adapt to changing situations?",
    type: "scale",
    stat: "dexterity"
  },
  {
    text: "How often do others come to you for advice?",
    type: "scale",
    stat: "wisdom"
  }
];