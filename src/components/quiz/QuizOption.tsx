import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface QuizOptionProps {
  id: string;
  text: string;
  subtext?: string;
  type: 'single' | 'multiple' | 'scale';
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export function QuizOption({
  id,
  text,
  subtext,
  type,
  isSelected,
  onSelect,
}: QuizOptionProps) {
  const handleSelect = () => {
    onSelect(id);
  };

  const baseClasses = "relative flex items-start p-4 rounded-lg transition-all duration-200";
  const selectedClasses = isSelected 
    ? "bg-blue-50 border-blue-200 shadow-sm" 
    : "hover:bg-gray-50 border-transparent";

  return (
    <div className={`${baseClasses} ${selectedClasses} border-2`}>
      <div className="flex items-center h-5">
        {type === 'single' ? (
          <RadioGroupItem value={id} id={id} className="w-4 h-4" />
        ) : (
          <Checkbox
            id={id}
            checked={isSelected}
            onCheckedChange={() => handleSelect()}
            className="w-4 h-4 rounded"
          />
        )}
      </div>
      <Label
        htmlFor={id}
        className="ml-3 flex-grow cursor-pointer"
      >
        <div className="font-medium text-gray-900">{text}</div>
        {subtext && (
          <div className="mt-1 text-sm text-gray-500">
            {subtext}
          </div>
        )}
      </Label>
    </div>
  );
}