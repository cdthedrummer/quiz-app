import React from 'react';

interface QuizOptionProps {
  value: string;
  label: string;
  selected: boolean;
  type: 'single' | 'multiple' | 'scale';
  onChange: (value: string) => void;
}

export function QuizOption({ value, label, selected, type, onChange }: QuizOptionProps) {
  return (
    <label
      className={`flex items-center p-3 rounded-md cursor-pointer border-2 transition-all
        ${selected ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
    >
      <input
        type={type === 'multiple' ? 'checkbox' : 'radio'}
        checked={selected}
        onChange={() => onChange(value)}
        className="mr-3"
      />
      <span>{label}</span>
    </label>
  );
}