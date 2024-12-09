import type { Question } from './types';

export const questions: Question[] = [
  {
    text: "When working on a project, you prefer to:",
    type: "single",
    options: [
      { text: "Take action and lead by example", stats: ["strength", "charisma"] },
      { text: "Research and analyze options", stats: ["intelligence", "wisdom"] },
      { text: "Find creative solutions", stats: ["dexterity", "intelligence"] },
      { text: "Build team consensus", stats: ["wisdom", "charisma"] }
    ]
  },
  {
    text: "How do you typically handle stress?",
    type: "single",
    options: [
      { text: "Exercise or physical activity", stats: ["strength", "dexterity"] },
      { text: "Talk it through with others", stats: ["charisma", "wisdom"] },
      { text: "Analyze and problem-solve", stats: ["intelligence", "wisdom"] },
      { text: "Quick action to resolve it", stats: ["dexterity", "strength"] }
    ]
  },
  {
    text: "Select all activities you enjoy:",
    type: "multiple",
    options: [
      { text: "Physical training", stats: ["strength", "dexterity"] },
      { text: "Teaching others", stats: ["wisdom", "charisma"] },
      { text: "Strategic planning", stats: ["intelligence", "wisdom"] },
      { text: "Group leadership", stats: ["charisma", "strength"] }
    ]
  },
  {
    text: "How comfortable are you with physical challenges?",
    type: "scale",
    stat: "strength"
  },
  {
    text: "How often do you learn new skills?",
    type: "scale",
    stat: "intelligence"
  },
  {
    text: "Rate your adaptability to change:",
    type: "scale",
    stat: "dexterity"
  }
];