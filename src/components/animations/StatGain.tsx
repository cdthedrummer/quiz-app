'use client';

import { useState, useEffect } from 'react';

interface StatGainProps {
  stat: string;
  value: number;
  onComplete?: () => void;
}

const statColors = {
  strength: 'text-red-500',
  intelligence: 'text-blue-500',
  wisdom: 'text-purple-500',
  dexterity: 'text-green-500',
  charisma: 'text-yellow-500',
  constitution: 'text-orange-500'
};

const statIcons = {
  strength: '💪',
  intelligence: '🧠',
  wisdom: '🔮',
  dexterity: '🎾',
  charisma: '🌟',
  constitution: '🛡️'
};

export function StatGain({ stat, value, onComplete }: StatGainProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-1/4 left-1/2 -translate-x-1/2 transform
        flex items-center gap-2 px-4 py-2 rounded-full
        bg-white/95 shadow-lg backdrop-blur-sm
        animate-[gain_1.5s_ease-out_forwards]
        ${statColors[stat as keyof typeof statColors]}`}
    >
      <span className="text-xl">{statIcons[stat as keyof typeof statIcons]}</span>
      <span className="font-bold">+{value}</span>
      <span className="capitalize">{stat}</span>
    </div>
  );
}
