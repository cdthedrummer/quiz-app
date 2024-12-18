type QuizQuestionProps = {
  question: {
    text: string;
    type: 'single' | 'multiple' | 'scale';
    options: Array<{
      value: string;
      label: string;
    }>;
  };
  selected: string[];
  onSelect: (value: string) => void;
  onNext: () => void;
};

export function QuizQuestion({ question, selected, onSelect, onNext }: QuizQuestionProps) {
  const isComplete = question.type === 'multiple' || selected.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option.value}
            className={`block p-4 rounded border-2 cursor-pointer transition-colors
              ${selected.includes(option.value)
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white hover:bg-gray-50 border-gray-200'}`}
          >
            <div className="flex items-center">
              <input
                type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                name="quiz-option"
                value={option.value}
                checked={selected.includes(option.value)}
                onChange={() => onSelect(option.value)}
                className="mr-3"
              />
              <span>{option.label}</span>
            </div>
          </label>
        ))}
      </div>

      {isComplete && (
        <button
          onClick={onNext}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}