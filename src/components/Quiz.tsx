'use client';
// ... rest of imports

// Just updating the className for the label elements:
className={`relative block rounded-lg transition-all duration-200 select-none
  border border-slate-200 shadow-sm ${selections[currentQuestion]?.[0] === option.id 
    ? 'border-blue-500 bg-blue-50 shadow-blue-100' 
    : 'hover:border-gray-300 hover:bg-gray-50 hover:shadow'}`}
