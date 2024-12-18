type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Question {current + 1} of {total}</span>
        <span className="text-sm text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}