'use client';

import { useState } from 'react';
import { Quiz } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <Quiz />
    </main>
  );
}