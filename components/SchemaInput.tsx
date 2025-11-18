
import React from 'react';

interface SchemaInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SchemaInput: React.FC<SchemaInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="schema" className="block text-sm font-medium text-slate-400 mb-2">
        Database Schema (CREATE TABLE statements)
      </label>
      <textarea
        id="schema"
        name="schema"
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your CREATE TABLE statements here..."
        className="w-full p-3 bg-slate-900/70 border border-slate-600 rounded-lg text-slate-200 font-mono text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 shadow-inner"
      />
    </div>
  );
};
