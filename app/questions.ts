import type { Question } from './types';

export const questions: Question[] = [
  {
    text: "Pick your dream job:",
    type: "single",
    options: [
      { text: "Professional Athlete", stats: ["strength", "dexterity"] },
      { text: "Detective", stats: ["intelligence", "wisdom"] },
      { text: "Diplomat", stats: ["charisma", "wisdom"] },
      { text: "Master Thief", stats: ["dexterity", "intelligence"] }
    ]
  },
  {
    text: "Your party is ambushed. You...",
    type: "single",
    options: [
      { text: "Fight head-on", stats: ["strength", "dexterity"] },
      { text: "Analyze their weakness", stats: ["intelligence", "wisdom"] },
      { text: "Negotiate peace", stats: ["charisma", "wisdom"] },
      { text: "Sneak past them", stats: ["dexterity", "intelligence"] }
    ]
  },
  {
    text: "Choose your powers:",
    type: "multiple",
    options: [
      { text: "Super strength", stats: ["strength", "dexterity"] },
      { text: "Mind control", stats: ["charisma", "wisdom"] },
      { text: "Teleportation", stats: ["dexterity", "intelligence"] },
      { text: "Time manipulation", stats: ["intelligence", "wisdom"] }
    ]
  },
  {
    text: "Rate your fighting spirit",
    type: "scale",
    stat: "strength"
  },
  {
    text: "Rate your quick thinking",
    type: "scale",
    stat: "intelligence"
  }
];