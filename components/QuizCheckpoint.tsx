import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const statMessages = {
  strength: "💪 You're showing great physical potential!",
  intelligence: "🧠 Your intellectual curiosity is impressive!",
  wisdom: "🔮 You have amazing insight and awareness!",
  dexterity: "🎾 Your coordination and agility are outstanding!",
  charisma: "🌟 Your people skills are truly remarkable!",
  constitution: "🛡️ You're building great healthy habits!"
};

const QuizCheckpoint = ({ 
  currentStats,
  questionNumber,
  totalQuestions
}: {
  currentStats: Record<string, number>;
  questionNumber: number;
  totalQuestions: number;
}) => {
  // Find highest stat
  const highestStat = Object.entries(currentStats)
    .reduce((a, b) => a[1] > b[1] ? a : b)[0];

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-4"
    >
      <Card className="w-full overflow-hidden">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl font-bold mb-2">Looking Good!</h2>
            <p className="text-lg text-muted-foreground">
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
                      {stat === 'strength' ? '💪' :
                       stat === 'intelligence' ? '🧠' :
                       stat === 'wisdom' ? '🔮' :
                       stat === 'dexterity' ? '🎾' :
                       stat === 'charisma' ? '🌟' : '🛡️'}
                    </span>
                    <span className="capitalize">{stat}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {value} points
                  </span>
                </div>
                <Progress value={(value / 10) * 100} className="h-2" />
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-primary text-primary-foreground rounded-lg py-3 font-medium"
            onClick={() => window.scrollTo(0, 0)}
          >
            Continue Your Journey
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizCheckpoint;