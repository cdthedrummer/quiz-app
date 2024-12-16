# Quiz App - Personal Development RPG

A Next.js application that gamifies personal development by turning self-improvement into an RPG-style experience.

## 🚀 Quick Start

```bash
git checkout reset3
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start your journey!

## 📁 Project Structure

```
src/
├── components/     # React components
│   ├── ui/        # Reusable UI components
│   └── quiz/      # Quiz-specific components
├── config/        # App configuration
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## 🎮 Features

- D&D-inspired character building
- Real-time stat tracking
- Smooth animations
- Mobile-responsive design

## 🛠️ Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui

## 📦 Dependencies

All dependencies are locked to specific versions to ensure consistency. Core dependencies include:

- React 18.2.0
- Next.js 14.0.4
- TypeScript 5.3.3

## 🧩 Components

### UI Components

- `StatIcon`: Displays stat-specific icons with tooltips
- `AnimatedNumber`: Smoothly animates number changes
- `ProgressBar`: Shows quiz progress

### Quiz Components

- `QuizQuestion`: Handles question display and user input
- `QuizResults`: Shows final stats and recommendations

## 🔄 State Management

Uses React's built-in hooks with TypeScript for type-safe state management:

```typescript
const { state, updateStats, setAnswer } = useQuizState();
```

## 🎨 Styling

Uses Tailwind CSS with custom animations and transitions. All styles are consistent with shadcn/ui design system.

## 📱 Responsive Design

Built with a mobile-first approach, ensuring a great experience on all devices.

## 🔜 Upcoming Features

- Enhanced animations
- Personalized recommendations
- Progress saving
- Social sharing

## 🤝 Contributing

1. Always branch from `reset3`
2. Ensure all components are properly typed
3. Follow the existing code structure
4. Test on both mobile and desktop

## 📝 Development Guidelines

1. Keep components small and focused
2. Use TypeScript strictly
3. Follow existing naming conventions
4. Document new features
5. Test cross-browser compatibility
