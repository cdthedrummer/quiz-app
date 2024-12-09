import type { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    text: "How do you best pick up new skills?",
    type: "single",
    options: [
      { text: "Reading books and articles", stats: ["intelligence"] },
      { text: "Watching tutorials", stats: ["intelligence", "wisdom"] },
      { text: "Hands-on practice", stats: ["dexterity"] },
      { text: "Learning with others", stats: ["charisma"] }
    ]
  },
  {
    id: 2,
    text: "What's your go-to way to stay healthy?",
    type: "multiple",
    options: [
      { text: "Healthy meal planning", stats: ["constitution"] },
      { text: "Regular exercise", stats: ["strength", "dexterity"] },
      { text: "Meditation/mindfulness", stats: ["wisdom"] },
      { text: "Regular health check-ups", stats: ["constitution"] }
    ]
  },
  {
    id: 3,
    text: "What activity energizes you most?",
    type: "single",
    options: [
      { text: "Solo workouts", stats: ["strength"] },
      { text: "Team sports", stats: ["charisma", "dexterity"] },
      { text: "Outdoor adventures", stats: ["constitution"] },
      { text: "Creative projects", stats: ["intelligence"] }
    ]
  },
  {
    id: 4,
    text: "How do you tackle challenges?",
    type: "single",
    options: [
      { text: "Careful planning", stats: ["intelligence", "wisdom"] },
      { text: "Trial and error", stats: ["dexterity", "strength"] },
      { text: "Ask for advice", stats: ["charisma"] },
      { text: "Trust your instincts", stats: ["wisdom"] }
    ]
  },
  {
    id: 5,
    text: "Rate your workout enthusiasm:",
    type: "scale",
    min: 1,
    max: 3,
    stat: "strength"
  },
  {
    id: 6,
    text: "How much do you enjoy meeting new people?",
    type: "scale",
    min: 1,
    max: 3,
    stat: "charisma"
  }
];
