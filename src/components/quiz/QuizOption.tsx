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
  return (
    <label
      className={`relative block rounded-lg transition-all duration-200 select-none
        border-2 shadow-sm overflow-hidden
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-blue-100' 
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow'}`}
      onClick={() => onSelect(id)}
    >
      <div className="px-4 py-3">
        <div className="flex items-center min-h-6">
          {type === 'single' || type === 'scale' ? (
            <RadioGroupItem value={id} id={id} />
          ) : (
            <Checkbox
              id={id}
              checked={isSelected}
            />
          )}
          <span className="font-medium ml-3">{text}</span>
        </div>
        {subtext && (
          <p className="text-sm text-slate-500 ml-7 mt-0.5">
            {subtext}
          </p>
        )}
      </div>
    </label>
  );
}
