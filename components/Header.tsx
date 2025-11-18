
import React from 'react';
import { DatabaseIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4">
        <DatabaseIcon />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
          AI SQL Query Generator
        </h1>
      </div>
    </header>
  );
};
