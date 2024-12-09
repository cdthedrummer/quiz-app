import type { Question } from './types';

export const questions: Question[] = [
  {
    text: "In a group project, you...",
    type: "single",
    options: [
      { text: "Take the lead", stats: ["strength", "charisma"] },
      { text: "Plan the strategy", stats: ["intelligence", "wisdom"] },
      { text: "Solve problems creatively", stats: ["dexterity", "intelligence"] },
      { text: "Keep the team united", stats: ["charisma", "wisdom"] }
    ]
  },
  {
    text: "Your perfect evening involves...",
    type: "single",
    options: [
      { text: "Intense workout", stats: ["strength", "dexterity"] },
      { text: "Deep conversations", stats: ["wisdom", "charisma"] },
      { text: "Learning something new", stats: ["intelligence", "wisdom"] },
      { text: "Competitive games", stats: ["dexterity", "intelligence"] }
    ]
  },
  {
    text: "Pick your interests:",
    type: "multiple",
    options: [
      { text: "Sports & fitness", stats: ["strength", "dexterity"] },
      { text: "Teaching others", stats: ["wisdom", "charisma"] },
      { text: "Problem solving", stats: ["intelligence", "dexterity"] },
      { text: "Team leadership", stats: ["charisma", "strength"] }
    ]
  },
  {
    text: "How much do you enjoy physical challenges?",
    type: "scale",
    stat: "strength"
  },
  {
    text: "How often do you outsmart obstacles?",
    type: "scale",
    stat: "intelligence"
  }
];