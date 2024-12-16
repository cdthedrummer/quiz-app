import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatIcon } from '@/components/ui/StatIcon';
import { QuizStats, StatType } from '@/types/quiz.types';
import { getHighestStat } from '@/utils/stats';
import { Confetti } from '@/components/ui/Confetti';

interface CheckpointSummaryProps {
  stats: QuizStats;
  questionsCompleted: number;
  totalQuestions: number;
}

export function CheckpointSummary({
  stats,
  questionsCompleted,
  totalQuestions
}: CheckpointSummaryProps) {
  const dominantStat = getHighestStat(stats);
  const progress = Math.round((questionsCompleted / totalQuestions) * 100);

  return (
    <>
      <Confetti duration={2000} pieces={30} />
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center space-y-2">
            <div className="text-2xl font-bold">
              Checkpoint Reached! 🎉
            </div>
            <div className="text-lg font-normal text-muted-foreground">
              {progress}% Complete
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-lg mb-2">Your strongest attribute:</div>
            <div className="text-3xl font-medium flex justify-center items-center gap-2">
              <StatIcon stat={dominantStat as StatType} size="lg" />
              <span className="capitalize">{dominantStat}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
