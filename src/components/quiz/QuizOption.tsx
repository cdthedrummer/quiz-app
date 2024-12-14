'use client';

import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface QuizOptionProps {
  id: string;
  text: string;
  subtext?: string;
  isSelected: boolean;
  type: 'single' | 'multiple' | 'scale';
  onSelect: (id: string) => void;
}

export function QuizOption({ id, text, subtext, isSelected, type, onSelect }: QuizOptionProps) {
  const handleSelect = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Prevent default to avoid double-firing with radio/checkbox click
    e.preventDefault();
    onSelect(id);
  };

  return (
    <label
      htmlFor={id}
      className={`block w-full cursor-pointer touch-manipulation
        rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-100' 
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'}
        active:scale-[0.99] active:brightness-95
        md:hover:scale-[1.01]`}
      onClick={handleSelect}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {type === 'single' || type === 'scale' ? (
              <RadioGroupItem value={id} id={id} />
            ) : (
              <Checkbox
                id={id}
                checked={isSelected}
                className="mt-0.5"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-base leading-snug">{text}</div>
            {subtext && (
              <div className="mt-1 text-sm text-slate-500 leading-snug">
                {subtext}
              </div>
            )}
          </div>
        </div>
      </div>
    </label>
  );
}
