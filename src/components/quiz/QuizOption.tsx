'use client';

import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

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

  return (
    <div
      className={cn(
        'flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200',
        isSelected ? 'bg-blue-50 border-blue-200 shadow-sm' : 'hover:bg-gray-50 border-transparent'
      )}
    >
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
        className="flex-grow cursor-pointer"
      >
        <div className="font-medium text-gray-900">{text}</div>
        {subtext && (
          <div className="mt-1 text-sm text-gray-500">{subtext}</div>
        )}
      </Label>
    </div>
  );
}