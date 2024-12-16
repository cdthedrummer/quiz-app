'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { CharacterStats } from '@/types';

interface QuizCheckpointProps {
  currentStats: CharacterStats;
  questionNumber: number;
  totalQuestions: number;
  onContinue: () => void;
}

const statMessages = {
  strength: "💪 You're showing great physical potential!",
  intelligence: "🧠 Your intellectual curiosity is impressive!",
  wisdom: "🔮 You have amazing insight and awareness!",
  dexterity: "🎾 Your coordination and agility are outstanding!",
  charisma: "🌟 Your people skills are truly remarkable!",
  constitution: "🛡️ You're building great healthy habits!"
};

const statIcons: Record<string, string> = {
  strength: '💪',
  intelligence: '🧠',
  wisdom: '🔮',
  dexterity: '🎾',
  charisma: '🌟',
  constitution: '🛡️'
};

export function QuizCheckpoint({
  currentStats,
  questionNumber,
  totalQuestions,
  onContinue
}: QuizCheckpointProps) {
  const progress = (questionNumber / totalQuestions) * 100;
  
  // Find highest stat
  const highestStat = Object.entries(currentStats)
    .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-4"
    >
      <Card>
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl font-bold mb-2">Checkpoint Reached!</h2>
            <p className="text-muted-foreground text-lg">
              You're {Math.round(progress)}% through your character creation
            </p>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-center"
          >
            <p className="text-xl text-primary">
              {statMessages[highestStat.toLowerCase()]}
            </p>
          </motion.div>

          <div className="space-y-4">
            {Object.entries(currentStats).map(([stat, value], index) => (
              <motion.div
                key={stat}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2">
                    <span className="text-xl" role="img">
                      {statIcons[stat]}
                    </span>
                    <span className="capitalize">{stat}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {value} points
                  </span>
                </div>
                <Progress 
                  value={(value / 10) * 100}
                  className="h-2 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={onContinue}
              className="w-full"
              size="lg"
            >
              Continue Your Journey
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}